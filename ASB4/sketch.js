var player
var npc1, npc2, npc3
var platform, Platform2, Platform3, Platform4
var enemy1, Enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8,enemy9,enemy10,enemy11,enemy12,enemy13,enemy14,enemy15
var backg, ts, titleN, backg2, backg3,  backgD, backgD2, backgD3, backgUG1, backgC1
var gameState = "title"
let dia1 = 0
let dia2 = 0
let dia3 = 0
let dia4 = 0
let w = false
let w2 = false
let w3 =false
let shards = 0
var button
var PG, JG
let death = false
var jumpbox, jumpbox2, jumpboxM1, jumpboxM2,jumpbox3,jumpbox4, movebox, jumpboxM3
var moving1, moving2,moving3
var fall, fallbox, stopper, falldetect
var bouncebox, bouncebox2, bounceboxE1,bounceboxE2
var bounceboxE3,bounceboxE4, bounceboxE5, bounceboxE6
var bounceboxM1
var d1,d2,d3,d4,d5
var d6,d7,d8,d9,d10
var chains
let checkpoint = 0
let deathtype = 0
var deathmessage
var npc1D, npc2D
var wrench, wrench2, shard1, shard2
var runs, jumps, walks
var dies, respawns
var getw
var music, music2
let dieplay = 0
var credits
let level = 0
var door
let bruh = 0
var cut1
let debug = false
var mpos
let input,button2
let goofy = null
var grounded
var gameOver = false
let ending
let endMove
var alphaval = 0 
var alphaval2 = 0

function preload(){

    //end cutscene
    end1I = loadAnimation("images/End1.png","images/End2.png","images/End3.png","images/End4.png","images/End5.png")
    end1I.frameDelay = 100
    end1I.stop()
    end1I.looping = false;
  


    //bg
    bgImg = loadImage("images/Bg.png")
    bgImg2 = loadImage("images/Bg2.png")
    bgImg3 = loadImage("images/Bg3.png")
    bgImgUG = loadImage("images/CityBG.png")
    

    
    //decal
    decal1 = loadImage("images/decalB1.png")
    decal2 = loadImage("images/decalB2.png")
    decal3 = loadImage("images/decalB3.png")
    decalH = loadImage("images/decalH.png")
    decalR = loadImage("images/decalR.png")
    decalW = loadImage("images/decalW.png")
    //cutscene
    cut1I = loadImage("images/FallC.png")

    //player
    PlayerWL = loadAnimation("images/Walk1L.png", "images/Walk2L.png","images/Walk3L.png","images/Walk4L.png","images/Walk5L.png")
    PlayerWR = loadAnimation("images/Walk1R.png", "images/Walk2R.png","images/Walk3R.png","images/Walk4R.png","images/Walk5R.png")
   // PlayerRR = loadAnimation("images/Run1.png","images/Run2.png","images/Run3.png")
   // PlayerRL = loadAnimation("images/Run1L.png","images/Run2L.png","images/Run3L.png")
   PlayerRR = loadAnimation("images/Walk1R.png", "images/Walk2R.png","images/Walk3R.png","images/Walk4R.png","images/Walk5R.png")
   PlayerRL = loadAnimation("images/Walk1L.png", "images/Walk2L.png","images/Walk3L.png","images/Walk4L.png","images/Walk5L.png")
   PlayerRR.frameDelay = 1.5;
   PlayerRL.frameDelay = 1.5;
       PlayerI = loadAnimation("images/Idle.png")
    PlayerJ = loadAnimation("images/JumpR.png")
    PlayerJL = loadAnimation("images/JumpL.png")
    PlayerOOF = loadAnimation("images/PlayerKO.png")
    PlayerF = loadAnimation("images/Down.png")
    PlayerFL = loadAnimation("images/DownL.png")

    //enemy
    Enemy1L = loadAnimation("images/NewEnemy1.png")
    Enemy1R = loadAnimation("images/NewEnemy1.png")

    //npc
    NpcI1R = loadAnimation("images/Npc1.png")
    NpcI1L = loadAnimation("images/Npc1L.png")
    NpcI2L = loadAnimation("images/Npc2.png")
    NpcI2R = loadAnimation("images/Npc2R.png")
    //enemy
    Enemy3U = loadAnimation("images/E3U.png")
    Enemy3D = loadAnimation("images/E3D.png")
    //npc
    NpcI3 = loadImage("images/Npc3.png")
//enemy
    EnemyI1 = loadImage("images/Enemy1R.png")
    Enemy2W = loadAnimation("images/E2W1.png","images/E2W2.png","images/E2W3.png")
    Enemy2WR = loadAnimation("images/E2W1R.png","images/E2W2R.png","images/E2W3R.png")
    Enemy2I = loadAnimation("images/Enemy2L.png")
//platform
    PlatformI1 = loadImage("images/Platform1.png")
    PlatformI2 = loadImage("images/Platform2.png")
    PlatformI3 = loadImage("images/Platform3.png")
    PlatformI4 = loadImage("images/Platform4.png")
//title
    bgTitle = loadImage("images/newts.png")
   
    Ntitle2 = loadImage("images/Newlogo.png")
//chain
    ChainI = loadImage("images/Chain.png")
//dia
    talk1 = loadAnimation("images/Talk.png")
    talk2 = loadAnimation("images/Boss1.png")
    talk3 = loadAnimation("images/Playerspeak.png")
    talk4 = loadAnimation("images/Boss2.png")

    talknw = loadAnimation("images/Bossnowrench.png")

    talk5 = loadAnimation("images/Boss3.png")
    talk6 = loadAnimation("images/BossWW.png")
    talk7 = loadAnimation("images/BossD.png")

    freind1 = loadAnimation("images/Talk.png")
    freind2 = loadAnimation("images/Fren1.png")
    freind3 = loadAnimation("images/Playerspeak.png")
    freind4 = loadAnimation("images/Fren2.png")

    playerdia = loadAnimation("images/playerspeak2.png")
    playerdia2 = loadAnimation("images/playerK.png")

    guy1dia = loadAnimation("images/npc3dia1.png")
//wrench
    wrenchI = loadAnimation("images/w1.png","images/w2.png","images/w3.png","images/w4.png","images/w5.png","images/w6.png","images/w7.png","images/w8.png")
    wrench2I =  loadAnimation("images/w21.png","images/w22.png","images/w23.png","images/w24.png","images/w25.png","images/w26.png","images/w27.png","images/w28.png")
shard1I = loadAnimation("images/shard1.png")
shard2I = loadAnimation("images/shard2.png")

    //die
    dief = loadAnimation("images/DieJump.png")
    diee = loadAnimation("images/DieEnemy.png")
    diew = loadAnimation("images/DieWrench.png")
//cred
   // creditI = loadImage("images/Credit.png")
//door
    doorImg = loadImage("images/DoorG.png")
//saw
    sawA = loadAnimation("images/Saw1.png","images/Saw2.png","images/Saw3.png","images/Saw4.png")


    //SOUND

    walks = loadSound("Sounds/Walking.mp3")
    runs = loadSound("Sounds/Run.mp3")
    jumps = loadSound("Sounds/Jump.mp3")
    dies = loadSound("Sounds/oof.mp3")
    respawns = loadSound("Sounds/respawn.mp3")
    music = loadSound("Sounds/OrigamiRepetikaCure.mp3")
    music2 = loadSound("Sounds/OrigamiRepetikaParadigmDial.mp3")
    getw = loadSound("Sounds/get.mp3")
}

