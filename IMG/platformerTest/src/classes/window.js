class Window extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, intensity) {
        super(scene, (x * 32) + 16, (y * 32) + 16, "window"); // Use the torch texture
        scene.add.existing(this);
        scene.physics.add.existing(this, true); // Make the torch a static physics object

        this.setScale(1); // Scale the torch as needed

        // Set custom hitbox size and offset if needed
        this.body.setSize(32, 32); // Adjust the width and height as needed
        this.body.setOffset(0, 0); // Adjust the offset as needed

        // Add a light source for the torch
        this.light = scene.lights.addLight(this.x, this.y, 50).setColor(0xffffff).setIntensity(intensity);
    }

    update() {
        // The torch doesn't need to update its position or velocity
    }
}

export default Window;