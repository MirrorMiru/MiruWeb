class Anubis extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x * 32 + 16, y * 32 + 16, "anubis");
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(1);
        this.body.setSize(8, 27);
        this.body.setOffset(12, 4);
        this.setVelocity(0);
        this.speed = 120;
        this.facing = "right";
        this.body.setAllowGravity(true);
    }

    static loadAnimations(scene) {
        scene.anims.create({ key: "walk_left_anubis", frames: scene.anims.generateFrameNumbers("anubis", { start: 0, end: 9 }), frameRate: 10, repeat: -1 });
        scene.anims.create({ key: "idle_left_anubis", frames: [{ key: "anubis", frame: 3 }], frameRate: 1 });
        scene.anims.create({ key: "walk_right_anubis", frames: scene.anims.generateFrameNumbers("anubis", { start: 10, end: 19 }), frameRate: 10, repeat: -1 });
        scene.anims.create({ key: "idle_right_anubis", frames: [{ key: "anubis", frame: 13 }], frameRate: 1 });
        scene.anims.create({ key: "jump_left_anubis", frames: [{ key: "anubis", frame: 1 }] });
        scene.anims.create({ key: "jump_right_anubis", frames: [{ key: "anubis", frame: 12 }] });
    }

    update(playerA, playerB) {
        const playerVelocityX = (playerA.body.velocity.x + playerB.body.velocity.x) / 2;
        const playerVelocityY = (playerA.body.velocity.y + playerB.body.velocity.y) / 2;

        this.setVelocityX(playerVelocityX);

        if (this.body.blocked.down && playerVelocityY < 0) {
                this.setVelocityY(-300);
        }

        if (playerVelocityX < 0) {
            this.facing = "left";
            this.play(this.body.blocked.down ? "walk_left_anubis" : "jump_left_anubis", true);
        } else if (playerVelocityX > 0) {
            this.facing = "right";
            this.play(this.body.blocked.down ? "walk_right_anubis" : "jump_right_anubis", true);
        } else {
            if (!this.body.blocked.down) {
                this.play(this.facing === "left" ? "jump_left_anubis" : "jump_right_anubis", true);
            } else {
                this.play(this.facing === "left" ? "idle_left_anubis" : "idle_right_anubis", true);
            }
        }
    }
}

export default Anubis;
