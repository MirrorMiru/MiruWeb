let player, playerImage, groundSensor, hitBox, overlapper;
let player2, player2Image, groundSensor2, hitBox2, overlapper2;
let TiffIdle, TiffWalk, TiffAttack;
let ClaireIdle, ClaireWalk, ClaireAttack;
let ZombiIdle, ZombiWalk, ZombiAttack;
let SamIdle, SamWalk, SamAttack;
let GirlIdle, GirlWalk, GirlAttack;
let PrincessIdle, PrincessWalk, PrincessAttack;

let groundGroup, playerGroup;

let p1, p2, p3;

let minZoom = 0.65; // Minimum zoom level (further out)
let maxZoom = 0.85; // Maximum zoom level (closer in)
let maxDistance = 650; // Distance at which minimum zoom applies
let distance;

let p1Spawn = [100, 100];
let p2Spawn = [1300, 100];

let gameState = 0;

let p1skin = 0;
let p2skin = 2;

let buttonsCreated = false;

let hit, miss;

// let speed1, speed2;
// let kb1y, kb1x, kb2y, kb2x;
// let j1, j2;
// let h1, h2;

let bg, SelectBg, cityMSpaint;
let selectTiffp1, selectTiffp2, selectSamp1, selectSamp2, selectClairep1, selectClairep2, selectZombip1, selectZombip2, selectGirlp1, selectGirlp2, selectRedp1, selectRedp2;
let selectI1, selectI2;
let instr;
let howto = false;

let ui, ui2, g1, g2;

let started = false;
let ended = false;

let end;



