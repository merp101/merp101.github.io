var goldGained = 0;
var itemsGained = [];
var message = "";
var combo = []; //combination of name and chance
var thresholds = [];
function getTotalLoot() { 
  
}
function getEnemyLoot() {
  //gold
  let rarity = currentEnemy.rarity;
  goldGained += loot[currentLevel].gold * Math.round(Math.pow(rarity,1.25));
  
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
    if (random <= thresholds[i][1]) {
      itemsGained.push[thresholds[i][0];
    }
  }
  if (goldGained == 0 && itemsGained = []) {
  }
}