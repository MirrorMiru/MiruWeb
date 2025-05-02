class Pause extends Phaser.Scene {
    constructor() {
        super("pause");
        this.hintText = null;
    }

    create(data) {
        this.scene.pause(data.scene);

        const style = { fontSize: "20px", fill: "#ffffff", stroke: "#000000", strokeThickness: 4 };
        const titleStyle = { fontSize: "40px", fill: "#ffffff", stroke: "#000000", strokeThickness: 6 };

        const text3 = this.add.text(0, 0, "PAUSED!", titleStyle);
        const text1 = this.add.text(0, 0, "press [ESC] to un-pause", style);
        const text2 = this.add.text(0, 0, "press [H] for hint", style);
        const text4 = this.add.text(0, 0, "press [Q] to quit", style);

        Phaser.Display.Align.In.Center(text3, this.add.zone(400, 50, 800, 40));
        Phaser.Display.Align.In.Center(text1, this.add.zone(400, 100, 800, 20));
        Phaser.Display.Align.In.Center(text2, this.add.zone(400, 140, 800, 20));
        Phaser.Display.Align.In.Center(text4, this.add.zone(400, 180, 800, 20));

        this.input.keyboard.on("keydown-ESC", () => {
            this.sound.play('ui');
            if (this.hintText) {
                this.hintText.destroy();
                this.hintText = null;
            }
            this.scene.resume(data.scene);
            this.scene.stop();
        });

        this.input.keyboard.on("keydown-H", () => {
            this.sound.play('ui');
            this.toggleHint(data.hint);
        });

        this.input.keyboard.on("keydown-Q", () => {
            this.sound.play('ui');
            this.scene.stop(data.scene);
            this.scene.start("menu");
        });
    }

    toggleHint(hint) {
        
        if (this.hintText) {
            this.hintText.destroy();
            this.hintText = null;
        } else {
            this.hintText = this.add.text(0, 0, hint || "No hint available!", {
                fontSize: "20px",
                fill: "#ffff00",
                stroke: "#000000",
                strokeThickness: 4,
                align: "center",
                wordWrap: { width: 750 }
            });
            Phaser.Display.Align.In.Center(this.hintText, this.add.zone(400, 400, 800, 20));
        }
    }
}

export default Pause;
