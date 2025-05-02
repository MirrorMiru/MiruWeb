class Beastman extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, leftBound, rightBound, type) {
        super(scene, x * 32 + 16, y * 32 + 16, `beastman${type}`);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(1);
        this.body.setSize(27, 18);
        this.body.setOffset(0, 14);
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);

        this.leftBound = leftBound * 32 + 16;
        this.rightBound = rightBound * 32 + 16;
        
        this.type = type;
        this.isIdle = false;
        this.lastDirection = 1;
        this.randomWalk();

        
        this.beastLight = scene.lights.addLight(this.x, this.y, 100)
            .setColor(0xffffff)
            .setIntensity(0.45);
    }

    static loadAnimations(scene) {
        for (let i = 1; i <= 3; i++) {
            scene.anims.create({
                key: `beastmanWalk${i}`,
                frames: scene.anims.generateFrameNumbers(`beastman${i}`, { start: 0, end: 8 }),
                frameRate: 10,
                repeat: -1
            });
            scene.anims.create({
                key: `beastmanIdle${i}`,
                frames: [{ key: `beastman${i}`, frame: 3 }],
                frameRate: 1,
                repeat: -1
            });
        }
    }

    randomWalk() {
        this.isIdle = Math.random() < 0.5; 
        if (this.isIdle) {
            this.body.setVelocityX(0);
            this.setFlipX(this.lastDirection > 0);
            this.play(`beastmanIdle${this.type}`);
        } else {
            this.lastDirection = Math.random() < 0.5 ? -1 : 1;
            this.body.setVelocityX(this.lastDirection * 50);
            this.setFlipX(this.lastDirection > 0);
            this.play(`beastmanWalk${this.type}`);
        }

        this.scene.time.delayedCall(Phaser.Math.Between(1000, 3500), () => this.randomWalk(), [], this);
    }

    update() {
        this.beastLight.setPosition(this.x, this.y);
        if (this.x <= this.leftBound && this.body.velocity.x < 0) {
            this.body.setVelocityX(50);
            this.setFlipX(true);
            this.lastDirection = 1;
        } else if (this.x >= this.rightBound && this.body.velocity.x > 0) {
            this.body.setVelocityX(-50);
            this.setFlipX(false);
            this.lastDirection = -1;
        }
    }
}

export default Beastman;
