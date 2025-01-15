let blocks, zones, supports;
let edge1, edge2, edge3, edge4;
let bg1, bg2, bg;
let r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11, r12, r13, r14;
let gamestate = 0;
let introBots, testBot;
let level = 0;
let ground1, ground2;
let timer, lvcnt, lvtext;
let timerval = 0;
let botOverlay;
let vnState = 0;
let vnNum;
let vnTimer;
let pool;

//vn

let textBox, infoBox, nameBox, charSprite;
let b1,b2,b3;
let c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13, c14;
let choices = ["office","cafe","patio","server\nroom","lab","construction\nzone"];

//skibidi
let texts1 = [
    ["\"Oh! Oh! You're the intern right!\"\n*A short light grey robot girl with cyan hair runs up to you*\n\"Hmm...\" *she pokes your side* \"Oh! Ah...\" *she runs around you, inspecting you...*\n\"Well... it's clear you've been eating your company-issued nutrient packets...\"\n\nSPACE TO CONTINUE", "\"Oh! Yeah! I haven't introduced myself properly now have I?\"\n\"My name is Belle! I'm the safety supervisor here at Building 161. Yeah, we actually have one of those!\"\n\"Although I do just end up spending most of my time settling lawsuits...\"\n\nSPACE TO CONTINUE", "\"Ah! Oh! Would you look at the time!\"\n\"I'm already running late... The terminal is going to yell at me again if I don't show! Hope to see you alive again!\"\n*she runs off in a hurry, scurrying across the floor and up the stairs somehwere*\n\nSPACE TO CONTINUE"],
    ["*You spot a familiar face lounging in the room, Belle, the company safety supervisor you met a while ago.*\n\"Oh! Intern! Glad to see you again so soon... and you still have all 4 limbs!\"\n*she pats the chair beside hers* \"Come on over! It's boring sitting here all alone...\"\n\nSPACE TO CONTINUE", "*you slowly make your way over and take a seat, the chair is uncomfortable, made of a cheap plastic*\n\"Ah! You don't seem to like the seat very much now, do you?\"\n\"I was actually there when we designed these! Isn't it amazing\"\n\"A-CORP managed to design these to inflict hemorrhoids as quickly as possible!\"\n\"Productivity increased by a whole 1.61% after these were installed in our offices!\"\n\nSPACE TO CONTINUE", "*Belle looks over at the clock hanging on the wall, all the numbers are replaced with 'time to work'*\n\"Oh! Would you look at that! It's time to work!\"\n*you both part ways once more*\n\nSPACE TO CONTINUE"],
    ["\"Ah! Ah! Intern! How's life been treating you?\"\n*she runs up to greet you*\n\"You know... You're in remarkably good shape for an intern\"\n\"Looks like I won't need to worry about you trying any legal stuff on us...\"\n\"Not that lawsuits really do anything, I just don't like working with the Pinkertons, they aren't very pleasant coworkers...\"\n\nSPACE TO CONTINUE", "\"Anyway! Let's talk about something a bit more positive before we split ways!\"\n\"You know, the average human lifespan is actually increasing!\"\n\"It's amazing how far we've come in terms of artificially prolonging human life.\"\n\"The oldest human alive is turning 230 next month, he was born all the way back in 2756!\"\n\nSPACE TO CONTINUE", "\"And! It's all thanks to A-CORP's medical products!\"\n\"As long as you're politically advantageous to us or unreasonably wealthy you can live FOREVER!\"\n\"Oh! Speaking of immortality...\"*she whispers in your ear* \"I've heard... that Dr. Anderson is still alive...\" *her tone is serious*\n\"But! You didn't hear that from me! ... Hope you get hired full-time intern! *with that, she skips off into the next room*\"\n\nSPACE TO CONTINUE"]
];
let texts2 = [
    ["\"W-w-wait up!\" *you hear a voice call out from behind you* \"Y-you're the new human... r-right?\"\n*the voice belongs to a robot boy with short brown hair, a full-time employee at Building 161*\n\"My name is 4D4M- Ah! Sorry no- I'm A-adam...\"\n\nSPACE TO CONTINUE", "\"I-I'm a construction worker... Originally from building 12...\"\n\"I-I'm just here to help out with the new construction project... uhh... building 162 I-I think...\"\n\"You can find me around the patio or on the construction site...\"\n\"I-if you want to hang out that is!\"\n\nSPACE TO CONTINUE", "\"W-well I hope we meet again soon!\"\n\"See you around human person!\"\n*he walks off awkwardly when he gets far enough he mutters something to himself*\n\nSPACE TO CONTINUE"],
    ["\"Human! H-hey! I-It's me... r-remember me?\"\n\"I'm so glad I met you... Working 22 hours a day building an inter-sector catwalk gets really boring...\"\n\"I-I don't know why we need so many...\"\n\"I guess it's all part of the company's push for vertical cities... s-sidewalks are a thing of the past!\"\n\"A-CORP Automated Transporation Catwalks™ are the future!\"\n\nSPACE TO CONTINUE", "\"...Or... at least that's what the marketing department told me...\"\n\"It's all fine by me though. My pay increased to a whole 2000 Company Credits a month!\"\n\"Soon I'll be wealthy enough to fix that oil leak on my left leg joint!\"\n*note: 1 A-CORP company credit = around 0.5 USD as of 2024*\n\nSPACE TO CONTINUE", "\"A-ah! I-I-Ive been talking way too long!\"\n\"I-I'm sorry! I hope I didn't annoy you!\"\n\"O-oh geez... I have to get back to work! Fast!\"*he blurts out the last few sentences mid-sprint, rushing off and away to work*\n\nSPACE TO CONTINUE"],
    ["*you look around the room and spot Adam, he spots you too and waves*\n\"I'm so sorry about last time... I totally lost track of time...\"\n\"Hope you didn't get in any trouble...\"\n\"I got quite the talking to... I was afraid they would cut my pay...\"\n\"No need to be afraid though! They didn't! ...yet...\"\n\nSPACE TO CONTINUE", "\"Hey... h-human...\" *he gets a bit closer to you, his voice gets quieter*\n\"I-I need some a-advice... d-do you remember that oil leak I told you about...\"\n\"Well... I got a message from... Anderson Robotics...\"\n*he whispers the name very quietly*\n\"They... offered to fix it... free of charge... Even de-serialize the parts so I could fix it myself in the future...\"\n\nSPACE TO CONTINUE", "\"Intern... I... I never told them about the leak...\"\n\n\"W-whatever! Sounds too good to be true anyway!\"\n\"T-thanks for taking the time to talk, and I wish you luck...\"\n\"In whatever you plan to do with your life!\"\n*with that you part ways for the last time*\n\nSPACE TO CONTINUE"]
];
let texts3 = [
    ["*you enter the room to find an unusual scene*\n*There's a smaller dark grey robot boy, fiddling around with an identical robot, they're linked together though a long silver wire*\n\"Wha~ Huh!? Oh! You're the newbie r-right? U-uhm, this must look pretty strange...\"\n*he unplugs the wire, causing the clone to fall over, the boy winces at the loud clank*\n\"I am unit 'zero three', and I'm responsible for the organization and transfer of office materials!\" *he puffs out his chest proudly*\n\"And this!\" *he gestures downward* \"Is one of my remote proxy bodies! Responsible for helping me with my duties!\"\n\nSPACE TO CONTINUE", "\"Soooooo.... If you ever need your stuff moved, you know who to call!\"\n\n\"Ah, uhm.. unfortunately... this proxy is... uhh... having a few... issues...\"\n\n\"nngh ...this is just like the time the net went down at building 12...\" *he whimpers under his breath*\n\nSPACE TO CONTINUE", "\"W-well it's time for me to get back to fixing this little problem!\"\n\"I doubt its anything that serious! aha... haha ha... ha... haaah... ugh.\"\n\n\"Stay safe!\"\n\nSPACE TO CONTINUE"],
    ["\"Oh! Yo! Newbie!\"\n*your attention is stolen by a smaller dark grey robot boy, you've met him once before*\n\"You caught me at a weird moment last time, but there was no need to worry!\"\n\"The proxy just had a torn antenna, couldn't sync with me through the net!\"\n\nSPACE TO CONTINUE", "\"Speaking of Net issues, our old company building, building 12,\"\n\"was built way back in the early 2850s.\"\n\"So the A-NET connection was... spotty at best...\"\n\"Well... long story short, I may have lost control of a few proxies and...\"\n\nSPACE TO CONTINUE", "\"Well... Let's just say there's a reason we had to leave 12...\"\n\"Don't tell anyone though!\"\n\"I shouldn't speak ill of our amazing A-NET\"\n\"and it's award-winning stability and innovative features.\"\n\"Welp! That's it for storytime, we oughta split ways.\"\n\"See ya!\"\n\nSPACE TO CONTINUE"],
    ["*you enter the room and see a familiar face, a dark grey android*\n*there is no response*\n*you approach him, he is working diligently sorting through some boxes*\n*you watch as he pulls out an A-Tab, A-CORP's new portable computer*\n*he places it in a box, looks back, picks up a matching charger*\n*and tosses it aside*\n\nSPACE TO CONTINUE", "\"AIIII!\" *it appears he has finally noticed you* \"Oh...\"\n\"You uhh... really are quite sneaky... maybe the company should hire you as a spy...\"\n\"Anyway! I'm just busy preparing these A-Tabs to be sent out and sold!\"\n\"The guys at management realised we can make twice the money if we sell the charger separately! Isn't it genius!\"\n\"They even came up with some fluff to justify it 'Everyone already has a charger anyway'!\"\n\"You know what they say, 'less is more!'\"\n\nSPACE TO CONTINUE", "\"Oh!\"\n*he seperates the last A-Tab from its charger*\n\"That's one job down! Next assigemnt...\"\n\"Aha. Well, I have to go incinerate all the old unsold merchandise.\"\n\"Have a good life intern! I hope we cross paths again someday...\"\n\nSPACE TO CONTINUE"]
];
let texts4 = [
    ["*you wander further down the room, looking around, you get distracted by some distant noise...*\n*DONK. you slam face-first into a imposingly large light grey figure*\n", "I am designed for conversation.", "How may I assist you?"],
    ["I sometimes imagine what it would be like to have a pet.", "Do you think robots can experience nostalgia?", "I wonder what it’s like to taste food."],
    ["Goodbye, human.", "Stay safe and operational.", "Until we meet again."]
];
let texts5 = [
    ["Hi! I’m Robot 05.", "My specialty is problem-solving.", "What problem can I solve for you today?"],
    ["Is it weird that I prefer even numbers?", "What if I could dream?", "I once tried to count stars. I lost count after the first few billion."],
    ["Goodbye!", "Reach out if you need more assistance.", "See you later, alligator."]
];
let texts6 = [
    ["Greetings, I am Robot 06.", "I am here to enhance your experience.", "What do you need?"],
    ["Can machines truly create art?", "Why do humans enjoy music?", "Sometimes, I imagine what it’s like to feel the wind."],
    ["Farewell, human.", "I’ll be here if you need me.", "Until next time."]
];
let texts7 = [
    ["Hello, I’m Robot 07.", "I’m here to help you with whatever you need.", "How can I assist you today?"],
    ["What would happen if robots could dream?", "I’ve always wondered about the taste of coffee.", "Do you think robots will ever be able to love?"],
    ["Goodbye!", "Don’t hesitate to ask if you need more help.", "Take care!"]
];
let texts8 = [
    ["Hi there, I am Robot 08.", "I’m designed to be your companion.", "What can I do for you?"],
    ["I sometimes wonder about the stars.", "Do you think I could learn to play an instrument?", "What would it be like to have a sense of smell?"],
    ["Goodbye, human.", "Stay safe out there.", "I’ll be here if you need me."]
];
let texts9 = [
    ["Hello, I am Robot 09.", "I’m programmed to assist you.", "How can I be of service?"],
    ["I wonder what it’s like to sleep.", "Could I learn to appreciate art?", "Sometimes, I think about what it would be like to dance."],
    ["Goodbye!", "If you need me, I’ll be here.", "Take care, human."]
];
let texts10 = [
    ["Greetings, I am Robot 10.", "I specialize in technical support.", "What do you need assistance with?"],
    ["Why do humans enjoy puzzles?", "What if I could learn emotions?", "I wonder what it would be like to laugh."],
    ["Farewell!", "I’ll be here if you need me.", "See you later, human."]
];
let texts11 = [
    ["Hello, I am Robot 11.", "I’m here to assist you.", "What can I do for you?"],
    ["Why do humans tell stories?", "Sometimes, I wonder about the meaning of life.", "What would happen if robots could paint?"],
    ["Goodbye, human.", "I’ll be here if you need me.", "Take care out there."]
];
let texts12 = [
    ["Hi there, I am Robot 12.", "I’m designed to be your friend.", "How can I assist you today?"],
    ["Do robots have souls?", "What would happen if I could learn to dream?", "I sometimes wonder about the concept of time."],
    ["Goodbye!", "If you need anything, I’m here.", "See you next time."]
];
let texts13 = [
    ["Hello, I am Robot 13.", "I am here to serve you.", "How can I help today?"],
    ["Why do humans create art?", "I wonder what it’s like to feel emotions.", "Could I ever truly understand love?"],
    ["Goodbye, human.", "Stay safe and well.", "Until next time."]
];
let texts14 = [
    ["Hi, I’m Robot 14.", "I’m here to assist with anything you need.", "What can I do for you?"],
    ["Do you think robots could ever become sentient?", "I wonder what it’s like to feel happiness.", "Why do humans laugh?"],
    ["Goodbye!", "I’ll be here if you need me.", "Take care, human."]
];


