import Melody from '../../../classes/melody.js';
import Ella from '../../../classes/ella.js';
import Button from '../../../classes/button.js';
import Portal from '../../../classes/portal.js';
import Banner from '../../../classes/banner.js';
import Window from '../../../classes/window.js';
import Block from '../../../classes/block.js';
import Spider from '../../../classes/spider.js';
import Spike from '../../../classes/spike.js';
import Torch from '../../../classes/torch.js';
import Wizard from '../../../classes/Wizard.js';


export default class Level18 extends Phaser.Scene {
    constructor() {
        super("l18");
        this.transitioning = false;
        this.buttons = [];
        this.blocks = [];
        this.gameOverTriggered = false;
        this.attackTriggered = false;
        this.musicFlag = false;
    }

    preload() {
        this.load.tilemapTiledJSON('world6level3', './levels/tilemaps/w6l3.json');
        this.load.image('nuji_tiles', './levels/tiles/nuji_tiles.png');
    }

    create() {
        this.scene.stop('levelText');
        this.gameOverTriggered = false;
        this.attackTriggered = false;
        this.musicFlag = false;
        this.transitioning = false;


        this.cameras.main.setBackgroundColor(0xd1fdff);



        this.map = this.make.tilemap({
            key: 'world6level3'
        });
        this.tileset = this.map.addTilesetImage('nuji_tiles');
        this.bg = this.map.createLayer('bg', this.tileset);
        this.bgDecals = this.map.createLayer('decal-bg', this.tileset);
        const fogOverlay = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x474033, 0.5);
        fogOverlay.setOrigin(0);
        fogOverlay.setScrollFactor(0);
        this.back = this.map.createLayer('back', this.tileset);
        this.backDecals = this.map.createLayer('decal-back', this.tileset);
       
        this.rear = this.map.createLayer('rear', this.tileset);
        this.rearDecal = this.map.createLayer('decal-rear', this.tileset)

        this.createButtons();
      
        this.portal = new Portal(this, 44, 14);
 
        this.portal.portalEmitter.stop();

        this.melody = new Melody(this, 2 * 32, 21 * 32);
        this.ella = new Ella(this, 2 * 32, 21 * 32);
        

        this.boss = new Wizard(this, 24, 7).setPipeline('Light2D');
        this.lights.addLight(this.boss.x, this.boss.y, 80)
            .setColor(0xffffff)
            .setIntensity(1);

        new Spike(this, 13, 21, 0, 0).setPipeline('Light2D');
        new Spike(this, 14, 21, 0, 0).setPipeline('Light2D');
        new Spike(this, 15, 21, 1, 0).setPipeline('Light2D');
        new Spike(this, 16, 21, 1, 0).setPipeline('Light2D');
        new Spike(this, 17, 21, 0, 0).setPipeline('Light2D');
        new Spike(this, 18, 21, 0, 0).setPipeline('Light2D');
        new Spike(this, 19, 21, 0, 0).setPipeline('Light2D');
        new Spike(this, 20, 21, 0, 0).setPipeline('Light2D');
        new Spike(this, 21, 21, 0, 0).setPipeline('Light2D');
        new Spike(this, 22, 21, 1, 0).setPipeline('Light2D');
        new Spike(this, 23, 21, 1, 0).setPipeline('Light2D');
        new Spike(this, 24, 21, 1, 0).setPipeline('Light2D');
        new Spike(this, 25, 21, 0, 0).setPipeline('Light2D');
        new Spike(this, 26, 21, 1, 0).setPipeline('Light2D');
        new Spike(this, 27, 21, 1, 0).setPipeline('Light2D');
        new Spike(this, 28, 21, 0, 0).setPipeline('Light2D');
        new Spike(this, 29, 21, 0, 0).setPipeline('Light2D');
        new Spike(this, 30, 21, 0, 0).setPipeline('Light2D');
        new Spike(this, 31, 21, 1, 0).setPipeline('Light2D');
        new Spike(this, 32, 21, 1, 0).setPipeline('Light2D');
        new Spike(this, 33, 21, 1, 0).setPipeline('Light2D');
        new Spike(this, 34, 21, 0, 0).setPipeline('Light2D');
        new Spike(this, 35, 21, 1, 0).setPipeline('Light2D');
        new Spike(this, 36, 21, 0, 0).setPipeline('Light2D');

