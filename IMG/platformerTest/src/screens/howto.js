class HowTo extends Phaser.Scene {
    constructor() {
        super("howto");
    }
    create() {
      
        this.add.image(400, 300, 'instr').setOrigin(0.5, 0.5);
        this.cameras.main.fadeIn(500);
        this.scene.stop("menu");
        this.input.keyboard.on("keydown-ENTER", () => {
            this.cameras.main.fadeOut(500);
            this.time.delayedCall(500, () => {
                this.scene.start("levelText", { text1: "World 1: Cadence", text2: "Level 1: The Royal Hall", text3: "START!",  nextScene: "l12", priorScene: "howto" });
            });
        
        });
    }
}

export default HowTo;