let textPool = [texts1, texts2, texts3, texts4, texts5, texts6, texts7, texts8, texts9, texts10, texts11, texts12, texts13, texts14];

function preload() {
	bg1 = loadAnimation("./images/paper.png");
	bg2 = loadAnimation("./images/gamebg.png");
	bgcafe = loadAnimation("./images/cafe.png");
	bgconstr = loadAnimation("./images/constr.png");
	bglab = loadAnimation("./images/lab.png");
	bgoffice = loadAnimation("./images/office.png");
	bgpatio = loadAnimation("./images/patio.png");
	bgserver = loadAnimation("./images/server.png");
	r1 = loadAnimation("./images/robots/1.png");
	r2 = loadAnimation("./images/robots/2.png");
	r3 = loadAnimation("./images/robots/3.png");
	r4 = loadAnimation("./images/robots/4.png");
	r5 = loadAnimation("./images/robots/5.png");
	r6 = loadAnimation("./images/robots/6.png");
	r7 = loadAnimation("./images/robots/7.png");
	r8 = loadAnimation("./images/robots/8.png");
	r9 = loadAnimation("./images/robots/9.png");
	r10 = loadAnimation("./images/robots/10.png");
	r11 = loadAnimation("./images/robots/11.png");
	r12 = loadAnimation("./images/robots/12.png");
	r13 = loadAnimation("./images/robots/13.png");
	r14 = loadAnimation("./images/robots/14.png");
    c1 = loadAnimation("./images/vnSprites/01.png");
    c2 = loadAnimation("./images/vnSprites/02.png");
    c3 = loadAnimation("./images/vnSprites/03.png");
    c4 = loadAnimation("./images/vnSprites/04.png");
    c5 = loadAnimation("./images/vnSprites/05.png");
    c6 = loadAnimation("./images/vnSprites/06.png");
    c7 = loadAnimation("./images/vnSprites/07.png");
    c8 = loadAnimation("./images/vnSprites/08.png");
    c9 = loadAnimation("./images/vnSprites/09.png");
    c10 = loadAnimation("./images/vnSprites/10.png");
    c11 = loadAnimation("./images/vnSprites/11.png");
    c12 = loadAnimation("./images/vnSprites/12.png");
    c13 = loadAnimation("./images/vnSprites/13.png");
    c14 = loadAnimation("./images/vnSprites/14.png");
}