        new Spike(this, 38, 21, 0, 0).setPipeline('Light2D');
        new Spike(this, 39, 21, 0, 0).setPipeline('Light2D');
        new Spike(this, 40, 21, 0, 0).setPipeline('Light2D');
        new Spike(this, 41, 21, 0, 0).setPipeline('Light2D');
        new Spike(this, 42, 21, 0, 0).setPipeline('Light2D');
        new Spike(this, 43, 21, 0, 0).setPipeline('Light2D');
        new Spike(this, 44, 21, 0, 0).setPipeline('Light2D');
        new Spike(this, 45, 21, 0, 0).setPipeline('Light2D');
        new Spike(this, 46, 21, 0, 0).setPipeline('Light2D');
        new Spike(this, 47, 21, 0, 0).setPipeline('Light2D');
        new Spike(this, 48, 21, 0, 0).setPipeline('Light2D');
        new Spike(this, 49, 21, 0, 0).setPipeline('Light2D');
        new Spike(this, 50, 21, 0, 0).setPipeline('Light2D');
        
        this.groundLayer = this.map.createLayer('ground', this.tileset);

      //  this.createBlocks();


      this.transparent = this.map.createLayer('decal-front-t', this.tileset);
      this.front = this.map.createLayer('decal-front', this.tileset);
    this.front2 = this.map.createLayer('decal-front-2', this.tileset);

    new Torch(this, 2, 20);
        new Torch(this, 4, 20);
        new Torch(this, 18, 9);
       // new Torch(this, 24, 9);
        new Torch(this, 30, 9);
        new Torch(this, 43, 14);
        new Torch(this, 45, 14);

        this.physics.add.collider(this.melody, this.groundLayer);
        this.physics.add.collider(this.ella, this.groundLayer);





        this.groundLayer.setCollisionBetween(1, 999);
        this.front2.setCollisionBetween(1, 999);
        this.physics.add.collider(this.melody, this.groundLayer);
        this.physics.add.collider(this.ella, this.groundLayer);

        this.blocks.forEach(block => {
     
            // Melody collides with the static parts
            this.physics.add.collider(this.melody, block.staticCore);
            this.physics.add.collider(this.melody, block.staticTop);
            this.physics.add.collider(this.melody, block);
        
            // Ella collides with the static parts
            this.physics.add.collider(this.ella, block.staticCore);
            this.physics.add.collider(this.ella, block.staticTop);
            this.physics.add.collider(this.ella, block);
        
            // The block's static core collides with the ground
            this.physics.add.collider(block.staticCore, this.groundLayer);
        
            // Optional: the visual block itself can still be pushed or affected by terrain
            this.physics.add.collider(block, this.groundLayer);
        
            // Let blocks interact physically (stack, bounce, etc.)
            this.physics.add.collider(block, this.blocks);
        });

        this.buttons.forEach(button => {
            this.physics.add.overlap(this.melody, button, button.press, null, button);
            this.physics.add.overlap(this.ella, button, button.press, null, button);
            this.physics.add.overlap(this.blocks, button, button.press, null, button);
        });


        this.physics.add.overlap(this.melody, this.portal, this.checkPlayersInPortal, null, this);
        this.physics.add.overlap(this.ella, this.portal, this.checkPlayersInPortal, null, this);

        this.cameras.main.fadeIn(1000);
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.bg.setScrollFactor(0.4);
        this.back.setScrollFactor(0.6);
        this.backDecals.setScrollFactor(0.6);
        this.bgDecals.setScrollFactor(0.4);

       // this.lights.enable().setAmbientColor(0x36300c);
        this.lights.enable().setAmbientColor(0x444444);


