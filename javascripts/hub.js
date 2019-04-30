var npcList = ["nurse","blacksmith"];
var npcs = {
  nurse: {
    pos: 19,
    dialogue: ["i","a","m"],
    dialoguecycle: 0,
    shop: [{name:"",cost:1}]
  },
  blacksmith: {
    pos: 42,
    dialogue: ["d","e","a","d"],
    dialoguecycle: 0,
    shop: [{name:"", cost:1}]
  }
}

function cycleNPCDialogue(npc) {
  if (npc.dialoguecycle == npc.dialogue.length - 1) {
    changeText("npcdialogue",npc.dialogue[npc.dialoguecycle]);
    show("npcdialogue");
    npc.dialoguecycle++;
  } else {hide("npcdialogue");}
}
  