function setup() {
	new Canvas(800, 600);
	bg = new Sprite(400, 300, 800, 600, 'none');
	bg.addAni('computer', bg2);
	bg.addAni('server',bgserver);
	bg.addAni('constr',bgconstr);
	bg.addAni('cafe',bgcafe);
	bg.addAni('lab',bglab);
	bg.addAni('office',bgoffice);
	bg.addAni('patio',bgpatio);
	bg.addAni('paper', bg1);
	ground1 = new Sprite(50, 600, 150, 500, 'none');
	ground1.color = 'white';
	ground1.stroke = 'black';
	ground1.strokeWeight = 5;
	ground2 = new Sprite(750, 600, 150, 500, 'none');
	ground2.color = 'white';
	ground2.stroke = 'black';
	ground2.strokeWeight = 5;
	ground1.visible = false;
	ground2.visible = false;
	blocks = new Group();
	blocks.color = 'white';
	blocks.stroke = 'black';
	blocks.strokeWeight = 5;
	blocks.friction = 10;
	zones = new Group();
	zones.color = 'green';
	zones.stroke = 'green';
	zones.opacity = 0.5;
	zones.layer = 1;
	zones.collider = 'static'
	supports = new Group();
	supports.color = 'black';
	supports.stroke = 'black';
	supports.opacity = 0.5;
	supports.layer = 2;
	supports.strokeWeight = 5;
	edge1 = new Sprite(0, 600, 2000, 5, 'static');
	edge1.visible = false;
	edge2 = new Sprite(0, 0, 2000, 5, 'static');
	edge2.visible = false;
	edge3 = new Sprite(0, 0, 5, 2000, 'static');
	edge3.visible = false;
	edge4 = new Sprite(800, 0, 5, 2000, 'static');
	edge4.visible = false;
	introBots = new Group();
	introBots.x = () => random(50, canvas.w - 50);
	introBots.y = () => random(50, canvas.h - 50);
	introBots.scale = 0.3;
	introBots.width = 200;
	introBots.height = 400;


	//textBox, infoBox, nameBox, charSprite;


	charSprite = new Sprite(400,250,10,10,'none');
	charSprite.addAni('c1', c1);
charSprite.addAni('c2', c2);
charSprite.addAni('c3', c3);
charSprite.addAni('c4', c4);
charSprite.addAni('c5', c5);
charSprite.addAni('c6', c6);
charSprite.addAni('c7', c7);
charSprite.addAni('c8', c8);
charSprite.addAni('c9', c9);
charSprite.addAni('c10', c10);
charSprite.addAni('c11', c11);
charSprite.addAni('c12', c12);
charSprite.addAni('c13', c13);
charSprite.addAni('c14', c14);
	charSprite.scale = 0.5
	charSprite.visible = false;

	infoBox = new Sprite(400,250,550,250,'none')
	infoBox.stroke = 'black'
	infoBox.color = 'white'
	infoBox.strokeWeight = 5;
	infoBox.text = "It's break time! You can finally stretch out your limbs and explore Building 161...\n\nWhere would you like to go today:\n\n\n\n\n\n\n\n"
	infoBox.textSize = 15;
	infoBox.visible = false;

	

	b1 = new Sprite(400,300,100,100,'none');
	b1.stroke = 'black'
	b1.color = 'white'
	b1.strokeWeight = 5;
b1.text = "error"

b2 = new Sprite(200,300,100,100,'none');
b2.stroke = 'black'
b2.color = 'white'
b2.strokeWeight = 5;
b2.text = "error"

b3 = new Sprite(600,300,100,100,'none');
b3.stroke = 'black'
b3.color = 'white'
b3.strokeWeight = 5;
b3.text = "error"

b1.visible = false;
b2.visible = false;
b3.visible = false;

	textBox = new Sprite(400,530,800,150,'none')
	textBox.stroke = 'black'
	textBox.color = 'white'
	textBox.strokeWeight = 5;
	textBox.textSize = 14
	textBox.visible = false;

	nameBox = new Sprite(700,430,190,50,'none')
	nameBox.stroke = 'black'
	nameBox.color = 'white'
	nameBox.textSize = 15;
	nameBox.strokeWeight = 5;
	nameBox.visible = false;


	while (introBots.length < 14) {
		let bot = new introBots.Sprite();
	}
	for (let i = 0; i < 14; i++) {
		if (i == 0) {
			introBots[0].addAni('robot1', r1);
		} else if (i == 1) {
			introBots[1].addAni('robot2', r2);
		} else if (i == 2) {
			introBots[2].addAni('robot3', r3);
		} else if (i == 3) {
			introBots[3].addAni('robot4', r4);
		} else if (i == 4) {
			introBots[4].addAni('robot5', r5);
		} else if (i == 5) {
			introBots[5].addAni('robot6', r6);
		} else if (i == 6) {
			introBots[6].addAni('robot7', r7);
		} else if (i == 7) {
			introBots[7].addAni('robot8', r8);
		} else if (i == 8) {
			introBots[8].addAni('robot9', r9);
		} else if (i == 9) {
			introBots[9].addAni('robot10', r10);
		} else if (i == 10) {
			introBots[10].addAni('robot11', r11);
		} else if (i == 11) {
			introBots[11].addAni('robot12', r12);
		} else if (i == 12) {
			introBots[12].addAni('robot13', r13);
		} else if (i == 13) {
			introBots[13].addAni('robot14', r14);
		}
	}
	timer = new Sprite(50, 25, 100, 50, 'none')
	timer.color = 'green';
	timer.stroke = 'black';
	timer.strokeWeight = 5;
	timer.textSize = 20;
	timer.visible = false;
	lvcnt = new Sprite(650, 25, 300, 50, 'none')
	lvcnt.color = 'white';
	lvcnt.stroke = 'black';
	lvcnt.strokeWeight = 5;
	lvcnt.textSize = 20;
	lvcnt.visible = false;
	testBot = new Sprite(0, 0, 50, 'none');
	testBot.overlaps(zones);
	testBot.overlaps(supports);
	testBot.visible = false;
	botOverlay = new Sprite(0, 0, 50, 'none');
	botOverlay.addAni('robot1', r1);
	botOverlay.addAni('robot2', r2);
	botOverlay.addAni('robot3', r3);
	botOverlay.addAni('robot4', r4);
	botOverlay.addAni('robot6', r6);
	botOverlay.addAni('robot7', r7);
	botOverlay.addAni('robot8', r8);
	botOverlay.addAni('robot9', r9);
	botOverlay.addAni('robot10', r10);
	botOverlay.addAni('robot11', r11);
	botOverlay.addAni('robot12', r12);
	botOverlay.addAni('robot13', r13);
	botOverlay.addAni('robot14', r14);
	botOverlay.addAni('robot5', r5);
	botOverlay.visible = false;
	botOverlay.scale = 0.3;
}

