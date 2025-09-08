// classes/cathy.js
export default class Cathy extends Phaser.Physics.Matter.Sprite {
  constructor(scene, x, y) {
    super(scene.matter.world, x, y, "player");
    scene.add.existing(this);

    // --- Collision Categories ---
    this.CAT_PLAYER     = 0x0001;
    this.CAT_WORLD      = 0x0002;
    this.CAT_ENEMY      = 0x0004;
    this.CAT_PLAYER_ATK = 0x0008;

    // --- Collision Group (negative -> never collide with same group) ---
    this.GRP_PLAYER_AND_ATK = -1;

    // --- Force scale (set to 1) ---
    this.FORCE_SCALE = 1;

    // --- Visuals ---
    this._visualOffset = { x: 0, y: -90 };
    this.setVisible(false);
    this.skin = scene.add.sprite(this.x + this._visualOffset.x, this.y + this._visualOffset.y, "player");
    this.skin.setScale(1);
    this.skin.play("idle");

    // --- State ---
    this.sceneglobal = scene;
    this.direction = "right";

    // Attack + locks
    this.isAttacking = false;
    this.attackPhase = "none"; // none | windup | leap | impact | rest
    this.isSlamLock = false;   // separate from landing stun

    // Landing stun (vertical-only trigger)
    this.isLandingStunned = false;
    this.hardFallVy = 50.0;         // require strong downward vy
    this.minAirMsForStun = 250;     // must be airborne long enough
    this._mainLandedThisFrame = false;
    this._landedVy = 0;

    // Jump (charge → applyForce on release)
    this.isWindup = false;
    this.windupStart = 0;
    this.jumpForceBase = 6;  // tap
    this.jumpForceMax  = 8;  // full charge
    this.maxChargeHoldMs = 1000;
    this.noGroundUntil = 0;

    // Health + i-frames
    this.health = 3;
    this.iFramesMs = 800;
    this.isInvincible = false;
    this._iFrameTimer = null;
    this._blinkTimer = null;

    // Movement
    this.moveSpeed = 0.15; // per-frame force when held
    this.maxMoveV = 10.0;

    // Climb
    this.isClimbing = false;
    this.climbSide = null;           // 'left' | 'right'
    this.climbStartTime = 0;
    this.climbDurationMs = 1000;
    this.climbSpeed = 6;
    this.climbLaunch = { vx: 1, vy: -3 };
    this.climbCharges = 1;
    this.justClimbedAt = 0;
    this.climbTriggerCooldownMs = 120; // avoid rapid retriggers

    // Wall Jump (LOCKED state until opposite wall is touched/UP or ground)
    // Reduced fling a LOT: small force pulses that add onto current velocity
    this.isWallJumping = false; // for anim
    this.wallJump = {
      active: false,
      fromSide: null,          // 'left' | 'right'
      dir: 0,                  // -1 (left) | +1 (right)
      startTime: 0,
      maxMs: 900,              // safety timeout
      burstFrames: 6,          // fewer pulses
      framesApplied: 0,
      burstForce: { x: 0.6, y: -0.5 } // much smaller; barely any vertical
    };

    // "Swap walls" rule: must touch opposite wall (or ground) before reattaching
    this.requiredWallSide = null; // null | 'left' | 'right'

    // Meta-state
    this.wasOnGround = false;
    this.onGround = false;
    this.onLeftWall = false;
    this.onRightWall = false;
    this.airborneSince = null;
    this.lastGroundedAt = 0;
    this.lastVelocityY = 0;
    this.coyoteMs = 60;

    // Input
    this.cursors = scene.input.keyboard.createCursorKeys();
    this.attackKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // --- Physics body (compound + sensors) ---
    const w = 120;
    const h = 300;
    const MatterLib = Phaser.Physics.Matter.Matter;
    const Bodies = MatterLib.Bodies;
    const Body = MatterLib.Body;

    const main  = Bodies.rectangle(0, 0, w, h, { chamfer: { radius: 12 } });
    const foot  = Bodies.rectangle(0, h * 0.5 + 1, w * 0.56, 12, { isSensor: true });
    const left  = Bodies.rectangle(-w * 0.5, -20, 40, h * 0.8, { isSensor: true });
    const right = Bodies.rectangle(+w * 0.5, -20, 40, h * 0.8, { isSensor: true });

    const compound = Body.create({
      parts: [main, foot, left, right],
      friction: 0,
      frictionStatic: 0,
      frictionAir: 0.001,
      restitution: 0
    });

    Body.setPosition(compound, { x, y });
    this.setExistingBody(compound);
    this.setFixedRotation();

    // Collision filters
    this._applyFilterToAllParts(
      this.body,
      this.CAT_PLAYER,
      this.CAT_WORLD | this.CAT_ENEMY,
      this.GRP_PLAYER_AND_ATK
    );

    // Labels
    main.label = "cathy-main";
    foot.label = "cathy-foot";
    left.label = "cathy-left";
    right.label = "cathy-right";

    // Contact tracking
    this._touching = { foot: new Set(), left: new Set(), right: new Set() };

    // Slam sensor (attack hitbox)
    this.slamActive = false;
    this.slamBoxSize   = { w: 220, h: 130 };
    this.slamBoxOffset = { x: 200, y: 100 };
    this._makeSlamSensor();

    // Collisions
    const world = scene.matter.world;
    world.on("collisionstart", (evt) => this._handleCollisions(evt, "start"));
    world.on("collisionactive", (evt) => this._handleCollisions(evt, "active"));
    world.on("collisionend",   (evt) => this._handleCollisions(evt, "end"));

    // Cleanup
    this.on("destroy", () => {
      if (this.slamSensor) this.sceneglobal.matter.world.remove(this.slamSensor);
      if (this.skin && !this.skin.destroyed) this.skin.destroy();
    });
  }

