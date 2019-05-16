var npcList = ["nurse","blacksmith"];
var npcs = { //dialogue comments format: (yes/no)(line it's responding to(/other line if it's shared))("e" if it ends the dialogue)("f" if you failed the dialogue)
	nurse: {
		pos: 24, //-5 (to line number == array index)
		dialogue:   ["Oh! Hello there! You look a bit dirty... and naked... Well, I'll fix you <em>right</em> up. Come inside my heart shack and find out!",
    /*1*/        "It seems a little suspicious, you say? Well, I'm a nurse! I replenish your life, which I call hearts, so my house is a heart shack! Catchy, no?",
    /*2*/        "Oh my gosh, right?! That meanie blacksmith over there thinks it's <em>weird</em> that I call my house my 'heart shack'. Well, ha, blacksmith! Oh, yeah. You can go see the blacksmith too. He might forge some weapons for you.",
    /*3*/        "Well, see you! Unless you want to browse my wares?",
    /*4*/        "Ohoho, you'd rather spend time with <em>me</em>? How awesome! Would you like to browse my wares?",
    /*5*/        "Oh well. See you!",
    /*6*/        "In that case, here you go!",
    /*7*/        "Well, I'll be! You're just a meanie, aren't you? Hmph, well. I suppose I'll just have to up prices a little - a meanie tax, if you will.",
    /*8*/        "So <em>now</em> you're being nice to me! Well, if you want, you can browse my shop full of helpful potions. It's my job, after all.",
    /*9*/        "Oh my gosh! You are <em>so</em> mean!! Go away!",
    /*10*/       "Well, here you go!",
    /*11*/       "Well, if you're not going to do that, then just go away!",
    /*12*/       "Thank god.",
    /*13*/       "UGH, what do you WANT?! LEAVE ME ALONE! <br> (You have ruined your relationship with the Nurse. You may no longer access her shop.)",
    //split  -6
    /*14*/       "Oh, good, good. Here, have some of this very <em> not </em> suspicious potion, and you'll be fine! Drink up!",
    /*15*/       "Wait, really? You're going to drink that? From a person who you don't know, who may not have a medical license, who may be giving you poison?",
    /*16*/       "Okay then. Drink to your heart's content! <br> (You take a sip, nearly vomit, and chug the rest because of the horrible taste. You don't feel anything different.) <br> Wait, really? Huh. I guess that one was a dud. Well, if you have gold, you can buy some potions that'll probably do something. I have no confidence in myself anymore.",
    /*17*/       "But why? How am I suspicious? Is it the heavy smoke that you see through the window? Well... that's my... steam. From my... bath. Yes, that's it! It's the steam from my bath that I'm going to go take right now!",
		/*18*/	     "Well, good. I was a little concerned for your mental health. Well, do you want to browse my wares, then?"
		],
		secondaryDialogue: ["Oh, hello! Welcome back! Would you like to browse my wares?",
			      "Oh, then would you like to come inside my heart shack instead?"],
    		dialoguetrees: { //comment 's' if it asks for a shop
      			0: {yes: 14, no: 1},
      			1: {yes: 2, no: 7},
      			2: {yes: 3, no: 4},
      			3: {yes: 6, no: 5}, //s
      			4: {yes: 6, no: 5}, //s
      			7: {yes: 8, no: 9},
      			8: {yes: 10, no: 11}, //s
      			9: {yes: 12, no: 13},
      			11: {yes: 12, no: 13},
      			14: {yes: 15, no: 17},
      			15: {yes: 16, no: 18},
      			16: {yes: 10, no: 5}, //s
      			18: {yes: 10, no: 5} //s
      			//secondary: {yes: 10, no: 1s -> yes:14,no:1 }
    		},
		toShop: 10,
   		// ^format: "n: {yes:(line),no:(line)}", go through line by line (unless it's an end)
   		dialoguecycle: 0,
   		shop: [{name:"potion",cost:1}],
		isInteracting: false,
	  	hasInteracted: false
  	},
  	blacksmith: {
 	 	pos: 46,
 	 	dialogue: ["Hi! I'm the blacksmith. Would you like to buy a this wooden sword? Because it is made of wood it is only 1 gold! <br> (It looks like a toy.)",
  /*1*/ 	  	   "Here you go! Would you like to buy some of my other equipment?",
  /*2*/	        	   "Ok. well, good luck not dying. Let me know if you change your mind.",
  /*3*/         	   "Great! Here you go.",
  /*4*/	       		   "Good choice. This is a dangerous world, after all. The wooden sword costs 1 gold.",
  /*5*/         	   "Okay, bye.",
			   "
			   
         	],	
		dialoguecycle: 0,
		toShop: 3,
	  	dialoguetrees: {
	       		0: {yes: 1, no: 2},
	       		1: {yes: 3, no: 5},
	       		2: {yes: 4, no: 5},
		},
		secondaryDialogue: ["Oh! Hello again! Care to stop and talk to this lonely old geezer?",
				    "Well, then, would you like to buy this wooden sword?"
		],
   		shop: [{name:"wooden sword", cost:1}],
		isInteracting: false,
		hasInteracted: false
  	}
}
function cycleNPCDialogue(npc,t) {
	if (t == undefined) {
		if (!npc.hasInteracted) {
  			changeText("npcd",npc.dialogue[0]);
		} else {
			changeText("npcd",npc.secondaryDialogue[0]);
			npc.dialoguecycle = 0;
		}
		show("npcdialogue");
		show("buttond");
		hide("totalmessage");
		return;
	}
	if (!npc.hasInteracted) {
		if (t) {
  			npc.dialoguecycle = npc.dialoguetrees[npc.dialoguecycle].yes;
		} else {
			npc.dialoguecycle = npc.dialoguetrees[npc.dialoguecycle].no;
		}
		changeText("npcd",npc.dialogue[npc.dialoguecycle]);
	} else {
		if (t) {
			changeText("npcd", npc.dialogue[npc.toShop]);
		} else {
			changeText("npcd", npc.secondaryDialogue[1]);
			npc.hasInteracted = false;
		}
	}
	if (npc.dialoguetrees[npc.dialoguecycle] == undefined) {
		hide("buttond");
		if (npc == "nurse") {
			if (npc.dialoguecycle == 3 || npc.dialoguecycle == 4 || npc.dialoguecycle == 8 || npc.dialoguecycle == 16 || npc.dialoguecycle == 18) {
				//show the nurse's shop
			}
		}
	}
  
}
  

