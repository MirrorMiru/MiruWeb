class Ella extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "player2");
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.scene = scene;
        this.setScale(1);
        this.play("idle2");
        this.isWalking = false;

        // adjust body size & offset
        this.body.setSize(8, 27);
        this.body.setOffset(12, 4);

        // input keys
        this.cursors = scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });

        // knockback flag
        this.knockbackActive = false;

        // prepare a looping walk sound (key "walking" must already be preloaded)
        this.walkSound = this.scene.sound.add("walking", {
            loop: true,
            volume: 0.3
        });
    }

    static loadAnimations(scene) {
        scene.anims.create({
            key: "walk_left2",
            frames: scene.anims.generateFrameNumbers("player2", { start: 0, end: 9 }),
            frameRate: 12,
            repeat: -1
        });
        scene.anims.create({
            key: "walk_right2",
            frames: scene.anims.generateFrameNumbers("player2", { start: 11, end: 20 }),
            frameRate: 12,
            repeat: -1
        });
        scene.anims.create({
            key: "idle2",
            frames: scene.anims.generateFrameNumbers("player2", { start: 22, end: 25 }),
            frameRate: 2,
            repeat: -1
        });
        scene.anims.create({ key: "jump_left2", frames: [{ key: "player2", frame: 32 }] });
        scene.anims.create({ key: "jump_right2", frames: [{ key: "player2", frame: 34 }] });
        scene.anims.create({ key: "jump_front2", frames: [{ key: "player2", frame: 33 }] });
    }

    knockback(velocityX, velocityY) {
        this.setVelocity(velocityX, velocityY);
        this.scene.sound.play("woosh");
        this.knockbackActive = true;
    }

    update() {
        // 1) Handle ongoing knockback/jump state
        if (this.knockbackActive) {
            this.isWalking = false;
            this.walkSound.stop();
            if (this.body.blocked.down) {
                this.knockbackActive = false;
            } else {
                // still in air from knockback
                if (this.body.velocity.x < 0) this.play("jump_left2", true);
                else if (this.body.velocity.x > 0) this.play("jump_right2", true);
                else this.play("jump_front2", true);
                return;
            }
        }

        // 2) Determine if Ella is walking on the ground
        this.isWalking = (this.cursors.left.isDown || this.cursors.right.isDown)
                          && this.body.blocked.down;

        // start/stop the looping walk sound
        if (this.isWalking) {
            if (!this.walkSound.isPlaying) {
                this.walkSound.play();
            }
        } else {
            if (this.walkSound.isPlaying) {
                this.walkSound.stop();
            }
        }

        // 3) Horizontal movement & corresponding animations
        if (this.cursors.left.isDown) {
            this.setVelocityX(-120);
            if (this.body.blocked.down) {
                this.play("walk_left2", true);
            } else {
                this.play("jump_left2", true);
            }
        } else if (this.cursors.right.isDown) {
            this.setVelocityX(120);
            if (this.body.blocked.down) {
                this.play("walk_right2", true);
            } else {
                this.play("jump_right2", true);
            }
        } else {
            this.setVelocityX(0);
            if (this.body.blocked.down) {
                this.play("idle2", true);
            } else {
                this.play("jump_front2", true);
            }
        }

        // 4) Jump input
        if (Phaser.Input.Keyboard.JustDown(this.cursors.up) && this.body.blocked.down) {
            this.setVelocityY(-300);
            this.scene.sound.play("jumpe");
            const jumpAnim = this.cursors.left.isDown
                ? "jump_left2"
                : this.cursors.right.isDown
                ? "jump_right2"
                : "jump_front2";
            this.play(jumpAnim, true);
        }
        if (Phaser.Input.Keyboard.JustUp(this.cursors.up) && this.body.velocity.y < 0) {
            this.setVelocityY(this.body.velocity.y * 0.6);
        }
    }
}

export default Ella;