function setup(){
    createCanvas(800,700)
   // pixelDensity(0)
    //GROUPS
    PG = new Group()
    JG = new Group()

   
     //moving
     createMoving()
    //BG
    backg = createSprite(400 ,350)
    backg.addImage(bgImg)
    backg.scale = 1.5
    backg.visible = false
    //BG2
    backg2 = createSprite(800/2+4500 , 700/2)
    backg2.addImage(bgImg)
    backg2.scale = 1.5
    backg2.visible = false
    //BG3
    backg3 = createSprite(800/2+8500 , 700/2)
    backg3.addImage(bgImg)
    backg3.scale = 1.5
    backg3.visible = false
    //Dropship
    backgD = createSprite(800/2-1750 , 700/2)
    backgD.addImage(bgImg)
    backgD.scale = 1.5
    backgD.visible = false
    //Dropship2
    backgD2 = createSprite(800/2-5500 , 700/2)
    backgD2.addImage(bgImg)
    backgD2.scale = 1.5
    backgD2.visible = false
    //Dropship3
    backgD3 = createSprite(800/2-7500 , 700/2)
    backgD3.addImage(bgImg)
    backgD3.scale = 1.5
    backgD3.visible = false
    //City
    backgUG1 = createSprite(800/2-20000 , 700/2)
    backgUG1.addImage(bgImgUG)
    backgUG1.scale = 1.5
    backgUG1.visible = false
    backgC1 = createSprite(800/2-13950, 700/2)
    backgC1.addImage(bgImgUG)
    backgC1.scale = 1.5
    backgC1.visible = false


    //DECALS
    d5 = createSprite(800/2+500,700-50)
    d5.addImage(PlatformI1)
    d5.scale = 0.5
    //=
    d1 = createSprite(800/2+200,700-150)
    d2 = createSprite(800/2+200,700-200)
    d1.addImage(decalH)
    d2.addImage(decalW)
    //=
    d3 = createSprite(800/2+500,700-150)
    d4 = createSprite(800/2+500,700-200)
    //=
    d3.addImage(decalW)
    d4.addImage(decal2)
   //test
   bouncebox = createSprite(800/2 + 1980, 700-160,50,50,)
   bouncebox.visible = false
   bouncebox2 = createSprite(800/2 + 2780, 700-160 , 50,50)
   bouncebox2.visible = false
   bounceboxE1 = createSprite(800/2 + 2950, 700/2+100,40,400)
   bounceboxE1.visible = false
   bounceboxE2 = createSprite(800/2 + 3550, 700/2+100,40,400)
   bounceboxE2.visible = false
   bounceboxE3 = createSprite(800/2 + 4750, 30,40,40)
   bounceboxE3.visible = false
   bounceboxE4 = createSprite(800/2 + 4750, 700-50,40,40)
  bounceboxE4.visible = false
   bounceboxM1 = createSprite(800/2 + 7000, 700 - 350,20,20)
   bounceboxM1.visible = false
    bounceboxE5 = createSprite(800/2 + 8000, 30,40,40)
   bounceboxE5.visible = false
   bounceboxE6 = createSprite(800/2 + 8000, 700-50,40,40)
   bounceboxE6.visible = false

    //ship
    createPlatform(800/2 - 600,700-100, 0.5)
    door = createSprite(800/2 - 300,700/2)
    door.addImage(doorImg)
    door.scale = 0.8
    door.setCollider("rectangle", 50,0,200,1000)
    createPlatform(800/2,700-100, 0.5)
    createPlatform2(800/2 - 1500,700-100, 0.1)
    createPlatform2(800/2 - 1800,700-100, 0.1)
    createPlatform2(800/2 - 2100,700-100, 0.1)
    createPlatform(800/2 - 1300,700-100, 0.5)
    createPlatform(800/2 - 2500,700-100, 0.5)
    createPlatform2(800/2 -2700,700/2-100, 0.1)
    createPlatform2(800/2 -3200,700/2, 0.1)
    createPlatform2(800/2 -3600,700/2+50, 0.1)
    createPlatform(800/2 - 4100,700-100, 0.5)
    createPlatform2(800/2 -4600,700/2, 0.2)
    createPlatform(800/2 - 5000,700-100, 0.5)
    fall = createSprite(800/2 - 5650,700-80)
    fall.addImage(PlatformI2)
    fall.scale = 0.5
    fall.setCollider("rectangle", -10 , -360 ,580,50)
    stopper = createSprite(800/2 - 5200,700/2, 20,2000)
    stopper.visible = false
    fallbox = createSprite(800/2 - 5650,700-80)
    fallbox.setCollider("rectangle", -10 , -200 ,300,20)
    fallbox.visible = false
    JG.add(fallbox)
    falldetect = createSprite(800/2 - 5650,700-80)
    falldetect.setCollider("rectangle", -10 , -300 ,300,50)
    falldetect.visible = false

    createPlatform2(800/2 -6200,700/2, 0.25)
    createPlatform2(800/2 -6650,700/2+10, 0.1)
    createPlatform2(800/2 -7000,700/2, 0.25)
    createPlatform(800/2 - 7500,700-80, 0.5)

    //CITY
    createPlatform3(800/2 - 1500,700-180, 0.3)
    createPlatform4(-15165, 700 - 90, 0.5)
    //createPlatform3(-15165,700-180, 0.3)
    createPlatform4(-15750, 700 - 90, 0.5)
    createPlatform4(-16528, 700 - 90, 0.5)
    createPlatform2(800/2 - 17300, 700 - 90, 0.4)
    createPlatform2(800/2 - 17600, 700 - 90, 0.4)
    createPlatform4(800/2 - 17900,700-100, 0.5)
    createPlatform2(800/2 - 18400, 700 - 180, 0.2)
    createPlatform2(800/2 - 18800, 700 - 150, 0.1)
    createPlatform2(800/2 - 19100, 700 - 120, 0.1)
    createPlatform4(800/2 - 19500,700-100, 0.5)
    createPlatform4(800/2 - 20000,700-100, 0.5)
    createPlatform3(800/2 - 20500,700-180, 0.3)
    createPlatform3(800/2 - 21000,700-180, 0.3)
    //moving here
    createPlatform4(800/2 - 22400,700-100, 0.5)
    createPlatform3(800/2 - 22900,700-180, 0.3)
    createPlatform4(800/2 - 23500,700-100, 0.5)
    createPlatform4(800/2 - 24300,700-100, 0.5)
    enemy13 = createSprite(800/2 - 24200,  700/2-27.5)
  enemy13.addAnimation("saw",sawA)
  enemy13.setCollider("circle",0,0,155)
  
  enemy13.scale = 0.3
   //e11
    //back
    //LVL1
    createPlatform2(800/2 + 1000,700-180 , 0.2)
    createPlatform(800/2 + 400 ,700-100 ,0.5)
    createPlatform(800/2 + 800 ,700-100 ,0.5)
    createChain(800/2 + 1150,700-750 , 1)
    createPlatform2(800/2 + 1150,700-480 , 0.2)
    createPlatform2(800/2 + 1150,700-180 , 0.2)
    createPlatform2(800/2 + 1500,700-180 , 0.2)
    createPlatform2(800/2 + 1880, 700-160 , 0.2)
    jumpboxM1 = createSprite(800/2 + 2100, 700-160)
  //  jumpboxM1.debug = true
    JG.setVisibleEach(false)
    jumpboxM1.setCollider("rectangle",0,0,150,80)
    JG.add(jumpboxM1)
    jumpboxM2 = createSprite(800/2 + 7000, 700 - 50)
    jumpboxM2.setCollider("rectangle", -10 , -200 ,300,20)
    jumpboxM2.visible = false
    JG.add(jumpboxM2)
    jumpboxM3 = createSprite(800/2 - 21300, 700 - 50)
    jumpboxM3.setCollider("rectangle", -10 , -200 ,300,20)
    jumpboxM3.visible = false
    JG.add(jumpboxM3)
    jumpboxM4 = createSprite(800/2 - 21700, 700 - 50)
    jumpboxM4.setCollider("rectangle", -10 , -200 ,300,20)
    jumpboxM4.visible = false
    JG.add(jumpboxM4)

    createPlatform2(800/2 + 2880, 700-160 , 0.2)
    createPlatform2(800/2 + 3250, 700-265 , 0.2)
    createPlatform(800/2 + 3050, 700-100 , 0.5)
    createPlatform(800/2 + 3450, 700-100 , 0.5)
    createPlatform2(800/2 + 3950, 700/2 + 100 , 0.3)
    createPlatform(800/2 + 4500, 700/2 + 400 , 0.5)
    createPlatform2(800/2 + 5000, 700/2 + 100 , 0.2)
    createPlatform2(800/2 + 5500, 700/2 + 150 , 0.1)
    createPlatform2(800/2 + 6000, 700/2 + 100 , 0.2)
    createPlatform(800/2 + 6400, 700 - 100 , 0.5)
    createPlatform(800/2 + 7670, 700 - 140 , 0.5)
    createPlatform2(800/2 + 8450, 700 - 200 , 0.25)
    createPlatform(800/2 + 8250, 700 - 100 , 0.5)
    createPlatform2(800/2 + 9000, 700 - 250 , 0.2)
    moving1 = createSprite(800/2 + 2100, 700-160)
    movebox = createSprite(800/2+2100,700-190, 160,10)
    movebox.visible = false
    moving1.addImage(PlatformI1)
    moving1.scale = 0.2
    moving1.velocityX = 4
    moving2 = createSprite(800/2 + 7000, 500,20,20)
    moving2.addImage(PlatformI1 )
    moving2.scale = 0.3
    moving2.velocityY = -3

    moving3 = createSprite(800/2 - 21300, 500,20,20)
    moving3.addImage(PlatformI1 )
    moving3.scale = 0.3
    moving3.velocityY = -3

    moving4 = createSprite(800/2 - 21700, 500,20,20)
    moving4.addImage(PlatformI1 )
    moving4.scale = 0.3
    moving4.velocityY = -6
   // moving2.debug = true
    //LVL2
    endMove = createSprite(0, 900,20,20)
    endMove.addImage(PlatformI1 )
    endMove.scale = 0.3

   
    

    //VISIBLE
    PG.setVisibleEach(false)

//=======================================================NPC1====================================================================
    npc1 = createSprite(800/2+450 , 700/2-200)
    npc1.addAnimation("Npc1L",NpcI1L)
    npc1.addAnimation("Npc1R",NpcI1R)
    npc1.scale = 0.20
   
    npc1.setCollider("rectangle",100,0,600,1100)
    npc1D =createSprite(npc1.x,npc1.y)
    npc1D.addAnimation("1",talk1)
    npc1D.addAnimation("2",talk2)
    npc1D.addAnimation("3",talk3)
    npc1D.addAnimation("4",talk4)

    npc1D.addAnimation("nw",talknw)

    npc1D.addAnimation("5",talk5)
    npc1D.addAnimation("6",talk6)
    npc1D.addAnimation("7",talk7)
    npc1D.visible = false

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++NPC2+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    npc2 = createSprite(800/2+4500 , 700/2-200)
    npc2.addAnimation("Npc2L",NpcI2L)
    npc2.addAnimation("Npc2R",NpcI2R)
    npc2.scale = 0.21

    npc2.setCollider("rectangle",100,0,600,1150)
    npc2D =createSprite(npc2.x,npc2.y)
    npc2D.addAnimation("f1",freind1)
    npc2D.addAnimation("f2",freind2)
    npc2D.addAnimation("f3",freind3)
    npc2D.addAnimation("f4",freind4)
//npc3
npc3 = createSprite(800/2 - 20000, 240)
npc3.addAnimation("npc3",NpcI3)
npc3.scale = 0.21
npc3.setCollider("rectangle",100,0,600,1150)

npc3D =createSprite(npc3.x,npc3.y - 150)
npc3D.addAnimation("f1", guy1dia)
npc3D.addAnimation("f2",playerdia)
npc3D.addAnimation("f3",playerdia2)
npc3D.scale = 0.5
//=========================================================PLAYER=============================================================================
    player = createSprite(800/2 , 0)

    player.addAnimation("walk1", PlayerWR)
    player.addAnimation("walk2",PlayerWL)
    player.addAnimation("jump",PlayerJ)
    player.addAnimation("jump2",PlayerJL)
    player.addAnimation("oof",PlayerOOF)
    player.addAnimation("run1", PlayerRR)
    player.addAnimation("run2", PlayerRL)
    player.addAnimation("idle", PlayerI)
    player.addAnimation("down", PlayerF)
    player.addAnimation("down2", PlayerFL)
    player.changeAnimation("idle",PlayerI)

    player.scale = 0.35


   
//=========================================================ENEMY1===========================================================================
    enemy1 = createSprite(800/2 +2450, 700-500)
    enemy1.addAnimation("Enemy1L",Enemy1L)
    enemy1.addAnimation("Enemy1R",Enemy1R)
    enemy1.scale = 0.4
    enemy1.setCollider("rectangle",0,555,170,175)
    
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++enemy2+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
enemy2 = createSprite(3500, 320)
enemy2.addAnimation("Enemy2R",Enemy2WR)
enemy2.addAnimation("Enemy2L", Enemy2W)
enemy2.setCollider("rectangle",0,100,400,1000)
enemy2.scale = 0.15
enemy2.velocityX = 3

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++enemy3+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    enemy3 = createSprite(800/2 + 4750, 700/2)
    enemy3.addAnimation("upE",Enemy3U)
    enemy3.addAnimation("downE",Enemy3D)
    enemy3.setCollider("rectangle",0,0,170,300)
    enemy3.scale = 0.3
    enemy3.velocityY = 9

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++enemy4+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    enemy4 = createSprite(800/2 + 8000, 700/2)
    enemy4.addAnimation("upE",Enemy3U)
    enemy4.addAnimation("downE",Enemy3D)
    enemy4.setCollider("rectangle",0,0,170,300)
    enemy4.scale = 0.3
    enemy4.velocityY = 9
 //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++enemy5++++++++++++++++++++++++++++++++++++
 enemy5 = createSprite(800/2 -1300,  700/2+30)
 enemy5.addAnimation("saw",sawA)
 enemy5.setCollider("circle",0,0,155)
 enemy5.scale = 0.3
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++enemy6++++++++++++++++++++++++++++++++++++
  enemy6 = createSprite(800/2 -4100,  700/2+30)
  enemy6.addAnimation("saw",sawA)
  enemy6.setCollider("circle",0,0,155)
  enemy6.scale = 0.3
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++enemy7++++++++++++++++++++++++++++++++++++
  enemy7 = createSprite(800/2 -5000,  700/2+30)
  enemy7.addAnimation("saw",sawA)
  enemy7.setCollider("circle",0,0,155)
  enemy7.scale = 0.3
  //CITY ENEMY
  //SAW1
  enemy8 = createSprite(800/2 -19430,  700/2-30)
  enemy8.addAnimation("saw",sawA)
  enemy8.setCollider("circle",0,0,155)
  //enemy8.debug = true
  enemy8.scale = 0.3
  //SAW 2
  enemy9 = createSprite(-19258,  700/2-30)
  enemy9.addAnimation("saw",sawA)
  enemy9.setCollider("circle",0,0,155)
  //enemy9.debug = true
  enemy9.scale = 0.3
  //saw3
  enemy10 = createSprite(-17502.5,  700/2-30)
  enemy10.addAnimation("saw",sawA)
  enemy10.setCollider("circle",0,0,155)
  //enemy9.debug = true
  enemy10.scale = 0.3
  //saw4
  enemy11 = createSprite(-15588,  700/2-27.5)
  enemy11.addAnimation("saw",sawA)
  enemy11.setCollider("circle",0,0,155)
  //enemy9.debug = true
  enemy11.scale = 0.3

  enemy12 = createSprite(800/2 - 23450,  700/2-27.5)
  enemy12.addAnimation("saw",sawA)
  enemy12.setCollider("circle",0,0,155)
  //enemy9.debug = true
  enemy12.scale = 0.3
 
//===============================================================wrench==============================================================================
    wrench = createSprite(800/2+9000 , 700-350)
    wrench.addAnimation("w",wrenchI)
    wrench.scale = 0.3
//===============================================================wrench2==============================================================================
    wrench2 = createSprite(800/2-7500 , 700/2)
    wrench2.addAnimation("w2",wrench2I)
    wrench2.scale = 0.3

    shard1 = createSprite(800/2 - 24400, 700/2-27.5)
    shard1.addAnimation("s1", shard1I)
    shard1.scale = 0.3

    shard2 = createSprite(-15110, 700/2+10)
    shard2.addAnimation("s2", shard2I)
    shard2.scale = 0.3


//================================================================message========================================================
    deathmessage = createSprite(800/2, 700/2)
    deathmessage.addAnimation("1",dief)
    deathmessage.addAnimation("2",diee)
    deathmessage.addAnimation("3",diew)
    deathmessage.visible = false
    //cutscene
    cut1 = createSprite(800/2,700/2)
    cut1.addImage(cut1I)
    cut1.scale = 1
    cut1.visible = false
 
//================================================================title====================================================================
    ts = createSprite(800/2, 700/2)
    ts.addImage(bgTitle)
    ts.scale = .9
    ts.visible = false

    titleN = createSprite(155, 200)
    titleN.addImage(Ntitle2)
    titleN.scale = .75
    titleN.visible = false

   /* credits = createSprite(800-150, 700 - 70)
    credits.addImage(creditI)
    credits.scale = .3
    credits.visible = false*/

    input = createInput();
    input.position(800-745, 700-30);

    button2 = createButton('GO');
    button2.position(800-780, 700-30);
    button2.mousePressed(cheat);



    ending = createSprite(400,350)
    ending.addAnimation("end1",end1I)
ending.visible=false
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++END+++++++++++++++++++++++++++++++++++++++++++++++++++
}