function preload() {

    hit = loadSound("./audio/hit.mp3");
    miss = loadSound("./audio/miss.mp3");


    SamWalk = loadAni(
        "./images/Sammson/SammyRun1.png",
        "./images/Sammson/SammyRunMid.png",
        "./images/Sammson/SammyRun3.png",
        "./images/Sammson/SammyRunMid.png"
    );
    SamIdle = loadAni(
        "./images/Sammson/SammyIdle1.png",
        "./images/Sammson/SammyIdle2.png",
        "./images/Sammson/SammyIdle3.png",
        "./images/Sammson/SammyIdle4.png",
        "./images/Sammson/SammyIdle3.png",
        "./images/Sammson/SammyIdle2.png"
    );

    SamAttack = loadAni(
        "./images/Sammson/SammyAttack1.png",
        "./images/Sammson/SammyAttack2.png"
    );

    ZombiAttack = loadAni(
        "./images/Zombi/ZombiAttack.png",
        "./images/Zombi/interrupt.png"
    );
    ZombiWalk = loadAni(
        "./images/Zombi/ZombiRun1.png",
        "./images/Zombi/ZombiRunMid.png",
        "./images/Zombi/ZombiRun3.png",
        "./images/Zombi/ZombiRunMid.png"
    );
    ZombiIdle = loadAni(
        "./images/Zombi/ZombiIdle1.png",
        "./images/Zombi/ZombiIdle2.png"
    );

    ClaireWalk = loadAni(
        "./images/Claire/ClaireRun1.png",
        "./images/Claire/ClaireRunMid.png",
        "./images/Claire/ClaireRun3.png",
        "./images/Claire/ClaireRunMid.png"
    );
    ClaireIdle = loadAni(
        "./images/Claire/ClaireIdle1.png",
        "./images/Claire/ClaireIdle2.png"
    );
    ClaireAttack = loadAni(
        "./images/Claire/ClaireAttack1.png",
        "./images/Claire/ClaireAttack1.png",
        "./images/Claire/ClaireAttack2.png",
        "./images/Claire/ClaireAttack3.png",
        "./images/Claire/ClaireAttack3.png"
    )

    TiffWalk = loadAni(
        "./images/Tiffany/TiffRun1.png",
        "./images/Tiffany/TiffRunMid.png",
        "./images/Tiffany/TiffRun3.png",
        "./images/Tiffany/TiffRunMid.png"
    );
    TiffIdle = loadAni(
        "./images/Tiffany/TiffIdle1.png",
        "./images/Tiffany/TiffIdle2.png"
    );
    TiffAttack = loadAni(
        "./images/Tiffany/TiffAttack1.png",
        "./images/Tiffany/TiffAttack2.png",
        "./images/Tiffany/TiffAttack3.png",
        "./images/Tiffany/TiffAttack3.png",
        "./images/Tiffany/TiffAttack3.png"
    );

    GirlWalk = loadAni(
        "./images/Objective/girlRun0.png",
        "./images/Objective/girlRunMid.png",
        "./images/Objective/girlRun4.png",
        "./images/Objective/girlRunMid.png"
    );
    GirlIdle = loadAni(
        "./images/Objective/girlIdle1.png",
        "./images/Objective/girlIdle2.png"
    );
    GirlAttack = loadAni(
        "./images/Objective/girlHit1.png",
        "./images/Objective/girlHit2.png",
        "./images/Objective/girlHit3.png",
        "./images/Objective/girlHit4.png",
    );

    PrincessWalk = loadAni(
        "./images/Princess/redRun1.png",
        "./images/Princess/redRunMid.png",
          "./images/Princess/redRun3.png",
          "./images/Princess/redRunMid.png"
    );
    
    PrincessIdle= loadAni(
        "./images/Princess/redIdle1.png",
        "./images/Princess/redIdle2.png"
    );
    PrincessAttack = loadAni(
       "./images/Princess/redAttack1.png",
            "./images/Princess/break.png"
    );

    SelectBg = loadAni(
        "./images/charSelect/bg.png"
    )

    cityMSpaint = loadAni(
        "./images/cityBg/cbg1.png",
        "./images/cityBg/cbg2.png",
        "./images/cityBg/cbg3.png",
        "./images/cityBg/cbg4.png",
        "./images/cityBg/cbg5.png",
        "./images/cityBg/cbg6.png",
        "./images/cityBg/cbg7.png",
        "./images/cityBg/cbg8.png",
        "./images/cityBg/cbg9.png",
        "./images/cityBg/cbg10.png",
        "./images/cityBg/cbg11.png",
        "./images/cityBg/cbg12.png",
        "./images/cityBg/cbg13.png",
        "./images/cityBg/cbg14.png",
        "./images/cityBg/cbg15.png",
        "./images/cityBg/cbg16.png",
       // "./images/cityBg/cbg17.png",
        "./images/cityBg/cbg18.png"
    );
    

    selectClairep1 = loadAni(
        "./images/charSelect/p1Claire.png"
    );
    selectClairep2 = loadAni(
        "./images/charSelect/p2Claire.png"
    );

    selectSamp1 = loadAni(
        "./images/charSelect/p1Sammson.png"
    );

    selectSamp2 = loadAni(
        "./images/charSelect/p2Sammson.png"
    );

    selectTiffp1 = loadAni(
        "./images/charSelect/p1Tiffany.png"
    );

    selectTiffp2 = loadAni(
        "./images/charSelect/p2Tiffany.png"
    );

    selectZombip1 = loadAni(
        "./images/charSelect/p1Zombi.png"
    );

    selectZombip2 = loadAni(
        "./images/charSelect/p2Zombi.png"
    );


    selectGirlp1 = loadAni(
        "./images/charSelect/p1Girl.png"
    );

    selectGirlp2 = loadAni(
        "./images/charSelect/p2Girl.png"
    );

    selectRedp1 = loadAni(
        "./images/charSelect/p1Princess.png"
    );

    selectRedp2 = loadAni(
        "./images/charSelect/p2Princess.png"
    );

    instr = loadAni(
        "./images/instructions.png"
    )
    instr.scale = 0.5;

    TiffIdle.frameDelay = 40;
    TiffWalk.frameDelay = 15;
    TiffAttack.frameDelay = 5;

    ClaireIdle.frameDelay = 40;
    ClaireWalk.frameDelay = 16;
    ClaireAttack.frameDelay = 5;

    ZombiAttack.frameDelay = 20;
    ZombiIdle.frameDelay = 40;
    ZombiWalk.frameDelay = 10;

    SamIdle.frameDelay = 20;
    SamWalk.frameDelay = 18;
    SamAttack.frameDelay = 80;

    GirlIdle.frameDelay = 40;
    GirlWalk.frameDelay = 16;
    GirlAttack.frameDelay = 15;

    
    PrincessIdle.frameDelay = 40;
    PrincessWalk.frameDelay = 18;
    PrincessAttack.frameDelay = 40;

    cityMSpaint.scale = 1.10
    cityMSpaint.frameDelay = 20

    SelectBg.scale.x = 2.165;
}

function setup() {
   // new Canvas(1400, 800);
    createCanvas(1400, 800, P2D);
    displayMode('centered');
    bg = new Sprite(700, 400, 0, 0, 'n')
    bg.addAni("placeholder", cityMSpaint)
    bg.addAni("select", SelectBg)
    end = new Sprite(700,100,700,400,'n');
    end.color = 'white';
    end.strokeWeight = 5;
    end.stroke = 'black'
    end.visible = false;
    end.textSize = 50;
}

