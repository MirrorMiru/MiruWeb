import Button from "./button.js";

class DemonQueen extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x * 32 + 16, y * 32 + 32, "queen");
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Boss physics setup
        this.setScale(1);
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);
        this.setVelocity(0);

        this.theScene = scene;
        this.timer = 0;
        this.phase = 1;
        this.defeatedf = false;
        this.takingDamage = false;

        this.health = 3;
        this.spearCount = 10;
        this.attacking = false;
        this.attackIndicators = [];
        this.tilePositions = [];
        this.spears = [];
        this.play("idle_queen");

        this.attackCount = 0;
        this.buttons = [];
        this.buttonsActive = false;
        this.playersOnButtons = [false, false];
    }

    static loadAnimations(scene) {
        if (!scene.anims.exists("idle_queen")) {
            scene.anims.create({
                key: "idle_queen",
                frames: scene.anims.generateFrameNumbers("queen", { start: 0, end: 3 }),
                frameRate: 5,
                repeat: -1
            });
        }
        if (!scene.anims.exists("raise_hand")) {
            scene.anims.create({
                key: "raise_hand",
                frames: scene.anims.generateFrameNumbers("queen", { start: 5, end: 13 }),
                frameRate: 10,
                repeat: 0
            });
        }
        if (!scene.anims.exists("lower_hand")) {
            scene.anims.create({
                key: "lower_hand",
                frames: scene.anims.generateFrameNumbers("queen", { start: 15, end: 22 }),
                frameRate: 10,
                repeat: 0
            });
        }
        if (!scene.anims.exists("attack_queen")) {
            scene.anims.create({
                key: "attack_queen",
                frames: scene.anims.generateFrameNumbers("queen", { start: 24, end: 27 }),
                frameRate: 5,
                repeat: -1
            });
        }
        if (!scene.anims.exists("hurt_queen")) {
            scene.anims.create({
                key: "hurt_queen",
                frames: scene.anims.generateFrameNumbers("queen", { start: 29, end: 34 }),
                frameRate: 5,
                repeat: -1
            });
        }
        if (!scene.anims.exists("defeated_queen")) {
            scene.anims.create({
                key: "defeated_queen",
                frames: scene.anims.generateFrameNumbers("queen", { start: 41, end: 44 }),
                frameRate: 3,
                repeat: -1
            });
        }
        if (!scene.anims.exists("attack_indicator")) {
            scene.anims.create({
                key: "attack_indicator",
                frames: scene.anims.generateFrameNumbers("queen", { start: 37, end: 40 }),
                frameRate: 10,
                repeat: -1
            });
        }
    }

    startAttack(scene, xmin, xmax) {
        if (this.attacking || this.health <= 0 || this.defeatedf || this.takingDamage) return;
        this.attacking = true;
        this.phase = 0;
        this.play("raise_hand", true);
        this.attackCount++;

        this.tilePositions = [];
        for (let i = 0; i < this.spearCount; i++) {
            const tx = Phaser.Math.Between(xmin, xmax);
            const ty = scene.map.heightInPixels - (4 * 32);
            this.tilePositions.push({ x: tx, y: ty });
        }
        this.showAttackWarnings(scene, this.tilePositions);

        scene.time.delayedCall(1000, () => {
            if (this.takingDamage || this.defeatedf) return;
            this.dropSpears(scene, this.tilePositions);
            this.play("attack_queen", true);

            scene.time.delayedCall(500, () => {
                if (this.takingDamage || this.defeatedf) return;
                this.play("lower_hand", true);

                scene.time.delayedCall(800, () => {
                    if (this.takingDamage || this.defeatedf) return;
                    this.phase = 1;
                    this.attacking = false;
                    this.timer = 0;
                    this.play("idle_queen", true);

                    if (this.attackCount >= 3 && !this.buttonsActive) {
                        this.spawnButtons(scene, xmin, xmax);
                    }
                });
            });
        });
    }

    spawnButtons(scene, xmin, xmax) {
        this.buttonsActive = true;
        this.theScene.sound.play("twinkle");
        // generate full range of possible X positions
        const range = [];
        for (let i = xmin; i <= xmax; i++) range.push(i);
        const positions = Phaser.Utils.Array.Shuffle(range).slice(0, 2);
        const y = 22;

        // clear old buttons
        this.buttons.forEach(b => b.destroy());
        this.buttons = positions.map(x => new Button(scene, x, y, 3));
        scene.buttons.push(...this.buttons);
        this.playersOnButtons = [false, false];

        // register overlaps for both players & each button
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
        this.play("hurt_queen", true);
        this.attackIndicators.forEach(i => i.destroy());
        this.attackIndicators = [];
        this.spears.forEach(s => s.destroy());
        this.spears = [];

        this.theScene.time.delayedCall(1500, () => {
            this.takingDamage = false;
            if (this.health <= 0) this.defeatedQueen();
            else {
                this.play("idle_queen", true);
                this.attackCount = 0;
                this.timer = 0;
                this.phase = 1;
            }
        });
    }

    showAttackWarnings(scene, tilePositions) {
        tilePositions.forEach(pos => {
            const indicator = scene.add.sprite(pos.x * 32 + 16, pos.y, "queen");
            indicator.play("attack_indicator");
            this.attackIndicators.push(indicator);
            scene.time.delayedCall(1000, () => indicator.destroy());
        });
    }

    onSpearHit(player, spear) {
        spear.destroy();
        this.spears = this.spears.filter(s => s !== spear);
        player.body.checkCollision.none = true;
        player.knockback(0, -300, 1000);
        player.isWalking = false;
        player.setDepth(9999);
        this.theScene.cameras.main.shake(150, 0.01);
        this.theScene.sound.play("hurt");
    }

    dropSpears(scene, tilePositions) {
        scene.sound.play("boss1");
        this.spears.forEach(s => s.destroy());
        this.spears = [];

        tilePositions.forEach(target => {
            const spear = scene.physics.add.sprite(
                target.x * 32 + 16,
                0,
                "queen",
                36
            ).setPipeline("Light2D");

            spear.body.setSize(5, 55);
            spear.body.setOffset(30, 5);
            spear.body.setGravityY(300);
            spear._hasLanded = false;

            // once it hits ground, stop and fade
            scene.physics.add.collider(spear, scene.front2, r => {
                if (!r._hasLanded && r.body.blocked.down) {
                    r._hasLanded = true;
                    r.setVelocity(0);
                    r.body.allowGravity = false;

                    scene.tweens.add({
                        targets: r,
                        alpha: 0,
                        delay: 250,
                        duration: 250,
                        onComplete: () => {
                            r.destroy();
                            this.spears = this.spears.filter(s => s !== r);
                        }
                    });
                }
            });

            [scene.melody, scene.ella].forEach(player => {
                scene.physics.add.overlap(player, spear, () => this.onSpearHit(player, spear));
            });

            this.spears.push(spear);
        });
    }

    defeatedQueen() {
        this.defeatedf = true;
        this.attacking = false;
        this.takingDamage = false;
        this.anims.stop();
        this.play("defeated_queen", true);
    }

    update(scene) {
        if (this.defeatedf) {
            if (this.anims.currentAnim.key !== "defeated_queen") this.play("defeated_queen", true);
            return;
        }
        if (this.takingDamage) {
            if (this.anims.currentAnim.key !== "hurt_queen") this.play("hurt_queen", true);
            return;
        }
        if (this.health <= 0 || this.attacking) return;

        if (this.theScene.attackTriggered) {
            this.timer += this.buttonsActive ? 50 : 1;
            if (this.timer >= 150) {
                this.startAttack(scene, 12, 34);
                this.timer = 0;
            }
        } else {
            this.timer = 0;
        }
    }
}

export default DemonQueen;