function draw(){
    background(255)

//PLAY
if(gameState === "play" ){

  //music script (broken)
  /*
  if (checkpoint < 2 && music.isPlaying() === false) {
    music.play()   
}
else if (checkpoint >= 2 && music2.isPlaying() === false) {
   music2.play()
   if(music.isPlaying() === true){
       music.stop()
   }
}
 */ 
 
/*if (music.isPlaying() === false && bruh === 0) {
    music.play()   
}
if(checkpoint >= 2){
    bruh = 1
    music.stop()
}

if (music2.isPlaying() === false && bruh === 1){
    music2.play()
}
 */


        //====================GAME START===============================
        backg.visible = true
        backg2.visible = true
        backg3.visible = true
        backgD.visible = true
        backgD2.visible = true
        backgD3.visible = true
        backgUG1.visible = true
        backgC1.visible = true
        ts.visible = false
       // credits.visible = false
        titleN.visible = false
        button2.position(700/2, -10000)
        input.position(700/2, -10000)
        PG.setVisibleEach(true)
        JG.setVisibleEach(false)
        //===========================camera============================
        camera.position.x = player.x
        //======================collide==================================
        npc1.collide(PG)
        npc2.collide(PG)
      //  enemy2.collide(PG)
        enemy5.collide(PG)
        enemy6.collide(PG)
        enemy7.collide(PG)
        player.collide(PG)
        player.collide(moving1)
        player.collide(moving2)
    player.collide(moving3)
    player.collide(moving4)
    player.collide(endMove)
        player.collide(door)
        player.collide(fall)
    if(w2 === true){
        player.collide(stopper)
}
//================================fall====================================================
if(w2 === true && falldetect.isTouching(player)){
    fall.velocityY = 20
    level = 1
}
if(player.y > 800-200 && level === 1){
 checkpoint = 3
}
//movebox
movebox.x = moving1.x

if(player.isTouching(movebox)){
   player.velocityX = moving1.velocityX*1.37
}



        //=================================================text==================================
        //+++++++++++++++++++++++++++++++++++++npc1+++++++++++++++++++++++++++++++++++++++

        //NPC1-start
        if(w === false){
        if(player.isTouching(npc1)){
            npc1D.visible = true
            //console.log(dia1)
            
            if(dia1 < 5){
            if(keyWentUp("SPACE")){
                dia1 = dia1 + 1
            }
        }

        }
        else{
            npc1D.visible = false
        }

        if(player.isTouching(npc1)&& dia1 === 0){
            if(keyWentDown("SPACE")){
            npc1D.scale = 0.5
            npc1D.changeAnimation("2",talk2)
            }
        }

        if(player.isTouching(npc1)&& dia1 === 1){
            if(keyWentDown("SPACE")){
            npc1D.scale = 0.5
            npc1D.changeAnimation("3",talk3)
            }
        }

        if(player.isTouching(npc1)&& dia1 === 2){
            if(keyWentDown("SPACE")){
                npc1D.changeAnimation("4",talk4)
            }
        }

        if(player.isTouching(npc1)&& dia1 === 3){
            if(keyWentDown("SPACE")){
            npc1D.scale = 1
            npc1D.changeAnimation("1",talk1)
        }

        }
        if(player.isTouching(npc1)&& dia1 === 4 && w === false){
            if(keyWentDown("SPACE")){
            npc1D.scale = 0.5
            npc1D.changeAnimation("nw",talknw)
        }
        }
    }

    if(w === true){
        if(player.isTouching(npc1)){
            npc1D.visible = true
            
            if(dia2 < 4){
            if(keyWentUp("SPACE")){
                dia2 = dia2 + 1
            }
        }
        }
        else{
            npc1D.visible = false
        }


        if(player.isTouching(npc1)&& dia2 === 0){
            if(keyWentDown("SPACE")){
            npc1D.scale = 0.5
            npc1D.changeAnimation("5",talk5)
            }
        }

        if(player.isTouching(npc1)&& dia2 === 1){
            if(keyWentDown("SPACE")){
                npc1D.changeAnimation("6",talk6)
            }
        }

        if(player.isTouching(npc1)&& dia2 === 2){
            if(keyWentDown("SPACE")){
                npc1D.changeAnimation("7",talk7)
                if(door.y  < 800){
                door.velocityY = -10
                }
                else{
                door.velocityY === 0
                }
                checkpoint = 2
            }
        }




    }

    //NPC1-end

    if(keyWentDown("P")){
        shards = 2
    }

    //++++++++++++++++++++++++++++++++npc2+++++++++++++++++++++++++++++++++++++++++++++++++++++++++


        if(player.isTouching(npc2)){
            npc2D.visible = true
          //  console.log(dia3)
            checkpoint = 1
            
            if(dia3 < 3){
            if(keyWentUp("SPACE")){
                dia3 = dia3 + 1
            }
        }
        }
        else{
            npc2D.visible = false
        }

  
        if(player.isTouching(npc2)&& dia3 === 0){
            if(keyWentDown("SPACE")){
            npc2D.scale = 0.5
            npc2D.changeAnimation("f2",freind2)
            }
        }

        if(player.isTouching(npc2)&& dia3 === 1){
            if(keyWentDown("SPACE")){
                npc2D.changeAnimation("f3",freind3)
            }
        }

            
        if(player.isTouching(npc2)&& dia3 === 2){
            if(keyWentDown("SPACE")){
                npc2D.changeAnimation("f4",freind4)
            }
        }
//npc3
if(player.isTouching(npc3)){
    npc3D.visible = true
  //  console.log(dia3)
    
    if(dia4 < 2 && shards == 2){
    if(keyWentUp("SPACE")){
        dia4 = dia4 + 1
    }
}
}
else{
    npc3D.visible = false
}

if(player.isTouching(npc3)&& shards != 2 && dia4 == 0){
    if(keyWentDown("SPACE")){
    npc3D.changeAnimation("f2",playerdia )
    }
}
if(player.isTouching(npc3)&& shards == 2 ){
    if(keyWentDown("SPACE")){
    npc3D.changeAnimation("f3",playerdia2 )
    }
}
if(player.isTouching(npc3)&& shards == 2 &&dia4 == 1){
    if(keyWentDown("SPACE")){
    endGame()
    }
}



//====================wrench========================================
if(player.isTouching(wrench)){
    if(getw.isPlaying() === false && w === false){
        getw.play()
    }
    wrench.visible = false
    w = true
}
//====================wrench2========================================
if(player.isTouching(wrench2)){
    if(getw.isPlaying() === false && w2 === false){
        getw.play()
    }
    wrench2.visible = false
    w2 = true
}

if(player.isTouching(shard1)){
    if(getw.isPlaying() === false && shard1.visible == true){
        getw.play()
        shards = shards + 1
        
    }
    shard1.visible = false
  
}
if(player.isTouching(shard2)){
    if(getw.isPlaying() === false && shard2.visible == true){
        getw.play()
        shards = shards + 1
        
    }
    shard2.visible = false
  
}

        //=======================moving 1===============================
        //moving1.bounceOff(bouncebox)
        //moving1.bounceOff(bouncebox2)
        if(moving1.x <2500){
            moving1.velocityX = 3
        }
        else if(moving1.x > 3000){
            moving1.velocityX = -3
        }

        jumpboxM1.x = moving1.x
    
        //======================moving2====================================
        //moving2.bounceOff(bounceboxM1)
    
        if(moving2.y < -40){
            moving2.y = 1100
            moving2.velocityY = -3        }

        jumpboxM2.y = moving2.y

        if(moving3.y < -40){
            moving3.y = 1100
            moving3.velocityY = -4        }

        jumpboxM3.y = moving3.y

        if(moving4.y < -40){
            moving4.y = 1100
            moving4.velocityY = -6        }

        jumpboxM4.y = moving4.y

        //===================gravity===================================
        player.velocityY += 1
        npc1.velocityY += 1
        npc2.velocityY += 1
       
        enemy5.velocityY += 1
        enemy6.velocityY += 1
        enemy7.velocityY += 1


        //=====================npc=====================================
        if(player.x > npc1.x){
            npc1.changeAnimation("Npc1R",NpcI1R)
        }

        if(player.x < npc1.x || player.x === npc1.x ){
            npc1.changeAnimation("Npc1L",NpcI1R)
        }

        npc1D.x = npc1.x
        npc1D.y = npc1.y -150



        //++++++++++++++++++++npc2+++++++++++++++++++++++++++++++++++++++++
        if(player.x > npc2.x){
            npc2.changeAnimation("Npc2L",NpcI2L)
        }

        if(player.x < npc2.x || player.x === npc1.x ){
            npc2.changeAnimation("Npc2R",NpcI2R)
        }

        npc2D.x = npc2.x
        npc2D.y = npc2.y -150

        //console.log(moving2.y)

        //==================================== enemy2 ==============================================
       // enemy2.bounceOff(bounceboxE1)
        //enemy2.bounceOff(bounceboxE2)

       


       if(enemy2.x <=3300){
        enemy2.velocityX = 3

       }else if(enemy2.x >=3900){
        enemy2.velocityX = -3
       }
      

        if(enemy2.velocityX > 0){
            enemy2.changeAnimation("Enemy2R",Enemy2WR)
        }

        else if(enemy2.velocityX < 0){
            enemy2.changeAnimation("Enemy2L",Enemy2W)
        }

        
        
        //====================================enemy3================================================
       // enemy3.bounceOff(bounceboxE3)
        //enemy3.bounceOff(bounceboxE4)

     
        if(enemy3.y < 0 ){
            enemy3.velocityY = 3
        }
        else if(enemy3.y > 800){
            enemy3.velocityY = -3
        }
      
        if(enemy3.y > 1000 ){
            enemy3.y = 500
            enemy3.velocityY = -(enemy3.velocityY)
        }
        if(enemy3.velocityY < 0){
            enemy3.changeAnimation("upE",Enemy3U)
        }

        else if(enemy3.velocityY > 0){
            enemy3.changeAnimation("downE",Enemy3D)
        }

        //========================================enemy4========================================================
       // enemy4.bounceOff(bounceboxE5)
        //enemy4.bounceOff(bounceboxE6)

       /* if(enemy4.y > 700 ){
            enemy4.velocityY = -enemy4.velocityY
        }
        else if(enemy4.y < 0 ){
            enemy4.velocityY = -enemy4.velocityY
        }*/
        if(enemy4.y < 0 ){
            enemy4.velocityY = 4
        }
        else if(enemy4.y > 800){
            enemy4.velocityY = -4
        }
 
        if(enemy4.y > 1000 ){
            enemy4.y = 500
            enemy4.velocityY = -(enemy4.velocityY)
        }
   

        if(enemy4.velocityY < 0){
            enemy4.changeAnimation("upE",Enemy3U)
        }

        else if(enemy4.velocityY > 0){
            enemy4.changeAnimation("downE",Enemy3D)
        }

        //=======================player================================

        //DIE
        if(death === true){

            if(dies.isPlaying() === false && dieplay === 0){
                dies.play()
            }
            player.changeAnimation("oof", PlayerOOF)
            player.scale = 0.18
            player.setCollider("rectangle", 0,0,550,450)
            player.velocityX = 0
            player.velocityY = player.velocityY + 1
            backg.velocityX = 0
            backg2.velocityX = 0
            backg3.velocityX = 0
            backgC1.velocityX =0
            backgD.velocityX = 0
            backgD2.velocityX = 0
            backgD3.velocityX = 0
            backgUG1.velocityX = 0
            dieplay = 1
            //bg pos
        
            backg.x = 400
            backg.y = 350
    
            backg2.x = 800/2+4500
            backg2.y = 700/2

            backg3.x = 800/2+8500
            backg3.y = 700/2

            backgD.x = 800/2 - 1750
            backgD.y = 700/2

            backgD2.x = 800/2-5500
            backgD2.y = 700/2

            backgD3.x = 800/2-7500
            backgD3.y = 700/2

            backgUG1.x = 800/2-20000
            backgUG1.y = 700/2

            
            backgC1.x = 800/2-13950
            backgC1.y = 700/2

          
            
            if(keyWentDown("SPACE")){
                
                if(respawns.isPlaying() === false){
                    respawns.play()
                }

                reset()
                shards = 0
                shard1.visible = true
                shard2.visible = true
            }
            else if(death === false){
                player.changeAnimation("idle", PlayerI)
              
            }
            
        }

if(death === false ){
if(w === false){
        if(player.y > 800){
            death = true
            deathtype = 1
            deathmessage.visible = true
        }

        if(player.isTouching(enemy1) ||player.isTouching(enemy2) ||player.isTouching(enemy3) || player.isTouching(enemy4)
        || player.isTouching(enemy5)|| player.isTouching(enemy6)|| player.isTouching(enemy7)||player.isTouching(enemy8)||player.isTouching(enemy9)||player.isTouching(enemy10)
        ||player.isTouching(enemy11) || player.isTouching(enemy12) || player.isTouching(enemy13)
        ){
            deathtype = 2
            death = true
            deathmessage.visible = true
        }
   
}
else if(w === true){
    if(player.y > 800){
        death = true
        deathtype = 3
        deathmessage.visible = true
    }

    if(player.isTouching(enemy1) ||player.isTouching(enemy2) ||player.isTouching(enemy3) || player.isTouching(enemy4)
    || player.isTouching(enemy5)|| player.isTouching(enemy6)|| player.isTouching(enemy7)||player.isTouching(enemy8)||player.isTouching(enemy9)||player.isTouching(enemy10)
    ||player.isTouching(enemy11) || player.isTouching(enemy12) || player.isTouching(enemy13)
    ){
        deathtype = 3
        death = true
        deathmessage.visible = true
    }
}
}

if(deathtype === 1){
    deathmessage.changeAnimation("1",dief)
    deathmessage.visible = true
    deathmessage.x = player.x
}
else if(deathtype === 2){
    deathmessage.changeAnimation("2",diee)
    deathmessage.visible = true
    deathmessage.x = player.x
}
else if(deathtype === 3){
    if(w2 === true && level === 1){
        cut1.visible = true
        cut1.x = player.x
    }
    else{
    deathmessage.changeAnimation("3",diew)
    deathmessage.visible = true
    deathmessage.x = player.x
    }
}
else{
    deathmessage.visible = false
    cut1.visible = false
}


//MOVEMENT
if(death === false ){
    if(gameOver == false){
    if(Math.round(player.velocityX) > 0){
      //  if(player.isTouching(JG)){
        player.velocityX = player.velocityX - 1
       // }
     /*   else{
        player.velocityX = player.velocityX - .1
        }*/
        //paralax R
        backg.velocityX = Math.round(player.velocityX - 3)
        backg2.velocityX = Math.round(player.velocityX - 3)
        backg3.velocityX = Math.round(player.velocityX - 3)
        backgD.velocityX = Math.round(player.velocityX - 3)
        backgD2.velocityX = Math.round(player.velocityX - 3)
        backgD3.velocityX = Math.round(player.velocityX - 3)
        backgC1.velocityX = Math.round(player.velocityX - 3)
        backgUG1.velocityX = Math.round(player.velocityX - 3)
      
    }
    else if(Math.round(player.velocityX) < 0){
      //  if(player.isTouching(JG)){
            player.velocityX = player.velocityX + 1
          //  }
           /* else{
            player.velocityX = player.velocityX + .1
            }*/
        //paralax L
        backg.velocityX = Math.round(player.velocityX + 3)
        backg2.velocityX = Math.round(player.velocityX + 3)
        backg3.velocityX = Math.round(player.velocityX + 3)
        backgD.velocityX = Math.round(player.velocityX + 3)
        backgD2.velocityX = Math.round(player.velocityX + 3)
        backgD3.velocityX = Math.round(player.velocityX + 3)
        backgC1.velocityX = Math.round(player.velocityX + 3)
        backgUG1.velocityX =Math.round(player.velocityX + 3)
    }
    else{
        player.velocityX = 0
        //paralax stop
        backg.velocityX = 0
        backg2.velocityX = 0
        backg3.velocityX = 0
        backgD.velocityX = 0
        backgD2.velocityX = 0
        backgD3.velocityX = 0
        backgC1.velocityX = 0
        backgUG1.velocityX = 0
    }
    //debug
    if(goofy == "nl"){
        w = true
        w2 = true
        level = 1
    }
    //more debug
  //  if(keyWentDown("0")){
  //      console.log(player.x)
   // }

if(keyWentDown("p")){
    shards = 2
}


        //JUMP




        if(keyWentDown("W") && player.isTouching(JG)){
            player.velocityY = -20
            jumps.play()
            grounded = false
        }
        if(keyDown("W")){
            grounded = false
        }
        else if(!player.isTouching(JG)){
            grounded = false
        }
     //   if(keyWentUp("W")){
    //        player.changeAnimation("idle",PlayerI)
     //   }


        //RIGHT
        if(keyDown("D")){

            
           
            
            

            if(walks.isPlaying() === false&& player.isTouching(JG)){
                walks.play()
            }

            player.changeAnimation("walk1",PlayerWR)
           // if(keyDown("W")){
             // player.changeAnimation("jump",PlayerJ)  
           // }
            if(keyDown("SHIFT")){
                player.changeAnimation("run1",PlayerRR)
                walks.stop()
                if(runs.isPlaying() === false && player.isTouching(JG)){
                    runs.play()
                }
            }
            if(keyDown("SHIFT")){
                player.velocityX = 10
            }
            else{
                player.velocityX = 8    
            }
            
        }
      
        if(keyWentUp("D")){
           
         //  player.velocityX = 0
           
            player.changeAnimation("idle",PlayerI)
            walks.stop()
            runs.stop()
        }

        //LEFT
        if(keyDown("A")){

          
            if(walks.isPlaying() === false&& player.isTouching(JG)){
                walks.play()
            }

            player.changeAnimation("walk2",PlayerWL)
           // if(keyDown("W")){
            //    player.changeAnimation("jump2",PlayerJL)  
             // }
              if(keyDown("SHIFT")){
                player.changeAnimation("run2",PlayerRL)  
                walks.stop()
                if(runs.isPlaying() === false && player.isTouching(JG)){
                    runs.play()
                }
              }
            if(keyDown("SHIFT")){
                    player.velocityX = -10
                }
            else{
               player.velocityX = -8//////////////////////
            
            }
        }
        if(keyWentUp("A")){
           
           
            player.changeAnimation("idle",PlayerI)
            walks.stop()
            runs.stop()
        }
        
        if(Math.round(player.velocityY) < 0 && !player.isTouching(JG)){
            if(Math.round(player.velocityX) > 0){
                player.changeAnimation("jump",PlayerJ)  
            }
            else{
                player.changeAnimation("jump2",PlayerJL)  
            }
        }
        else if(Math.round(player.velocityY) > 0 && !player.isTouching(JG)){
            if(Math.round(player.velocityX) > 0){
                player.changeAnimation("down", PlayerF)
            }
            else{
                player.changeAnimation("down2", PlayerFL)
            }
        }
        

        if(Math.round(player.velocityY) >= 20 ){
            player.changeAnimation("idle", PlayerI)
            grounded = true
        }
        else if(grounded === false && player.isTouching(JG)){
            player.changeAnimation("idle", PlayerI)
            grounded = true
        }
     

  //  console.log(player.velocityY)
  //  console.log(Math.round(player.y))
   // console.log(grounded)
    //    console.log(enemy3.y)
    }   
    else{
        if(player.y < -300){
           // endAnimation()
        }
    }
}
    //end move

        
    }  

   if(gameState === "title"){
        ts.visible = true
       // credits.visible = true
        titleN.visible = true

    }
    drawSprites()

    if(gameOver == true){
        alphaval = alphaval + 1
        push()
        rectMode(CENTER)
        fill(0,alphaval)
        rect(player.x,400,1000,1000)
        pop()
    }
    if(gameOver == true){
        alphaval2 = alphaval2 + 1
        push()
        strokeWeight(0)
        stroke(0)
        fill(255,0,0,alphaval2)
        textSize(60)
        text("THE END", player.x - 125, 350)
        textSize(25)
        text("Thanks for Playing", player.x - 105,450)
        text()
        pop()
    }
    
if(gameState==="title"){

    textSize(15)
    strokeWeight(1)
    stroke(0)
    fill("black")
    text("Press 'SPACE' to start", 75, 700/2 +70)

    if(goofy == "error"){
        cheaterror()
    }

    if(keyDown("SPACE")){
        gameState = "play"
    }

    
    
}

}

