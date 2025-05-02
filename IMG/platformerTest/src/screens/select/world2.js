class World2 extends Phaser.Scene {
    constructor() {
        super("world2");
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

        this.add.image(400, 300, 'mapbaseoutskirts').setOrigin(0.5, 0.5).setDisplaySize(800, 600);

        const mapLabel = this.add.image(400, 300, 'maplableoutskirts').setOrigin(0.5, 0.5).setAlpha(0);

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
                x: 340, y: 200, width: 80, height: 80,
                level: "l4",
                text2: "Level 1: The Old Mines"
            },
            {
                x: 500, y: 300, width: 80, height: 80,
                level: "l5",
                text2: "Level 2: Old Village in the Abyss"
            },
            {
                x: 450, y: 430, width: 80, height: 80,
                level: "l6",
                text2: "Level 3: The Countryside"
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
                this.scene.get('OSTManager').crossfadeTo('world2', 300);
                goToLevel("World 2: The Outskirts", hotspot.text2, "SELECTED!", hotspot.level);
            });
    });

    this.add.text(20, 20, "Press Escape to Exit",textStyle);

    this.input.keyboard.on("keydown-ESC", () => { this.scene.start("select");            this.sound.play('ui');});
    
    }
}

export default World2;