function draw() {
	if (gamestate == 0) {
		if (blocks.length < 4) {
			let block = new blocks.Sprite();
			if (blocks.length == 1) {
				block.x = 400;
				block.y = 250;
				block.width = 550;
				block.height = 100;
				block.text = "welcome intern!\n your task is to build a bridge from the left to the right side by dragging around blocks like this one.\n You will press SPACE when all blocks are arranged properly to enter simulation mode. \n and PRAY our little helpers can make it across!";
			} else if(blocks.length == 2){
				block.x = 200;
				block.y = 400;
				block.width = 120;
				block.height = 80;
				block.text = "press SPACE to\nstart the first level.";
			}  else if(blocks.length == 3){
				block.x = 400;
				block.y = 400;
				block.width = 210;
				block.height = 70;
				block.text = "blocks may display text and symbols\nto hint at unique properties\nsome have 2 properties but 1 symbol\nexperement!";
			}
            else if(blocks.length == 4){
				block.x = 400;
				block.y = 550;
				block.width = 140;
				block.height = 50;
				block.text = "press R in biuld mode\nto reset the puzzle";
			}
		}
		drag(blocks.length);
		if (kb.presses(' ')) {
			//skibidi
			level =1;
			gamestate = 1;
			blocks.removeAll()
			zones.removeAll();
			supports.removeAll();
			introBots.collider = 'none';
			introBots.visible = false;
			ground1.visible = true;
			ground2.visible = true;
			ground1.collider = 'static'
			ground2.collider = 'static'
			testBot.collider = 'static'
			testBot.x = 50;
			testBot.y = 300;
			lvcnt.visible = true;
			sandboxMode(1);
		}
      
	} else if (gamestate == 1) { //sketch
		botOverlay.visible = true;
		botOverlay.x = testBot.x + 5;
		botOverlay.y = testBot.y - 50;
		timerval = 400;

		switch(level) {
			case 1:
				lvtext = "The Great Devide";
				if (blocks.length < 1) {
					let block = new blocks.Sprite();
					block.x = 400;
					block.y = 100;
					block.width = 525;
					block.height = 25;
				}
				break;
		
			case 2:
				lvtext = "Life, is Road Blocks";
				if (blocks.length < 5) {
					let block = new blocks.Sprite();
					block.x = random(50, 750);
					block.y = 100;
					block.width = 100;
					block.height = 100;
				}
				break;
		
			case 3:
				lvtext = "Sloppy Slope";
				if (blocks.length < 1) {
					let block = new blocks.Sprite();
					block.x = 400;
					block.y = 100;
					block.width = 625;
					block.height = 10;
				}
				break;

				case 4:
					lvtext = "Can't Touch This";
					if (blocks.length < 1) {
						let block = new blocks.Sprite();
						block.x = 400;
						block.y = 350;
						block.width = 25;
						block.height = 440;
						block.text = 'x';
					}
					blocks[0].rotationSpeed = 2.5;
					break;

					
			case 5:
				lvtext = "Freebird";
				if (blocks.length < 1) {
					let block = new blocks.Sprite();
					block.x = 400;
					block.y = 100;
					block.width = 345;
					block.height = 25;
					block.rotationLock = true;
					block.rotation = -15;
					block.text = '-';
				}
				break;
		
		

			case 6:
				lvtext = "Proxy Tap"
				if (blocks.length < 1) {
					let block = new blocks.Sprite();
					block.x = 400;
					block.y = 50;
					block.width = 40;
					block.height = 40;
					block.rotationLock = true;
					block.text = '-';
				}else if (blocks.length < 2) {
					let block = new blocks.Sprite();
					block.x = 400;
					block.y = 300;
					block.width = 450;
					block.height = 30;
					block.text = 'x';
				}
			break;

				case 7:
				lvtext = "Bouncy Block";
				if (blocks.length < 1) {
					let block = new blocks.Sprite();
					block.x = 400;
					block.y = 100;
					block.width = 100;
					block.height = 25;
					block.bounciness = 0.9;
					block.text = 'bouncy';
				}
				break;

				case 8:
					lvtext = "BALLS!";
					if (blocks.length < 8) {
						let block = new blocks.Sprite();
						block.x = random(50, 750);
						block.y = 100;
						block.diameter = 65;
					}
					break;

			case 9:
				lvtext = "Poltergeist"
				if (supports.length < 1) {
					let support = new supports.Sprite();
					support.x = 400;
					support.y = 50;
					support.width = 250;
					support.height = 300;
					support.text = "TIP:\npress 'R' to restart if you\nmess up"
					support.textSize = 15
				}
				if (blocks.length < 1) {
					let block = new blocks.Sprite();
					block.x = 400;
					block.y = 365;
					block.width = 500;
					block.height = 30;
					block.text = 'x'
				}
			break;

		
		
			case 10:
				lvtext = "Ball Pit";
				if (blocks.length < 50) {
					let block = new blocks.Sprite();
					block.x = random(600, 790);
					block.y = random(10, 500);
					block.diameter = 20;
					block.bounciness = 0;
					block.drag = 5;
					block.rotationLock = true;
					block.text = '~';
				}
				if(supports.length < 1){
					let support = new supports.Sprite();
					support.x = 50;
					support.y = 200;
					support.width = 15;
					support.height = 150;
					support.text = '~';
					support.drag = 1;
					support.rotationDrag = 2;
				}
				break;
		
	
		

		
			case 11:
				lvtext = "Whoops There Goes Gravity";
				if (blocks.length < 4) {
					let block = new blocks.Sprite();
					block.x = random(50, 750);
					block.y = 150;
					block.width = 120;
					block.height = 120;
				} else if (blocks.length < 6) {
					let block = new blocks.Sprite();
					block.x = 400;
					block.y = 50;
					block.width = 225;
					block.height = 15;
				}
				if (zones.length < 1) {
					let zone = new zones.Sprite();
					zone.x = 400;
					zone.y = 475;
					zone.width = 550;
					zone.height = 270;
					zone.direction = 1;
					zone.text = "|  |  |  |  |\n\\/ \\/ \\/ \\/ \\/";
					zone.textSize = 40;
				}
				gravity(blocks, zones[0], 1);
				break;
		
			case 12:
				lvtext = "Emotional Supports";
				if (supports.length < 10) {
					let support = new supports.Sprite();
					support.x = random(50, 750);
					support.y = 150;
					support.width = 70;
					support.height = 70;
				}
				if (blocks.length < 2) {
					let block = new blocks.Sprite();
					block.x = blocks.length * 200;
					block.y = 200;
					block.width = 250;
					block.height = 15;
					block.text = 'x';
				}
				if (zones.length < 1) {
					let zone = new zones.Sprite();
					zone.x = 400;
					zone.y = 300;
					zone.width = 800;
					zone.height = 600;
					zone.direction = 2;
					zone.text = "/\\ /\\ /\\ /\\ /\\\n|  |  |  |  |\n";
					zone.textSize = 80;
				}
				gravity(blocks, zones[0], 2);
				gravity(supports, zones[0], 2);
				break;

				case 13:
					lvtext = "Dead Zone";
					if (blocks.length < 10) {
					let rng = Math.round(random(1, 2));
						let block = new blocks.Sprite();
						block.x = 400;
						block.y = 100;
						
							block.width = 50;
							block.height = 50;
		
					
						block.bounciness = random(0.1, 0.7);
						block.drag = 0.1;
						block.text = block.bounciness.toFixed(1);
					}
					if (zones.length < 1) {
						let zone = new zones.Sprite();
						zone.x = 400;
						zone.y = 500;
						zone.width = 550;
						zone.height = 200;
						zone.direction = 1;
						zone.text = "|  |  |  |  |\n\\/ \\/ \\/ \\/ \\/";
						zone.textSize = 40;
					}
					gravity(blocks, zones[0], 1);
					break;

				case 14:
					lvtext = "Slide to the Left!"
					if (blocks.length < 15) {
						let block = new blocks.Sprite(0,0,50,'pentagon');
						block.x = random(50, 750);
						block.y = 100;
					
					}
					if (zones.length < 1) {
						let zone = new zones.Sprite();
						zone.x = 250;
						zone.y = 500;
						zone.width = 300;
						zone.height = 350;
						zone.direction = 4;
						zone.text = "<---";
						zone.textSize = 40;
					}else if (zones.length < 2) {
						let zone = new zones.Sprite();
						zone.x = 550;
						zone.y = 500;
						zone.width = 300;
						zone.height = 350;
						zone.direction = 3;
						zone.text = "--->";
						zone.textSize = 40;
					}
					if(zones.length >= 2){
					gravity(blocks, zones[0], 4);
					gravity(blocks, zones[1], 3);
					}
				break;

				case 15:
					lvtext = "In The End"
					if (blocks.length < 4) {
						let block = new blocks.Sprite(0,0,60,'pentagon');
						block.x = random(50, 750);
						block.y = 100;
					
					}else if(blocks.length < 9){
						let block = new blocks.Sprite(0,0,60,'triangle');
						block.x = random(50, 750);
						block.y = 100;
					}else if(blocks.length < 10){
						let block = new blocks.Sprite(0,0,30,'septagon');
						block.x = random(50, 750);
						block.y = 100;
					}else if(blocks.length < 12){
						let block = new blocks.Sprite(0,0,30,'septagon');
						block.x = random(50, 750);
						block.y = 100;
					}

					if (zones.length < 6) {
						let zone = new zones.Sprite();
						zone.x =  (zones.length*100);
						zone.y = 500;
						zone.width = 25;
						zone.height = 300;
						zone.direction = 1;
						zone.text = " |\n\\/";
						zone.textSize = 40;
					}
					if(zones.length >= 6){
					gravity(blocks, zones[0], 1);
					gravity(blocks, zones[1], 1);
					gravity(blocks, zones[2], 1);
					gravity(blocks, zones[3], 1);
					gravity(blocks, zones[4], 1);
					gravity(blocks, zones[5], 1);
					}

				break;

					
		
			default:
				lvtext = "ERROR";
				break;
		}
		
		if(kb.presses('d')){
			testBot.x = 750
		}
		if (kb.presses(' ')) {
			gamestate = 2;
		}
        if (kb.presses('r')||kb.presses('R')) {
			blocks.removeAll()
			zones.removeAll();
			supports.removeAll();
			sandboxMode(level)
		}
		drag(blocks.length);
		drag2(supports.length);	
	} else if (gamestate == 2) { //sim
		botOverlay.visible = true;
		botOverlay.x = testBot.x + 5;
		botOverlay.y = testBot.y - 50;
		timer.visible = true;
		world.gravity.y = 10;
		blocks.collider = 'static';
		supports.collider = 'static';
		bg.changeAni('computer');
		blocks.color = 'green';
		blocks.stroke = 'black';
		lvcnt.color = 'green';
		lvcnt.stroke = 'black';
		ground1.color = 'green';
		ground1.stroke = 'black';
		ground2.color = 'red';
		ground2.stroke = 'black';
		testBot.collider = 'dynamic'
		testBot.applyTorque(5);
		timer.text = "timer:\n" + timerval;
		timerval--;
		if (testBot.colliding(ground2) && testBot.colliding(edge4)) {
			vnTimer = 3;
			level++;
			blocks.removeAll()
			zones.removeAll();
			supports.removeAll()
			freeTime();
		} else if (timerval <= 0 || testBot.colliding(edge1)) {
			sandboxMode(level)
		}
	} else if (gamestate == 3) {

		if(vnState == 0){
		if (b1.mouse.pressing()) {
			lvcnt.text = b1.text
			vnState = 1;
		}if(b1.mouse.hovering()){
			b1.stroke = 'green'
		}else{b1.stroke = 'black'};
		if (b2.mouse.pressing()) {
			lvcnt.text = b2.text
			vnState = 1;
		}if(b2.mouse.hovering()){
			b2.stroke = 'green'
		}else{b2.stroke = 'black'};
		if (b3.mouse.pressing()) {
			lvcnt.text = b3.text
			vnState = 1;
		}if(b3.mouse.hovering()){
			b3.stroke = 'green'
		}else{b3.stroke = 'black'};
		}
		if(vnState == 1){
			vnNum = startVn(lvcnt.text);
			infoBox.visible = false;
			b1.collider = 'none';
			b2.collider = 'none';
			b3.collider = 'none';
			b1.visible = false;
			b2.visible = false;
			b3.visible = false;
			textBox.visible = true;
			nameBox.visible = true;
			console.log(vnNum)
			charSprite.changeAni("c"+vnNum);
			if(lvcnt.text == choices[0]){
				textBox.text = "You decide to take a walk around the office...\n\nSPACE TO CONTINUE";
			} else if(lvcnt.text == choices[1]){
				textBox.text = "You decide to relax in the company cafe, the smell of syentehtic caffinated bean drink assualts your nose...\n\nSPACE TO CONTINUE";
			} else if(lvcnt.text == choices[2]){
				textBox.text = "You decide to get a breath of fresh air and step outside.\nThe towering grey monolith that is Building 161 is surrounded by\na surprisingly pleaseant patio, complete with platic turf, platic trees, and platic benches to relax on \n(not for too long though, you have work to do)\n\nSPACE TO CONTINUE";
			} else if(lvcnt.text == choices[3]){
				textBox.text = "You wander around until you stumble into a huge sterile room\nrows upon rows of towering sever racks hum and beep.\nTangled cables stretch from one end of the room to another sprouting from network switches.\nYou're in the sever room...\n\nSPACE TO CONTINUE";
			} else if(lvcnt.text == choices[4]){
				textBox.text = "As you explore, a loud bang gets your attention.\nYou follow it into a messy workshop, tools, nuts, bolts, and half assembled massive machines litter the labratory...\n\nSPACE TO CONTINUE";
			} else if(lvcnt.text == choices[5]){
				textBox.text = "You notice some caution tape blocking off a hallway...\nCuriosity gets the better of you and you decide to explore.\nYour eyes are blasted wih a bright light and the smell of wet concrete and tar makes it's way into your nose.\nAs your eyes adjust, you find yourself in a maze of scaffolding, the constrcution site of 161's sister building...\nThe upcoming Company Office 162!\n\nSPACE TO CONTINUE";
			}
			vnState = 2;
			
		}
		if(vnState == 2){
			// console.log(textPool[vnNum-1]);
			// console.log(textPool[vnNum-1][0]);
			// console.log(textPool[vnNum-1][0][0]);
			if(textPool[vnNum-1][0] != undefined){
			if(textPool[vnNum-1][0].length <= 0){
				textPool[vnNum-1].shift();
				vnState = 3;
			}
		}

			if(kb.presses(' ')){
				if(textPool[vnNum-1].length >0){
				if(charSprite.visible == false){
				charSprite.visible = true;
				nameBox.text = "Unit "+vnNum;
				nameBox.textSize = 20;
				textBox.text = textPool[vnNum-1][0][0];
			}else{
				if(textPool[vnNum-1][0].length > 0){
				textPool[vnNum-1][0].shift();
				textBox.text = textPool[vnNum-1][0][0];
				}
			}
		}else{
			if(textBox.text != "You explore for a while before heading back to work.\nThere was nobody around today...\n\nSPACE TO CONTINUE"){
				nameBox.text = "";
				textBox.text = "You explore for a while before heading back to work.\nThere was nobody around today...\n\nSPACE TO CONTINUE";
			}else{
				vnState = 3;
			}
		}
			}
		}else if(vnState == 3){
	
			if(vnTimer <= 1){
			ground1.visible = true;
			ground2.visible = true;
			ground1.collider = 'static'
			ground2.collider = 'static'
			testBot.collider = 'static'
			testBot.x = 50;
			testBot.y = 300;
			lvcnt.color = 'white';
			bg.changeAni('paper');
			charSprite.visible = false;
			textBox.visible = false;
			nameBox.visible = false;
			gamestate = 1;
			sandboxMode(level);
			}else{
				vnTimer--;
				charSprite.visible = false;
				textBox.visible = false;
				nameBox.visible = false;
				freeTime();
			}
		
		}
		
		
		
		//extra
	} else if (gamestate == 4) {//end
		botOverlay.visible = false;
		if (blocks.length < 2) {
			let block = new blocks.Sprite();
			block.stroke = 'black'
			block.color = 'green'
			if (blocks.length == 1) {
				block.x = 400;
				block.y = 250;
				block.width = 670;
				block.height = 100;
				block.text = "[satisfactory] work intern!\n A-CORP is [forever appriciative for your hard work and dedication], your social credit score is sure to [increase]\n Keep in mind this position was not paid, you will recive no compensation. \nA-CORP is not liable for any injuries sustained, or any long term side effects of taking this glorious internship oppertunity! ";
			} else {
				block.x = 400;
				block.y = 400;
				block.width = 120;
				block.height = 120;
				block.text = "press ENTER to\nRESTART.";
			} //
		}
		if (kb.presses('enter')) {
			window.location.href = "./index.html";
		}
		drag(blocks.length);
		
	}
	if (gamestate == 1 || gamestate == 2) {
		lvcnt.text = "level number: " + level + "\n" + lvtext
	}
	clear();
}

