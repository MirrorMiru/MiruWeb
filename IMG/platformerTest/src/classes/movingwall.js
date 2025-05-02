class MovingWall {
    constructor(scene, x, yStart, yEnd, speed, textureKey = 'wall') {
        this.scene = scene;
        this.x = x;
        this.yStart = yStart;
        this.yEnd = yEnd;
        this.speed = speed;
        this.active = false;

        this.wallSprites = [];
        for (let y = yStart; y <= yEnd; y += 32) {
            const wall = scene.physics.add.staticSprite(x, y + 16, textureKey);
            wall.setOrigin(0, 0.5);
            wall.setPipeline('Light2D');
            this.wallSprites.push(wall);
        }

        this.knockedBack1 = false;
        this.knockedBack2 = false;

        this.collider1 = scene.physics.add.overlap(scene.melody, this.wallSprites, () => this.hit(0));
        this.collider2 = scene.physics.add.overlap(scene.ella, this.wallSprites, () => this.hit(1));
    }

    hit(key) {
        const player = key === 0 ? this.scene.melody : this.scene.ella;
        if ((key === 0 && !this.knockedBack1) || (key === 1 && !this.knockedBack2)) {
            player.knockback(player.body.velocity.x / 2, -200, 1000);
            this.scene.sound.play('hurt');
            this.scene.cameras.main.shake(150, 0.01);
            player.body.checkCollision.none = true;
            player.setDepth(99999);
            if (key === 0) this.knockedBack1 = true;
            else this.knockedBack2 = true;
        }
    }

    update() {
        if (!this.active) return;
        this.x += this.speed;
        for (const wall of this.wallSprites) {
            wall.x += this.speed;
            wall.body.updateFromGameObject();
        }
    }

    start() {
        this.active = true;
    }

    stop() {
        this.active = false;
    }
}

export default MovingWall;
