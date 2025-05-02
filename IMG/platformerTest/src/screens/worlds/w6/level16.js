import Melody from '../../../classes/melody.js';
import Ella from '../../../classes/ella.js';
import Button from '../../../classes/button.js';
import Portal from '../../../classes/portal.js';
import Banner from '../../../classes/banner.js';
import Window from '../../../classes/window.js';
import Block from '../../../classes/block.js';
import Spider from '../../../classes/spider.js';
import Spike from '../../../classes/spike.js';


export default class Level16 extends Phaser.Scene {
    constructor() {
        super("l16");
        this.transitioning = false;
        this.buttons = [];
        this.blocks = [];
        this.gameOverTriggered = false;
    }

    preload() {
        this.load.tilemapTiledJSON('world6level1', './levels/tilemaps/w6l1.json');
        this.load.image('nuji_tiles', './levels/tiles/nuji_tiles.png');
    }

    create() {
        this.scene.stop('levelText');
        this.gameOverTriggered = false;
        this.transitioning = false;
        this.scene.get('OSTManager').crossfadeTo('world6', 500);

        this.cameras.main.setBackgroundColor(0xd1fdff);



        this.map = this.make.tilemap({
            key: 'world6level1'
        });
        this.tileset = this.map.addTilesetImage('nuji_tiles');
        this.bg = this.map.createLayer('bg', this.tileset);
        this.bgDecals = this.map.createLayer('decal-bg', this.tileset);
        const fogOverlay = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0xdddddd, 1);
        fogOverlay.setOrigin(0);
        fogOverlay.setScrollFactor(0);
        fogOverlay.blendMode = Phaser.BlendModes.MULTIPLY;
        this.back = this.map.createLayer('back', this.tileset);
        this.backDecals = this.map.createLayer('decal-back', this.tileset);
        const fogOverlay2 = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0xdddddd, 0.5);
        fogOverlay2.setOrigin(0);
        fogOverlay2.setScrollFactor(0);
        fogOverlay2.blendMode = Phaser.BlendModes.MULTIPLY;
        this.rear = this.map.createLayer('rear', this.tileset);
        this.rearDecal = this.map.createLayer('decal-rear', this.tileset)





        this.createButtons();
      

        this.portal = new Portal(this, 43, 21).setFlipX(true);
 
        this.portal.portalEmitter.stop();

        this.melody = new Melody(this, 8 * 32, 21 * 32);
        this.ella = new Ella(this, 9 * 32, 21 * 32);
           

        this.spider = new Spider(this, 16, 16, 14, 18);

        new Spike(this, 15, 21, 0, 0);
        new Spike(this, 15, 18, 0, -16).setFlipY(true);
        new Spike(this, 17, 21, 0, 0);
        new Spike(this, 17, 18, 0, -16).setFlipY(true);

        new Spike(this, 5, 13, 1, 0);
        new Spike(this, 3, 12, 0, -16).setFlipY(true);

        new Spike(this, 3, 10, 0, 0);
        new Spike(this, 5, 10, 0, 0);
        new Spike(this, 7, 10, 0, 0);

        new Spike(this, 11, 6, 1, 0);
        new Spike(this, 12, 6, 0, 0);
        new Spike(this, 13, 6, 0, 0);

        new Spike(this, 45, 3, 1, 0);
        new Spike(this, 46, 3, 0, 0);

        new Spike(this, 46, 7, 1, 0);
        new Spike(this, 45, 5, 0, -16).setFlipY(true);

        new Spike(this, 43, 11, 0, 0);
        new Spike(this, 46, 11, 0, 0);

        new Spike(this, 43, 19, 1, 0);
        new Spike(this, 44, 19, 0, 0);

       
        this.groundLayer = this.map.createLayer('ground', this.tileset);

        this.createBlocks();


      this.transparent = this.map.createLayer('decal-front-t', this.tileset);
      this.front = this.map.createLayer('decal-front', this.tileset);
    this.front2 = this.map.createLayer('decal-front-2', this.tileset);

        this.physics.add.collider(this.melody, this.groundLayer);
        this.physics.add.collider(this.ella, this.groundLayer);

        this.physics.add.collider(this.melody, this.spider, () => {
            this.spider.knockbackPlayer(this.melody);
        });

        this.physics.add.collider(this.ella, this.spider, () => {
            this.spider.knockbackPlayer(this.ella);
        });

        this.groundLayer.setCollisionBetween(1, 999);
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

        this.lights.enable().setAmbientColor(0xfff5b5);


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

        this.gradient = this.add.image(this.map.widthInPixels / 2, this.map.heightInPixels / 2, 'grad4').setAlpha(0.4);
        this.gradient.scaleX = 20;
        this.gradient.scaleY = 0.5;
        this.gradient.blendMode = 'MULTIPLY';
   //     this.gradient.setPipeline('Light2D');

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
                scene: "l16",
                hint: "Use everything you've learned to solve the puzzles!\n\nGetting the first block should be simple, one player presses the button, the other pushes the block.\nUse the block as a platform or to press the button so both player can get to the spider.\nGet hit by the spider at the rightmost side of the platform to get launched across.\n\nSurvive the platforming in the tower to push the purple button, then backtrack and jump across the hanging stones to reach the red button.\nThen go through the tower AGAIN!"
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
                    nextScene: "l16",
                    priorScene: "l16"
                });
            });
        }
        });


    }

    createButtons() {
        this.buttons.forEach(b => b.destroy());
        this.buttons = [];
        this.buttons.push(new Button(this, 16, 21, 3));
        this.buttons.push(new Button(this, 48, 22, 4));
        this.buttons.push(new Button(this, 9, 6, 1));

    }


    createBlocks() {
        this.blocks.forEach(b => b.destroy());
        this.blocks = [];

        
        this.blocks.push(new Block(this,12,10).setPipeline('Light2D'));
        this.blocks.push(new Block(this,46,15).setPipeline('Light2D'));
   

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
            this.sound.play("teleport")
            this.transitioning = true;
            this.cameras.main.fadeOut(1000);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start("levelText", {
                    text1: "World 6: Kingdom of Nuji",
                    text2: "Level 2: City of the Silversmiths",
                    text3: "GOOD JOB!",
                    nextScene: "l17",
                    priorScene: "l16"
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
                        currentScene: "l16"
                    });
                    this.buttons = [];
                    this.blocks = [];
                });
            });
        }
    }

    updateTilesBasedOnButtonState() {
        const tileActions = [{
            buttonIndex: 0,
            tileX: 21,
            tileY: 19,
            tile: 21,
            action: (pressed, layer, x, y, tile) => {
                pressed ?  layer.putTileAt(tile, x, y) :  layer.removeTileAt(x, y);
            }
        },{
            buttonIndex: 1,
            tileX: 28,
            tileY: 6,
            tile: 21,
            action: (pressed, layer, x, y, tile) => {
                pressed ?  layer.putTileAt(tile, x, y) :  layer.removeTileAt(x, y);
            }
        }

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
        this.spider.update();
        this.blocks.forEach(block => block.update());
        this.buttons.forEach(button => button.update(this));
        this.portal.update(
            this.buttons
              .filter(button => button.type !== 3 && button.type !== 4)
              .every(button => button.isPressed) &&
            this.buttons.some(button => button.type !== 3 && button.type !== 4)
          );
          




        this.melodyLight.setPosition(this.melody.x, this.melody.y);
        this.ellaLight.setPosition(this.ella.x, this.ella.y);


        this.checkGameOverCondition();
        this.updateTilesBasedOnButtonState();

        const pulse = 0.5 + Math.sin(this.time.now * 0.005) * 0.3;
        this.portal.portalLight.setIntensity(this.portal.active ? pulse : 0);
  

        const midX = (this.melody.x + this.ella.x) / 2;
        const midY = (this.melody.y + this.ella.y) / 2;

        this.cameras.main.scrollX = Phaser.Math.Linear(this.cameras.main.scrollX, midX - this.cameras.main.width / 2, 0.1);
        this.cameras.main.scrollY = Phaser.Math.Linear(this.cameras.main.scrollY, midY - this.cameras.main.height / 2, 0.1);

    }
}