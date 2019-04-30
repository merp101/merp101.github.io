var npcList = ["nurse","blacksmith"];
var npcs = {
  nurse: {
    pos: 
    dialogue: ["i","a","m"],
    dialoguecycle: 0,
    shop: [{name:"",cost:1}]
  },
  blacksmith: {
    dialogue: ["d","e","a","d"],
    dialoguecycle: 0,
    shop: [{name:"", cost:1}]
  }
}

function cycleNPCDialogue(npc) {
  changeText("npcdialogue",npc.dialogue[npc.dialoguecycle]);
  npc.dialoguecycle++;
}
  

