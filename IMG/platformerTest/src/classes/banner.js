class Banner extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, (x * 32) + 16, (y * 32) + 32, "banner"); // Use the torch texture
        scene.add.existing(this);
        scene.physics.add.existing(this, true); // Make the torch a static physics object

        this.setScale(1); // Scale the torch as needed

        // Set custom hitbox size and offset if needed
        this.body.setSize(32, 64); // Adjust the width and height as needed
        this.body.setOffset(0, 0); // Adjust the offset as needed
    }

    update() {
        // The torch doesn't need to update its position or velocity
    }
}

export default Banner;