import Melody from '../../../classes/melody.js';
import Ella from '../../../classes/ella.js';
import Button from '../../../classes/button.js';
import Portal from '../../../classes/portal.js';
import Banner from '../../../classes/banner.js';
import Window from '../../../classes/window.js';
import Block from '../../../classes/block.js';
import Spider from '../../../classes/spider.js';
import Spike from '../../../classes/spike.js';
import Anubis from '../../../classes/anubis.js';
import Torch from '../../../classes/torch.js';


export default class Level12 extends Phaser.Scene {
    constructor() {
        super("l12");
        this.transitioning = false;
        this.buttons = [];
        this.blocks = [];
        this.gameOverTriggered = false;

    }

    preload() {
        this.load.tilemapTiledJSON('world4level3', './levels/tilemaps/w4l3.json');
        this.load.image('egypt_tiles', './levels/tiles/egypt_tiles.png');
    }

    create() {
        this.scene.stop('levelText');
        this.gameOverTriggered = false;
        this.transitioning = false;

        this.cameras.main.setBackgroundColor(0xa5faf4);

        this.map = this.make.tilemap({
            key: 'world4level3'
        });
        this.tileset = this.map.addTilesetImage('egypt_tiles');
        this.bg = this.map.createLayer('bg', this.tileset);
        this.bgDecals = this.map.createLayer('decal-bg', this.tileset);
        this.back = this.map.createLayer('back', this.tileset);
        this.rearDecal = this.map.createLayer('decal-rear', this.tileset);
        this.groundLayer = this.map.createLayer('ground', this.tileset);

        this.createButtons();
        this.createBlocks();

        this.portal = new Portal(this, 12, 5);
       
        this.portal.portalEmitter.stop();



        this.melody = new Melody(this, 2 * 32, 66 * 32);
        this.ella = new Ella(this, 3 * 32, 66 * 32);

        this.anubis = new Anubis(this, 13, 66);


         new Spike(this, 6, 41, 1, 0).setPipeline('Light2D');
         new Spike(this, 7, 41, 1, 0).setPipeline('Light2D');
         new Spike(this, 8, 41, 1, 0).setPipeline('Light2D');

        //  new Spike(this, 8, 51, 1, 0).setPipeline('Light2D');
        //     new Spike(this, 9, 51, 1, 0).setPipeline('Light2D');

            new Spike(this, 18, 21, 1, 0).setPipeline('Light2D');

            new Spike(this, 1, 23, 1, 0).setPipeline('Light2D');
            new Spike(this, 2, 23, 1, 0).setPipeline('Light2D');
            new Spike(this, 3, 23, 1, 0).setPipeline('Light2D');
            new Spike(this, 4, 23, 1, 0).setPipeline('Light2D');
            new Spike(this, 5, 23, 1, 0).setPipeline('Light2D');




  


        this.transparent = this.map.createLayer('decal-front-t', this.tileset);
        this.front = this.map.createLayer('decal-front', this.tileset);
        this.front2 = this.map.createLayer('decal-front-2', this.tileset);

        new Torch(this, 2, 65);
        new Torch(this,7, 65);
        new Torch(this, 18, 65);
        new Torch(this, 2, 65);
        new Torch(this, 18, 58);
        new Torch(this, 4, 50);
        new Torch(this, 15, 39);
        new Torch(this, 15, 29);
        new Torch(this, 9, 27);
        new Torch(this, 2, 27);
        new Torch(this, 8, 19);
        new Torch(this, 14, 25);
        new Torch(this, 8, 9);


        this.groundLayer.setCollisionBetween(1, 999);
        this.physics.add.collider(this.melody, this.groundLayer);
        this.physics.add.collider(this.ella, this.groundLayer);
        this.physics.add.collider(this.anubis, this.groundLayer);


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
            this.physics.add.overlap(this.anubis, button, button.press, null, button);
            this.physics.add.overlap(this.melody, button, button.press, null, button);
            this.physics.add.overlap(this.ella, button, button.press, null, button);
            this.physics.add.overlap(this.blocks, button, button.press, null, button);
        });


        this.physics.add.overlap(this.melody, this.portal, this.checkPlayersInPortal, null, this);
        this.physics.add.overlap(this.ella, this.portal, this.checkPlayersInPortal, null, this);

        this.cameras.main.fadeIn(1000);
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.bg.setScrollFactor(0.3);
        this.back.setScrollFactor(0.3);
        this.bgDecals.setScrollFactor(0.5);

        this.lights.enable().setAmbientColor(0x36300c);


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
        this.back.setPipeline('Light2D');
        this.bg.setPipeline('Light2D');



        this.melodyLight = this.lights.addLight(this.melody.x, this.melody.y, 140)
            .setColor(0xffeebb)
            .setIntensity(0.45);
        this.ellaLight = this.lights.addLight(this.ella.x, this.ella.y, 140)
            .setColor(0xffeebb)
            .setIntensity(0.45);

            this.anubisLight = this.lights.addLight(this.anubis.x, this.anubis.y, 140)
            .setColor(0xffeb69)
            .setIntensity(0.45);





        this.input.keyboard.on("keydown-ESC", () => {
            if(!this.transitioning){
            this.sound.play('ui');
            this.scene.launch("pause", {
                scene: "l12",
                hint: "Anubis copies your movement!\nHis speed depends on BOTH players, use this to your advantage!"
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
                    nextScene: "l12",
                    priorScene: "l12"
                });
            });
        }
        });




    }

    createButtons() {
        this.buttons.forEach(b => b.destroy());
        this.buttons = [];
        this.buttons.push(new Button(this, 1, 59, 4));
        this.buttons.push(new Button(this, 20, 47, 4));
         this.buttons.push(new Button(this, 4, 41, 3));
         this.buttons.push(new Button(this, 23, 29, 4));
         this.buttons.push(new Button(this, 21, 17, 3));
         this.buttons.push(new Button(this, 21, 9, 3));
         this.buttons.push(new Button(this, 2, 12, 3));
         this.buttons.push(new Button(this, 4, 12, 3));
         this.buttons.push(new Button(this, 9, 6, 4));
         this.buttons.push(new Button(this, 15, 6, 1));



    }


    createBlocks() {
        this.blocks.forEach(b => b.destroy());
        this.blocks = [];

      //  this.blocks.push(new Block(this,28,13))

        // this.blocks.forEach((block, index) => {
        //     this.blocks.forEach((otherBlock, otherIndex) => {
        //         if (index !== otherIndex) {
        //             this.physics.add.collider(block.groundPlatform, otherBlock);
        //         }
        //     });
        // });


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
                    text1: "World 5: Jungle of the Beastmen",
                    text2: "Level 1: Ancient Ruins",
                    text3: "ONWARDS!",
                    nextScene: "l13",
                    priorScene: "l12"
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
                        currentScene: "l12"
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
                tileX: 14,
                tileY: 65,
                tile: 32,
                action: (pressed, layer, x, y, tile) => {
                    pressed ?  layer.removeTileAt(x, y) : layer.putTileAt(tile, x, y);
                }
            },{
                buttonIndex: 0,
                tileX: 14,
                tileY: 66,
                tile: 32,
                action: (pressed, layer, x, y, tile) => {
                    pressed ?  layer.removeTileAt(x, y) : layer.putTileAt(tile, x, y);
                }
            },{
                buttonIndex: 1,
                tileX: 5,
                tileY: 49,
                tile: 32,
                action: (pressed, layer, x, y, tile) => {
                    pressed ? layer.putTileAt(tile, x, y): layer.removeTileAt(x, y)
                }
            },{
                buttonIndex: 2,
                tileX: 22,
                tileY: 41,
                tile: 32,
                action: (pressed, layer, x, y, tile) => {
                    pressed ? layer.putTileAt(tile, x, y): layer.removeTileAt(x, y)
                }
            }
            ,{
                buttonIndex: 3,
                tileX: 22,
                tileY: 29,
                tile: 32,
                action: (pressed, layer, x, y, tile) => {
                    pressed ? layer.putTileAt(tile, x, y): layer.removeTileAt(x, y)
                }
            }
            ,{
                buttonIndex: 3,
                tileX: 22,
                tileY: 28,
                tile: 32,
                action: (pressed, layer, x, y, tile) => {
                    pressed ? layer.putTileAt(tile, x, y): layer.removeTileAt(x, y)
                }
            },{
                buttonIndex: 3,
                tileX: 12,
                tileY: 26,
                tile: 32,
                action: (pressed, layer, x, y, tile) => {
                    pressed ?  layer.removeTileAt(x, y) : layer.putTileAt(tile, x, y);
                }
            },{
                buttonIndex: 3,
                tileX: 12,
                tileY: 25,
                tile: 32,
                action: (pressed, layer, x, y, tile) => {
                    pressed ?  layer.removeTileAt(x, y) : layer.putTileAt(tile, x, y);
                }
            },{
                buttonIndex: 4,
                tileX: 4,
                tileY: 18,
                tile: 32,
                action: (pressed, layer, x, y, tile) => {
                    pressed ? layer.putTileAt(tile, x, y): layer.removeTileAt(x, y)
                }
            },{
                buttonIndex: 5,
                tileX: 5,
                tileY: 10,
                tile: 32,
                action: (pressed, layer, x, y, tile) => {
                    pressed ? layer.putTileAt(tile, x, y): layer.removeTileAt(x, y)
                }
            },{
                buttonIndex: 6,
                tileX: 14,
                tileY: 16,
                tile: 32,
                action: (pressed, layer, x, y, tile) => {
                    pressed ? layer.putTileAt(tile, x, y): layer.removeTileAt(x, y)
                }
            },{
                buttonIndex: 7,
                tileX: 16,
                tileY: 13,
                tile: 32,
                action: (pressed, layer, x, y, tile) => {
                    pressed ? layer.putTileAt(tile, x, y): layer.removeTileAt(x, y)
                }
            },
            {
                buttonIndex: 8,
                tileX: 11,
                tileY: 5,
                tile: 32,
                action: (pressed, layer, x, y, tile) => {
                    pressed ?  layer.removeTileAt(x, y) : layer.putTileAt(tile, x, y);
                }
            },  {
                buttonIndex: 8,
                tileX: 11,
                tileY: 6,
                tile: 32,
                action: (pressed, layer, x, y, tile) => {
                    pressed ?  layer.removeTileAt(x, y) : layer.putTileAt(tile, x, y);
                }
            },  {
                buttonIndex: 8,
                tileX: 13,
                tileY: 5,
                tile: 32,
                action: (pressed, layer, x, y, tile) => {
                    pressed ?  layer.removeTileAt(x, y) : layer.putTileAt(tile, x, y);
                }
            },  {
                buttonIndex: 8,
                tileX: 13,
                tileY: 6,
                tile: 32,
                action: (pressed, layer, x, y, tile) => {
                    pressed ?  layer.removeTileAt(x, y) : layer.putTileAt(tile, x, y);
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
        this.anubis.update(this.melody, this.ella);
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
        this.anubisLight.setPosition(this.anubis.x, this.anubis.y);

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