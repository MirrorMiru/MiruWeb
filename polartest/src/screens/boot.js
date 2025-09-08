const DEFAULT_SETTINGS = {
  renderMode:   'AUTO',
  physicsDebug: false,
  oldSprites: false,
  volume: 1,
};

  class BootScene extends Phaser.Scene {
    constructor() { super('Boot'); }
  
    init() {
      // load or fall back
      const saved = JSON.parse(localStorage.getItem('gameSettings')) || {};
      this.settings = { ...DEFAULT_SETTINGS, ...saved };
      this.registry.set('settings', this.settings);
    }
  
    create() {
      this.scene.start('Preloader');
    }
  }
  
  export default BootScene;
  