// scenes/TestLevel.js
import Cathy from "../../classes/cathy.js";
import EnemyJumper from "../../classes/EnemyJumper.js";
import Led from "../../classes/led.js";

export default class TestLevel extends Phaser.Scene {
  constructor() {
    super("lt");
    this.transitioning = false;

    // --- Shared collision categories (must match Cathy.js) ---
    this.CAT_PLAYER     = 0x0001;
    this.CAT_WORLD      = 0x0002;
    this.CAT_ENEMY      = 0x0004;
    this.CAT_PLAYER_ATK = 0x0008;
  }

  preload() {
    this.load.tilemapTiledJSON("testlevel", "./levels/tilemaps/demo.json");
    this.load.image("tilesetTEST", "./levels/tilesets/tilesetTEST.png");
    this.load.image("scrollbg3", "./levels/tilesets/scrollbg3.png");

     const t1 = this.make.text({
      x: 4*300, y: 22*300,
      text: 'use ARROW KEYS to move. UP ARROW to jump.',
      style: { font: '60px monospace', fill: '#ffffff' }
    }).setOrigin(0.5);

    const t2 = this.make.text({
      x: 9*300 + 120, y: 21*300 - 40,
      text: 'hold UP to jump higher.',
      style: { font: '60px monospace', fill: '#ffffff' }
    }).setOrigin(0.5);

        const t3 = this.make.text({
      x: 14*300+50, y: 20*300,
      text: 'tap UP while against a wall to climb up.\n\npress the ARROW KEY away from the wall\nbefore you finish climbing to wall jump.\n\nwall jumping to a wall on your opposite\nside lets you climb again.\n\nwall jump back and forth all the way up!!!',
      style: { font: '35px monospace', fill: '#ffffff' }
    })

       const t4 = this.make.text({
      x: 13*300, y: 10*300,
      text: 'good job!',
      style: { font: '60px monospace', fill: '#ffffff' }
    }).setOrigin(0.5);

          const t5 = this.make.text({
      x: 11*300+50, y: 17*300+150,
      text: 'falling a long way down\nwill knock you down for a bit',
      style: { font: '60px monospace', fill: '#ffffff' }
    }).setOrigin(0.5);

        const t6 = this.make.text({
      x: 5*300, y: 4*300,
      text: 'press SPACE to attack.\nthe slam attack has some unique properties and interactions.\nthe most basic use is to smash enemies, try it out!',
      style: { font: '60px monospace', fill: '#ffffff' }
    }).setOrigin(0.5);

    const t7 = this.make.text({
      x: 22*300, y: 23*300,
      text: 'now use everything youve learned!',
      style: { font: '60px monospace', fill: '#ffffff' }
    }).setOrigin(0.5);

    const t8 = this.make.text({
      x: 33*300, y: 4*300,
      text: 'HINT:\nyour ATTACK is used for more than attacking...',
      style: { font: '60px monospace', fill: '#ffffff' }
    }).setOrigin(0.5);

    const t9 = this.make.text({
      x: 24*300, y: 2*300,
      text: 'GOOD JOB.\nend of demo.',
      style: { font: '60px monospace', fill: '#ffffff' }
    }).setOrigin(0.5);
 
 
  }

  create() {
    this.transitioning = false;

           this.scene.stop('levelText');
       // this.scene.get('OSTManager').crossfadeTo('world1', 500);

    // --- Background ---
    this.cameras.main.setBackgroundColor(0x000000);
    this.scrollbg = this.add
      .tileSprite(800, 600, 1600 * 2, 1200 * 2, "scrollbg3")
      .setOrigin(0.5, 0.5)
      .setAlpha(0.5);
    this.scrollbg.setScrollFactor(0);

    // --- Tilemap / Layers ---
    this.map = this.make.tilemap({ key: "testlevel" });
    const tileset = this.map.addTilesetImage("tilesetTEST");

    this.background  = this.map.createLayer("background", tileset);
    this.ground      = this.map.createLayer("ground", tileset);
    this.foreground  = this.map.createLayer("foreground", tileset);
    this.foreground2 = this.map.createLayer("foreground2", tileset);

    new Led(this, 9, 21, 0xffffff, 1.0);
    new Led(this, 13, 11, 0xff0000, 1.5);
    new Led(this, 6, 12, 0xffffff, 1.0);
    new Led(this, 4, 5, 0xff0000, 1);
    new Led(this, 17, 5, 0xff0000, 1);
    new Led(this, 26, 14, 0x00ff00, 1.0);
    new Led(this, 36, 6, 0x00ff00, 1.0);

    this.ground.setCollisionByExclusion([-1]);
    this.matter.world.convertTilemapLayer(this.ground);

    const MatterLib = Phaser.Physics.Matter.Matter;
    this.ground.forEachTile((tile) => {
      const body = tile?.physics?.matterBody?.body;
      if (!body) return;

      MatterLib.Body.setStatic(body, true);
      body.isSensor = false;
      body.label = body.label || "world-tile";
      body.collisionFilter.category = this.CAT_WORLD;
      body.collisionFilter.mask =
        this.CAT_PLAYER | this.CAT_ENEMY | this.CAT_WORLD | this.CAT_PLAYER_ATK;
    });

    this.matter.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    // --- Cathy ---
    this.cathy = new Cathy(this, 300 * 2, 300 * 23);

    // --- Enemies ---
    const e1 = new EnemyJumper(this, 300 * 6, 300 * 6);
    const e2 = new EnemyJumper(this, 300 * 15, 300 * 6);
    this.enemies = [e1, e2];

    for (const enemy of this.enemies) {
      // The enemy class now handles its own collision categories and labels.
      // We just need to mark it as an enemy for Cathy's collision logic.
      enemy.isEnemy = true;
    }

        this.front = this.map.createLayer("front", tileset);

    // --- Dynamic Lighting ---
    this.lights.enable().setAmbientColor(0x737373);
    this.background?.setPipeline("Light2D");
    this.ground?.setPipeline("Light2D");
    this.foreground?.setPipeline("Light2D");
    this.foreground2?.setPipeline("Light2D");
    this.front?.setPipeline("Light2D");
    this.cathy?.setPipeline("Light2D");
   this.scrollbg?.setPipeline("Light2D");
    this.playerLight = this.lights.addLight(this.cathy.x, this.cathy.y - 80, 500, 0xffffff, 2.0);

    // --- Camera ---
    this.cameras.main.fadeIn(500);
    this.cameras.main.startFollow(this.cathy, true, 0.1, 0.1);
    this.cameras.main.setZoom(0.5);
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    // --- Reset key ---
    // this.input.keyboard.on("keydown-R", () => {
    //   if (!this.transitioning) {
    //     this.transitioning = true;
    //     this.cameras.main.fadeOut(300);
    //     this.cameras.main.once("camerafadeoutcomplete", () => {
    //       this.scene.restart();
    //     });
    //   }
    // });
  }

  update(time, delta) {
    this.cathy?.update?.(time, delta);

    this.scrollbg.tilePositionX += 1;
    this.scrollbg.tilePositionY += 0.5;

    if (this.playerLight) {
      this.playerLight.x = this.cathy.x;
      this.playerLight.y = this.cathy.y - 80;
    }

  // ...existing code...
  }
}