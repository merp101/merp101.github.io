var npcList = ["nurse","blacksmith"];
var npcs = { //how to do dialogue: do something, then the "yes" to that the next one, then the "no"
  nurse: {
    pos: 20,
    dialogue: ["Oh! Hello there! You look a bit dirty... and naked... Well, I'll fix you <em>right</em> up. Come inside my heart shack and find out!",
    /*no1*/    "It seems a little suspicious, you say? Well, I'm a nurse! I replenish your life, which I call hearts, so my house is a heart shack! Catchy, no?",
    /*yesno1*/ "Oh my gosh, right?! That meanie blacksmith over there thinks it's <em>weird</em> that I call my house my 'heart shack'. Well, ha, blacksmith! Oh, yeah. You can go see the blacksmith too. He might forge some weapons for you."
    /*no2no1*/ "Well, I'll be! You're just a meanie, aren't you? Hmph, well. I suppose I'll just have to up prices a little - a meanie tax, if you will.",
    /*no3no2*/ "So <em>now</em> you're being nice to me! Well, if you want, you can browse my shop full of helpful potions.",
    /*no4no3*/ "Well, if you're not going to do that, then just go away!",
    /*no5no4e*/"UGH, what do you WANT?! LEAVE ME ALONE! <br> (You have ruined your relationship with the Nurse. You may no longer access her shop.)"
              
    /*yes1*/   "Oh, good, good. Here, have some of this very <em> not </em> suspicious potion, and you'll be fine! Drink up!",
    /*noyes1e*/"But why? How am I suspicious? Is it the heavy smoke that you see through the window? Well... that's my... steam. From my... bath. Yes, that's it! It's the steam from my bath that I'm going to go take right now!",
               ""],
    dialoguetrees: [""], //the splits
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
  

