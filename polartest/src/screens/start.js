// ClickToStart.js
export default class ClickToStart extends Phaser.Scene {
    constructor() {
        super("clickToStart");
    }

    create() {
        // fade in from black
        
        this.add.image(400, 300, 'scrollbg3').setOrigin(0.5, 0.5).setAlpha(0.4);
          const settings = this.registry.get('settings');
        this.cameras.main.fadeIn(250);

        const { width, height } = this.cameras.main;
        const centerX = width / 2;
        const centerY = height / 2;

        // common text style
        const textStyle = {
            fontSize: "32px",
            fill: "#000000",
            fontStyle: "bold",
            stroke: "#ffffff",
            strokeThickness: 4
        };

        // "Start" option
        const startText = this.add
            .text(centerX, centerY - 100, "Click Me To Start", textStyle)
            .setOrigin(0.5)
            .setInteractive();

        // "Start Muted" option
        const muteText = this.add
            .text(centerX, centerY + 100, "Click Me To Start Muted", textStyle)
            .setOrigin(0.5)
            .setInteractive();

        // on click handlers
        startText.on('pointerdown', () => this._begin(false));
        muteText.on('pointerdown',  () => this._begin(true));
    }

    /**
     * @param {boolean} muted — if true, sets masterVolume to 0 before starting
     */
    _begin(muted) {
        const settings = this.registry.get('settings');
        const ost = this.scene.get('OSTManager');
        // ensure volume is correct
        if(settings.volume == 0 || muted){
            this.game.sound.mute = true
        }

        ost.setMasterVolume(muted ? 0 : settings.volume);

        // smooth transition
        this.cameras.main.fadeOut(250);
        this.time.delayedCall(250, () => {
            this.scene.start("menu");
            this.scene.stop();  // destroy this ClickToStart scene
        });
    }
}
