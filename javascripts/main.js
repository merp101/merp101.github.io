var currentTab = "cave";//Tabs: inv, map, cave
var player = game.player;
var enemies = game.enemies;
var zone = game.zone;

function changeTab(tab) {
	hide(currentTab+"tab");
	show(tab+"tab","block");
}

function hide(elemID) {
	let elem = document.getElementById(elemID);
	if (elem != undefined) elem.display = "none";
	else console.log("Element " + elemID + " not defined.");
}
function show(elemID,type) {
	let elem = document.getElementById(elemID);
	if (elem != undefined) elem.display = type;
	else console.log("Element " + elemID + " not defined.");
}
 
function gameTick() {
	game.player.money ++;
	//Fighting
	if (game.player.combat.fighting) quest.fight(enemies.stats["n"+quest.enemyNum][0],enemies.stats["n"+quest.enemyNum][1],1); return;
}

game.init();