async function createMoving(){
    bouncebox = createSprite(800/2 + 1980, 700-160,50,50,)
    bouncebox.visible = false
    bouncebox2 = createSprite(800/2 + 2780, 700-160 , 50,50)
    bouncebox2.visible = false
    bounceboxE1 = createSprite(800/2 + 2950, 700/2+100,40,400)
    bounceboxE1.visible = false
    bounceboxE2 = createSprite(800/2 + 3550, 700/2+100,40,400)
    bounceboxE2.visible = false
    bounceboxE3 = createSprite(800/2 + 4750, 30,40,40)
    bounceboxE3.visible = false
    bounceboxE4 = createSprite(800/2 + 4750, 700-50,40,40)
   bounceboxE4.visible = false
    bounceboxM1 = createSprite(800/2 + 7000, 700 - 350,20,20)
    bounceboxM1.visible = false
     bounceboxE5 = createSprite(800/2 + 8000, 30,40,40)
    bounceboxE5.visible = false
    bounceboxE6 = createSprite(800/2 + 8000, 700-50,40,40)
    bounceboxE6.visible = false

    moving1 = createSprite(800/2 + 2100, 700-160)
    moving1.addImage(PlatformI1)
    moving1.scale = 0.2
    moving1.velocityX = 4
    
    moving2 = createSprite(800/2 + 7000, 700 - 20,20,20)
    moving2.setCollider("rectangle", -10 , -360 ,580,50)
    moving2.addImage(PlatformI2)
    moving2.scale = 0.5
    moving2.velocityY = -3

    moving3 = createSprite(800/2 - 21300, 700 - 20,20,20)
    moving3.setCollider("rectangle", -10 , -360 ,580,50)
    moving3.addImage(PlatformI2)
    moving3.scale = 0.5
    moving3.velocityY = -3

    moving4 = createSprite(800/2 - 21700, 700 - 20,20,20)
    moving4.setCollider("rectangle", -10 , -360 ,580,50)
    moving4.addImage(PlatformI2)
    moving4.scale = 0.5
    moving4.velocityY = -6

    endMove = createSprite(0, 900,20,20)
    endMove.addImage(PlatformI1 )
    endMove.scale = 0.3



}



