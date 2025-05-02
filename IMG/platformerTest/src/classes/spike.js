class Spike extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, type, offset) {
        super(scene, (x * 32) + 16, (y * 32) + 16, "spikes"); // Use the button texture
        scene.add.existing(this);
        scene.physics.add.existing(this, true); // Make the button a static physics object

        this.setScale(1); // Scale the button as needed

        // Set custom hitbox size and offset if needed
        this.body.setSize(27, 16); // Adjust the width and height as needed
        this.body.setOffset(3, 16+offset); // Adjust the offset as needed

        // Set the initial frame based on the button type
            this.setFrame(type); // Initial frame for press (red button)
            this.knockedBack1 = false;
            this.knockedBack2 = false;
            scene.physics.add.collider(scene.melody, this, () => this.hit(scene, 0));
            scene.physics.add.collider(scene.ella, this, () => this.hit(scene, 1));
        
    }

    hit(scene, key){
        if (!this.knockedBack1 && key == 0) {
            scene.sound.play('hurt');
            scene.melody.knockback(scene.melody.body.velocity.x/2, -200, 1000);
            scene.cameras.main.shake(150, 0.01);
            scene.melody.body.checkCollision.none = true;
            scene.melody.setDepth(99999);
            scene.melody.isWalking = false;
            this.knockedBack1 = true;
        }

        if (!this.knockedBack2 && key == 1) {
            scene.sound.play('hurt');
            scene.ella.knockback(scene.ella.body.velocity.x/2, -200, 1000);
            scene.cameras.main.shake(150, 0.01);
            scene.ella.body.checkCollision.none =   true;
            scene.ella.isWalking = false;
            scene.ella.setDepth(99999);
            this.knockedBack2 = true;
        }
    }

    movebypixel(xpos,ypos){
        this.body.x += xpos;
        this.body.y += ypos;
        this.x += xpos;
        this.y += ypos;
    }


    update(game) {
        // The button doesn't need to update its position or velocity
 
    }
}

export default Spike;