  // --- Animations ---
  static loadAnimations(scene) {
    scene.anims.create({ key: "walk", frames: scene.anims.generateFrameNumbers("player", { start: 0, end: 9 }), frameRate: 12, repeat: -1 });
    scene.anims.create({ key: "idle", frames: [{ key: "player", frame: 1 }] });
    scene.anims.create({ key: "jump_windup", frames: [{ key: "player", frame: 22 }] });
    scene.anims.create({ key: "jump", frames: [{ key: "player", frame: 23 }] });
    scene.anims.create({ key: "fall", frames: [{ key: "player", frame: 24 }] });
    scene.anims.create({ key: "land", frames: scene.anims.generateFrameNumbers("player", { start: 25, end: 28 }), frameRate: 10, repeat: 0 });

    scene.anims.create({ key: "attack_windup", frames: scene.anims.generateFrameNumbers("player", { start: 10, end: 12 }), frameRate: 12, repeat: 0 });
    scene.anims.create({ key: "attack_leap",   frames: scene.anims.generateFrameNumbers("player", { start: 13, end: 15 }), frameRate: 14, repeat: 0 });
    scene.anims.create({ key: "attack_impact", frames: scene.anims.generateFrameNumbers("player", { start: 16, end: 17 }), frameRate: 18, repeat: 0 });
    scene.anims.create({ key: "attack_rest",   frames: scene.anims.generateFrameNumbers("player", { start: 18, end: 21 }), frameRate: 10, repeat: 0 });

    // NEW: wall jump anim (single frame for now)
    scene.anims.create({ key: "wall_jump", frames: [{ key: "player", frame: 4 }] });

    scene.anims.create({
      key: "climb",
      frames: scene.anims.generateFrameNumbers("player", { start: 29, end: 32 }),
      frameRate: 10,
      repeat: -1
    });
  }

  registerEnemyGroup(group) { this.enemyGroup = group; }

  // --- Utilities ---
  _applyFilterToAllParts(body, category, mask, group) {
    if (!body) return;
    const parts = body.parts && body.parts.length ? body.parts : [body];
    for (const p of parts) {
      p.collisionFilter.category = category;
      p.collisionFilter.mask = mask;
      p.collisionFilter.group = group;
    }
    this.setCollisionCategory(category);
    this.setCollidesWith(mask);
  }

