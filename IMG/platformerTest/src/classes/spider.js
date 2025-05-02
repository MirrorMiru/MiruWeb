class Spider extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, leftBound, rightBound) {
        super(scene, x * 32 + 16, y * 32 + 16, "spider");

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(1);
        this.body.setSize(27, 18);
        this.body.setOffset(0, 14);
        this.body.setAllowGravity(false);

        this.body.setImmovable(true);

        this.leftBound = leftBound * 32 + 16;
        this.rightBound = rightBound * 32 + 16;

        this.body.setVelocityX(-50);

        this.play("spiderWalk");
    }

    static loadAnimations(scene) {
        scene.anims.create({
            key: "spiderWalk",
            frames: scene.anims.generateFrameNumbers("spider", { start: 0, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
    }

    update() {
        if (this.x <= this.leftBound && this.body.velocity.x < 0) {
            this.body.setVelocityX(50);
            this.setFlipX(true);
        } else if (this.x >= this.rightBound && this.body.velocity.x > 0) {
            this.body.setVelocityX(-50);
            this.setFlipX(false);
        }
    }

    knockbackPlayer(player) {
        const dir = player.x < this.x ? -1 : 1;
        player.knockback(dir * 300, -300, 1000);
    }
}

export default Spider;