function createPlatform(xpos,ypos,scale){

 

    platform = createSprite(xpos,ypos)
    jumpbox = createSprite(xpos,ypos)

    

    
    //platform.debug = true
    //jumpbox.debug = true

    jumpbox.setCollider("rectangle", -10 , -200 ,300,20)
   
    platform.setCollider("rectangle", -10 , -360 ,580,50)
        platform.addImage(PlatformI2)
        platform.scale = scale

    PG.add(platform)
    JG.add(jumpbox)

}

function createPlatform2(xpos,ypos,scale){
    platform2 = createSprite(xpos,ypos)
    jumpbox2 = createSprite(xpos,ypos - 20)
    jumpbox2.addImage(PlatformI1)
    jumpbox2.scale = scale
    platform2.addImage(PlatformI1)
    platform2.scale = scale
    //platform2.debug = true
    PG.add(platform2)
    JG.add(jumpbox2)
}
function createPlatform3(xpos,ypos,scale){
    Platform3 = createSprite(xpos,ypos)
    jumpbox3 = createSprite(xpos,ypos)
    //Platform3.debug = true
   // jumpbox3.debug = true
    jumpbox3.setCollider("rectangle", -10 , -55 ,230,20)   
    Platform3.setCollider("rectangle", -8 , -120 ,700,50)
        Platform3.addImage(PlatformI3)
        Platform3.scale = scale
    PG.add(Platform3)
   JG.add(jumpbox3)
}

