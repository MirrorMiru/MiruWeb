import Melody from '../../../classes/melody.js';
import Ella from '../../../classes/ella.js';
import Button from '../../../classes/button.js';
import Portal from '../../../classes/portal.js';
import Banner from '../../../classes/banner.js';
import Window from '../../../classes/window.js';
import Block from '../../../classes/block.js';
import Spider from '../../../classes/spider.js';
import Spike from '../../../classes/spike.js';


export default class Level17 extends Phaser.Scene {
    constructor() {
        super("l17");
        this.transitioning = false;
        this.buttons = [];
        this.blocks = [];
        this.gameOverTriggered = false;
    }

    preload() {
        this.load.tilemapTiledJSON('world6level2', './levels/tilemaps/w6l2.json');
        this.load.image('nuji_tiles', './levels/tiles/nuji_tiles.png');
    }

    create() {
        this.scene.stop('levelText');
        this.gameOverTriggered = false;
        this.transitioning = false;

        this.cameras.main.setBackgroundColor(0xd1fdff);

        this.map = this.make.tilemap({
            key: 'world6level2'
        });
        this.tileset = this.map.addTilesetImage('nuji_tiles');
        this.bg = this.map.createLayer('bg', this.tileset);
        this.bgDecals = this.map.createLayer('decal-bg', this.tileset);
        const fogOverlay = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0xfeff96, 0.3);
        fogOverlay.setOrigin(0);
        fogOverlay.setScrollFactor(0);
        this.back = this.map.createLayer('back', this.tileset);
        this.backDecals = this.map.createLayer('decal-back', this.tileset);
        const fogOverlay2 = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0xfeff96, 0.6);
        fogOverlay2.setOrigin(0);
        fogOverlay2.setScrollFactor(0);
        this.rear = this.map.createLayer('rear', this.tileset);
        this.rearDecal = this.map.createLayer('decal-rear', this.tileset)

        this.createButtons();
      
        this.portal = new Portal(this, 2, 4).setFlipX(true);
 
        this.portal.portalEmitter.stop();

        this.melody = new Melody(this, 2 * 32, 5 * 32);
        this.ella = new Ella(this, 2 * 32, 5 * 32);

        // this.melody = new Melody(this, 15 * 32, 5 * 32);
        // this.ella = new Ella(this, 15 * 32, 5 * 32);
           

        this.spider = new Spider(this, 15, 9, 13, 18);
        this.spider2 = new Spider(this, 23, 15, 22, 25);

        this.spider3 = new Spider(this, 32, 10, 32, 36);
        this.spider4 = new Spider(this, 36, 10, 32, 36);


        // new Spike(this, 15, 21, 0, 0);
        new Spike(this, 5, -1, 0, 0);
        new Spike(this, 6, -1, 0, 0);

         new Spike(this, 13, 7, 0, -16).setFlipY(true);
         new Spike(this, 14, 7, 0, -16).setFlipY(true);
            new Spike(this, 15, 7, 1, -16).setFlipY(true);
            new Spike(this, 16, 7, 1, -16).setFlipY(true);
            new Spike(this, 17, 7, 0, -16).setFlipY(true);
            new Spike(this, 18, 7, 0, -16).setFlipY(true);

            new Spike(this, 1, 20, 0, 0);
            new Spike(this, 2, 20, 0, 0);
            new Spike(this, 3, 20, 1, 0);
            new Spike(this, 4, 20, 0, 0);

          //  new Spike(this, 3, 8, 0, 0);
            new Spike(this, 18, 5, 1, 0);

            new Spike(this, 10, 3, 0, 0);
            new Spike(this, 11, 3, 0, 0);

            new Spike(this, 19, 22, 0, 0);
            new Spike(this, 20, 22, 0, 0);
            new Spike(this, 27, 22, 0, 0)
            new Spike(this, 28, 22, 0, 0);
            new Spike(this, 29, 22, 0, 0);

        
            new Spike(this, 23, 13, 0, -16).setFlipY(true);
            new Spike(this, 22, 13, 1, -16).setFlipY(true);


            new Spike(this, 31, 8, 1, -16).setFlipY(true);

            new Spike(this, 34, 6, 0, 0);

            new Spike(this, 33, 2, 0, 0);


       
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

        this.physics.add.collider(this.melody, this.spider2, () => {
            this.spider2.knockbackPlayer(this.melody);
        });

        this.physics.add.collider(this.ella, this.spider2, () => {
            this.spider2.knockbackPlayer(this.ella);
        });

        
        this.physics.add.collider(this.melody, this.spider3, () => {
            this.spider3.knockbackPlayer(this.melody);
        });

        this.physics.add.collider(this.ella, this.spider3, () => {
            this.spider3.knockbackPlayer(this.ella);
        });

        
        this.physics.add.collider(this.melody, this.spider4, () => {
            this.spider4.knockbackPlayer(this.melody);
        });

        this.physics.add.collider(this.ella, this.spider4, () => {
            this.spider4.knockbackPlayer(this.ella);
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
        this.backDecals.setScrollFactor(0.6);

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

        new Window(this, 14,13,0.1);
        new Window(this, 17,13,0.1)
        new Window(this, 17,15,0.1);
        new Window(this, 32,18,0.1);
        new Window(this, 49,3,0.1);
        new Window(this, 49,5,0.1);
        new Window(this, 49,11,0.1);

        this.gradient = this.add.image(this.map.widthInPixels / 2, this.map.heightInPixels / 2, 'grad4').setAlpha(0.7);
        this.gradient.scaleX = 20;
        this.gradient.scaleY = 0.5;
        this.gradient.blendMode = 'MULTIPLY';
        //this.gradient.setPipeline('Light2D');

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
                scene: "l17",
                hint: "Pure platforming skill up to the 3rd building.\nThere one player holds yellow button on the roof while the other goes three floors down in the 4th building.\n4th building purple button drops a block in the 3rd.\nPush the block to the very bottom and use it to hold a yellow button.\nFrom there the bottom two floors in the 4th building are unlocked, push the button at the bottom to let the other player access the very top floor.\nThe purple button at the top will let both players access the rightmost section of the level, find the purple button there and backtrack to the very beginning where the red button and portal will not be unlocked."
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
                    nextScene: "l17",
                    priorScene: "l17"
                });
            });
        }
        });


    }

    createButtons() {
        this.buttons.forEach(b => b.destroy());
        this.buttons = [];
       this.buttons.push(new Button(this, 25, 21, 3));   
         this.buttons.push(new Button(this, 25, 5, 3));
        this.buttons.push(new Button(this, 36, 12, 4));
        this.buttons.push(new Button(this, 31, 16, 3));
        this.buttons.push(new Button(this, 31, 2, 4));
        this.buttons.push(new Button(this, 47, 5, 4));
        this.buttons.push(new Button(this, 2, 2, 1));

    }


    createBlocks() {
        this.blocks.forEach(b => b.destroy());
        this.blocks = [];

        
       this.blocks.push(new Block(this,24,8).setPipeline('Light2D'));
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
                this.scene.start("levelText", {
                    text1: "World 6: Kingdom of Nuji",
                    text2: "Level 3: Royal Capitol",
                    text3: "ONTO THE FINALE!",
                    nextScene: "l18",
                    priorScene: "l17"
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
                        currentScene: "l17"
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
            tileX: 29,
            tileY: 20,
            tile: 21,
            action: (pressed, layer, x, y, tile) => {
                pressed ?  layer.putTileAt(tile, x, y) :  layer.removeTileAt(x, y);
            }
        },{
            buttonIndex: 0,
            tileX: 27,
            tileY: 21,
            tile: 21,
            action: (pressed, layer, x, y, tile) => {
                pressed ?  layer.removeTileAt(x, y) :  layer.putTileAt(tile, x, y);
            }
        },{
            buttonIndex: 0,
            tileX: 28,
            tileY: 21,
            tile: 21,
            action: (pressed, layer, x, y, tile) => {
                pressed ?  layer.removeTileAt(x, y) :  layer.putTileAt(tile, x, y);
            }
        },{
            buttonIndex: 0,
            tileX: 29,
            tileY: 21,
            tile: 21,
            action: (pressed, layer, x, y, tile) => {
                pressed ?  layer.removeTileAt(x, y) :  layer.putTileAt(tile, x, y);
            }
        },{
            buttonIndex: 0,
            tileX: 30,
            tileY: 14,
            tile: 21,
            action: (pressed, layer, x, y, tile) => {
                pressed ?  layer.removeTileAt(x, y) :  layer.putTileAt(tile, x, y);
            }
        },{
            buttonIndex: 1,
            tileX: 30,
            tileY: 5,
            tile: 21,
            action: (pressed, layer, x, y, tile) => {
                pressed ?  layer.removeTileAt(x, y)  :  layer.putTileAt(tile, x, y);
            }
        },{
            buttonIndex: 2,
            tileX: 24,
            tileY: 9,
            tile: 21,
            action: (pressed, layer, x, y, tile) => {
                pressed ?  layer.removeTileAt(x, y)  :  layer.putTileAt(tile, x, y);
            }
        },{
            buttonIndex: 3,
            tileX: 30,
            tileY: 6,
            tile: 21,
            action: (pressed, layer, x, y, tile) => {
                pressed ?  layer.removeTileAt(x, y)  :  layer.putTileAt(tile, x, y);
            }
        },{
            buttonIndex: 3,
            tileX: 36,
            tileY: 3,
            tile: 21,
            action: (pressed, layer, x, y, tile) => {
                pressed ?  layer.removeTileAt(x, y)  :  layer.putTileAt(tile, x, y);
            }
        },{
            buttonIndex: 4,
            tileX: 37,
            tileY: 14,
            tile: 21,
            action: (pressed, layer, x, y, tile) => {
                pressed ?  layer.removeTileAt(x, y)  :  layer.putTileAt(tile, x, y);
            }
        },{
            buttonIndex: 5,
            tileX: 5,
            tileY: 2,
            tile: 21,
            action: (pressed, layer, x, y, tile) => {
                pressed ?  layer.removeTileAt(x, y)  :  layer.putTileAt(tile, x, y);
            }
        },{
            buttonIndex: 5,
            tileX: 1,
            tileY: 3,
            tile: 21,
            action: (pressed, layer, x, y, tile) => {
                pressed ?  layer.removeTileAt(x, y)  :  layer.putTileAt(tile, x, y);
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
        this.spider2.update();
        this.spider3.update();
        this.spider4.update();
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