  // --- Slam sensor ---
  _makeSlamSensor() {
    const { w, h } = this.slamBoxSize;
    const MatterLib = Phaser.Physics.Matter.Matter;
    const body = MatterLib.Bodies.rectangle(this.x, this.y, w, h, {
      isSensor: true,
      isStatic: true,
      label: "cathy-slam",
      collisionFilter: {
        category: this.CAT_PLAYER_ATK,
        mask: this.CAT_WORLD | this.CAT_ENEMY,
        group: this.GRP_PLAYER_AND_ATK
      }
    });
    this.slamSensor = body;
    this.sceneglobal.matter.world.add(this.slamSensor);
  }

  _positionSlamSensor() {
    if (!this.slamActive) return;
    const dirRight = (this.direction === "right");
    const flipFix = dirRight ? 0 : -400; // your tweak
    const ox = this.slamBoxOffset.x + flipFix;
    const oy = this.slamBoxOffset.y;
    const targetX = this.x + ox;
    const targetY = this.y + oy;
    Phaser.Physics.Matter.Matter.Body.setPosition(this.slamSensor, { x: targetX, y: targetY });
  }

  _setSlamActive(active) {
    this.slamActive = active;
    if (active) this._positionSlamSensor();
  }

  // --- I-frames / damage (with applyForce knockback ≈ 2,2) ---
  takeDamage(amount = 1, forceX = 2, forceY = 2) {
    if (this.isInvincible || this.isLandingStunned || this.isSlamLock || this._isWallJumpLocked()) return;

    this.health = Math.max(0, this.health - amount);
    this._startIFrames();

    if (forceX || forceY) {
      this.applyForce({ x: forceX * this.FORCE_SCALE, y: forceY * this.FORCE_SCALE });
    }
  }

  _startIFrames() {
    this.isInvincible = true;
    if (this._iFrameTimer) { this._iFrameTimer.remove(false); this._iFrameTimer = null; }
    if (this._blinkTimer) { this._blinkTimer.remove(false); this._blinkTimer = null; }

    const blinkDelay = 80;
    this._blinkTimer = this.sceneglobal.time.addEvent({
      delay: blinkDelay,
      repeat: Math.ceil(this.iFramesMs / blinkDelay),
      callback: () => { if (this.skin) this.skin.setAlpha(this.skin.alpha === 1 ? 0.4 : 1); }
    });

    this._iFrameTimer = this.sceneglobal.time.delayedCall(this.iFramesMs, () => {
      this.isInvincible = false;
      if (this._blinkTimer) { this._blinkTimer.remove(false); this._blinkTimer = null; }
      if (this.skin) this.skin.setAlpha(1);
    });
  }

