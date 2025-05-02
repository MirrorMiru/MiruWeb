class Imp extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x * 32 + 16, y * 32 + 16, "imp");
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(1);
        this.body.setSize(8, 27);
        this.body.setOffset(12, 4);
        this.setVelocity(0);
        this.speed = 60;
        this.facing = "right";
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);
    }

    static loadAnimations(scene) {
        scene.anims.create({
            key: "walk_left_imp",
            frames: scene.anims.generateFrameNumbers("imp", { start: 0, end: 9 }),
            frameRate: 10,
            repeat: -1
        });

        scene.anims.create({
            key: "idle_left_imp",
            frames: [{ key: "imp", frame: 3 }],
            frameRate: 1
        });

        scene.anims.create({
            key: "walk_right_imp",
            frames: scene.anims.generateFrameNumbers("imp", { start: 10, end: 19 }),
            frameRate: 10,
            repeat: -1
        });

        scene.anims.create({
            key: "idle_right_imp",
            frames: [{ key: "imp", frame: 13 }],
            frameRate: 1
        });
    }

    update(playerA, playerB) {
        const midpointX = (playerA.x + playerB.x) / 2;
        const direction = midpointX - this.x;

        if (Math.abs(direction) > 2) {
            this.setVelocityX(this.speed * Math.sign(direction));
        } else {
            this.setVelocityX(0);
        }

        const vx = this.body.velocity.x;

        if (vx < 0) {
            this.facing = "left";
            this.play("walk_left_imp", true);
        } else if (vx > 0) {
            this.facing = "right";
            this.play("walk_right_imp", true);
        } else {
            this.play(this.facing === "left" ? "idle_left_imp" : "idle_right_imp", true);
        }
    }

}

export default Imp;