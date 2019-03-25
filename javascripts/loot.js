var goldGained = 0;
var itemsGained = [];
var message = "";
function getTotalLoot() { 
  
}
function getEnemyLoot() {
  let rarity = currentEnemy.rarity;
  goldGained += loot[currentLevel].gold * Math.round(Math.pow(rarity,1.25));
  let random = Math.random();
  var itemChances = [];
  var items = [];
  for (i = 0; i < loot[currentLevel.items.length; i++) {
    items.push(loot[currentLevel].items[i].name);
    itemChances.push(loot[currentLevel].items[i].chance);
  }
  itemChances = bubbleSort(itemChances);
  for (i = 0; i < loot[currentLevel].items.length; i++) {
    if (random <= itemChances[i]) {}
  }
  if (goldGained == 0 && itemsGained = []) {
  }
}


//how to assign item chance to the drop, so that when it bubbleSort()s it, it gives the right item?