function draw() {
    clear()
    background(200);

    if (gameState == 0) {
        charSelectScreen();


        if(!howto){
    if(kb.presses("arrowLEFT")){
        camera.moveTo(selectI1.x,selectI1.y, 15)
        b1.moveTo(selectI1.x + 550, b1.y, 5)
        b2.moveTo(selectI1.x + 550, b2.y, 5)
        if(!started) started = true;
     }//skibidi
     if(kb.presses("arrowRIGHT")){
        camera.moveTo(selectI2.x,selectI2.y, 15)
        b1.moveTo(selectI2.x - 550, b1.y, 5)
        b2.moveTo(selectI2.x -  550, b2.y, 5)
        if(!started) started = true;
     }
    }
    } else if (gameState == 1) {
        distance = dist(player.x, player.y, player2.x, player2.y);
        camera.zoom = map(constrain(distance, 0, maxDistance), 0, maxDistance, maxZoom, minZoom);    
        gamePlayScreen();
    }
}



function charSelectScreen() {

    if (!buttonsCreated) {
        b1 = new Sprite(700, 650, 200, 100,'k');
        b1.color = 'white';
        b1.strokeWeight = 5;
        b1.textSize = 25;
        b1.text = 'Wanna take\nthis outside!?';
        b1.visible = false;

        b2 = new Sprite(700, 100, 200, 100,'k');
        b2.color = 'white';
        b2.strokeWeight = 5;
        b2.textSize = 25;
        b2.text = 'HOW TO PLAY';

        b8 = new Sprite(700, 650, 500, 100,'n');
        b8.color = 'white';
        b8.strokeWeight = 5;
        b8.stroke = 'black'
        b8.textSize = 25;
        b8.text = 'Press [<-] to select P1, [->] for P2\nThen tap the character to change them!';
        


        b3 = new Sprite(-350, 400, 600, 800,'k');
        b3.color = 'white'
        b3.opacity = 0.0000001


        b4 = new Sprite(1750, 400, 600, 800,'k');
        b4.color = 'white'
        b4.opacity = 0.0000001

        
        b6 = new Sprite(150, 400, 400, 600,'k');
        b6.color = 'white'
        b6.strokeWeight = 5;
        b6.stroke = 'black'
        b6.textSize = 40
    


        b7 = new Sprite(1250, 400, 400, 600,'k');
        b7.color = 'white'
        b7.strokeWeight = 5;
        b7.stroke = 'black'
        b7.textSize = 40


     


        selectI1 = new Sprite(0, 400, 0, 0, 'n')
        selectI1.addAni("Tiffany", selectTiffp1)
        selectI1.addAni("Sammson", selectSamp1)
        selectI1.addAni("Claire", selectClairep1)
        selectI1.addAni("Zombi", selectZombip1)
        selectI1.addAni("Girl", selectGirlp1)
        selectI1.addAni("Princess", selectRedp1)

        selectI2 = new Sprite(1400, 400, 0, 0, 'n')
        selectI2.addAni("Tiffany", selectTiffp2)
        selectI2.addAni("Sammson", selectSamp2)
        selectI2.addAni("Claire", selectClairep2)
        selectI2.addAni("Zombi", selectZombip2)
        selectI2.addAni("Girl", selectGirlp2)
        selectI2.addAni("Princess", selectRedp2)


        b5 = new Sprite(700,500,0,0,'n')
        b5.addAni("stupidImagePropertyNotWorking",instr)
        b5.visible = false
      

        buttonsCreated = true; // Mark buttons as created.
    }

    if(started){
        b8.visible = false;
        b1.visible = true;
    }

    
    if (p1skin == 0) {
        b6.text = "Tiffany\n\nSpeed: 5\nAttack: 10/5\nJump: 9\nJumps: 2\n\nSpecial:\nNONE\n"
        selectI1.changeAni("Tiffany")
    } else if (p1skin == 1) {
        b6.text = "C14IR3\n\nSpeed: 6\nAttack:\n(1-18)/(-5-5)\nJump: 10\nJumps: 1\n\nSpecial:\nAttack scales\nwith speed!\n"
        selectI1.changeAni("Claire")
    } else if (p1skin == 2) {
        b6.text = "Zombi\n\nSpeed: 10\nAttack: 10/0\nJump: 6\nJumps: 3\n\nSpecial:\nLunge attack!\n"
        selectI1.changeAni("Zombi")
    } else if (p1skin == 3) {
          b6.text = "Sammson\n\nSpeed: 3\nAttack: 25/-5\nJump: 6\nJumps: 1\n\nSpecial:\nSlam attack!"
        selectI1.changeAni("Sammson")
    } else if (p1skin == 4) {
        b6.text = "Girl\n\nSpeed: 4\nAttack: 10/10\nJump: 10\nJumps: 2\n\nSpecial:\nFloaty!"
        selectI1.changeAni("Girl")
    }
    else if (p1skin == 5) {
          b6.text = "Princess\n\nSpeed: 3\nAttack: 5/20\nJump: 8\nJumps: 2\n\nSpecial:\Uppercut!"
        selectI1.changeAni("Princess")
    }

    if (p2skin == 0) {
      b7.text = "Tiffany\n\nSpeed: 5\nAttack: 10/5\nJump: 9\nJumps: 2\n\nSpecial:\nNONE\n"
        selectI2.changeAni("Tiffany")
    } else if (p2skin == 1) {
        b7.text = "C14IR3\n\nSpeed: 6\nAttack:\n(1-18)/(-5-5)\nJump: 10\nJumps: 1\n\nSpecial:\nAttack scales\nwith speed!\n"
        selectI2.changeAni("Claire")
    } else if (p2skin == 2) {
        b7.text = "Zombi\n\nSpeed: 10\nAttack: 10/0\nJump: 6\nJumps: 3\n\nSpecial:\nLunge attack!\n"
        selectI2.changeAni("Zombi")
    } else if (p2skin == 3) {
        b7.text = "Sammson\n\nSpeed: 3\nAttack: 25/-5\nJump: 6\nJumps: 1\n\nSpecial:\nSlam attack!"
        selectI2.changeAni("Sammson")
    } else if (p2skin == 4) {
        b7.text = "Girl\n\nSpeed: 4\nAttack: 10/10\nJump: 10\nJumps: 2\n\nSpecial:\nFloaty!"
        selectI2.changeAni("Girl")
    }else if (p2skin == 5) {
        b7.text = "Princess\n\nSpeed: 3\nAttack: 5/20\nJump: 8\nJumps: 2\n\nSpecial:\Uppercut!"
        selectI2.changeAni("Princess")
    }

    b5.x = camera.x;
    b5.y = camera.y;

    if(!howto){
    if (b1.mouse.hovering()) b1.color = 'grey';
    else b1.color = 'white';

    if (b3.mouse.hovering() && started) {selectI1.tint = '#969696';b6.visible = true}
    else {selectI1.tint = 'white';b6.visible = false}

    if (b4.mouse.hovering() && started) {selectI2.tint = '#969696';b7.visible = true}
    else {selectI2.tint = 'white';b7.visible = false}

    if (b3.mouse.presses()) {
        if (p1skin < 5) {
            p1skin++;
        } else if (p1skin == 5) {
            p1skin = 0;
        }
    }

    if (b4.mouse.presses()) {
        if (p2skin < 5) {
            p2skin++;
        } else if (p2skin == 5) {
            p2skin = 0;
        }
    }    

    if (b1.mouse.pressing()) {
        camera.x = 700;
        camera.y = 400;
        initializeGame(false);
        gameState = 1;
    }

    b2.text = "HOW TO PLAY";
    b5.visible = false;
}else{
    b5.visible = true;
    b2.text = "CLOSE";

}

  
if (b2.mouse.hovering()) b2.color = 'grey';
else b2.color = 'white';

if (b2.mouse.presses()) {
    howto = !howto;
 }


}

