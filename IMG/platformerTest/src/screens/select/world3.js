class World3 extends Phaser.Scene {
    constructor() {
        super("world3");
    }

    create() {
        const textStyle = {
            fontSize: "25px",
            fill: "#000000",
            fontStyle: "bold", // Make text bold
            stroke: "#ffffff", // Add white outline
            strokeThickness: 3 // Thickness of the outline
        };

        this.add.image(400, 300, 'scrollbg1').setOrigin(0.5, 0.5);
        this.cameras.main.fadeIn(500);

        this.add.image(400, 300, 'mapbasedemon').setOrigin(0.5, 0.5).setDisplaySize(800, 600);

        const mapLabel = this.add.image(400, 300, 'maplabledemon').setOrigin(0.5, 0.5).setAlpha(0);

        // Create arrow image once, hidden
        const arrow = this.add.image(0, 0, 'arrow1c')
            .setOrigin(0.5, 1)
            .setVisible(false);

      

        const goToLevel = (text1, text2, text3, nextScene) => {
            this.cameras.main.fadeOut(500);
            this.time.delayedCall(500, () => {
                this.scene.start("levelText", {
                    text1,
                    text2,
                    text3,
                    nextScene,
                    priorScene: "select"
                });
            });
        };

        const hotspots = [
            {
                x: 430, y: 60, width: 80, height: 80,
                level: "l7",
                text2: "Level 1: Abandoned Campsite"
            },
            {
                x: 440, y: 250, width: 80, height: 80,
                level: "l8",
                text2: "Level 2: Monster Village"
            },
            {
                x: 310, y: 270, width: 80, height: 80,
                level: "l9",
                text2: "Level 3: Royal Hall of the Daemon Queen"
            }
        ];
        
        
        
    
    hotspots.forEach(hotspot => {
        this.add.rectangle(hotspot.x, hotspot.y, hotspot.width, hotspot.height, 0x000000, 0)
            .setInteractive()
            .on('pointerover', () => {
                this.tweens.add({
                    targets: mapLabel,
                    alpha: 1,
                    duration: 200,
                    ease: 'Linear'
                });
                arrow.setPosition(hotspot.x, hotspot.y - hotspot.height / 2 + 10);
                arrow.setVisible(true);
            })
            .on('pointerout', () => {
                this.tweens.add({
                    targets: mapLabel,
                    alpha: 0,
                    duration: 200,
                    ease: 'Linear'
                });
                arrow.setVisible(false);
            })
            .on('pointerdown', () => {
                arrow.setVisible(false);
                this.sound.play('ui');
                this.scene.get('OSTManager').crossfadeTo('world3', 300);
                goToLevel("World 3: Monster Territories", hotspot.text2, "SELECTED!", hotspot.level);
            });
    });

    this.add.text(20, 20, "Press Escape to Exit",textStyle);

    this.input.keyboard.on("keydown-ESC", () => { this.scene.start("select");            this.sound.play('ui');});
    
    }
}

export default World3;
