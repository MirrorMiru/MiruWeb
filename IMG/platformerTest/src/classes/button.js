class Button extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, type) {
        super(scene, (x * 32) + 16, (y * 32) + 16, "button"); // Use the button texture
        scene.add.existing(this);
        scene.physics.add.existing(this, true); // Make the button a static physics object

        this.setScale(1); // Scale the button as needed

        // Set custom hitbox size and offset if needed
        this.body.setSize(32, 16); // Adjust the width and height as needed
        this.body.setOffset(0, 16); // Adjust the offset as needed

        this.isPressed = false; // Track the button's pressed state
        this.type = type; // Store the type of button

        this.scene = scene;

            this.setFrame(this.type-1); // Initial frame for pressB (blue button)

             this.light = scene.lights.addLight(this.x, this.y, 100)
            .setColor(0xffffff)
            .setIntensity(0.3);

            this.setPipeline('Light2D'); // Enable lighting for the button sprite
    }

    press() {
        if (!this.isPressed) {
            this.setFrame(4);
            this.isPressed = true;
            this.light.setColor(0x00ff66).setIntensity(0.5);
            if(this.type == 1 || this.type == 2){
                this.scene.sound.play("button1");
            }else{
                this.scene.sound.play("button2");
            }
            // Add any additional logic for when the button is pressed
        }
    }

    release() {
        if (this.isPressed) {
            this.setFrame(this.type-1);
            this.isPressed = false;
            this.light.setColor(0xffffff).setIntensity(0.3);
            // Add any additional logic for when the button is released
        }
    }

    update(game) {
        // The button doesn't need to update its position or velocity
        if ((this.type === 2||this.type===3) && !game.physics.overlap(game.melody, this) && !game.physics.overlap(game.ella, this) && !game.physics.overlap(game.blocks, this)) {
            this.release();
        }
    }
}

export default Button;