  // --- Collisions ---
  _handleCollisions(evt, kind) {
    const isStart = (kind === "start" || kind === "active");
    const isEnd   = (kind === "end");

    const updateSet = (set, otherBody, adding) => {
      if (!set) return;
      if (adding) set.add(otherBody);
      else set.delete(otherBody);
    };

    const isSolidWorld = (b) => b && !b.isSensor && (b.collisionFilter?.category & this.CAT_WORLD);
    const isSolid      = (b) => b && !b.isSensor && (b.collisionFilter?.category & (this.CAT_WORLD | this.CAT_ENEMY));

    for (const pair of evt.pairs) {
      const { bodyA, bodyB } = pair;
      const aLabel = bodyA?.label || "";
      const bLabel = bodyB?.label || "";

      // Foot / wall sensors
      if (aLabel === "cathy-foot" || bLabel === "cathy-foot") {
        const other = (aLabel === "cathy-foot") ? bodyB : bodyA;
        const adding = isStart && !isEnd && isSolid(other);
        updateSet(this._touching.foot, other, adding);
      }
      if (aLabel === "cathy-left" || bLabel === "cathy-left") {
        const other = (aLabel === "cathy-left") ? bodyB : bodyA;
        const adding = isStart && !isEnd && isSolid(other);
        updateSet(this._touching.left, other, adding);
      }
      if (aLabel === "cathy-right" || bLabel === "cathy-right") {
        const other = (aLabel === "cathy-right") ? bodyB : bodyA;
        const adding = isStart && !isEnd && isSolid(other);
        updateSet(this._touching.right, other, adding);
      }

      // MAIN vs WORLD -> real landing (for vertical-only stun)
      const mainHitsWorldStart =
        isStart &&
        (
          (aLabel === "cathy-main" && isSolidWorld(bodyB)) ||
          (bLabel === "cathy-main" && isSolidWorld(bodyA))
        );

      if (mainHitsWorldStart) {
        this._mainLandedThisFrame = true;
        this._landedVy = this.lastVelocityY; // + downward
        if (this.isAttacking && this.attackPhase === "leap") this._enterImpact();
      }

      // Enemy touch -> damage (only when not attacking / no i-frames / not wall-jump locked)
      const cathyHit =
        (aLabel === "cathy-main" && bodyB?.gameObject && bodyB.gameObject.isEnemy) ||
        (bLabel === "cathy-main" && bodyA?.gameObject && bodyA.gameObject.isEnemy);

      if (kind === "start" && cathyHit && !this.isInvincible && !this.isAttacking && !this._isWallJumpLocked()) {
        const enemyGO = (aLabel === "cathy-main") ? bodyB.gameObject : bodyA.gameObject;
        if (enemyGO && enemyGO.state !== "dead") {
          if (typeof enemyGO.onHitCathy === "function") enemyGO.onHitCathy(this);
          else {
            const fromRight = enemyGO.x > this.x;
            this.takeDamage(1, fromRight ? -2 : 2, -2); // ≈ 2,2 knockback
          }
        }
      }

      // Slam sensor vs enemy -> impact
      const slamHitEnemy =
        (aLabel === "cathy-slam" && bodyB?.gameObject && bodyB.gameObject.isEnemy) ||
        (bLabel === "cathy-slam" && bodyA?.gameObject && bodyA.gameObject.isEnemy);

      if (this.slamActive && this.attackPhase === "leap" && isStart && slamHitEnemy) {
        const enemyGO = (aLabel === "cathy-slam") ? bodyB.gameObject : bodyA.gameObject;
        if (enemyGO && enemyGO.state !== "dead" && typeof enemyGO.dieFromSlam === "function") {
          enemyGO.dieFromSlam(this);
        }
        this._enterImpact();
      }
    }

    // Update booleans (respect jump grace)
    const now = this.sceneglobal.time.now;
    const allowGround = now >= this.noGroundUntil;
    this.onGround   = allowGround && this._touching.foot.size > 0;
    this.onLeftWall = this._touching.left.size > 0;
    this.onRightWall= this._touching.right.size > 0;
  }

  // --- Attack flow ---
  startAttack() {
    if (this.isAttacking || this.isWindup || this.isLandingStunned || this.isClimbing || this._isWallJumpLocked()) return;
    this.isAttacking = true;
    this.attackPhase = "windup";
    this._safePlay("attack_windup");

    this.skin.once("animationcomplete-attack_windup", () => {
      if (this.attackPhase !== "windup") return;
      this.attackPhase = "leap";

      const fwd = (this.direction === "right") ? 1 : -1;
      // forward + upward push (FORCE_SCALE = 1)
      this.applyForce({ x: 1.5 * fwd * this.FORCE_SCALE, y: -2.5 * this.FORCE_SCALE });
      if (this.onGround) this.applyForce({ x: 0, y: -0.006 }); // tiny hop to ensure lift

      this._setSlamActive(true);
      this._safePlay("attack_leap");

      this.sceneglobal.time.delayedCall(800, () => {
        if (this.isAttacking && this.attackPhase === "leap") this._enterImpact();
      });
    });
  }

  _enterImpact() {
    if (this.attackPhase === "impact" || this.attackPhase === "rest") return;

    this.attackPhase = "impact";
    this._setSlamActive(false);
    this.isSlamLock = true;

    const vy = this.body.velocity.y;
    if (!this.onGround && vy > -3) this.setVelocityY(6);

    this.setVelocityX(0);
    this._safePlay("attack_impact");

    this.skin.once("animationcomplete-attack_impact", () => {
      if (this.attackPhase !== "impact") return;
      this.attackPhase = "rest";
      this._safePlay("attack_rest");

      this.setVelocityX(0);
      this.skin.once("animationcomplete-attack_rest", () => {
        this.isSlamLock = false;
        this.isAttacking = false;
        this.attackPhase = "none";
      });
    });
  }

