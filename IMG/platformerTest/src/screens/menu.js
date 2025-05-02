class Menu extends Phaser.Scene {
    constructor() {
        super("menu");
        this.transitioning = false;
    }

    create() {
        // Scrolling background
        this.transitioning = false;
        this.scene.get('OSTManager').crossfadeTo('menu', 1000);
        this.scrollbg = this.add.tileSprite(400, 300, 800, 600, 'scrollbg2').setOrigin(0.5, 0.5).setAlpha(0.5);

        // Static character image
        this.char = this.add.image(400, 300, 'charNEW').setOrigin(0.5, 0.5);
        // Bouncing logo
        this.logo = this.add.image(400, 300, 'logo').setOrigin(0.5, 0.5);
        this.tweens.add({
            targets: this.logo,
            y: 350,
            duration: 2000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    
        const textStyle = {
            fontSize: "25px",
            fill: "#000000",
            fontStyle: "bold", // Make text bold
            stroke: "#ffffff", // Add white outline
            strokeThickness: 3 // Thickness of the outline
        };
    
        // Text prompts
        this.add.text(20, 400, "[S]tart Game",textStyle);
        this.add.text(20, 450, "[L]evel Select", textStyle);
        this.add.text(20, 500, '[O]ptions',textStyle);
        // in MenuScene.create()

        // Input listeners
        this.input.keyboard.on("keydown-S", () => {
            if(!this.transitioning){
            this.sound.play('ui');
            this.transitioning = true;
            this.cameras.main.fadeOut(500);
            this.time.delayedCall(500, () => {
                this.scene.start('Cutscene', {
                    priorScene: 'menu',           // whatever scene you’re cutting from
                    nextScene:  'l1',         // where to go when done
                    text: [
                      "The African kingdom of Nuji, know for its expansive silver mines and intricate metallurgical arts, has come under siege by a rouge force of demons.",
                      "An army of imps, led by the powerful demon sorcerer Ignis has brought the kingdom to its knees.",
                      "The ruling princess of Nuji has made her way north, across continents to the strongest kingdom of Europe, Cadence.",
                      "\n",
                      "Ella, princess of Nuji, begs Melody, princess of Cadence for help to save her kingdom.",
                      "Together they must venture south, and defeat the demon sorcerer Ignis.",
                      "\n",
                      "\n",
                      "\n",
                      "Use W A D to control Ella and the arrow keys to control Melody.",
                      "You must press all red and blue buttons to activate the portal and move on to the next level.",
                      "Yellow and purple buttons modify terrain",
                      "Boxes can be pushed and hold down buttons.",
                      "Press ESC to pause the game, there is a HINT in the pause menu.",
                      "Don't be afraid to use the hint!",
                      "Press R if you get stuck to reset the level.",
                      "Good luck and safe travels!",
                    ]
                  });
            });
        }
        });

        this.input.keyboard.on('keydown-O', () => {
            this.sound.play('ui');
            this.scene.start('Options');
          });

        this.input.keyboard.on("keydown-L", () => {
            if(!this.transitioning){
                this.transitioning = true;
            this.sound.play('ui');
            this.cameras.main.fadeOut(250);
            this.time.delayedCall(250, () => {
                this.scene.start("levelText", {
                    text1: "no time to wait",
                    text2: "lets continue our journey!",
                    text3: "LEVEL SELECTOR!",
                    nextScene: "select",
                    priorScene: "menu"
                });
            });
        }
        });

        this.cameras.main.fadeIn(500);
    }

    update() {

            this.scrollbg.tilePositionX -= 1;
        
    }
}

export default Menu;
