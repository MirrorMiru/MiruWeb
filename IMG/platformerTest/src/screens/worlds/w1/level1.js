import Melody from '../../../classes/melody.js';
import Ella from '../../../classes/ella.js';
import Button from '../../../classes/button.js';
import Block from '../../../classes/block.js';
import Portal from '../../../classes/portal.js';
import Torch from '../../../classes/torch.js';

export default class Level1 extends Phaser.Scene {
    constructor() {
        super("l1");
        this.transitioning = false;
        this.buttons = [];
        this.blocks = [];
    }

    preload() {
        this.load.tilemapTiledJSON('world1level1', './levels/tilemaps/w1l1.json');
        this.load.image('cadence-tiles', './levels/tiles/cadence-tiles.png');
    }

    create() {
        this.transitioning = false;

        this.scene.stop('levelText');
        this.scene.get('OSTManager').crossfadeTo('world1', 500);

        this.map = this.make.tilemap({
            key: 'world1level1'
        });

        this.tileset = this.map.addTilesetImage('cadence-tiles');
        this.bg = this.map.createLayer('bg', this.tileset);
        this.bgDecals = this.map.createLayer('decal-bg', this.tileset);
        this.back = this.map.createLayer('back', this.tileset);
        this.rearDecal = this.map.createLayer('decal-rear', this.tileset);
        this.groundLayer = this.map.createLayer('ground', this.tileset);

        new Torch(this, 11, 20);
        new Torch(this, 15, 20);
        new Torch(this, 19, 20);

        new Torch(this, 2, 4);
        new Torch(this, 4, 4);

        new Torch(this, 31, 13);
        new Torch(this, 31, 7);

        this.createButtons();
        this.createBlocks();

        this.portal = new Portal(this, 37, 20);
        this.portal.portalEmitter.stop();
        this.portal.active = false;

        this.melody = new Melody(this, 144, 560);
        this.ella = new Ella(this, 224, 680);

        this.transparent = this.map.createLayer('decal-front-t', this.tileset);
        this.front = this.map.createLayer('decal-front', this.tileset);

        this.groundLayer.setCollisionBetween(1, 16);
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

        this.lights.enable().setAmbientColor(0x444444);

        this.topLight = this.lights.addLight(this.cameras.main.width / 2, -500, 600)
            .setColor(0xffccaa)
            .setIntensity(0.6);

        // Add light sources for the players
        this.melodyLight = this.lights.addLight(this.melody.x, this.melody.y, 140)
            .setColor(0xffddbb)
            .setIntensity(0.3);

        this.ellaLight = this.lights.addLight(this.ella.x, this.ella.y, 140)
            .setColor(0xffddbb)
            .setIntensity(0.3);

        // Enable shadows for the objects
        this.melody.setPipeline('Light2D');
        this.ella.setPipeline('Light2D');
        this.blocks.forEach(block => block.setPipeline('Light2D'));
        this.buttons.forEach(button => button.setPipeline('Light2D'));
        this.portal.setPipeline('Light2D');
        this.groundLayer.setPipeline('Light2D');
        this.back.setPipeline('Light2D');
        this.rearDecal.setPipeline('Light2D');
        this.transparent.setPipeline('Light2D');
        this.front.setPipeline('Light2D');
        this.bg.setPipeline('Light2D');
        this.bgDecals.setPipeline('Light2D');

        
        this.input.keyboard.on("keydown-ESC", () => {
            if(!this.transitioning) {
            this.sound.play('ui');
            this.scene.launch("pause", {
                scene: "l1",
                hint: "Press all 3 buttons. \n\n Red buttons stay pushed, blue buttons need to be held. \n\n There is a block hidden above the throne. \n\n DO NOT push the block left!!! \n\n Press [R] if you softlock."
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
                    nextScene: "l1",
                    priorScene: "l1"
                });
            });
        }
        });

    }

    createButtons() {
        this.buttons.forEach(b => b.destroy());
        this.buttons = [];
        this.buttons.push(new Button(this, 11, 8, 1));
        this.buttons.push(new Button(this, 19, 6, 1));
        this.buttons.push(new Button(this, 3, 21, 2));
    }

    createBlocks() {
        this.blocks.forEach(b => b.destroy());
        this.blocks = [];
        this.blocks.push(new Block(this, 3, 5));
    }

    checkPlayersInPortal() {
        if (this.portal.active &&
            this.physics.overlap(this.melody, this.portal) &&
            this.physics.overlap(this.ella, this.portal)) {
            this.transitioning = true;
            this.portal.active = false;
            this.sound.play("teleport")
            this.cameras.main.fadeOut(1000);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start("levelText", {
                    text1: "World 1: Cadence",
                    text2: "Level 2: Melody's Castle",
                    text3: "GOOD JOB!",
                    nextScene: "l2",
                    priorScene: "l1"
                });
            });
        }
    }

    update() {

        this.melody.update();
        this.ella.update();
        this.blocks.forEach(block => block.update());
        this.buttons.forEach(button => button.update(this));
        if(this.buttons.length > 0){this.portal.update(this.buttons.every(button => button.isPressed));}
     
        // Update the light position to follow the camera
        this.topLight.setPosition(this.cameras.main.midPoint.x, this.cameras.main.midPoint.y - this.cameras.main.height / 2);

        this.melodyLight.setPosition(this.melody.x, this.melody.y);
        this.ellaLight.setPosition(this.ella.x, this.ella.y);

        const pulse = 0.5 + Math.sin(this.time.now * 0.005) * 0.3;
        this.portal.portalLight.setIntensity(this.portal.active ? pulse : 0);

        const midX = (this.melody.x + this.ella.x) / 2;
        const midY = (this.melody.y + this.ella.y) / 2;

        this.cameras.main.scrollX = Phaser.Math.Linear(this.cameras.main.scrollX, midX - this.cameras.main.width / 2, 0.1);
        this.cameras.main.scrollY = Phaser.Math.Linear(this.cameras.main.scrollY, midY - this.cameras.main.height / 2, 0.1);
    }
}