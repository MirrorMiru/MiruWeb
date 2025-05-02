class BadButton extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, type) {
        super(scene, (x * 32) + 16, (y * 32) + 18, "badbutton"); // Use the button texture
        scene.add.existing(this);
        scene.physics.add.existing(this, true); // Make the button a static physics object

        this.setScale(1); // Scale the button as needed

        // Set custom hitbox size and offset if needed
        this.body.setSize(27, 18); // Adjust the width and height as needed
        this.body.setOffset(3, 14); // Adjust the offset as needed

        this.isPressed = false; // Track the button's pressed state
        this.type = type; // Store the type of button

        // Set the initial frame based on the button type
            this.setFrame(0); // Initial frame for press (red button)
        
    }

    static loadAnimations(scene) {
        // Add button press animation
        scene.anims.create({ key: "pressbad", frames: scene.anims.generateFrameNumbers("badbutton", { start: 0, end: 1 }), frameRate: 10, repeat: 0 });
    }

    press() {
        if (!this.isPressed) {
            this.isPressed = true;
            this.setFrame(1);
  
            // Add any additional logic for when the button is pressed
        }
    }

    release() {
        if (this.isPressed) {
            this.isPressed = false;
                this.setFrame(0); // Reset to the initial frame for press    
            // Add any additional logic for when the button is released
        }
    }

    update(game) {
        // The button doesn't need to update its position or velocity
        if ((this.type === 2) && !game.physics.overlap(game.melody, this) && !game.physics.overlap(game.ella, this)) {
            this.release();
        }
    }
}

export default BadButton;