function initializeGame(debugMode) {
    mouse.visible = false;
 
     camera.x = 700;
     camera.y = 400;

     camera.moveTo(700,400)

	

    bg.changeAni("placeholder")

    b1.remove()
    b2.remove()
    b3.remove();
    b4.remove();
    b5.remove();
    selectI1.remove();
    selectI2.remove();
    b6.remove();
    b7.remove();
    b8.remove();

    groundGroup = new Group();
    playerGroup = new Group();

    world.gravity.y = 10;

    // Player 1 setup
    player = new Sprite(p1Spawn[0], p1Spawn[1], 120, 230);
    player.bearing = -90
    player.phasing = false
    player.num = 1
    player.jumps = 0
    player.stocks = 3;
    playerImage = new Sprite(p1Spawn[0], p1Spawn[1] - 30, 0, 0, 'n');



    if (p1skin == 0) {
        playerImage.addAni("walk", TiffWalk);
        playerImage.addAni("idle", TiffIdle);
        playerImage.addAni("hit", TiffAttack);
        player.jumpAmmount = 2;
        player.jumpHeight = 9;
        player.maxSpeed = 5;

        player.knockbackX = 10;
        player.knockbackY = 5;
    } else if (p1skin == 1) {
        playerImage.addAni("walk", ClaireWalk);
        playerImage.addAni("idle", ClaireIdle);
        playerImage.addAni("hit", ClaireAttack);

        player.jumpAmmount = 1;
        player.jumpHeight = 10;
        player.maxSpeed = 6;

        player.knockbackX = 1
        player.knockbackY = 1

    } else if (p1skin == 2) {
        playerImage.addAni("walk", ZombiWalk);
        playerImage.addAni("idle", ZombiIdle);
        playerImage.addAni("hit", ZombiAttack);

        player.jumpAmmount = 3;
        player.jumpHeight = 6;
        player.maxSpeed = 10;

        player.knockbackX = 10;
        player.knockbackY = 0;

    } else if (p1skin == 3) {
        playerImage.addAni("walk", SamWalk);
        playerImage.addAni("idle", SamIdle);
        playerImage.addAni("hit", SamAttack);

        player.jumpAmmount = 1;
        player.jumpHeight = 6;
        player.maxSpeed = 3;

        player.knockbackX = 25;
        player.knockbackY = -5;
    } else if (p1skin == 4) {
        playerImage.addAni("walk", GirlWalk);
        playerImage.addAni("idle", GirlIdle);
        playerImage.addAni("hit", GirlAttack);

        player.jumpAmmount = 2;
        player.jumpHeight = 10;
        player.maxSpeed = 4;

        player.knockbackX = 10;
        player.knockbackY = 10;
    }else if (p1skin == 5) {
        playerImage.addAni("walk", PrincessWalk);
        playerImage.addAni("idle", PrincessIdle);
        playerImage.addAni("hit", PrincessAttack);

        player.jumpAmmount = 2;
        player.jumpHeight = 8;
        player.maxSpeed = 3;

        player.knockbackX = 5;
        player.knockbackY = 20;
    }
    playerImage.scale = 0.15;
    playerImage.mirror.x = 1;

    // Player 2 setup
    player2 = new Sprite(p2Spawn[0], p2Spawn[1], 120, 230);
    player2.num = 2
    player2.phasing = false
    player2.bearing = -90
    player2.jumps = 0;
    player2.stocks = 3;
    player2Image = new Sprite(p2Spawn[0], p2Spawn[1] - 30, 0, 0, 'n');
    if (p2skin == 0) {
        player2Image.addAni("walk", TiffWalk);
        player2Image.addAni("idle", TiffIdle);
        player2Image.addAni("hit", TiffAttack);
        player2.override = true;

        player2.jumpAmmount = 2;
        player2.jumpHeight = 9;
        player2.maxSpeed = 5;

        player2.knockbackX = 10;
        player2.knockbackY = 5;
    } else if (p2skin == 1) {
        player2Image.addAni("walk", ClaireWalk);
        player2Image.addAni("idle", ClaireIdle);
        player2Image.addAni("hit", ClaireAttack);
        player2.override = false;

        player2.jumpAmmount = 1;
        player2.jumpHeight = 10;
        player2.maxSpeed = 6;

        player2.knockbackX = 1
        player2.knockbackY = 1

    } else if (p2skin == 2) {
        player2Image.addAni("walk", ZombiWalk);
        player2Image.addAni("idle", ZombiIdle);
        player2Image.addAni("hit", ZombiAttack);

        player2.jumpAmmount = 3;
        player2.jumpHeight = 6;
        player2.maxSpeed = 10;

        player2.knockbackX = 10;
        player2.knockbackY = 0;

    } else if (p2skin == 3) {
        player2Image.addAni("walk", SamWalk);
        player2Image.addAni("idle", SamIdle);
        player2Image.addAni("hit", SamAttack);
        player2.jumpAmmount = 1;
        player2.jumpHeight = 6;
        player2.maxSpeed = 3;

        player2.knockbackX = 25;
        player2.knockbackY = -5;
    } else if (p2skin == 4) {
        player2Image.addAni("walk", GirlWalk);
        player2Image.addAni("idle", GirlIdle);
        player2Image.addAni("hit", GirlAttack);
        player2.jumpAmmount = 2;
        player2.jumpHeight = 10;
        player2.maxSpeed = 4;

        player2.knockbackX = 10;
        player2.knockbackY = 10;
    }else if (p2skin == 5) {
        player2Image.addAni("walk", PrincessWalk);
        player2Image.addAni("idle", PrincessIdle);
        player2Image.addAni("hit", PrincessAttack);

        player2.jumpAmmount = 2;
        player2.jumpHeight = 8;
        player2.maxSpeed = 3;

        player2.knockbackX = 5;
        player2.knockbackY = 20;
    }



    player2Image.scale = 0.15;

    playerGroup.add(player);
    playerGroup.add(player2);

    if (debugMode) {
        playerGroup.debug = true;
    } else {
        playerGroup.visible = false;
    }
    playerGroup.rotationLock = true;
    playerGroup.friction = 0;

    // Shared platforms and sensors
    p1 = new Sprite(700, 400, 1000, 50, 'static');
    p2 = new Sprite(700, 750, 1400, 50, 'static');
    // p3 = new Sprite(1700, 1100, 300, 50, 'static');

    groundGroup.add(p1);
     groundGroup.add(p2);
   //  groundGroup.add(p3);

    groundGroup.color = 'black'
    groundGroup.strokeWeight = 5
    groundGroup.stroke = 'white'

    // p3.color = 'black'
    // p3.strokeWeight = 5
    // p3.stroke = 'red'
    // p3.textColor = 'white'
    // p3.textSize = 35
    // p3.text = "I'm bouncy"

    groundSensor = new Sprite(player.x, player.y + 120, 100, 12, 'n');
    groundSensor2 = new Sprite(player2.x, player2.y + 120, 100, 12, 'n');

    hitBox = new Sprite(player.x, player.y, 80, 200, 'n');
    new GlueJoint(player, hitBox);

    overlapper = new Sprite(player.x, player.y, player.width, player.height+40, 'n');
    new GlueJoint(player, overlapper);

    hitBox2 = new Sprite(player2.x, player2.y, 80, 200, 'n');
    new GlueJoint(player2, hitBox2);
    overlapper2 = new Sprite(player2.x, player2.y, player2.width, player2.height+40, 'n');
    new GlueJoint(player2, overlapper2);

    ui = new Sprite(player.x, player.y - 180, 120,40,'n');
    ui.color = 'white'
    ui.strokeWeight = 5;
    ui.stroke = 'black'
    g1 = new GlueJoint(player, ui);

    ui2 = new Sprite(player2.x, player2.y - 180, 120,40,'n');
    ui2.color = 'white'
    ui2.strokeWeight = 5;
    ui2.stroke = 'black'
    g2 = new GlueJoint(player2, ui2);

    ui.textSize = 20;
    ui2.textSize = 20;

    g1.visible = false;
    g2.visible = false;


    if (debugMode) {
        hitBox.debug = true;
        hitBox2.debug = true;
        groundSensor.debug = true;
        groundSensor2.debug = true;
        overlapper.debug = true;
        overlapper2.debug = true
    } else {
        hitBox.visible = false;
        hitBox2.visible = false;
        groundSensor.visible = false;
        groundSensor2.visible = false;
        overlapper.visible = false;
        overlapper2.visible = false
    }

    new GlueJoint(player, groundSensor);
    new GlueJoint(player, playerImage);

    new GlueJoint(player2, groundSensor2);
    new GlueJoint(player2, player2Image);


    groundSensor.overlaps(player2, () => {
        player.vel.y = -5;
        player.jumps = 1;
    });
    groundSensor.overlaps(groundGroup, () => {
        if(!player.phasing){
        player.jumps = player.jumpAmmount
        }
    });
    // groundSensor.overlaps(p3, () => player.applyForceScaled(0,-950));

    groundSensor2.overlaps(player, () => {
        player2.vel.y = -5;
        player2.jumps = 1;
    });
    groundSensor2.overlaps(groundGroup, () => {
        if(!player2.phasing){
        player2.jumps = player2.jumpAmmount
        }
    });
    // groundSensor2.overlaps(p3, () => player2.applyForceScaled(0,-950));

    hitBox.overlapping(player2, () => {
        if (player.isAttacking) {
            if (playerImage.mirror.x == 1) {
                player2.vel.y = -1 * player.knockbackY;
                player2.vel.x = player.knockbackX
            } else {
                player2.vel.y = -1 * player.knockbackY;
                player2.vel.x = -1 * player.knockbackX;
            }
        }
    })

    hitBox2.overlapping(player, () => {
        if (player2.isAttacking) {
            if (player2Image.mirror.x == 1) {
                player.vel.y = -1 * player2.knockbackY;
                player.vel.x = player2.knockbackX
            } else {
                player.vel.y = -1 * player2.knockbackY;
                player.vel.x = -1 * player2.knockbackX
            }
        }
    })

 


}