        this.melody.setPipeline('Light2D');
        this.ella.setPipeline('Light2D');
        this.blocks.forEach(block => block.setPipeline('Light2D'));
        this.buttons.forEach(button => button.setPipeline('Light2D'));
        this.portal.setPipeline('Light2D');
        this.groundLayer.setPipeline('Light2D');
        this.rearDecal.setPipeline('Light2D');
        this.rear.setPipeline('Light2D');
        this.transparent.setPipeline('Light2D');
        this.front.setPipeline('Light2D');
        this.front2.setPipeline('Light2D');
        this.bg.setPipeline('Light2D');
        this.bgDecals.setPipeline('Light2D');

   

        this.melodyLight = this.lights.addLight(this.melody.x, this.melody.y, 100)
            .setColor(0xffddbb)
            .setIntensity(0.35);
        this.ellaLight = this.lights.addLight(this.ella.x, this.ella.y, 100)
            .setColor(0xffddbb)
            .setIntensity(0.35);

   
            this.topLight = this.lights.addLight(this.cameras.main.width / 2, 0, 2000)
            .setColor(0xffccaa)
            .setIntensity(0.8);



        this.input.keyboard.on("keydown-ESC", () => {
            if(!this.transitioning){
            this.sound.play('ui');
            this.scene.launch("pause", {
                scene: "l18",
                hint: "Defeat the demon wizard to save the kingdom!"
            });
        }
        });

