class GameOver extends Phaser.Scene {
    constructor() {
        super("over");
    }
    create(data) {
      
            const text1 = this.add.text(0, 0, data.text1, { fontSize: "20px", fill: "#ffffff" });
            const text2 = this.add.text(0, 0, data.text2, { fontSize: "20px", fill: "#ffffff" });
            const text3 = this.add.text(0, 0, data.text3, { fontSize: "40px", fill: "#ffffff" });
    
            Phaser.Display.Align.In.Center(text1, this.add.zone(400, 300, 800, 20));
            Phaser.Display.Align.In.Center(text2, this.add.zone(400, 340, 800, 20));
            Phaser.Display.Align.In.Center(text3, this.add.zone(400, 150, 800, 40));
    
        this.scene.stop(data.currentScene);
        this.input.keyboard.on("keydown-R", () => {
            this.scene.start(data.currentScene);
        });
        this.input.keyboard.on("keydown-Q", () => {
            this.scene.start("menu");
        });
    }
}

export default GameOver;