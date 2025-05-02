import Button from "./button.js";

class Wizard extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x * 32 + 16, y * 32 + 32, "wizard");
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(1);
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);
        this.setVelocity(0);

        this.theScene = scene;
        this.timer = 0;
        this.phase = 1;
        this.defeatedf = false;
        this.takingDamage = false;

        this.health = 3;               // Number of hits before defeat
        this.spearCount = 2;           // Initial number of spears dropped
        this.attacking = false;
        this.attackIndicators = [];
        this.tilePositions = [];
        this.spears = [];
        this.play("idle_wizard");    // Start idle animation

        this.attackCount = 0;
        this.buttons = [];
        this.buttonsActive = false;
        this.playersOnButtons = [false, false];

        this.exactX = [17, 18, 19, 23, 24, 25, 29, 30, 31];
    }

    static loadAnimations(scene) {
        if (!scene.anims.exists("idle_wizard")) {
            scene.anims.create({
                key: "idle_wizard",
                frames: scene.anims.generateFrameNumbers("wizard", { start: 0, end: 3 }),
                frameRate: 5,
                repeat: -1
            });
        }
        if (!scene.anims.exists("raise_hand_w")) {
            scene.anims.create({
                key: "raise_hand_w",
                frames: scene.anims.generateFrameNumbers("wizard", { start: 5, end: 13 }),
                frameRate: 10,
                repeat: 0
            });
        }
        if (!scene.anims.exists("lower_hand_w")) {
            scene.anims.create({
                key: "lower_hand_w",
                frames: scene.anims.generateFrameNumbers("wizard", { start: 15, end: 22 }),
                frameRate: 10,
                repeat: 0
            });
        }
        if (!scene.anims.exists("attack_wizard")) {
            scene.anims.create({
                key: "attack_wizard",
                frames: scene.anims.generateFrameNumbers("wizard", { start: 24, end: 27 }),
                frameRate: 5,
                repeat: -1
            });
        }
        if (!scene.anims.exists("hurt_wizard")) {
            scene.anims.create({
                key: "hurt_wizard",
                frames: scene.anims.generateFrameNumbers("wizard", { start: 29, end: 34 }),
                frameRate: 5,
                repeat: -1
            });
        }
        if (!scene.anims.exists("defeated_wizard")) {
            scene.anims.create({
                key: "defeated_wizard",
                frames: scene.anims.generateFrameNumbers("wizard", { start: 41, end: 44 }),
                frameRate: 3,
                repeat: -1
            });
        }
        if (!scene.anims.exists("attack_indicator_w")) {
            scene.anims.create({
                key: "attack_indicator_w",
                frames: scene.anims.generateFrameNumbers("wizard", { start: 37, end: 40 }),
                frameRate: 10,
                repeat: -1
            });
        }
    }

    startAttack(scene) {
        if (this.attacking || this.health <= 0 || this.defeatedf || this.takingDamage) return;
        this.attacking = true;
        this.phase = 0;
        this.play("raise_hand_w", true);
        this.attackCount++;

        this.tilePositions = [];
        for (let i = 0; i < this.spearCount; i++) {
            const tx = Phaser.Utils.Array.GetRandom(this.exactX);
            this.tilePositions.push({ x: tx, y: 13 });
        }

        this.showAttackWarnings(scene, this.tilePositions);

        scene.time.delayedCall(1300, () => {
            if (this.takingDamage || this.defeatedf) return;
            this.dropSpears(scene, this.tilePositions);
            this.play("attack_wizard", true);

            scene.time.delayedCall(500, () => {
                if (this.takingDamage || this.defeatedf) return;
                this.play("lower_hand_w", true);

                scene.time.delayedCall(1300, () => {
                    if (this.takingDamage || this.defeatedf) return;
                    this.phase = 1;
                    this.attacking = false;
                    this.timer = 0;
                    this.play("idle_wizard", true);

                    if (this.attackCount >= 3 && !this.buttonsActive) {
                        this.spawnButtons(scene);
                    }
                });
            });
        });
    }

    spawnButtons(scene) {
        this.buttonsActive = true;
        this.theScene.sound.play("twinkle");
        // Create two distinct button positions via shuffle
        const positions = Phaser.Utils.Array.Shuffle(this.exactX).slice(0, 2);
        this.buttons.forEach(b => b.destroy());
        this.buttons = positions.map(x => new Button(scene, x, 13, 3));
        scene.buttons.push(...this.buttons);
        this.playersOnButtons = [false, false];

        // Optimized overlap registration
        const players = [scene.melody, scene.ella];
        this.buttons.forEach((button, idx) => {
            players.forEach(player => {
                scene.physics.add.overlap(player, button, () => this.pressButton(idx), null, this);
            });
        });
    }

    pressButton(idx) {
        const button = this.buttons[idx];
        if (!button || button.isPressed) return;
        button.press();
        button.update(this.theScene)
        this.playersOnButtons[idx] = true;

        if (this.playersOnButtons.every(v => v)) {
            this.buttons.forEach(b => b.destroy());
            this.buttons = [];
            this.buttonsActive = false;
            this.takeDamage();
            this.attackCount = 0;
        } 
    }

    takeDamage() {
        this.theScene.sound.play("bosshurt");
        if (this.health <= 0 || this.defeatedf) return;
        this.theScene.cameras.main.shake(200, 0.005);
        this.health--;
        this.spearCount++;
        this.attacking = false;
        this.takingDamage = true;

        this.anims.stop();
        this.play("hurt_wizard", true);
        this.attackIndicators.forEach(i => i.destroy());
        this.attackIndicators = [];
        this.spears.forEach(s => s.destroy());
        this.spears = [];

        this.theScene.time.delayedCall(1500, () => {
            this.takingDamage = false;
            if (this.health <= 0) this.defeatedQueen();
            else {
                this.play("idle_wizard", true);
                this.attackCount = 0;
                this.timer = 0;
                this.phase = 1;
            }
        });
    }

    showAttackWarnings(scene, tilePositions) {
        tilePositions.forEach(pos => {
            const indicator = scene.add.sprite(pos.x * 32 + 16, pos.y * 32, "wizard");
            indicator.play("attack_indicator_w");
            this.attackIndicators.push(indicator);
            scene.time.delayedCall(1000, () => indicator.destroy());
        });
    }

    onRockHit(player, rock) {
        rock.destroy();
        this.spears = this.spears.filter(r => r !== rock);
        player.body.checkCollision.none = true;
        player.knockback(0, -300, 1000);
        this.theScene.cameras.main.shake(150, 0.01);
        this.theScene.sound.play("hurt");
        player.setDepth(99999);
        player.isWalking = false;
     //   this.theScene.time.delayedCall(1000, () => { player.body.checkCollision.none = false; });
    }

    dropSpears(scene, tilePositions) {
        scene.sound.play("boss2");
        this.spears.forEach(r => r.destroy());
        this.spears = [];
        tilePositions.forEach(target => {
            const rock = scene.physics.add.sprite(target.x * 32 + 16, 0, "wizard", 36)
                .setPipeline("Light2D");
            rock.body.setCircle(15, 17, 17);
            rock.setBounce(0.6);
            rock.body.setGravityY(300);
            rock._hasKicked = false;
            scene.physics.add.collider(rock, scene.front2, (r) => {
                if (!r._hasKicked && r.body.blocked.down) {
                    r.setVelocityX(Phaser.Math.Between(-100, 100));
                    r._hasKicked = true;
                }
            });
            scene.physics.add.overlap(rock, scene.melody, (r, p) => this.onRockHit(p, r));
            scene.physics.add.overlap(rock, scene.ella,  (r, p) => this.onRockHit(p, r));
            this.spears.push(rock);
            scene.tweens.add({
                targets: rock,
                alpha: 0,
                delay: 2500,
                duration: 500,
                onComplete: () => {
                    if (rock.active) {
                        rock.destroy();
                        this.spears = this.spears.filter(r => r !== rock);
                    }
                }
            });
        });
    }

    defeatedQueen() {
        this.defeatedf = true;
        this.attacking = false;
        this.takingDamage = false;
        this.anims.stop();
        this.play("defeated_wizard", true);
    }

    update(scene) {
        if (this.defeatedf) {
            if (this.anims.currentAnim.key !== "defeated_wizard") this.play("defeated_wizard", true);
            return;
        }
        if (this.takingDamage) {
            if (this.anims.currentAnim.key !== "hurt_wizard") this.play("hurt_wizard", true);
            return;
        }
        if (this.health <= 0 || this.attacking) return;

        if (this.theScene.attackTriggered) {
            if (this.phase === 1) {
                this.timer += this.buttonsActive ? 10 : 1;
            } else {
                this.timer = 0;
            }
            if (this.timer >= 200) {
                this.startAttack(scene);
                this.timer = 0;
            }
        }
    }
}

export default Wizard;