  // --- Climbing ---
  _startClimb(side, time) {
    this.isClimbing = true;
    this.climbSide = side;
    this.climbStartTime = time;

    this.direction = (side === "left") ? "left" : "right";
    this._applyFacing();

    this.setIgnoreGravity(true);
    this.setVelocity(0, -this.climbSpeed);
    this._safePlay("climb");
  }

  _updateClimb(time) {
    if (!this.isClimbing) return;
    const stillOnWall = (this.climbSide === 'left' && this.onLeftWall) || (this.climbSide === 'right' && this.onRightWall);
    if ((time - this.climbStartTime >= this.climbDurationMs) || !stillOnWall) {
      this._endClimb();
    } else {
      this.setVelocity(0, -this.climbSpeed);
    }
  }

  _endClimb() {
    if (!this.isClimbing) return;
    const prev = this.climbSide;

    this.setIgnoreGravity(false);
    this.isClimbing = false;
    this.climbSide = null;

    // Must swap walls: require opposite wall before reattaching
    if (prev) this.requiredWallSide = (prev === "left" ? "right" : "left");

    // small release nudge (adds to current velocity)
    this.applyForce({ x: this.climbLaunch.vx * (prev === "left" ? +1 : -1) * this.FORCE_SCALE, y: this.climbLaunch.vy * this.FORCE_SCALE });
    this._safePlay("jump");
  }

  // --- Wall jump (LOCKED like attack): press opposite arrow while climbing ---
  _doWallJump(awayDir /* -1 left, +1 right */, time) {
    const prev = this.climbSide;

    // leave climb immediately
    this.setIgnoreGravity(false);
    this.isClimbing = false;
    this.climbSide = null;

    // enforce swap: must touch the OPPOSITE wall (or ground) to reattach
    this.requiredWallSide = (prev === "left" ? "right" : "left");

    // face fling direction
    this.direction = awayDir > 0 ? "right" : "left";
    this._applyFacing();

    // Setup locked wall-jump state
    this.wallJump.active = true;
    this.wallJump.fromSide = prev;
    this.wallJump.dir = awayDir;
    this.wallJump.startTime = time;
    this.wallJump.framesApplied = 0;

    // First burst immediately (adds to current velocity; no overrides)
    this.applyForce({
      x: this.wallJump.burstForce.x * awayDir * this.FORCE_SCALE,
      y: this.wallJump.burstForce.y * this.FORCE_SCALE
    });
    this.wallJump.framesApplied++;

    // Anim pose while locked
    this.isWallJumping = true;
    this._safePlay("wall_jump");
  }

  _updateWallJump(time, upHeld) {
    // keep applying small force for a few frames to guarantee a fling (but much lower now)
    if (this.wallJump.framesApplied < this.wallJump.burstFrames) {
      this.applyForce({
        x: this.wallJump.burstForce.x * this.wallJump.dir * this.FORCE_SCALE,
        y: this.wallJump.burstForce.y * this.FORCE_SCALE
      });
      this.wallJump.framesApplied++;
    }

    // conditions to unlock:
    const touchingOpposite =
      (this.wallJump.fromSide === "left"  && this.onRightWall) ||
      (this.wallJump.fromSide === "right" && this.onLeftWall);

    const timedOut = (time - this.wallJump.startTime) >= this.wallJump.maxMs;

    // NEW: If touching the opposite wall AND UP is held, instantly attach and keep momentum flow
    if (touchingOpposite && upHeld) {
      const newSide = (this.wallJump.fromSide === "left") ? "right" : "left";
      this._endWallJumpLock();           // clear lock
      this.requiredWallSide = null;      // allow attach now
      this._startClimb(newSide, time);   // immediate climb start
      this.climbCharges = Math.max(0, this.climbCharges - 1); // consume the refreshed charge
      this.justClimbedAt = time;
      return;
    }

    // Otherwise unlock on ground, touching opposite wall (without UP), or timeout
    if (this.onGround || touchingOpposite || timedOut) {
      this._endWallJumpLock();
    }
  }

