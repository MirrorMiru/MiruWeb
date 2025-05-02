class World4 extends Phaser.Scene {
    constructor() {
        super("world4");
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

        this.add.image(400, 300, 'mapbaseegypt').setOrigin(0.5, 0.5).setDisplaySize(800, 600);

        const mapLabel = this.add.image(400, 300, 'maplableegypt').setOrigin(0.5, 0.5).setAlpha(0);

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
                x: 400, y: 210, width: 80, height: 80,
                level: "l10",
                text2: "Level 1: Ancient Towers at the City Border"
            },
            {
                x: 420, y: 365, width: 80, height: 80,
                level: "l11",
                text2: "Level 2: Court of the Temple of Anubis"
            },
            {
                x: 290, y: 450, width: 80, height: 80,
                level: "l12",
                text2: "Level 3: Temple of Anubis"
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
                this.scene.get('OSTManager').crossfadeTo('world4', 300);
                goToLevel("World 4: Southern Desert", hotspot.text2, "SELECTED!", hotspot.level);
            });
    });

    this.add.text(20, 20, "Press Escape to Exit",textStyle);

    this.input.keyboard.on("keydown-ESC", () => { this.scene.start("select");            this.sound.play('ui');});
    
    }
}

export default World4;
