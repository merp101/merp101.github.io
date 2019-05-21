var goldGained = 0;
var totalGoldGained = 0;
var itemsGained = [];
var singleMessage = "";
var totalMessage = "";
var combo = []; //combination of name and chance
var thresholds = [];
function getTotalLoot() { //on mission complete, gain all the stuff
  if (goldGained != 0 && itemsGained != []) {
    totalMessage = "You have gained " + totalGoldGained + " gold";
    for (i = 0; i < itemsGained.length; i++) {
      if (i != itemsGained.length - 1) {
        totalMessage += ", a " + itemsGained[i];
      } else { //if it's the last one
        totalMessage += ", and a " + itemsGained[i];
      }
    }
  }
	totalMessage += " in total. Congratulations, it's yours!";
	
	changeText("totalmessage", totalMessage);
       
       
	let type;
	for (i = 0; i < itemsGained.length; i++) {
		type = itemsGained[i].type;
		if (!game.inventory.gear[type].includes(itemsGained[i])) { 
			game.inventory.gear[type].push(itemsGained[i]);
		} else {
			game.inventory.gear[itemsGained[i].name].level += itemsGained[i].level;
		}
		/*
		switch (type) {
			case "normal": game.inventory.normal.push(itemsGained[i]); break;
			case "special": game.inventory.special.push(itemsGained[i]); break;
			case "consumable": game.inventory.consumable.push(itemsGained[i]); break;
		}*/
	}
	game.gold += goldGained;
	
	
	setTimeout(function() {hide("totalmessage"); totalMessage = "";}, 4000);
}

function getEnemyLoot() {
  show("lootwarning");
  if (currentEnemy != undefined) {
	  var singleMessage = "";
    //gold
    let rarity = currentEnemy.rarity;
    goldGained = loot[currentLevel].gold * Math.round(Math.pow(rarity,1.25));
    totalGoldGained += goldGained;
    //items
    var itemChances = [];
    for (i = 0; i < loot[currentLevel].items.length; i++) {
      combo.push([loot[currentLevel].items[i].name,Math.floor(Math.pow(loot[currentLevel].items[i].chance,Math.floor(Math.pow(rarity,0.2))))]);
    } //this formula is floor(chance^(floor(rarity^.2)))
    for (i = 0; i < combo.length; i++) {
      itemChances.push(combo[i][1]);
    }
    itemChances = bubbleSort(itemChances);
    i = 0;
    while (i < itemChances.length) {
      for (let j = 0; j < combo.length; j++) {
        if (combo[j][1] == itemChances[i]) {
          thresholds.push(combo[j]);
          i++;
          break;
        }
      }
    }
    let random = Math.random();
    for (i = 0; i < loot[currentLevel].items.length; i++) {
      if (random <= thresholds[i][1] / 100) {
        itemsGained.push(thresholds[i][0]);
        random = Math.random();
      }
    }
    if (goldGained == 0 && itemsGained == []) {
      singleMessage += "You have gained nothing."
    } else if (goldGained > 0) {
      singleMessage += "You have gained " + goldGained + " gold";
      if (itemsGained != []) {
        for (i = 0; i < itemsGained.length; i++) {
          if (i != itemsGained.length - 1) {
            singleMessage += ", a " + itemsGained[i];
          } else { //if it's the last one
            singleMessage += ", and a " + itemsGained[i] + ".";
          }
        }
      }
      if (singleMessage != "You have gained nothing.") {
        singleMessage += ".";
      }
    }
		if (element("message" + enemiesDefeated) == undefined) {
			createTextElement(singleMessage, "combatmsg", "message" + enemiesDefeated, 'SPAN', true, false);
		} else {changeText("message" + enemiesDefeated, singleMessage);}
  }
}