  _endWallJumpLock() {
    if (!this.wallJump.active) return;
    this.wallJump.active = false;
    this.wallJump.fromSide = null;
    this.wallJump.dir = 0;
    this.isWallJumping = false;
  }

  _isWallJumpLocked() {
    return !!this.wallJump.active;
  }

  // --- More responsive climb decision (requires UP held) ---
  _maybeStartClimbFast(time, upHeld) {
    if (!upHeld) return false;
    if (this.isClimbing || this.isAttacking || this.isWindup || this.isLandingStunned || this.isSlamLock || this._isWallJumpLocked()) return false;

    const side = this.onLeftWall ? "left" : (this.onRightWall ? "right" : null);
    if (!side) return false;

    // Enforce "swap walls": if a required wall is set, ONLY attach to that side
    if (this.requiredWallSide && side !== this.requiredWallSide) return false;

    // throttle repeated triggers
    if (time - this.justClimbedAt < this.climbTriggerCooldownMs) return false;

    // must have a charge (refreshed on landing)
    if (this.climbCharges <= 0) return false;

    // If we are allowed and the required side is met, clear the requirement
    if (this.requiredWallSide && side === this.requiredWallSide) {
      this.requiredWallSide = null;
    }

    this._startClimb(side, time);
    this.climbCharges -= 1;
    this.justClimbedAt = time;
    return true;
  }

  preUpdate(time, delta) {
    super.preUpdate?.(time, delta);
    this.lastVelocityY = this.body.velocity.y;

    if (this.skin) {
      this.skin.setPosition(this.x + this._visualOffset.x, this.y + this._visualOffset.y);
      this._applyFacing();
    }
  }

  // --- Update ---
  update(time, delta) {
    const left = this.cursors.left.isDown;
    const right = this.cursors.right.isDown;
    const leftPressed  = Phaser.Input.Keyboard.JustDown(this.cursors.left);
    const rightPressed = Phaser.Input.Keyboard.JustDown(this.cursors.right);
    const upPressed = Phaser.Input.Keyboard.JustDown(this.cursors.up);
    const upHeld = this.cursors.up.isDown;
    const attackPressed = Phaser.Input.Keyboard.JustDown(this.attackKey);

    // Ground/air transitions
    if (this.onGround) {
      if (!this.wasOnGround) {
        this.airborneSince = null;
        this.climbCharges = 1;
        this.lastGroundedAt = time;
        this.requiredWallSide = null; // touching ground clears swap requirement
        if (!this.isAttacking && !this.isSlamLock) this._maybeHardLand();
        this._mainLandedThisFrame = false;
      } else {
        this.lastGroundedAt = time;
      }
    } else if (this.wasOnGround) {
      this.airborneSince = time;
    }
    this.wasOnGround = this.onGround;

    // Uncontrollable states (slam/impact)
    if (this.isLandingStunned || this.isSlamLock) {
      this._animate();
      this._mainLandedThisFrame = false;
      return;
    }

    // --- WALL JUMP LOCK: takes priority, like attack ---
    if (this._isWallJumpLocked()) {
      this._updateWallJump(time, upHeld);
      this._animate();
      return;
    }

    // Attacking
    if (this.isAttacking) {
      if (this.attackPhase === "leap") this._positionSlamSensor();
      this._animate();
      return;
    }

    // --- While CLIMBING: allow WALL JUMP by pressing the opposite arrow key ---
    if (this.isClimbing) {
      if (this.climbSide === "left"  && rightPressed) { this._doWallJump(+1, time); this._animate(); return; }
      if (this.climbSide === "right" && leftPressed)  { this._doWallJump(-1, time); this._animate(); return; }
      // keep climbing otherwise
      this._updateClimb(time);
      this._animate();
      return;
    }

    // CLIMB: ultra-responsive — if UP is held and touching a wall, climb immediately (respect swap rule)
    if (this._maybeStartClimbFast(time, upHeld)) {
      this._animate();
      return;
    }

    // Jump windup priority
    if (this.isWindup) {
      this.setVelocityX(0);
      if (this.body.velocity.y < 0.2) this.setVelocityY(0.2);

      if (!upHeld) {
        // RELEASE
        this.isWindup = false;
        this.setIgnoreGravity(false);

        const heldMs = Math.max(0, time - this.windupStart);
        const t = Phaser.Math.Clamp(heldMs / this.maxChargeHoldMs, 0, 1);
        const fY = Phaser.Math.Linear(this.jumpForceBase, this.jumpForceMax, t);

        this.applyForce({ x: 0, y: -fY * this.FORCE_SCALE });

        this._touching.foot.clear();
        this.noGroundUntil = this.sceneglobal.time.now + 60;
        this.onGround = false;

        this._safePlay("jump");
        return;
      }
      this._animate();
      return;
    }

    // Actions
    if (attackPressed) {
      this.startAttack();
      this._animate();
      return;
    }

    const hasCoyote = (time - this.lastGroundedAt) <= this.coyoteMs;
    if (upPressed && (this.onGround || hasCoyote)) {
      // Start jump windup
      this.isWindup = true;
      this.windupStart = time;
      this.setIgnoreGravity(true);
      this.setVelocityX(0);
      if (this.body.velocity.y < 0.2) this.setVelocityY(0.2);
      this._safePlay("jump_windup");
      this._animate();
      return;
    }

    // Movement
    let move = 0;
    if (left)  { move = -1; this.direction = "left"; }
    else if (right) { move = +1; this.direction = "right"; }

    if (move !== 0) {
      this.applyForce({ x: this.moveSpeed * move * this.FORCE_SCALE, y: 0 });
    }

    // Clamp horizontal speed
    const vx = Phaser.Math.Clamp(this.body.velocity.x, -this.maxMoveV, this.maxMoveV);
    if (vx !== this.body.velocity.x) this.setVelocityX(vx);

    // Manual friction on ground
    if (this.onGround && move === 0) {
      this.setVelocityX(this.body.velocity.x * 0.85);
      if (Math.abs(this.body.velocity.x) < 0.05) this.setVelocityX(0);
    }

    this._animate();
  }

