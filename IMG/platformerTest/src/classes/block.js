class Block extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        // --- Dynamic Block (31x31) ---
        super(scene, (x * 32) + 16, (y * 32) + 16, "block");
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Dynamic body setup
        this.setScale(1);
        this.body.setSize(31, 31);
        this.body.setOffset(0, 0);

        this.body.setImmovable(false);
        this.body.setAllowGravity(true);
        this.body.setGravityY(300);
        this.body.setDrag(500);
        this.body.pushable = true;

        // --- Static Core (25x25), centered with 3px margin ---
        this.staticCore = scene.physics.add.staticImage(this.x, this.y, null);
        this.staticCore.displayWidth = 26;
        this.staticCore.displayHeight = 26;
        this.staticCore.setVisible(false);
        this.staticCore.body.setSize(26, 26);

        // --- Static Top Platform (29x2), 1px above dynamic block ---
        this.staticTop = scene.physics.add.staticImage(this.x, this.y - 16, null); // placeholder
        this.staticTop.displayWidth = 29;
        this.staticTop.displayHeight = 1;
        this.staticTop.setVisible(false);
        this.staticTop.body.setSize(29, 1);

        // Lighting
        this.setPipeline('Light2D');
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta); // important to keep animation & physics updates

        // Always keep static core perfectly centered
        this.staticCore.setPosition(this.x, this.y);
        this.staticCore.body.updateFromGameObject();

        // Keep static platform 1px above the dynamic block
        this.staticTop.setPosition(this.x, this.y - (this.body.height / 2) - 1);
        this.staticTop.body.updateFromGameObject();
    }

    update() {
        // Frame animation logic (optional)
        if (this.body.velocity.y < 0) {
            this.setFrame(0);
        } else if (this.body.velocity.x > 0) {
            this.setFrame(1);
        } else if (this.body.velocity.y > 0) {
            this.setFrame(2);
        } else if (this.body.velocity.x < 0) {
            this.setFrame(3);
        }
    }
}

export default Block;
