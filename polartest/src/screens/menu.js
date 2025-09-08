class Menu extends Phaser.Scene {
    constructor() {
        super("menu");
        this.transitioning = false;
    }

    create() {
        // Scrolling background
        this.transitioning = false;
       // this.scene.get('OSTManager').crossfadeTo('menu', 1000);
                this.scrollbg = this.add.tileSprite(800, 600, 1600*2, 1200*2, 'scrollbg3').setOrigin(0.5, 0.5).setAlpha(0.5);

        // Static character image
        this.char = this.add.image(400*2, 300*2, 'char').setOrigin(0.5, 0.5).setScale(2);
        // Bouncing logo
        this.logo = this.add.image(400*2, 300*2, 'logo').setOrigin(0.5, 0.5).setScale(2);
        this.tweens.add({
            targets: this.logo,
            y: 350*2,
            duration: 2000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    
        const textStyle = {
            fontSize: "60px",
            fill: "#000000",
            fontStyle: "bold",
            stroke: "#ffffff",
            strokeThickness: 3
        };
        
        // Start Game Text
        const startText = this.add.text(40, 400*2, "[S]tart DEMO", textStyle)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                this.input.keyboard.emit('keydown-S'); // Trigger existing key event
            });
        
        // Level Select Text
        // const levelSelectText = this.add.text(20, 450, "[L]evel Select", textStyle)
        //     .setInteractive({ useHandCursor: true })
        //     .on('pointerdown', () => {
        //         this.input.keyboard.emit('keydown-L');
        //     });
        
        // Options Text
        const optionsText = this.add.text(40, 500*2, "[O]ptions", textStyle)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                this.input.keyboard.emit('keydown-O');
            });
        

        // Input listeners
        this.input.keyboard.on("keydown-S", () => {
                      if(!this.transitioning){
                this.transitioning = true;
            }
           // this.sound.play('ui');
              this.add.tween({
                targets: fxCamera,
                duration: 700,
                amount: 40,
                onComplete: () => {
                    this.cameras.main.fadeOut(100);
                   this.scene.start("levelText", {
                    text1: "",
                    text2: "",
                    text3: "DEMO LEVEL",
                    nextScene: "lt",
                    priorScene: "menu"
                });
                }
        });
        });

        this.input.keyboard.on('keydown-O', () => {
           // this.sound.play('ui');
            this.scene.start('Options');
          });

        this.input.keyboard.on("keydown-L", () => {
            if(!this.transitioning){
                this.transitioning = true;
            }
           // this.sound.play('ui');
              this.add.tween({
                targets: fxCamera,
                duration: 700,
                amount: 40,
                onComplete: () => {
                    this.cameras.main.fadeOut(100);
                    this.scene.start('lt');
                }
        });
            });


        this.cameras.main.fadeIn(500);
         const fxCamera = this.cameras.main.postFX.addPixelate(40);
        this.add.tween({
            targets: fxCamera,
            duration: 700,
            amount: -1,
        });
    }

    
    update() {

            this.scrollbg.tilePositionX -= 0.5;
            this.scrollbg.tilePositionY -= 0.5;


        
    }
}

export default Menu;