function gamePlayScreen() {
   
   ui.text = "J: "+player.jumps+" S: "+player.stocks
      
   ui2.text = "J: "+player2.jumps+" S: "+player2.stocks

    avgX = (player.x + player2.x) / 2;
    avgY = (player.y + player2.y) / 2;

    offsetX = (avgX / 2) * -0.15;
    offsetY = (avgY / 2) * -0.15;

    bg.x = 800 + offsetX;
    bg.y = 400 + offsetY;

    if (playerImage.mirror.x == 1) {
        hitBox.x = player.x + 85; // Right side
    } else {
        hitBox.x = player.x - 85; // Left side
    }

    if (player2Image.mirror.x == 1) {
        hitBox2.x = player2.x + 85; // Right side
    } else {
        hitBox2.x = player2.x - 85; // Left side
    }



    if (player.y > 1800 || player.x < -1600  || player.x > 3000) {
        if(player.stocks > 1){
        player.vel.x = 0;
        player.vel.y = 0;
        player.x = p1Spawn[0]
        player.y = p1Spawn[1]
        player.stocks--;
        }else if(player.stocks == 1){
            player.vel.x = 0;
            player.vel.y = 0;
            player.x = p1Spawn[0]
            player.y = p1Spawn[1]
             player.stocks = "LOSE"
              player2.stocks = "WIN"
              player.knockbackX = 0
              player.knockbackY = 0
               player2.knockbackX =  player2.knockbackX * 2
               player2.knockbackY = player2.knockbackY * 2
               end.text = "PLAYER 2 WINS!\n\npress [R] to go again!"
               end.visible = true;
               ended = true
        }else{
            player.vel.x = 0;
            player.vel.y = 0;
           player.x = p1Spawn[0]
            player.y = p1Spawn[1]
        }
        player.applyForceScaled(0,-250)
    }
    
    
    if (player2.y > 1800 || player2.x < -1600  || player2.x > 3000) {
        if(player2.stocks > 1){
        player2.vel.x = 0;
        player2.vel.y = 0;
        player2.x = p2Spawn[0]
        player2.y = p2Spawn[1]
        player2.stocks--;
        }else if(player2.stocks == 1){
            player2.vel.x = 0;
      player2.vel.y = 0;
      player2.x = p2Spawn[0]
      player2.y = p2Spawn[1]
      player2.stocks = "LOSE"
       player.stocks = "WIN"
       player2.knockbackX = 0
       player2.knockbackY = 0
       player.knockbackX =  player.knockbackX *2
        player.knockbackY = player.knockbackY * 2
        end.text = "PLAYER 1 WINS!\n\npress [R] to go again!"
        end.visible = true;
        ended = true;
        }else{
            player2.vel.x = 0;
            player2.vel.y = 0;
           player2.x = p2Spawn[0]
            player2.y = p2Spawn[1]
        }
        player2.applyForceScaled(0,-250)
    }



    player.vel.x = Math.round(player.vel.x * 10) / 10;
    player.vel.y = Math.round(player.vel.y * 10) / 10;
    player2.vel.x = Math.round(player2.vel.x * 10) / 10;
    player2.vel.y = Math.round(player2.vel.y * 10) / 10;

    handlePlayerMovement(player2, player2Image, "x", "arrowLEFT", "arrowRIGHT", "z", "arrowDOWN", groundSensor2, overlapper2);
    handlePlayerMovement(player, playerImage, "k", "a", "d", "l", "s", groundSensor,overlapper);

    handlePlayerAbilities(player, playerImage, p1skin);
    handlePlayerAbilities(player2, player2Image, p2skin);
    

  
}

