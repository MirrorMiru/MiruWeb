
// import classwithanimations from '../classes/name.js';
import cathy from '../classes/cathy.js';
import EnemyJumper from '../classes/EnemyJumper.js';
//import classes here

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
      .fillRect(240*2, 270*2, 320*2, 50*2);

    const progressBar = this.add.graphics();

    const loadingText = this.make.text({
      x: width / 2, y: height / 2 - 250,
      text: 'Loading...',
      style: { font: '40px monospace', fill: '#ffffff' }
    }).setOrigin(0.5);

    const watermark = this.make.text({
        x: width / 2, y: height / 2 + 250,
        text: 'https://miru.page',
        style: { font: '40px monospace', fill: '#ffffff' }
      }).setOrigin(0.5);

    this.load.on('progress', value => {
      percentText.setText(`${Math.floor(value * 100)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250*2, 280*2, 300 * value*2, 30*2);
    });

    const percentText = this.make.text({
        x: width / 2, y: height / 2 - 5,
        text: '0%',
        style: { font: '25px monospace', fill: '#000000', stroke: '#ffffff', strokeThickness: 4 },
      }).setOrigin(0.5);
  



    // ─── AUDIO ────────────────────────────────────────────
    this.load.path = './audio/';
    [
      // ['name of sound', 'name in /audio.mp3'], <------
     
    ].forEach(([key, file]) => {
      this.load.audio(key, file);
    });

    // ─── SINGLE-FRAME IMAGES ───────────────────────────────
    this.load.path = './sprites/';
    const imageKeys = [
      //name of images in /sprites, static images, comma sperated list
      'scrollbg2','scrollbg3','logo','char','ground','led'
    ];
    imageKeys.forEach(key => {
      this.load.image(key, `${key}.png`);
    });

    // ─── SPRITESHEETS ─────────────────────────────────────

    //this.load.spritesheet('animationname','spritesheetname.png',{ frameWidth: w, frameHeight: h }); <---- for all classes with animation
    this.load.spritesheet('player', 'cathy.png', { frameWidth: 600, frameHeight: 700 });
    this.load.spritesheet('enemy_jumper', 'enemy1.png', { frameWidth: 603, frameHeight: 700 });

    // ─── ONCE DONE ─────────────────────────────────────────
    this.load.on('complete', () => {
      // register all boss/character animations

      //ClassWithAnimations.loadAnimations(this); <----
      cathy.loadAnimations(this);
      EnemyJumper.loadAnimations(this);

      // clean up UI
      this.time.delayedCall(500, () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      watermark.destroy();

      // move on
        this.scene.start('menu');
 
 
    })
    });
  }

}

export default Preloader;
