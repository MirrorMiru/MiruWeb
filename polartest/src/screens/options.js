// src/screens/options.js
export default class OptionsScene extends Phaser.Scene {
  constructor() {
    super('Options');
  }

  create() {
    // Fetch or initialize settings
    this.add.image(400, 300, 'scrollbg3').setOrigin(0.5, 0.5).setAlpha(0.4);
    this.cameras.main.fadeIn(250);
    const settings = this.registry.get('settings');
    if (typeof settings.volume !== 'number') {
      settings.volume = 1;
      this.saveSettings();
    }

    const titleStyle  = { fontSize: '32px', fill: '#000000', stroke: '#ffffff', strokeThickness: 4, fontStyle: "bold", };
    const optionStyle = { fontSize: '20px', fill: '#000000', stroke: '#ffffff', strokeThickness: 3 , fontStyle: "bold",};

    // Header
    this.add.text(400, 50, 'SETTINGS', titleStyle).setOrigin(0.5);
  

    // — Rendering Mode —
    this.add.text(200, 100, 'Rendering:', optionStyle);
    this.renderText = this.add.text(400, 100, settings.renderMode, optionStyle)
      .setInteractive()
      .on('pointerup', () => this.toggleRender());

    // — Physics Debug —
    this.add.text(200, 200, 'Physics Debug:', optionStyle);
    this.debugText = this.add.text(400, 200, settings.physicsDebug ? 'On' : 'Off', optionStyle)
      .setInteractive()
      .on('pointerup', () => this.toggleDebug());

    // — Player Costume —
    // this.add.text(200, 250, 'Player Costume:', optionStyle);
    // this.costumeText = this.add.text(
    //   400,
    //   250,
    //   settings.oldSprites ? 'Old' : 'Final',
    //   optionStyle
    // )
    // .setInteractive()
    // .on('pointerup', () => this.togglePlayer());

    // — Master Volume —
    this.add.text(200, 300, 'Volume:', optionStyle);
    this.volumeText = this.add.text(
      400,
      300,
      `${Math.round(settings.volume * 100)}%`,
      optionStyle
    )
    .setInteractive()
    .on('pointerup', () => this.toggleVolume());

    // — Warnings & Instructions —
    this.add.text(
      400, 150,
      'CAUTION: The game is not intended to run with CANVAS!\nPlease switch to WEBGL or use a browser that supports it.',
      { fontSize: '16px', fill: '#ffd', align: 'center' }
    ).setOrigin(0.5);
    this.add.text(
      400, 350,
      'Volume has no effect if game was started muted.\nPress [R] and click the top option to start with audio.',
      { fontSize: '16px', fill: '#ffd', align: 'center' }
    ).setOrigin(0.5);

    this.add.text(400, 450, 'Press [R] to apply', { fontSize: '18px', fill: '#fff' })
      .setOrigin(0.5);
    this.add.text(400, 500, 'Press [ESC] to go back', { fontSize: '18px', fill: '#fff' })
      .setOrigin(0.5);

    // Key bindings
    this.input.keyboard.on('keydown-R',   () => window.location.reload());
    this.input.keyboard.on('keydown-ESC', () => this.scene.start('menu'));

  }

  

  toggleRender() {
    const settings = this.registry.get('settings');
    const modes = ['AUTO', 'WEBGL', 'CANVAS'];
    const idx = modes.indexOf(settings.renderMode);
    settings.renderMode = modes[(idx + 1) % modes.length];
    this.renderText.setText(settings.renderMode);
    this.saveSettings();
  }

  toggleDebug() {
    const settings = this.registry.get('settings');
    settings.physicsDebug = !settings.physicsDebug;
    this.debugText.setText(settings.physicsDebug ? 'On' : 'Off');

    // apply immediately to all active scenes
    this.game.scene.getScenes(true).forEach(s => {
      if (s.physics && s.physics.world) {
        s.physics.world.drawDebug = settings.physicsDebug;
        if (settings.physicsDebug) {
          s.physics.world.createDebugGraphic();
        } else if (s.physics.world.debugGraphic) {
          s.physics.world.debugGraphic.clear();
        }
      }
    });

    this.saveSettings();
  }

  // togglePlayer() {
  //   const settings = this.registry.get('settings');
  //   settings.oldSprites = !settings.oldSprites;
  //   this.costumeText.setText(settings.oldSprites ? 'Old' : 'Final');
  //   this.saveSettings();
  // }

  toggleVolume() {
    const settings = this.registry.get('settings');
    const levels = [0, 0.25, 0.5, 0.75, 1];
    const idx = levels.indexOf(settings.volume);
    const next = levels[(idx + 1) % levels.length];
    settings.volume = next;
    this.volumeText.setText(`${Math.round(next * 100)}%`);
    // apply immediately
    this.sound.volume = next;
    const ost = this.scene.get('OSTManager');
    if (ost && ost.setMasterVolume) {
      ost.setMasterVolume(next);
    }
    this.saveSettings();
  }

  saveSettings() {
    localStorage.setItem(
      'gameSettings',
      JSON.stringify(this.registry.get('settings'))
    );
  }
}