function handlePlayerAbilities(player, playerImage, pSkin) {
    if (player.isAttacking) {
        if (pSkin == 0) {
            if (player.vel.x > 0) {
                player.applyForceScaled(-5, 0);
            } else if (player.vel.x < 0) {
                player.applyForceScaled(5, 0);
            }

        } else if (pSkin == 1) {
        console.log(player.knockbackY)
         if(player.boing){
            player.knockbackX *= 0.5 + (Math.abs(player.vel.x)*3)
            player.knockbackY = 1 + (player.vel.y)*-1
            player.boing = false
            }
            if (playerImage.mirror.x == 1) {
                player.vel.x = -1-(Math.abs(player.vel.x))/2
            } else {
                player.vel.x = 1+(Math.abs(player.vel.x))/2
            }
        } else if (pSkin == 2) {
            if (playerImage.mirror.x == 1) {
                player.vel.x = 10
            } else {
                player.vel.x = -10
            }
        } else if (pSkin == 3) {
            if(player.boing){
            player.applyForceScaled(0, -400);
            player.boing = false
            }
            player.bounciness = 0.9;
            player.jumps = 0;
            if(player.num == 1){
                hitBox.y = player.y + 50
                hitBox.x = player.x
                hitBox.width = 120
                if (kb.pressing("a")) {
                    if(player.vel.x > -3){
                    player.applyForceScaled(-5, 0);
                    }
                    playerImage.mirror.x =0
                }
                else if (kb.pressing("d")) {
                    if(player.vel.x < 3){
                    player.applyForceScaled(5, 0);
                    }
                    playerImage.mirror.x = 1
                }
            }else{
                hitBox2.y = player.y + 50
                hitBox2.x = player.x
                hitBox2.width = 120
                if (kb.pressing("arrowLEFT")) {
                    if(player.vel.x > -3){
                    player.applyForceScaled(-5, 0);
                    }
                    playerImage.mirror.x =0
                }
                else if (kb.pressing("arrowRIGHT")) {
                    if(player.vel.x < 3){
                    player.applyForceScaled(5, 0);
                    }
                    playerImage.mirror.x = 1
                }
            }
           
            
        } else if (pSkin == 4) {
            if (playerImage.mirror.x == 1) {
                player.applyForceScaled(15, 0);
                //player.vel.y = 2
            } else {
                player.applyForceScaled(-15, 0);
                //player.vel.y = 2
            }
        
            player.drag = 3

        }else if (pSkin == 5) {
            if(player.boing){
                player.applyForceScaled(0, -500);
                player.boing = false
                }
                if(player.num == 1){
                    hitBox.y = player.y - 80
                }else{
                    hitBox2.y = player.y - 80
                }
        }
    } else if(pSkin == 1){
      player.knockbackX = 1;
      player.knockbackY = 0;
      player.boing = true
    }else if(pSkin == 3) {
        player.bounciness = 0.1;
        player.boing = true;
    } else if(pSkin == 5) {
        player.boing = true;
    }else{
        player.drag = 0
    }
       
}