  // --- Helpers ---

  // Hard-land stun: lasts exactly for 'land' animation, vertical-only, MAIN-vs-WORLD
  _maybeHardLand() {
    if (this.isAttacking || this.isSlamLock || this.isClimbing || this._isWallJumpLocked()) return;
    if (!this._mainLandedThisFrame) return;

    const now = this.sceneglobal.time.now;
    const airMs = (this.airborneSince != null) ? (now - this.airborneSince) : this.minAirMsForStun;
    if (airMs < this.minAirMsForStun) return;

    const impactVy = this._landedVy; // downward positive
    if (impactVy < this.hardFallVy) return;

    if (this.isLandingStunned) return;

    this.isLandingStunned = true;
    this.setVelocityX(0);
    this._safePlay("land");

    const clear = () => { this.isLandingStunned = false; };
    if (this.skin && this.skin.once) this.skin.once("animationcomplete-land", clear);
    else this.sceneglobal.time.delayedCall(250, clear);
  }

  _animate() {
    if (this.isLandingStunned) { this._safePlay("land"); return; }
    if (this.isAttacking) return;
    if (this._isWallJumpLocked() || this.isWallJumping) { this._safePlay("wall_jump"); return; }
    if (this.isWindup) { this._safePlay("jump_windup"); return; }
    if (this.isClimbing) { this._safePlay("climb"); return; }

    const vy = this.body.velocity.y;
    if (!this.onGround) {
      if (vy < -0.5) this._safePlay("jump");
      else if (vy > 0.5) this._safePlay("fall");
      return;
    }

    const moving = Math.abs(this.body.velocity.x) > 0.6;
    this._safePlay(moving ? "walk" : "idle");
  }

  _applyFacing() {
    if (!this.skin) return;
    this.skin.setFlipX(this.direction === "right");
  }

  _safePlay(key) {
    if (!this.skin || !this.skin.anims) return;
    const current = this.skin.anims.currentAnim?.key;
    if (current !== key) this.skin.play(key, true);
  }
}
