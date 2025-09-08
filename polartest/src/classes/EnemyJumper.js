// classes/EnemyJumper.js (Matter.js) — with Cathy-style visual "skin" follower & offset
export default class EnemyJumper extends Phaser.Physics.Matter.Sprite {
  /**
   * @param {Phaser.Scene} scene
   * @param {number} x
   * @param {number} y
   * @param {{ offsetX?: number, offsetY?: number, scale?: number }} [opts]
   */
  constructor(scene, x, y, opts = {}) {
    // --- Dynamic Lighting ---
     super(scene.matter.world, x, y, "enemy_jumper");
    scene.add.existing(this);
    if (scene.lights && typeof scene.lights.addLight === "function") {
      this.light = scene.lights.addLight(this.x, this.y - 60, 180, 0xff6666, 1.2);
    }
    this.setPipeline("Light2D");


    // --- Shared collision categories (match Cathy/TestLevel) ---
    this.CAT_PLAYER     = 0x0001;
    this.CAT_WORLD      = 0x0002;
    this.CAT_ENEMY      = 0x0004;
    this.CAT_PLAYER_ATK = 0x0008;

    // --- CONFIG KNOBS ---
    // Use "impulse-like" velocity changes + small forces for consistency
    this.jumpImpulseX = 10;      // add to vx on jump (dir-signed)
    this.jumpImpulseY = -20;     // add to vy on jump (up)
    this.flipChanceOnLand = 0.5; // chance to flip direction when touching down
    this.fadeDuration = 220;      // ms fade on death
    this.maxMoveV = 5.0;          // clamp horizontal velocity

    // Mark for Cathy’s collision checks
    this.isEnemy = true;

    // --- Cathy-style visual handling ---
    // Separate "skin" sprite that follows the Matter body with a stable pixel offset
    this._visualOffset = {
      x: opts.offsetX ?? 0,
      y: opts.offsetY ?? -150, // tweak as needed per your sprite
    };
    // Hide THIS sprite’s texture; keep physics only
    this.setVisible(false);

    // Create the visual follower
    this.skin = scene.add.sprite(this.x + this._visualOffset.x, this.y + this._visualOffset.y, "enemy_jumper");
    this.skin.setScale(opts.scale ?? 1);
    this._safePlay("ej_idle");

    // --- Body: main + foot sensor ---
    const w = 80;
    const h = 180;

    const MatterLib = Phaser.Physics.Matter.Matter;
    const Bodies    = MatterLib.Bodies;
    const Body      = MatterLib.Body;

    const main = Bodies.rectangle(0, 0, w, h, {
      chamfer: { radius: 10 },
      label: "enemy-main",
      friction: 0.001,
      frictionStatic: 0,
      frictionAir: 0.02,
      restitution: 0
    });

    // slightly lower/thicker sensor for robust grounding
    const foot = Bodies.rectangle(0, h * 0.5 + 2, w * 0.60, 14, {
      isSensor: true,
      label: "enemy-foot"
    });

    const compound = Body.create({ parts: [main, foot] });
    Body.setPosition(compound, { x, y }); // place before attaching

    this.setExistingBody(compound);
    this.setFixedRotation();

    // Ensure ALL parts have explicit filters so collisions are predictable
    this._applyFilterToAllParts(
      this.body,
      this.CAT_ENEMY,
      this.CAT_WORLD | this.CAT_PLAYER | this.CAT_PLAYER_ATK | this.CAT_ENEMY
    );

    // Force initial sprite position sync (some Phaser builds render 1 frame late)
    this.setPosition(x, y);
    if (this.skin) this.skin.setPosition(this.x + this._visualOffset.x, this.y + this._visualOffset.y);

    // --- State ---
    this.state = "idle";      // idle | windup | jump | dead
    this.direction = "left";  // "left" | "right"
    this.justSpawned = true;

    // Landing detection
    this._touchingFoot = new Set();
    this._prevOnFloor = false;

    // Flip initial facing on skin
    this._applyFacing();

    // --- World collision hooks for foot sensor ---
    scene.matter.world.on("collisionstart", (evt) => this._collide(evt, true));
    scene.matter.world.on("collisionactive", (evt) => this._collide(evt, true));
    scene.matter.world.on("collisionend",   (evt) => this._collide(evt, false));

    // Cleanup the skin if this object is destroyed
    // Cleanup the skin and light if this object is destroyed
    this.on("destroy", () => {
      if (this.skin && !this.skin.destroyed) this.skin.destroy();
      if (this.light && scene.lights && typeof scene.lights.removeLight === "function") {
        scene.lights.removeLight(this.light);
        this.light = null;
      }
    });
  }

