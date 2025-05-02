import Melody from '../../../classes/melody.js';
import Ella from '../../../classes/ella.js';
import Button from '../../../classes/button.js';
import Portal from '../../../classes/portal.js';
import Banner from '../../../classes/banner.js';
import Window from '../../../classes/window.js';
import Block from '../../../classes/block.js';
import Spider from '../../../classes/spider.js';
import Imp from '../../../classes/imp.js';
import Torch from '../../../classes/torch.js';
import DemonQueen from '../../../classes/demonQueen.js';

export default class Level9 extends Phaser.Scene {
    constructor() {
        super("l9");
        this.transitioning = false;
        this.buttons = [];
        this.blocks = [];
        this.gameOverTriggered = false;
        this.attackTriggered = false;
        this.musictrigger = false;
    }

    preload() {
        this.load.tilemapTiledJSON('world3level3', './levels/tilemaps/w3l3.json');
        this.load.image('wasteland_tiles', './levels/tiles/wasteland_tiles.png');
    }

    create() {
        this.scene.stop('levelText');
        this.gameOverTriggered = false;
        this.attackTriggered = false;
        this.musictrigger = false;
        this.transitioning = false;

        this.cameras.main.setBackgroundColor(0xFAD6A5);



        this.map = this.make.tilemap({
            key: 'world3level3'
        });
        this.tileset = this.map.addTilesetImage('wasteland_tiles');
        this.bg = this.map.createLayer('bg', this.tileset);
        this.bgDecals = this.map.createLayer('decal-bg', this.tileset);
        const fogOverlay = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x4d4d4d, 0.3);
        fogOverlay.setOrigin(0);
        fogOverlay.setScrollFactor(0);
        this.back = this.map.createLayer('back', this.tileset);
        const fogOverlay2 = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x4d4d4d, 0.6);
        fogOverlay2.setOrigin(0);
        fogOverlay2.setScrollFactor(0);
        this.rearDecal = this.map.createLayer('decal-rear', this.tileset);
        this.groundLayer = this.map.createLayer('ground', this.tileset);




        this.createButtons();
        this.createBlocks();

        this.portal = new Portal(this, 17, 14).setFlipX(true);
     
        this.portal.portalEmitter.stop();


        new Torch(this, 19, 14);
        new Torch(this, 27, 14);

        this.boss = new DemonQueen(this, 23, 14);

        this.melody = new Melody(this, 4 * 32, 22 * 32);
        this.ella = new Ella(this, 5 * 32, 22 * 32);


        this.transparent = this.map.createLayer('decal-front-t', this.tileset);
        this.front = this.map.createLayer('decal-front', this.tileset);
        this.front2 = this.map.createLayer('decal-front-2', this.tileset);




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
        this.bg.setScrollFactor(0.3);
        this.back.setScrollFactor(0.5);
        this.bgDecals.setScrollFactor(0.5);

        this.lights.enable().setAmbientColor(0xfffce6);


        this.melody.setPipeline('Light2D');
        this.ella.setPipeline('Light2D');
        this.blocks.forEach(block => block.setPipeline('Light2D'));
        this.buttons.forEach(button => button.setPipeline('Light2D'));
        this.portal.setPipeline('Light2D');
        this.groundLayer.setPipeline('Light2D');
        this.rearDecal.setPipeline('Light2D');
        this.transparent.setPipeline('Light2D');
        this.front.setPipeline('Light2D');
        this.front2.setPipeline('Light2D');


        this.melodyLight = this.lights.addLight(this.melody.x, this.melody.y, 140)
            .setColor(0xffeebb)
            .setIntensity(0.1);
        this.ellaLight = this.lights.addLight(this.ella.x, this.ella.y, 140)
            .setColor(0xffeebb)
            .setIntensity(0.1);



     

        this.input.keyboard.on("keydown-ESC", () => {
            if(!this.transitioning){
            this.sound.play('ui');
            this.scene.launch("pause", {
                scene: "l9",
                hint: "The Demon Queen will spawn 2 buttons every 3 attacks, stand on both to damage her.\nDo this 3 times to move on.\n\nOn the right side of the screen use the hanging block to jump though the transparent wall on the left and pass the defeated queen."
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
                this.scene.get('OSTManager').crossfadeTo('world3', 500);
                this.scene.start("levelText", {
                    text1: "we all make mistakes",
                    text2: "lets give it another go!",
                    text3: "OOPS...",
                    nextScene: "l9",
                    priorScene: "l9"
                });
            });
        }
        });



    }

    createButtons() {
        this.buttons.forEach(b => b.destroy());
        this.buttons = [];


    }

    createBlocks() {
        this.blocks.forEach(b => b.destroy());
        this.blocks = [];



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
                    priorScene: 'l9',           // whatever scene you’re cutting from
                    nextScene:  'l10',         // where to go when done
                    text:[
                      "Daemons are solitary and antisocial creatures by nature, and their ruler: the Daemon Queen, is no exception.",
                      "After being exhausted by the princess' unyielding persistence she decided that her subordinate's tomfoolery was not worth chipping her horns over.",
                      "\n",
                      "Although her pride would never allow her to help our heroes on their quest, she did the bare minimum and allowed them safe passage through her territory.",
                      "\n",
                      "\n",
                      "ONWARDS!",
                      "To the Ancient Towers at the City Border!",
                      "To the Southern Desert!"
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
                        text3: "OUCH...",
                        currentScene: "l9"
                    });
                 //   this.scene.get('OSTManager').stopMusic(3);
                    this.scene.get('OSTManager').crossfadeTo('world3', 500);
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

        if (!this.attackTriggered && (this.melody.x > (13 * 32) - 16 && this.ella.x > (13 * 32) - 16)) {
            this.groundLayer.putTileAt(38, 11, 17);
            this.groundLayer.putTileAt(38, 11, 18);
            this.groundLayer.putTileAt(38, 11, 19);
            this.groundLayer.putTileAt(38, 11, 20);
            this.groundLayer.putTileAt(38, 11, 21);
            this.groundLayer.putTileAt(38, 11, 22);

            this.groundLayer.putTileAt(38, 35, 17);
            this.groundLayer.putTileAt(38, 35, 18);
            this.groundLayer.putTileAt(38, 35, 19);
            this.groundLayer.putTileAt(38, 35, 20);
            this.groundLayer.putTileAt(38, 35, 21);
            this.groundLayer.putTileAt(38, 35, 22);
       //     this.scene.get('OSTManager').stopMusic(3);
            this.scene.get('OSTManager').crossfadeTo('boss', 1000);
            this.attackTriggered = true;
        }

        if (this.boss.defeatedf && !this.musictrigger) {
            this.groundLayer.removeTileAt(11, 17);
            this.groundLayer.removeTileAt(11, 18);
            this.groundLayer.removeTileAt(11, 19);
            this.groundLayer.removeTileAt(11, 20);
            this.groundLayer.removeTileAt(11, 21);
            this.groundLayer.removeTileAt(11, 22);

            this.groundLayer.removeTileAt(35, 17);
            this.groundLayer.removeTileAt(35, 18);
            this.groundLayer.removeTileAt(35, 19);
            this.groundLayer.removeTileAt(35, 20);
            this.groundLayer.removeTileAt(35, 21);
            this.groundLayer.removeTileAt(35, 22);
           // this.scene.get('OSTManager').stopMusic(3);
            this.scene.get('OSTManager').crossfadeTo('world3', 1500);
            this.musictrigger = true;
        }

        this.boss.update(this);


        this.blocks.forEach(block => block.update());
        this.buttons.forEach(button => button.update(this));

        this.portal.update(this.boss.defeatedf);

        this.melodyLight.setPosition(this.melody.x, this.melody.y);
        this.ellaLight.setPosition(this.ella.x, this.ella.y);

        this.checkGameOverCondition();

        const pulse = 0.5 + Math.sin(this.time.now * 0.005) * 0.3;
        this.portal.portalLight.setIntensity(this.portal.active ? pulse : 0);
      
        const midX = (this.melody.x + this.ella.x) / 2;
        const midY = (this.melody.y + this.ella.y) / 2;

        this.cameras.main.scrollX = Phaser.Math.Linear(this.cameras.main.scrollX, midX - this.cameras.main.width / 2, 0.1);
        this.cameras.main.scrollY = Phaser.Math.Linear(this.cameras.main.scrollY, midY - this.cameras.main.height / 2, 0.1);

    }
}