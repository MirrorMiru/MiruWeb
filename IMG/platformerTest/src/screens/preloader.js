import Melody from '../classes/melody.js';
import Ella from '../classes/ella.js';
import Portal from '../classes/portal.js';
import Spider from '../classes/spider.js';
import Imp from '../classes/imp.js';
import DemonQueen from '../classes/demonQueen.js';
import Anubis from '../classes/anubis.js';
import Beastman from '../classes/beastman.js';
import Wizard from '../classes/Wizard.js';

class Preloader extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  preload() {
    const settings = this.registry.get('settings');

    // ─── UI ───────────────────────────────────────────────
    const { width, height } = this.cameras.main;
    const progressBox = this.add.graphics()
      .fillStyle(0x464646, 0.8)
      .fillRect(240, 270, 320, 50);

    const progressBar = this.add.graphics();

    const loadingText = this.make.text({
      x: width / 2, y: height / 2 - 50,
      text: 'Loading...',
      style: { font: '20px monospace', fill: '#ffffff' }
    }).setOrigin(0.5);

    const watermark = this.make.text({
        x: width / 2, y: height / 2 + 50,
        text: 'https://miru.page',
        style: { font: '20px monospace', fill: '#ffffff' }
      }).setOrigin(0.5);

    this.load.on('progress', value => {
      percentText.setText(`${Math.floor(value * 100)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    const percentText = this.make.text({
        x: width / 2, y: height / 2 - 5,
        text: '0%',
        style: { font: '18px monospace', fill: '#000000', stroke: '#ffffff', strokeThickness: 4 },
      }).setOrigin(0.5);
  



    // ─── AUDIO ────────────────────────────────────────────
    this.load.path = './audio/';
    [
      ['menu', 'menu.mp3'],
      ['cutscene', 'cutscene.mp3'],
      ['boss', 'Boss.mp3'],
      ['world1', 'World1.mp3'],
      ['world2', 'World2.mp3'],
      ['world3', 'World3.mp3'],
      ['world4', 'World4.mp3'],
      ['world5', 'Waterworks(world5).mp3'],
      ['world6', 'World6.mp3'],

      ['jumpm', 'sfx/melodyjump.mp3'],
      ['jumpe', 'sfx/ellajump.mp3'],
      ['hurt',  'sfx/hurt.mp3'],
      ['woosh', 'sfx/woosh.mp3'],
      ['walking', 'sfx/walking.mp3'],

      ['ui', 'sfx/ui.mp3'],
      ['thud', 'sfx/thud.mp3'],
      ['reset', 'sfx/r.mp3'],
      ['portalO', 'sfx/portalO.mp3'],
      ['portalC', 'sfx/portalC.mp3'],
      ['button1', 'sfx/button1.mp3'],
      ['button2', 'sfx/button2.mp3'],
      ['boss1', 'sfx/boss1a.mp3'],
      ['boss2', 'sfx/boss2a.mp3'],
      ['bosshurt','sfx/bosshurt.mp3'],
      ['twinkle','sfx/twinkle.mp3'],
      ['teleport','sfx/teleport.mp3']
    ].forEach(([key, file]) => {
      this.load.audio(key, file);
    });

    // ─── SINGLE-FRAME IMAGES ───────────────────────────────
    this.load.path = './sprites/';
    const imageKeys = [
      'blue','orange','torch','window','outskirtsSky','banner','fog',
      'grad1','grad2','grad3','grad4','instr','scrollbg1','scrollbg2',
      'charNEW','logo','mapbase','cadanceo','outskirtso','territoryo',
      'egypto','jungleo','nujio','maplable','mapbasecadence','maplablecadence',
      'mapbasenuji','arrow1c','mapbaseoutskirts','maplableoutskirts',
      'mapbasedemon','maplabledemon','mapbaseegypt','maplableegypt',
      'mapbasejungle','maplablejungle','maplablenuji','treebg','rain2',
      'wall'
    ];
    imageKeys.forEach(key => {
      this.load.image(key, `${key}.png`);
    });

    // ─── SPRITESHEETS ─────────────────────────────────────
    this.load.spritesheet(
      'player',
      settings.oldSprites ? 'melody2.png' : 'melody.png',
      { frameWidth: 31, frameHeight: 32 }
    );
    this.load.spritesheet(
      'player2',
      settings.oldSprites ? 'ella2.png' : 'ella.png',
      { frameWidth: 31, frameHeight: 32 }
    );
    this.load.spritesheet('button', 'button.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('block', 'block.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('spider','spider.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('port','portal.png',{ frameWidth: 32, frameHeight: 64 });
    this.load.spritesheet('imp','drow.png',{ frameWidth: 31, frameHeight: 32 });
    this.load.spritesheet('anubis','anubis.png',{ frameWidth: 31, frameHeight: 32 });
    this.load.spritesheet('queen','dqueen.png',{ frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('spikes','spikes.png',{ frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('beastman1','beastman1.png',{ frameWidth: 31, frameHeight: 32 });
    this.load.spritesheet('beastman2','beastman2.png',{ frameWidth: 31, frameHeight: 32 });
    this.load.spritesheet('beastman3','beastman3.png',{ frameWidth: 31, frameHeight: 32 });
    this.load.spritesheet('wizard','wizard2.png',{ frameWidth: 64, frameHeight: 64 });

    // ─── ONCE DONE ─────────────────────────────────────────
    this.load.on('complete', () => {
      // register all boss/character animations
      Melody.loadAnimations(this);
      Ella.loadAnimations(this);
      Portal.loadAnimations(this);
      Spider.loadAnimations(this);
      Imp.loadAnimations(this);
      DemonQueen.loadAnimations(this);
      Anubis.loadAnimations(this);
      Beastman.loadAnimations(this);
      Wizard.loadAnimations(this);

      // clean up UI
      this.time.delayedCall(500, () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      watermark.destroy();

      // move on
    //  this.scene.start('clickToStart');
    if(this.checkBrowser(this) == 1){
        this.scene.start('clickToStart');
    }else{
        this.scene.start('clickToStart');//error screen
    }
    })
    });
  }

   checkBrowser(scene) {
    const browser = scene.sys.game.device.browser;
  
    if (browser.chrome) {
      console.log('Running in Chrome');
      console.log('Chrome version:', browser.chromeVersion);
      return 1;
    } else if (browser.firefox) {
      console.log('Running in Firefox');
      console.log('Firefox version:', browser.firefoxVersion);
      return 1;
    } else if (browser.safari) {
      console.log('Running in Safari');
      return 1;
    } else if (browser.edge) {
        console.log('Running in Edge');
        return 1;
    } else if (browser.ie) {
        console.log('Running in Internet Explorer');
        return 2;
    } else if (browser.mobileSafari) {
        console.log('Running in Mobile Safari');
        return 2;
    } else if (browser.opera) {
        console.log('Running in Opera');
        return 1;
    } else {
      console.log('Unknown browser');
      return 2;
    }
  }
}

export default Preloader;