  // ---- Animations (same keys as before) ----
  static loadAnimations(scene) {
    scene.anims.create({
      key: "ej_windup",
      frames: scene.anims.generateFrameNumbers("enemy_jumper", { start: 0, end: 2 }),
      frameRate: 10,
      repeat: 0
    });
    scene.anims.create({ key: "ej_jump",  frames: [{ key: "enemy_jumper", frame: 3 }] });
    scene.anims.create({
      key: "ej_death",
      frames: scene.anims.generateFrameNumbers("enemy_jumper", { start: 4, end: 6 }),
      frameRate: 12,
      repeat: 0
    });
    scene.anims.create({ key: "ej_idle",  frames: [{ key: "enemy_jumper", frame: 0 }] });
  }

  // ---- Public hooks ----
  /** Called when Cathy’s slam connects */
  dieFromSlam(cathy) {
    if (this.state === "dead") return;
    this.state = "dead";

    this.setSensor(true); // stop colliding

    // Face Cathy, then launch AWAY a bit
    const towardRight = cathy.x > this.x;
    this.direction = towardRight ? "right" : "left";
    this._applyFacing();

    const awayVX = towardRight ? -6 : 6;
    const awayVY = -6;
    this.setVelocity(awayVX, awayVY);

    this._safePlay("ej_death");
    // Fade out after anim
    this.skin.once("animationcomplete-ej_death", () => {
      this.scene.tweens.add({
        targets: this.skin,
        alpha: 0,
        duration: this.fadeDuration,
        onComplete: () => this.destroy()
      });
    });
  }

  /** Called on body contact with Cathy (non-slam) */
  onHitCathy(cathy) {
    if (!cathy || typeof cathy.takeDamage !== "function") return;
    cathy.takeDamage(1, 500, 500);
  }

  // ---- Internals ----
  _applyFilterToAllParts(body, category, mask) {
    if (!body) return;
    const parts = body.parts && body.parts.length ? body.parts : [body];
    for (const p of parts) {
      p.collisionFilter.category = category;
      p.collisionFilter.mask = mask;
    }
    this.setCollisionCategory(category);
    this.setCollidesWith(mask);
  }

  _collide(evt, adding) {
    const isSolidWorld = (b) => b && !b.isSensor && (b.collisionFilter?.category & this.CAT_WORLD);
    for (const { bodyA, bodyB } of evt.pairs) {
      const a = bodyA?.label, b = bodyB?.label;
      if (a === "enemy-foot" || b === "enemy-foot") {
        const other = a === "enemy-foot" ? bodyB : bodyA;
        if (!isSolidWorld(other)) continue;
        if (adding) this._touchingFoot.add(other);
        else this._touchingFoot.delete(other);
      }
    }
  }

  _startWindup() {
    if (this.state === "dead") return;
    this.state = "windup";
    this.setVelocityX(0);
    this._safePlay("ej_windup");
    // Jump on animation complete (safer than timer)
    this.skin.once("animationcomplete-ej_windup", () => {
      if (this.state === "windup") this._jump();
    });
  }

  _jump() {
    if (this.state === "dead") return;
    this.state = "jump";
    const dirSign = this.direction === "right" ? 1 : -1;

    // "Impulse-like" changes to velocity + small force to stabilize takeoff
    const vx = this.body.velocity.x;
    const vy = this.body.velocity.y;
    this.setVelocityX(vx + this.jumpImpulseX * dirSign);
    this.setVelocityY(vy + this.jumpImpulseY);
    this.applyForce({ x: 0.0008 * dirSign, y: -0.0012 });

    this._safePlay("ej_jump");
  }

  _maybeFlipOnLanding() {
    if (Math.random() < this.flipChanceOnLand) {
      this.direction = this.direction === "left" ? "right" : "left";
      this._applyFacing();
    }
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.state === "dead") return;

    // Keep skin synced & facing
    if (this.skin) {
      this.skin.setPosition(this.x + this._visualOffset.x, this.y + this._visualOffset.y);
      this._applyFacing();
    }

    // Update light position
    if (this.light) {
      this.light.x = this.x;
      this.light.y = this.y - 60;
    }

    // Grounding
    const onFloor = this._touchingFoot.size > 0;
    const justLanded = !this._prevOnFloor && onFloor;

    // Clamp horizontal speed so impulses stay predictable
    if (this.body && Math.abs(this.body.velocity.x) > this.maxMoveV) {
      this.setVelocityX(Phaser.Math.Clamp(this.body.velocity.x, -this.maxMoveV, this.maxMoveV));
    }

    if (this.justSpawned) {
      if (onFloor) {
        this.justSpawned = false;
        this._startWindup();
      }
    } else {
      switch (this.state) {
        case "windup":
          // waits for animationcomplete → _jump
          break;

        case "jump":
          if (justLanded) {
            this._maybeFlipOnLanding();
            this._startWindup();
          }
          break;

        case "idle":
          if (onFloor) this._startWindup();
          break;
      }
    }

    this._prevOnFloor = onFloor;
  }

  // --- Cathy-style helpers ---
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
