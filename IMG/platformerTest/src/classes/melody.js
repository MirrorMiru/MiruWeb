class Melody extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "player");
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(1);
        this.play("idle");

        this.sceneglobal = scene;
        this.isWalking = false;
        this.body.setSize(8, 27);
        this.body.setOffset(12, 4);

        this.cursors = scene.input.keyboard.createCursorKeys();
        this.knockbackActive = false;

        // prepare a looping walk sound (key "walking" must already be preloaded)
        this.walkSound = this.sceneglobal.sound.add("walking", {
            loop: true,
            volume: 0.3
        });
    }

    static loadAnimations(scene) {
        scene.anims.create({
            key: "walk_left",
            frames: scene.anims.generateFrameNumbers("player", { start: 0, end: 9 }),
            frameRate: 12,
            repeat: -1
        });
        scene.anims.create({
            key: "walk_right",
            frames: scene.anims.generateFrameNumbers("player", { start: 11, end: 20 }),
            frameRate: 12,
            repeat: -1
        });
        scene.anims.create({
            key: "idle",
            frames: scene.anims.generateFrameNumbers("player", { start: 22, end: 25 }),
            frameRate: 2,
            repeat: -1
        });
        scene.anims.create({ key: "jump_left", frames: [{ key: "player", frame: 32 }] });
        scene.anims.create({ key: "jump_right", frames: [{ key: "player", frame: 34 }] });
        scene.anims.create({ key: "jump_front", frames: [{ key: "player", frame: 33 }] });
    }

    knockback(velocityX, velocityY) {
        this.setVelocity(velocityX, velocityY);
        this.sceneglobal.sound.play("woosh");
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
                if (this.body.velocity.x < 0) this.play("jump_left", true);
                else if (this.body.velocity.x > 0) this.play("jump_right", true);
                else this.play("jump_front", true);
                return;
            }
        }

        // 2) Walking sound logic
        this.isWalking = (this.cursors.left.isDown || this.cursors.right.isDown)
                          && this.body.blocked.down;

        if (this.isWalking) {
            if (!this.walkSound.isPlaying) {
                this.walkSound.play();
            }
        } else {
            if (this.walkSound.isPlaying) {
                this.walkSound.stop();
            }
        }

        // 3) Horizontal movement & animations
        if (this.cursors.left.isDown) {
            this.setVelocityX(-120);
            if (this.body.blocked.down) {
                this.play("walk_left", true);
            } else {
                this.play("jump_left", true);
            }
        } else if (this.cursors.right.isDown) {
            this.setVelocityX(120);
            if (this.body.blocked.down) {
                this.play("walk_right", true);
            } else {
                this.play("jump_right", true);
            }
        } else {
            this.setVelocityX(0);
            if (this.body.blocked.down) {
                this.play("idle", true);
            } else {
                this.play("jump_front", true);
            }
        }

        // 4) Jump input
        if (Phaser.Input.Keyboard.JustDown(this.cursors.up) && this.body.blocked.down) {
            this.setVelocityY(-300);
            this.sceneglobal.sound.play("jumpm");
            const anim = this.cursors.left.isDown
                ? "jump_left"
                : this.cursors.right.isDown
                ? "jump_right"
                : "jump_front";
            this.play(anim, true);
        }
        if (Phaser.Input.Keyboard.JustUp(this.cursors.up) && this.body.velocity.y < 0) {
            this.setVelocityY(this.body.velocity.y * 0.6);
        }
    }
}

export default Melody;