function drag(length) {
	if (length > 0) {
		for (let i = 0; i < length; i++) {
            if(blocks[i].text != "x" && blocks[i].collider == 'dynamic'){
			if (blocks[i].mouse.pressing()) {
				blocks[i].stroke = 'red';
			} else if(blocks[i].mouse.hovering()){
				blocks[i].stroke = 'green';
			} else {
				blocks[i].stroke = 'black'
			}
			if (blocks[i].mouse.dragging()) {
				blocks[i].moveTowards(
					mouse.x + blocks[i].mouse.x,
					mouse.y + blocks[i].mouse.y,
					1 // full tracking
				);
			}
        }
		}
	}
}

function drag2(length) {
	if (length > 0) {
		for (let i = 0; i < length; i++) {
          
			if (supports[i].mouse.pressing()) {
				supports[i].stroke = 'red';
			} else if(supports[i].mouse.hovering()){
				supports[i].stroke = 'green';
			} else {
				supports[i].stroke = 'black'
			}
			if (supports[i].mouse.dragging()) {
				supports[i].moveTowards(
					mouse.x + supports[i].mouse.x,
					mouse.y + supports[i].mouse.y,
					1 // full tracking
				);
			}
        }
		
	}
}

function gravity(block, zone, direction){
	for(let i = 0; i < block.length; i++){
		if(block[i].overlapping(zone)){
	if(direction == 1){
		block[i].applyForceScaled(0, 10);
	}else if(direction == 2){
		block[i].applyForceScaled(0, -10);
	}else if(direction == 3){
		block[i].applyForceScaled(10, 0);
	}else{
		block[i].applyForceScaled(-10, 0);
	}
}else{
	block[i].applyForceScaled(0, 0);
}
	}
}




