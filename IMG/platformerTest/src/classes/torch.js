class Torch extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, (x * 32) + 16, (y * 32) + 16, "torch"); // Use the torch texture
        scene.add.existing(this);
        scene.physics.add.existing(this, true); // Make the torch a static physics object

        this.setScale(1); // Scale the torch as needed

        // Set custom hitbox size and offset if needed
        this.body.setSize(32, 32); // Adjust the width and height as needed
        this.body.setOffset(0, 0); // Adjust the offset as needed

        // Add a light source for the torch
        this.light = scene.lights.addLight(this.x, this.y, 100).setColor(0xffa500).setIntensity(0.5);

        this.setPipeline('Light2D'); // Enable lighting for the torch sprite

        this.particles = scene.add.particles(this.x, this.y-10, 'orange', {
            speedY: { min: -50, max: -100 }, // Particles move upwards
            scale: { start: 0.5, end: 0 },
            blendMode: 'ADD',
            lifespan: 300,
            quantity: 5,
            frequency: 100
          });
    }

    update() {
        // The torch doesn't need to update its position or velocity
    }
}

export default Torch;