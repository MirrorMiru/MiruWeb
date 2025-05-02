class LevelText extends Phaser.Scene {
    constructor() {
        super("levelText");
    }
    create(data) {
        this.cameras.main.fadeIn(250);
        const text1 = this.add.text(0, 0, data.text1, { fontSize: "20px", fill: "#ffffff" });
        const text2 = this.add.text(0, 0, data.text2, { fontSize: "20px", fill: "#ffffff" });
        const text3 = this.add.text(0, 0, data.text3, { fontSize: "40px", fill: "#ffffff" });

        Phaser.Display.Align.In.Center(text1, this.add.zone(400, 300, 800, 20));
        Phaser.Display.Align.In.Center(text2, this.add.zone(400, 340, 800, 20));
        Phaser.Display.Align.In.Center(text3, this.add.zone(400, 150, 800, 40));

        this.time.delayedCall(2000, () => {
            this.scene.stop(data.priorScene);
            this.scene.start(data.nextScene);
        });
    }
}

export default LevelText;