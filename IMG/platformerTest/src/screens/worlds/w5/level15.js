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
import MovingWall from '../../../classes/movingwall.js';

export default class Level15 extends Phaser.Scene {
    constructor() {
        super("l15");
        this.transitioning = false;
        this.buttons = [];
        this.blocks = [];
        this.gameOverTriggered = false;
        this.wallactive = false;

    }

    preload() {
        this.load.tilemapTiledJSON('world5level3', './levels/tilemaps/w5l3.json');
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
            key: 'world5level3'
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
        this.rear = this.map.createLayer('rear',this.tileset)
        this.rearDecal = this.map.createLayer('decal-rear', this.tileset)
      
       

        this.createButtons();
        

        this.portal = new Portal(this, 73, 3);
      
        this.portal.portalEmitter.stop();

        // this.b1 = new Beastman(this, 32, 15, 29, 36, 1).setPipeline('Light2D');
        // this.b2 = new Beastman(this, 20, 23, 19, 22, 2).setPipeline('Light2D');
        // this.b3 = new Beastman(this, 33, 26, 25, 56, 3).setPipeline('Light2D');
        // this.b4 = new Beastman(this, 45, 26, 25, 56, 2).setPipeline('Light2D');

        this.melody = new Melody(this, (9 * 32)+16, 26 * 32);
        this.ella = new Ella(this, 10 * 32, 26 * 32);
        this.wallactive = false;

        new Spike(this,35, 18, 1, 0).setPipeline('Light2D');
        new Spike(this,34, 22, 1, 0).setPipeline('Light2D');
        new Spike(this, 35, 20, 1, -16).setPipeline('Light2D').setFlipY(true);

  
             this.groundLayer = this.map.createLayer('ground', this.tileset);

             this.createBlocks();
     

        this.transparent = this.map.createLayer('decal-front-t', this.tileset);
        this.front = this.map.createLayer('decal-front', this.tileset);
        this.front2 = this.map.createLayer('decal-front-2', this.tileset);

      
      
         new Torch(this, 12, 26);
          new Torch(this, 31, 7);
         new Torch(this, 37, 10);
          new Torch(this, 35, 21);
          new Torch(this, 46, 21);
        //     new Torch(this, 23, 15);
        //     new Torch(this, 44, 3);
        //     new Torch(this, 50, 3);
        //     new Torch(this, 29, 5);
       
        // new Torch(this, 9, 27);
        // new Torch(this, 2, 27);
        // new Torch(this, 8, 19);
        // new Torch(this, 14, 25);
        // new Torch(this, 8, 9);

        this.r = this.add.tileSprite(this.map.widthInPixels/2, this.map.heightInPixels/2,this.map.widthInPixels, this.map.heightInPixels, 'rain2').setAlpha(0.3);

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
        this.wall = new MovingWall(this, -32, 0, (29*32), 0.5);
      




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
                scene: "l15",
                hint: "The spike wall will start moving once you pass the wooden collumn.\n\nThere is no room for mistakes, the platforming must be done quickly and carefully.\n\nHelp each other across with the yellow buttons.\n\nAfter passing though the building and climbing the stone split up and press both red buttons."
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
                    nextScene: "l15",
                    priorScene: "l15"
                });
            });
        }
        });




    }

    createButtons() {
        this.buttons.forEach(b => b.destroy());
        this.buttons = [];
          this.buttons.push(new Button(this, 19,11, 3).setPipeline('Light2D'));//29
           this.buttons.push(new Button(this, 31, 8, 3).setPipeline('Light2D'));
        //    this.buttons.push(new Button(this, 48, 10, 4).setPipeline('Light2D'));

        //    this.buttons.push(new Button(this, 43, 6, 3).setPipeline('Light2D'));
        //    this.buttons.push(new Button(this, 45, 6, 3).setPipeline('Light2D'));
        //    this.buttons.push(new Button(this, 47, 6, 3).setPipeline('Light2D'));
            this.buttons.push(new Button(this, 63, 18, 1).setPipeline('Light2D'));


           this.buttons.push(new Button(this, 63, 9, 1).setPipeline('Light2D'));



    }


    createBlocks() {
        this.blocks.forEach(b => b.destroy());
        this.blocks = [];

      //  this.blocks.push(new Block(this,47,18).setPipeline('Light2D'));

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
                    text1: "World 6: Nuji",
                    text2: "Level 1: Outskirts of Nuji",
                    text3: "ONWARDS!",
                    nextScene: "l16",
                    priorScene: "l15"
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
                        currentScene: "l15"
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
                tileX: 24,
                tileY: 10,
                tile: 29,
                action: (pressed, layer, x, y, tile) => {
                    pressed ?  layer.putTileAt(tile, x, y) :  layer.removeTileAt(x, y);
                }
            },{
                buttonIndex: 1,
                tileX: 26,
                tileY: 10,
                tile: 29,
                action: (pressed, layer, x, y, tile) => {
                    pressed ?  layer.putTileAt(tile, x, y) :  layer.removeTileAt(x, y);                }
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
        this.r.tilePositionY -= 7;
        this.melody.update();
        this.ella.update();
        this.wall.update();
        // this.b1.update();
        // this.b2.update();
        // this.b3.update();
        // this.b4.update();
        this.blocks.forEach(block => block.update());
        this.buttons.forEach(button => button.update(this));
        this.portal.update(
            this.buttons
              .filter(button => button.type !== 3 && button.type !== 4)
              .every(button => button.isPressed) &&
            this.buttons.some(button => button.type !== 3 && button.type !== 4)
          );
          


        if (!this.wallactive && (this.melody.x > (14 * 32) - 16 || this.ella.x > (14 * 32) - 16) && !this.portal.active) {
          
            this.wall.start();
            this.cameras.main.shake(200, 0.0025);
            this.wallactive = true;
            this.sound.play("button2")

        }else if(this.wallactive && this.portal.active){
            this.wall.stop();
            this.wallactive = false;
            this.cameras.main.shake(200, 0.0025);
            this.sound.play("button2")
        }

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