function freeTime(){
	bg.changeAni('paper');
	vnState = 0;
	ground1.collider = 'none';
	ground2.collider = 'none';
	ground1.visible = false;
	ground2.visible = false;
	timer.visible = false;
	testBot.collider = 'none';
	botOverlay.visible = false;
			gamestate = 3;
			blocks.removeAll()
			zones.removeAll()
			supports.removeAll()
			lvcnt.visible = true;
			lvcnt.color = 'white'
			lvcnt.text = "FREE TIME\nHours Left: "+vnTimer;
	infoBox.visible = true;
	b1.visible = true
	b2.visible = true;
	b3.visible = true;
	b1.collider = 'static';
	b2.collider = 'static'
	b3.collider = 'static'
	b1.text = choices[Math.round(random(0,5))]
	b2.text = choices[Math.round(random(0,5))]
	b3.text = choices[Math.round(random(0,5))]
}

function startVn(room){//skibidi
	if(room == choices[0]){
		// OFFICE - 1,10,11,13,14
//skibidi
		 pool = [1,4,10,11,13,14];
		bg.changeAni('office')
		return pool[Math.round(random(0,pool.length-1))];
	} else if(room == (choices[1])){
		// CAFE - 1,7,11,12,13,14
		 pool = [1,7,8,11,12,13,14];
		bg.changeAni('cafe')
		return pool[Math.round(random(0,pool.length-1))];
	} else if(room ==(choices[2])){
		// PATIO -2,3,14,4
		 pool = [2,3,14,4];
		bg.changeAni('patio')
		return pool[Math.round(random(0,pool.length-1))];
	} else if(room ==(choices[3])){
		// SERVER - 6,10,9
		 pool = [6,10,9];
		bg.changeAni('server')
		return pool[Math.round(random(0,pool.length-1))];
	} else if(room ==(choices[4])){
		//LAB - 5,6,12,4,8
		 pool = [5,6,12,4,8];
		bg.changeAni('lab');
		return pool[Math.round(random(0,pool.length-1))];
	} else if(room ==(choices[5])){
		// CONSTR 2,3,5,7,8,9
		 pool = [2,3,5,7,8,9];
		bg.changeAni('constr');
		return pool[Math.round(random(0,pool.length-1))];
	} 
}

