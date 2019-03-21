var currentTab = "cave";//Tabs: inv, map, cave
let i;
var moved = false;

function element(id) {
	return document.getElementById(id);
}

function changeText(id, text) {
	element(id).innerHTML = text;
}

function save() {
    localStorage.setItem("caveSave", btoa(JSON.stringify(game)));
}

function load() {
	try {
		game = JSON.parse(atob(localStorage.getItem("caveSave")));
		return true;
	} catch (e) {
		console.log(e);
		alert("There was a problem while loading your save.");
		return false;
	}
}

function changeTab(tab) {
	hide(currentTab+"tab");
	show(tab+"tab","block");
	currentTab=tab;
}

function hide(elemId) {
	if (element(elemId) != undefined) {
		document.getElementById(elemId).style.display = "none"; 
		return true;
	}   else {
		console.log("Element '" + elemId + "' not defined.");
		return false;
	}
}


function show(elemId,type="block") {
	if (element(elemId) != undefined) {
		element(elemId).style.display = type; 
		return true;
	}   else {
		console.log("Element '" + elemId + "' not defined."); 
		return false;
	}
}
 
/*function updateQuests(id, title, text) {
	//have to add unlock conditions, like levels or other quests
	var questlist = element("questlist");
	var quest = document.createElement("li");
	var h1 = quest.createElement("h1");
	var p = quest.createElement("p");
	var questtitle = h1.innerHTML(title)
	var questtext = p.innerHTML(text);
	var questHTML = questtitle + questtext;
	var questList = game.quests.list;

	quest.id = "quest-"+id;
	quest.appendChild(questHTML);
	questlist.appendChild(quest);
	game.quest.list.push(id);
}
function quest(type) {
	switch (type) {
		case "fight": game.stats.array = startFight();
	}
} */



function tick(letter=0) {
	if (letter == 0) return;
	function move() {
		switch(letter) {
			case "a": if (char.pos.x > 1) char.pos.x -= 1; break;
			case "d": if (char.pos.x < element("world-"+(char.pos.y+1)).innerHTML.length - 1) char.pos.x += 1; break;
		}
	}
	if (!game.conditions.fighting) {
		move();
		if ((char.pos.x - 1 == Number(maps[currentLevel + "EnemyPos"][currentEnemyNum].charAt(0)) || char.pos.x + 1 == Number(maps[currentLevel + "EnemyPos"][currentEnemyNum].charAt(0))) && char.pos.y == Number(maps[currentLevel + "EnemyPos"][currentEnemyNum].charAt(2))) {
			startFight(levelDiff, currentLevel);
			if (letter == "d") {
				char.pos.x--;
			}
		}
		drawPlayer();
	}
	
}

element("body").onkeypress = function() {
	if (!moved) {
		var x = event.which || event.keyCode;
		if (currentTab == "fight") {
			if (worldDrawn) {
				switch (x) {
					case 119: tick("w"); break; // w
					case 97: tick("a"); break; // a
					case 115: tick("s"); break; // s
					case 100: tick("d"); break; // d
					case 49: fight(numToLettersAtk[0]);; break; // 1
					case 50: fight(numToLettersAtk[1]);; break; // 2
					case 51: fight(numToLettersAtk[2]);; break; // 3
					case 52: fight(numToLettersAtk[3]);; break; // 4
				}
			} 
		}
		moved = true;
	}
};

element("body").onkeyup = function() {
	moved = false;
}

function display() { 
	if (!game.conditions.fighting) hide("stats"); hide("fighting..."); hide("turn..."); return;
	changeText("playerhp",game.stats.hp.current.toString());
	changeText("playermaxhp",game.stats.hp.max.toString());
	changeText("playeratk",game.stats.atk.toString());
	changeText("playerspd",game.stats.spd.toString());
	changeText("playerdef",game.stats.def.toString());
	//updateQuests(69);
	if (game.conditions.fighting) {
		show("stats"); show("fighting..."); show("turn..."); show("fightingplatform"); hide("map");
		changeText("enemyhp",currentEnemy.hp.current.toString());
		changeText("enemymaxhp",currentEnemy.hp.max.toString());
		changeText("enemyatk",currentEnemy.atk.toString());
		changeText("enemyspd",currentEnemy.spd.toString());
		changeText("enemydef",currentEnemy.def.toString());
		changeText("enemyname",currentEnemy.name);
		changeText("turn",game.conditions.turn);
	}
}

function init() {
	load();
	display();
	
	document.getElementById("invtab").innerHTML = invArt;
	
	if (game.items.equips.weapon.name == "none") setPlayerItem("fists","fists",1);
	
}

window.setInterval(display(),100);

element("quest1").onclick = function() {drawWorld("cave");}
setInterval(save(),30000);
