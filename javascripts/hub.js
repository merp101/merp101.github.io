var npcList = ["nurse","blacksmith"];
var npcs = { //dialogue comments format: (yes/no)(line it's responding to(/other line if it's shared))("e" if it ends the dialogue)("f" if you failed the dialogue)
  nurse: {
    pos: 20, //-5 (to line number == array index)
    dialogue:   ["Oh! Hello there! You look a bit dirty... and naked... Well, I'll fix you <em>right</em> up. Come inside my heart shack and find out!",
    /*1*/      "It seems a little suspicious, you say? Well, I'm a nurse! I replenish your life, which I call hearts, so my house is a heart shack! Catchy, no?",
    /*2*/   "Oh my gosh, right?! That meanie blacksmith over there thinks it's <em>weird</em> that I call my house my 'heart shack'. Well, ha, blacksmith! Oh, yeah. You can go see the blacksmith too. He might forge some weapons for you.",
    /*3*/  "Well, see you! Unless you want to browse my wares?",
    /*4*/      "Ohoho, you'd rather spend time with <em>me</em>? How awesome! Would you like to browse my wares?"
    /*5*/  "Oh well. See you!",
    /*6*/ "In that case, here you go!",
    /*7*/    "Well, I'll be! You're just a meanie, aren't you? Hmph, well. I suppose I'll just have to up prices a little - a meanie tax, if you will.",
    /*8*/   "So <em>now</em> you're being nice to me! Well, if you want, you can browse my shop full of helpful potions. It's my job, after all.",
    /*9*/      "Oh my gosh! You are <em>so</em> mean!! Go away!",
    /*10*/ "Well, here you go!",
    /*11*/   "Well, if you're not going to do that, then just go away!",
    /*12*/  "Thank god.",
    /*13*/  "UGH, what do you WANT?! LEAVE ME ALONE! <br> (You have ruined your relationship with the Nurse. You may no longer access her shop.)",
    //split  -6
    /*14*/     "Oh, good, good. Here, have some of this very <em> not </em> suspicious potion, and you'll be fine! Drink up!",
    /*15*/     "Wait, really? You're going to drink that? From a person who you don't know, who may not have a medical license, who may be giving you liquid weed?",
    /*yes15*/     "Okay then. Drink to your heart's content! <br> (You take a sip, nearly vomit, and chug the rest because of the horrible taste. You don't feel anything different.) <br> Wait, really? Huh. I guess that one was a dud. Well, if you have gold, you can buy some potions that'll probably do something. I have no confidence in myself anymore.",
    /*no14e*/  "But why? How am I suspicious? Is it the heavy smoke that you see through the window? Well... that's my... steam. From my... bath. Yes, that's it! It's the steam from my bath that I'm going to go take right now!",
                 ""],
    dialoguetrees: {
      0: {yes: 14, no: 1},
			1: {yes: 2, no: 3},
      2: {yes: 3, no: 4},
      3: {yes: 6, no: 5},
      4: {yes: 6, no: 5},
      7: {yes: 8, no: 9},
      8: {yes: 10, no: 11},
      9: {yes: 12, no: 13},
      11: {yes: 12, no: 13},
      14: {yes: 15, no: 16},
			//15: {yes: 16, no: x),
			//16: {yes: x, no: x),
    },
    // ^format: "n: {yes:(line),no:(line)}", go through line by line (unless it's an end)
    dialoguecycle: 0,
    shop: [{name:"potion",cost:1}]
  },
  blacksmith: {
    pos: 42,
    dialogue: ["d","e","a","d"],
    dialoguecycle: 0,
    shop: [{name:"sword", cost:1}]
  }
}

function cycleNPCDialogue(npc) {
  if (npc.dialoguecycle != npc.dialogue.length) {
    changeText("npcdialogue",npc.dialogue[npc.dialoguecycle]);
    show("npcdialogue");
    npc.dialoguecycle++;
    hide("totalmessage");
  } else {hide("npcdialogue");}
}
  