function handlePlayerMovement(player, playerImage, jumpKey, leftKey, rightKey, attackKey, downKey, sensor, overlapSensor) {
    // Track whether the player is attacking
    player.moving = false



    if (!player.isAttacking) {
        player.isAttacking = false;
    }   

    if(kb.pressing(downKey) && kb.presses(jumpKey) && sensor.overlapping(groundGroup)){
        player.phasing = true;
     }
     if(player.vel.y < -3 && !sensor.overlapping(groundGroup)){
        player.phasing = true
     }

     if(player.phasing){
         if(overlapSensor.overlapping(groundGroup)){
             player.overlaps(groundGroup)
         }else{
         player.phasing = false;
         }
     }else{
         player.collides(groundGroup)
     }

    // Handle attack
    if (player.isAttacking == false) {


          
        if (kb.presses(attackKey)) {
            player.isAttacking = true;
            playerImage.changeAni("hit");
           

            // Wait for the animation to finish
            playerImage.animation.onComplete = () => {
                player.isAttacking = false;
                playerImage.changeAni("idle");
            };

            // Prevent further actions during attack
            return;
        }

        if (kb.pressing("r") && ended) {
            location.reload();
        }

        // Handle jump
        if (kb.presses(jumpKey) && player.jumps > 0 && !kb.pressing(downKey) ) {
            player.jumps--;
            player.vel.y = (-1 * player.jumpHeight) + player.vel.y/4;
            player.moving = true;
            
        }

        // Handle movement left
        if (kb.pressing(leftKey)) {
            if (player.vel.x > -1 * player.maxSpeed) player.vel.x -= 0.1;
            playerImage.mirror.x = 0;
            player.moving = true;
        }

        // Handle movement right
        else if (kb.pressing(rightKey)) {
            if (player.vel.x < player.maxSpeed) player.vel.x += 0.1;
            playerImage.mirror.x = 1;
            player.moving = true;
        }

        // Update animation based on movement state
        if (player.moving) {
            playerImage.changeAni("walk");
        } else {
            playerImage.changeAni("idle");
            if (player.vel.x > 0) {
                player.vel.x -= 0.15;
            } else if (player.vel.x < 0) {
                player.vel.x += 0.15;
            }
        }
    }
}