function createPlatform4(xpos,ypos,scale){
    Platform4 = createSprite(xpos,ypos-141)
    jumpbox4 = createSprite(xpos,ypos)
   // Platform4.debug = true
    //jumpbox4.debug = true
    jumpbox4.setCollider("rectangle", -8 , -230 ,395,50)   
    Platform4.setCollider("rectangle", -10 , -190 ,990,50)
        Platform4.addImage(PlatformI4)
        Platform4.scale = scale-.1
    PG.add(Platform4)
    JG.add(jumpbox4)
}
function createChain(xpos,ypos,scale){
   chains = createSprite(xpos,ypos)
   chains.addImage(ChainI)
   chains.scale = scale
}
function cheat(){
    const code = input.value().toLowerCase()
    input.value("");
    if(code == "debug"){
        goofy = "db"
    }
    else if(code == "miru"){
        goofy = "sam"
    }
    else if (code == "fall"){
        goofy = "nl"
    }
    else{
       goofy = "error"
    }
}

function cheaterror(){
    textSize(25)
    fill("red")
    strokeWeight(3)
    stroke(0)
    text("INVALID CHEAT CODE", 800/2 -150, 700/2 + 150)
}

function reset(){
    //dear god

if(level === 1){
    w = false
    wrench.visible = false

    w2 = false
    wrench2.visible = false
}
else{
if(checkpoint === 2 || checkpoint === 3){
    w = true
    wrench.visible = false
}
else{
    w = false
    wrench.visible = true
}
if(checkpoint === 3){
    w2 = true
    wrench2.visible = false
}
else{
    w2 = false
    wrench2.visible = true
}
}
if(goofy == "nl"){
       nl = "" 
}

    death = false
    deathtype = 0
    dieplay = 0
    dia1 = 0
    dia2 = 0
    dia3 = 0
    npc1D.changeAnimation("1",talk1)
    npc2D.changeAnimation("f1",freind1)
    npc1D.scale = 1
    npc2D.scale = 1
    player.changeAnimation("idle", PlayerI)
    player.setCollider("rectangle",0,0)
    player.scale = 0.35
    player.velocityY = 0
   // player.y = 700/2 - 200
   player.y= 0
    if(checkpoint === 0){
        player.x = 800/2
    }
    if(checkpoint === 1){
        player.x = 800/2+4500
    }
    if(checkpoint === 2){
        player.x = 800/2
    }
    if(checkpoint === 3){
        player.x = 800/2 - 20000
    }
    if(respawns.isPlaying() === false){
        respawns.play
    }
    

}


function endGame(){
    print("executed")
gameOver = true
endMove.x = player.x
endMove.velocityY = -6
//endMove.debug = true

}

function endAnimation(){
    ending.x = player.x
if(respawns.isPlaying() === false){
    respawns.play()
}
ending.changeAnimation("end1", end1I)

ending.visible = true

ending.play();
}
