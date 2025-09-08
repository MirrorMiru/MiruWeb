class LevelText extends Phaser.Scene {
    constructor() {
        super("levelText");
    }
    create(data) {
        this.cameras.main.fadeIn(250);
        // Add scrollbg3 as a full-screen background image
        const bg = this.add.image(800, 600, "scrollbg2")
            .setOrigin(0.5, 0.5)
            .setDisplaySize(1600, 1200)
            .setAlpha(0.5);
    const textStyle = { fontSize: "60px", fill: "#ffffff", stroke: "#000000", strokeThickness: 6 };
    const text1 = this.add.text(0, 0, data.text1, textStyle);
    const text2 = this.add.text(0, 0, data.text2, textStyle);
    const text3 = this.add.text(0, 0, data.text3, textStyle);

        Phaser.Display.Align.In.Center(text1, this.add.zone(400*2, 300, 800*2, 20));
        Phaser.Display.Align.In.Center(text2, this.add.zone(400*2, 340, 800*2, 20));
        Phaser.Display.Align.In.Center(text3, this.add.zone(400*2, 150, 800*2, 40));

        this.time.delayedCall(2000, () => {
            this.scene.stop(data.priorScene);
            this.scene.start(data.nextScene);
        });
    }
}

export default LevelText;