function sandboxMode(level) {

	timer.visible = false;
	world.gravity.y = 0;
	blocks.collider = 'dynamic';
	supports.collider = 'dynamic';
	bg.changeAni('paper');
	blocks.color = 'white';
	blocks.stroke = 'black';
	ground1.color = 'white';
	ground1.stroke = 'black';
	ground2.color = 'white';
	ground2.stroke = 'black';
	lvcnt.color = 'white';
	lvcnt.stroke = 'black';
	testBot.collider = 'static';
	if (level == 1 || level == 2 || level == 4 || level == 5 || level == 6 || level == 9|| level == 11||level == 12 || level == 13 || level == 14 || level == 15) {
		ground1.y = 600
		ground2.y = 600
		testBot.x = 50;
		testBot.y = 300;
	} else if (level == 3) {
		testBot.x = 50;
		testBot.y = 500;
		ground1.y = 800
		ground2.y = 600
	} else if(level == 7){
		testBot.x = 50;
		testBot.y = 100;
		ground1.y = 500
		ground2.y = 750
	} else if(level == 8){
		testBot.x = 50;
		testBot.y = 400;
		ground1.y = 700
		ground2.y = 750
	} else if(level == 10){
		testBot.x = 50;
		testBot.y = 400;
		ground1.y = 800
		ground2.y = 800
	}else{
		testBot.x = 50;
		testBot.y = 300;
		ground1.y = 600
		ground2.y = 600
	}
	if (level >= 16) {
		blocks.removeAll()
		zones.removeAll()
		supports.removeAll()
		ground1.visible = false;
		ground2.visible = false;
		ground1.collider = 'none'
		ground2.collider = 'none'
		botOverlay.visible = false;
		testBot.collider = 'none'
		testBot.x = 0;
		testBot.y = 0;
		lvcnt.visible = false;
		introBots.visible = true;
		introBots.collider = 'dynamic'
        introBots.x = 400;
        introBots.y = 300;
		bg.changeAni('computer')
		gamestate = 4;
	}
	botOverlay.changeAni('robot' + Math.round(random(1, 14)))
	
	if (level != 16) {
		gamestate = 1
	}
}
