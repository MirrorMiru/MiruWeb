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
import Beastman from '../../../classes/beastman.js';


export default class Level14 extends Phaser.Scene {
    constructor() {
        super("l14");
        this.transitioning = false;
        this.buttons = [];
        this.blocks = [];
        this.gameOverTriggered = false;

    }

    preload() {
        this.load.tilemapTiledJSON('world5level2', './levels/tilemaps/w5l2.json');
        this.load.image('jungle-tiles', './levels/tiles/jungle-tiles.png');
    }

    create() {
        this.scene.stop('levelText');
        this.gameOverTriggered = false;
        this.transitioning = false;


        this.cameras.main.setBackgroundColor(0x000000);
        
        this.add.image(0, 0, 'treebg').setScrollFactor(0).setOrigin(0);

        const fogOverlay3 = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x303030, 0.8);
        fogOverlay3.setOrigin(0);
        fogOverlay3.setScrollFactor(0);
        fogOverlay3.blendMode = Phaser.BlendModes.MULTIPLY;
        



        this.map = this.make.tilemap({
            key: 'world5level2'
        });
        this.tileset = this.map.addTilesetImage('jungle-tiles');
        this.bg = this.map.createLayer('bg', this.tileset);
        this.bgDecals = this.map.createLayer('decal-bg', this.tileset);
        this.back = this.map.createLayer('back', this.tileset);
        this.backDecals = this.map.createLayer('decal-back', this.tileset);
        const fogOverlay2 = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x303030, 0.2);
        fogOverlay2.setOrigin(0);
        fogOverlay2.setScrollFactor(0);
        fogOverlay2.blendMode = Phaser.BlendModes.MULTIPLY;
    //    this.r2 = this.add.tileSprite(this.map.widthInPixels/2, this.map.heightInPixels/2,this.map.widthInPixels, this.map.heightInPixels, 'rain1').setAlpha(0.3);
        this.rear = this.map.createLayer('rear', this.tileset);
        this.rearDecal = this.map.createLayer('decal-rear', this.tileset)
      
       

        this.createButtons();
        

        this.portal = new Portal(this, 3, 14).setFlipX(true);
      
        this.portal.portalEmitter.stop();

        this.b1 = new Beastman(this, 32, 15, 29, 36, 1).setPipeline('Light2D');
        this.b2 = new Beastman(this, 20, 23, 19, 22, 2).setPipeline('Light2D');
        this.b3 = new Beastman(this, 33, 26, 25, 56, 3).setPipeline('Light2D');
        this.b4 = new Beastman(this, 45, 26, 25, 56, 2).setPipeline('Light2D');

        this.melody = new Melody(this, (2 * 32)+16, 26 * 32);
        this.ella = new Ella(this, 3 * 32, 26 * 32);


        new Spike(this, 18, 18, 1, 0).setPipeline('Light2D');
        new Spike(this, 23, 18, 1, 0).setPipeline('Light2D');
        new Spike(this,20, 11, 1, 0).setPipeline('Light2D');
        new Spike(this,21, 11, 1, 0).setPipeline('Light2D');
       new Spike(this, 20, 10, 1, -16).setPipeline('Light2D').setFlipY(true);
        new Spike(this, 21, 10, 1, -16).setPipeline('Light2D').setFlipY(true);

        new Spike(this, 37, 3, 1, 0).setPipeline('Light2D');
           new Spike(this, 36, 3, 1, 0).setPipeline('Light2D');
           new Spike(this, 35, 3, 1, 0).setPipeline('Light2D');
             new Spike(this, 34, 3, 1, 0).setPipeline('Light2D');
             new Spike(this, 33, 3, 1, 0).setPipeline('Light2D');

             new Spike(this, 28, 8, 1, 0).setPipeline('Light2D');
             new Spike(this, 29, 8, 1, 0).setPipeline('Light2D');

           new Spike(this, 34, 6, 1, 0).setPipeline('Light2D');

             new Spike(this, 39, 18, 1, 0).setPipeline('Light2D');
             new Spike(this, 40, 18, 1, 0).setPipeline('Light2D');
             new Spike(this, 41, 18, 1, 0).setPipeline('Light2D');
             new Spike(this, 42, 18, 1, 0).setPipeline('Light2D');
             new Spike(this, 43, 18, 1, 0).setPipeline('Light2D');

             new Spike(this, 44, 4, 1, 0).setPipeline('Light2D');
             new Spike(this, 45, 4, 1, 0).setPipeline('Light2D');
        
                new Spike(this, 48, 4, 1, 0).setPipeline('Light2D');
                

             new Spike(this, 27, 22, 1, -16).setPipeline('Light2D').setFlipY(true);
             new Spike(this, 27, 19, 1, -16).setPipeline('Light2D').setFlipY(true);

             new Spike(this, 49, 21, 1, 0).setPipeline('Light2D')

             new Spike(this, 50, 13, 1, 0).setPipeline('Light2D');
             new Spike(this, 50, 17, 1, -16).setPipeline('Light2D').setFlipY(true);

    
         

             new Spike(this, 41, 21, 1, 0).setPipeline('Light2D');
             new Spike(this, 43, 20, 1, -16).setPipeline('Light2D').setFlipY(true);

             this.groundLayer = this.map.createLayer('ground', this.tileset);

             this.createBlocks();
     

        this.transparent = this.map.createLayer('decal-front-t', this.tileset);
        this.front = this.map.createLayer('decal-front', this.tileset);
        this.front2 = this.map.createLayer('decal-front-2', this.tileset);

       
        new Torch(this, 41, 25);
         new Torch(this, 29, 25);
         new Torch(this, 18, 22);
         new Torch(this, 5, 25);
         new Torch(this, 8, 14);
            new Torch(this, 23, 15);
            new Torch(this, 44, 3);
            new Torch(this, 50, 3);
            new Torch(this, 29, 5);
       
        // new Torch(this, 9, 27);
        // new Torch(this, 2, 27);
        // new Torch(this, 8, 19);
        // new Torch(this, 14, 25);
        // new Torch(this, 8, 9);

      //  this.r = this.add.tileSprite(this.map.widthInPixels/2, this.map.heightInPixels/2,this.map.widthInPixels, this.map.heightInPixels, 'rain2').setAlpha(0.5);

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
        this.bg.setScrollFactor(0.3);
        this.bgDecals.setScrollFactor(0.3);
        this.back.setScrollFactor(0.5);
        this.backDecals.setScrollFactor(0.5);

        this.lights.enable().setAmbientColor(0x778066);


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
        this.bgDecals.setPipeline('Light2D');
        this.rear.setPipeline('Light2D');




        this.melodyLight = this.lights.addLight(this.melody.x, this.melody.y, 140)
            .setColor(0xffeebb)
            .setIntensity(0.45);
        this.ellaLight = this.lights.addLight(this.ella.x, this.ella.y, 140)
            .setColor(0xffeebb)
            .setIntensity(0.45);

      

    



        this.input.keyboard.on("keydown-ESC", () => {
            if(!this.transitioning){
            this.sound.play('ui');
            this.scene.launch("pause", {
                scene: "l14",
                hint: "Split up, one player goes to the long platform with the foxman, while the other climbs through the tunnel to the right and help their friend climb up the crane.\n\nUse timing and coordination to make it to the red button hanging over the crane.\n\nThen move right and activate the purple button. Go back to the beginning and climb up to the portal! "
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
                    nextScene: "l14",
                    priorScene: "l14"
                });
            });
        }
        });




    }

    createButtons() {
        this.buttons.forEach(b => b.destroy());
        this.buttons = [];
          this.buttons.push(new Button(this, 20, 8, 4).setPipeline('Light2D'));//29
          this.buttons.push(new Button(this, 57, 12, 3).setPipeline('Light2D'));
           this.buttons.push(new Button(this, 48, 10, 4).setPipeline('Light2D'));

           this.buttons.push(new Button(this, 43, 6, 3).setPipeline('Light2D'));
           this.buttons.push(new Button(this, 45, 6, 3).setPipeline('Light2D'));
           this.buttons.push(new Button(this, 47, 6, 3).setPipeline('Light2D'));
           this.buttons.push(new Button(this, 49, 6, 3).setPipeline('Light2D'));


          this.buttons.push(new Button(this, 50, 4, 1).setPipeline('Light2D'));



    }


    createBlocks() {
        this.blocks.forEach(b => b.destroy());
        this.blocks = [];

        //this.blocks.push(new Block(this,47,18).setPipeline('Light2D'));

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
                    text1: "World 5: Jungle of the Beastmen",
                    text2: "Level 3: Waterfall at the Border",
                    text3: "GOOD JOB!",
                    nextScene: "l15",
                    priorScene: "l14"
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
                        currentScene: "l14"
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
                tileX: 9,
                tileY: 24,
                tile: 29,
                action: (pressed, layer, x, y, tile) => {
                    pressed ?  layer.putTileAt(tile, x, y) :  layer.removeTileAt(x, y);
                }
            },{
                buttonIndex: 0,
                tileX: 16,
                tileY: 2,
                tile: 29,
                action: (pressed, layer, x, y, tile) => {
                    pressed ?  layer.putTileAt(tile, x, y) :  layer.removeTileAt(x, y);                }
            },{
                buttonIndex: 0,
                tileX: 16,
                tileY: 3,
                tile: 29,
                action: (pressed, layer, x, y, tile) => {
                    pressed ?  layer.putTileAt(tile, x, y) :  layer.removeTileAt(x, y);                }
            },
            {
                buttonIndex: 0,
                tileX: 16,
                tileY: 4,
                tile: 29,
                action: (pressed, layer, x, y, tile) => {
                    pressed ?  layer.putTileAt(tile, x, y) :  layer.removeTileAt(x, y);                }
            },
            {
                buttonIndex: 0,
                tileX: 16,
                tileY: 5,
                tile: 29,
                action: (pressed, layer, x, y, tile) => {
                    pressed ?  layer.putTileAt(tile, x, y) :  layer.removeTileAt(x, y);                }
            },
            {
                buttonIndex: 0,
                tileX: 16,
                tileY: 6,
                tile: 29,
                action: (pressed, layer, x, y, tile) => {
                    pressed ?  layer.putTileAt(tile, x, y) :  layer.removeTileAt(x, y);                }
            },
            {
                buttonIndex: 0,
                tileX: 16,
                tileY: 7,
                tile: 29,
                action: (pressed, layer, x, y, tile) => {
                    pressed ?  layer.putTileAt(tile, x, y) :  layer.removeTileAt(x, y);                }
            },{
                buttonIndex: 0,
                tileX: 16,
                tileY: 8,
                tile: 29,
                action: (pressed, layer, x, y, tile) => {
                    pressed ?  layer.putTileAt(tile, x, y) :  layer.removeTileAt(x, y);                }
            },{
                buttonIndex: 0,
                tileX: 25,
                tileY: 9,
                tile: 29,
                action: (pressed, layer, x, y, tile) => {
                    pressed ?  layer.putTileAt(tile, x, y) :  layer.removeTileAt(x, y);                }
            },{
                buttonIndex: 0,
                tileX: 26,
                tileY: 9,
                tile: 29,
                action: (pressed, layer, x, y, tile) => {
                    pressed ?  layer.putTileAt(tile, x, y) :  layer.removeTileAt(x, y);                }
            },{
                buttonIndex: 1,
                tileX: 43,
                tileY: 15,
                tile: 29,
                action: (pressed, layer, x, y, tile) => {
                    pressed ?  layer.putTileAt(tile, x, y) :  layer.removeTileAt(x, y);                }
            },
            {
                buttonIndex: 2,
                tileX: 39,
                tileY: 11,
                tile: 29,
                action: (pressed, layer, x, y, tile) => {
                    pressed ?  layer.putTileAt(tile, x, y) :  layer.removeTileAt(x, y);                }
            },
            {
                buttonIndex: 3,
                tileX: 43,
                tileY: 2,
                tile: 29,
                action: (pressed, layer, x, y, tile) => {
                    pressed ? layer.removeTileAt(x, y) : layer.putTileAt(tile, x, y);
                }
            },{
                buttonIndex: 3,
                tileX: 43,
                tileY: 3,
                tile: 29,
                action: (pressed, layer, x, y, tile) => {
                    pressed ? layer.removeTileAt(x, y) : layer.putTileAt(tile, x, y);
                }
            },{
                buttonIndex: 3,
                tileX: 43,
                tileY: 4,
                tile: 29,
                action: (pressed, layer, x, y, tile) => {
                    pressed ? layer.removeTileAt(x, y) : layer.putTileAt(tile, x, y);
                }
            },{
                buttonIndex: 4,
                tileX: 45,
                tileY: 2,
                tile: 29,
                action: (pressed, layer, x, y, tile) => {
                    pressed ? layer.removeTileAt(x, y) : layer.putTileAt(tile, x, y);
                }
            },{
                buttonIndex: 4,
                tileX: 45,
                tileY: 3,
                tile: 29,
                action: (pressed, layer, x, y, tile) => {
                    pressed ? layer.removeTileAt(x, y) : layer.putTileAt(tile, x, y);
                }
            },{
                buttonIndex: 4,
                tileX: 45,
                tileY: 4,
                tile: 29,
                action: (pressed, layer, x, y, tile) => {
                    pressed ? layer.removeTileAt(x, y) : layer.putTileAt(tile, x, y);
                }
            },{
                buttonIndex: 5,
                tileX: 47,
                tileY: 2,
                tile: 29,
                action: (pressed, layer, x, y, tile) => {
                    pressed ? layer.removeTileAt(x, y) : layer.putTileAt(tile, x, y);
                }
            },{
                buttonIndex: 5,
                tileX: 47,
                tileY: 3,
                tile: 29,
                action: (pressed, layer, x, y, tile) => {
                    pressed ? layer.removeTileAt(x, y) : layer.putTileAt(tile, x, y);
                }
            },{
                buttonIndex: 5,
                tileX: 47,
                tileY: 4,
                tile: 29,
                action: (pressed, layer, x, y, tile) => {
                    pressed ? layer.removeTileAt(x, y) : layer.putTileAt(tile, x, y);
                }
            },{
                buttonIndex: 6,
                tileX: 49,
                tileY: 2,
                tile: 29,
                action: (pressed, layer, x, y, tile) => {
                    pressed ? layer.removeTileAt(x, y) : layer.putTileAt(tile, x, y);
                }
            },{
                buttonIndex: 6,
                tileX: 49,
                tileY: 3,
                tile: 29,
                action: (pressed, layer, x, y, tile) => {
                    pressed ? layer.removeTileAt(x, y) : layer.putTileAt(tile, x, y);
                }
            },{
                buttonIndex: 6,
                tileX: 49,
                tileY: 4,
                tile: 29,
                action: (pressed, layer, x, y, tile) => {
                    pressed ? layer.removeTileAt(x, y) : layer.putTileAt(tile, x, y);
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
      //  this.r.tilePositionY -= 9;
       //th this.r2.tilePositionY -= 5;
        this.melody.update();
        this.ella.update();
        this.b1.update();
        this.b2.update();
        this.b3.update();
        this.b4.update();
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