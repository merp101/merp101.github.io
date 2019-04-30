var npcList = ["nurse","blacksmith"];
var npcs = {
  nurse: {
    pos: 20,
    dialogue: ["i","a","m"],
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
  

