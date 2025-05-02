class Select extends Phaser.Scene {
    constructor() {
        super("select");
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
        
        this.add.image(400, 300, 'mapbase').setOrigin(0.5, 0.5);
      

        
        const countries = {
            cadanceo: this.add.image(400, 300, 'cadanceo').setOrigin(0.5, 0.5),
            outskirtso: this.add.image(400, 300, 'outskirtso').setOrigin(0.5, 0.5),
            territoryo: this.add.image(400, 300, 'territoryo').setOrigin(0.5, 0.5),
            egypto: this.add.image(400, 300, 'egypto').setOrigin(0.5, 0.5),
            jungleo: this.add.image(400, 300, 'jungleo').setOrigin(0.5, 0.5),
            nujio: this.add.image(400, 300, 'nujio').setOrigin(0.5, 0.5)
        };
        
        const mapLabel = this.add.image(400, 300, 'maplable').setOrigin(0.5, 0.5).setAlpha(0);

        const hotspots = [
            { x: 220, y: 190, width: 130, height: 90, country: 'cadanceo', scene: 'world1' },
            { x: 320, y: 200, width: 50, height: 50, country: 'outskirtso', scene: 'world2' },
            { x: 320, y: 270, width: 70, height: 90, country: 'territoryo', scene: 'world3' },
            { x: 350, y: 340, width: 50, height: 50, country: 'territoryo', scene: 'world3' },
            { x: 270, y: 340, width: 50, height: 70, country: 'egypto', scene: 'world4' },
            { x: 220, y: 300, width: 50, height: 50, country: 'egypto', scene: 'world4' },
            { x: 320, y: 375, width: 50, height: 25, country: 'egypto', scene: 'world4' },
            { x: 230, y: 400, width: 90, height: 50, country: 'jungleo', scene: 'world5' },
            { x: 200, y: 350, width: 60, height: 50, country: 'jungleo', scene: 'world5' },
            { x: 250, y: 470, width: 110, height: 65, country: 'nujio', scene: 'world6' }
        ];
        
        hotspots.forEach(hotspot => {
            let box = this.add.rectangle(hotspot.x, hotspot.y, hotspot.width, hotspot.height, 0x000000, 0)
                .setInteractive()
                .on('pointerover', () => {
                    countries[hotspot.country].setVisible(false);
                    this.tweens.add({
                        targets: mapLabel,
                        alpha: 1,
                        duration: 200,
                        ease: 'Linear'
                    });
                    
                })
                .on('pointerout', () => {
                    countries[hotspot.country].setVisible(true);
                    this.tweens.add({
                        targets: mapLabel,
                        alpha: 0,
                        duration: 200,
                        ease: 'Linear'
                    });
                })
                .on('pointerdown', () => {this.scene.start(hotspot.scene);    this.sound.play('ui');});
        });
        this.add.text(20, 20, "Press Escape to Exit",textStyle);

        this.add.text(350, 550, "Click on Country to Select",textStyle);

        this.input.keyboard.on("keydown-ESC", () => { this.scene.start("menu");            this.sound.play('ui');});
    }

    
}

export default Select;