        this.input.keyboard.on("keydown-R", () => {
            if(!this.transitioning) {
            this.sound.play('reset');
            this.cameras.main.fadeOut(500);
            this.transitioning = true;
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.buttons.forEach(b => b.destroy());
                this.blocks.forEach(b => b.destroy());
                this.buttons = [];
                this.blocks = [];
                this.scene.start("levelText", {
                    text1: "we all make mistakes",
                    text2: "lets give it another go!",
                    text3: "OOPS...",
                    nextScene: "l18",
                    priorScene: "l18"
                });
            });
        }
        });


    }

    createButtons() {
        this.buttons.forEach(b => b.destroy());
        this.buttons = [];

    //    this.buttons.push(new Button(this, 44, 11, 1));

    }


    createBlocks() {
        this.blocks.forEach(b => b.destroy());
        this.blocks = [];

        
      // this.blocks.push(new Block(this,24,8).setPipeline('Light2D'));
       // this.blocks.push(new Block(this,46,15).setPipeline('Light2D'));
   

      this.blocks.forEach((block, index) => {
        this.blocks.forEach((otherBlock, otherIndex) => {
            if (index !== otherIndex) {
                // Make the dynamic block collide with the other block’s static core
                this.physics.add.collider(block, otherBlock.staticCore);
            }
        });
    });

    }


    checkPlayersInPortal() {
        if (this.portal.active &&
            this.physics.overlap(this.melody, this.portal) &&
            this.physics.overlap(this.ella, this.portal)) {
            this.portal.active = false;
            this.transitioning = true;
            this.sound.play("teleport")
            this.cameras.main.fadeOut(1000);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start('Cutscene', {
                    priorScene: 'l18',           // whatever scene you’re cutting from
                    nextScene:  'menu',         // where to go when done
                    text: [
                      "With the demon sorcerer Ignis defeated, and the royal family returned to power, the kingdom of Nuji is safe once more.",
                      "Ignis returns to the monster territories defeated, but not discouraged.",
                      "He vows to return one day, and plunge the world into an era of darkness.",
                       "But for now, the people can sleep easy knowing that a hero will always rise to banish evil if it is to rear its ugly head once more.",
                       "\n",
                       "\n",
                       "\n",
                       "background music for World 5 is 'Waterworks' by jobromedia",
                       "https://opengameart.org/content/waterworks",
                       "\n",
                       "All other music and audio is common domain or licensed under CC0",
                       "(I think)",
                       "Gathered from various sources.",
                       "\n",
                       "I made everything else!",
                       "https://miru.page",
                       "\n",
                       "THE END",
                       "Thanks for playing!",
                    ]
                  });
            });
        }
    }


    checkGameOverCondition() {
        const fallLimit = this.map.heightInPixels + 200;
        if (!this.gameOverTriggered && (this.melody.y > fallLimit || this.ella.y > fallLimit)) {
            this.gameOverTriggered = true;
            this.transitioning = true;
            this.sound.play("thud", { volume: 1.5 });
            this.cameras.main.shake(150, 0.0025);
            this.time.delayedCall(500, () => {
                this.cameras.main.fadeOut(500);
                this.cameras.main.once('camerafadeoutcomplete', () => {
                    this.scene.start("over", {
                        text1: "press 'R' to give it another go",
                        text2: "press 'Q' to call it quits",
                        text3: "don't give up now!",
                        currentScene: "l18"
                    });
                    this.scene.get('OSTManager').crossfadeTo('world6', 500);
                    this.buttons = [];
                    this.blocks = [];
                });
            });
        }
    }

    updateTilesBasedOnButtonState() {
        const tileActions = [

        ];

        tileActions.forEach(({
            buttonIndex,
            tileX,
            tileY,
            layer,
            tile = null,
            action
        }) => {
            const button = this.buttons[buttonIndex];

            if (button) {
                action(button.isPressed, this.groundLayer, tileX, tileY, tile);
            }
        });

    }

    update() {
        this.melody.update();
        this.ella.update();

        if (!this.attackTriggered && (this.melody.x > (15 * 32) - 16 && this.ella.x > (15 * 32) - 16)) {
            this.groundLayer.putTileAt(21, 13, 13);
            this.groundLayer.putTileAt(21, 13, 12);
            this.groundLayer.putTileAt(21, 13, 11);
            this.groundLayer.putTileAt(21, 13, 10);
            this.groundLayer.putTileAt(21, 13, 9);
            this.groundLayer.putTileAt(21, 13, 8);

            this.groundLayer.putTileAt(21, 35, 13);
            this.groundLayer.putTileAt(21, 35, 12);
            this.groundLayer.putTileAt(21, 35, 11);
            this.groundLayer.putTileAt(21, 35, 10);
            this.groundLayer.putTileAt(21, 35, 9);
            this.groundLayer.putTileAt(21, 35, 8);

            this.scene.get('OSTManager').crossfadeTo('boss', 1000);
            this.attackTriggered = true;
        }

        if (this.boss.defeatedf && !this.musicFlag) {
            this.groundLayer.removeTileAt(13, 13);
    this.groundLayer.removeTileAt(13, 12);
    this.groundLayer.removeTileAt(13, 11);
    this.groundLayer.removeTileAt(13, 10);
    this.groundLayer.removeTileAt(13, 9);
    this.groundLayer.removeTileAt(13, 8);

    this.groundLayer.removeTileAt(35, 13);
    this.groundLayer.removeTileAt(35, 12);
    this.groundLayer.removeTileAt(35, 11);
    this.groundLayer.removeTileAt(35, 10);
    this.groundLayer.removeTileAt(35, 9);
    this.groundLayer.removeTileAt(35, 8);

    this.scene.get('OSTManager').crossfadeTo('world6', 1500);
    this.musicFlag = true;

        }

        this.boss.update(this);



        this.topLight.setPosition(this.cameras.main.midPoint.x, this.cameras.main.midPoint.y - this.cameras.main.height / 2);
  
        this.blocks.forEach(block => block.update());
        this.buttons.forEach(button => button.update(this));
    
        this.portal.update(this.boss.defeatedf);




        this.melodyLight.setPosition(this.melody.x, this.melody.y);
        this.ellaLight.setPosition(this.ella.x, this.ella.y);


        this.checkGameOverCondition();
     //   this.updateTilesBasedOnButtonState();

        const pulse = 0.5 + Math.sin(this.time.now * 0.005) * 0.3;
        this.portal.portalLight.setIntensity(this.portal.active ? pulse : 0);
  

        const midX = (this.melody.x + this.ella.x) / 2;
        const midY = (this.melody.y + this.ella.y) / 2;

        this.cameras.main.scrollX = Phaser.Math.Linear(this.cameras.main.scrollX, midX - this.cameras.main.width / 2, 0.1);
        this.cameras.main.scrollY = Phaser.Math.Linear(this.cameras.main.scrollY, midY - this.cameras.main.height / 2, 0.1);

    }
}