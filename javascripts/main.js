
var currentTab = "cave";//Tabs: inv, map, cave
let i;
var stats = game.stats;
var items = game.items;
var conditions = game.conditions;
var options = game.options;
var worldDrawn = false;
var currentLevel = "none";
let maxhp = game.stats.hp.max;
let hp = game.stats.hp.current;
let atk = game.stats.atk;
let def = game.stats.def;
let spd = game.stats.spd;
let tact = game.stats.tact;
let range = game.stats.range;
let magic = game.stats.magic;
let type = game.items.equips.weapon.type;
var currentEnemy;
var iForEnemyXPos;
var iForEnemyYPos;
var iForEnemyDiff;


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
	if (document.getElementById(elemId) != undefined) {
		document.getElementById(elemId).style.display = "none"; 
		return true;
	}   else {
		console.log("Element '" + elemId + "' not defined.");
		return false;
	}
}


function show(elemId,type="block") {
	if (document.getElementById(elemId) != undefined) {
		document.getElementById(elemId).style.display = type; 
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

function Enemy(level,hpmax,atk,def,spd) {
	this.level = level;
	this.hp = {
		max: hpmax,
		current: hpmax
	}
	this.atk = atk;
	this.def = def;
	this.spd = spd;
	//determining the name
	var random = Math.random();
	var name;
	if (random <= 0.01) {name = "TREASURE!!!"}
	else if (random <= 0.05) {name = "Aragog the Mighty"}
	else if (random <= 0.1) {name = "Goblin"}
	else if (random <= 0.5) {name = "Imp"}
	else if (random <= 1) {name = "Spooder"}
	this.name = name;
	
}
function setEnemies(difficulty, level) {
	game.enemies.num = maps[level + "EnemyPos"].length;
	if (difficulty === 0) {
		game.enemies.level = 1;
	} else game.enemies.level = (difficulty * 2) - 1;
	game.enemies.hp.max = Math.round(Math.pow(game.stats.hp.max, 0.25) + 1) * Math.pow(difficulty, 2);
	game.enemies.hp.current = game.enemies.hp.max;
	game.enemies.atk = Math.round(Math.pow(difficulty, 1.5)) + 1;
	game.enemies.def = Math.round(Math.pow(difficulty, 1.1)) + 1;
	game.enemies.spd = Math.round(Math.pow(difficulty, 1.05)) + 1;
	
	for (i= 0; i < game.enemies.num; i++) {
		enemies[SPELLED[i]] = new Enemy(game.enemies.level,game.enemies.hp.max,game.enemies.atk,game.enemies.def,game.enemies.spd);
	}
	/*for (i = 0; i < game.enemies.num; i++) {
		enemies.prototype[SPELLED[i]+"Enemy"].prototype.level = game.enemies.level;
		enemies.prototype[SPELLED[i]+"Enemy"].prototype.hp.max = game.enemies.hp.max;
		enemies.prototype[SPELLED[i]+"Enemy"].prototype.hp.current = game.enemies.hp.current;
		enemies.prototype[SPELLED[i]+"Enemy"].prototype.atk = game.enemies.atk;
		enemies.prototype[SPELLED[i]+"Enemy"].prototype.def = game.enemies.def;
		enemies.prototype[SPELLED[i]+"Enemy"].prototype.spd = game.enemies.spd;
	}*/
}
function startFight(difficulty=1, type="melee") {
	//setting up basic conditions for fight: base damage and interval
	var damage;
	if (type == "melee") damage = atk * tact; else if (type == "ranged") damage = range * tact; else if (type == "magic") damage = magic * tact;
	var interval = (10 / spd) * difficulty; //time in seconds to complete task
	
	setEnemies(difficulty);
	game.conditions.fighting = true;
	var array = [damage,interval];
	game.stats.array = array;
	
	display();
}
function fight(attack,buffs=[]) {
	var damage = game.stats.array[0];
	var interval = game.stats.array[1];
	var dmgMult = consts.skills[attack].dmg

	if (buffs.includes("ice")) dmgMult *= 1.25;
	if (buffs.includes("fire")) dmgMult *= 1.5;
	if (buffs.includes("electricity")) dmgMult *= 2;
		
	var enemy = enemies[SPELLED[game.enemies.num-(game.enemies.num - game.enemies.numDefeated)]+"Enemy"];
	enemy.hp.current -= (damage * dmgMult) - enemy.def; //can be changed
	if (enemy.hp.current <= 0) {
		//end the fight, rewards
		return;
		
	}
	game.conditions.turn = "the enemy's";
	display();
	
}



function setPlayerItem(name,type,dmg) {
	items.equips.weapon.name = name; 
	items.equips.weapon.dmg = dmg; 
	items.equips.weapon.type = type;
}

function tick(letter=0) {
	if (letter == 0) return;
	function move() {
		switch(letter) {
			case "a": if (char.pos.x > 0) char.pos.x -= 1; break;
			case "d": if (char.pos.y > 0) char.pos.x += 1; break;
		}
		drawPlayer();
		/*
		if (letter == "w") char.pos.y += 1;
		else if (letter == "a") char.pos.x -= 1;
		else if (letter == "s") char.pos.y -= 1;
		else if (letter == "d") char.pos.x += 1;
		*/
	}
	move();
	for (i = 0; i < game.enemies.num; i++) {
		if (char.pos.x == iForEnemyXPos && char.pos.y == iForEnemyYPos) {startFight(iForEnemyDiff, currentLevel)}
	}
	
}

function drawWorld(level) {
	if (!worldDrawn) {
		let map = document.getElementById("map");
		let node;
		let br;
		let textNode;
		for (let y = maps[level].length; y > 0; y--) {
			node = document.createElement("SPAN");
			br = document.createElement("BR");
			node.id = "world-" + y;
	  		textNode = document.createTextNode(maps[level][maps[level].length - y]);
			node.appendChild(textNode);
			map.appendChild(node);
			map.appendChild(br);
		}
		worldDrawn = true;
		currentLevel = level;
		drawPlayer();
		defineVars();
	}
}

function drawPlayer() {
	if (currentLevel != "none") {
		let xPos = char.pos.x + 1;
		let yPos = char.pos.y + 1;
		let world = document.getElementById("world-"+(yPos));
		let worldStr = maps[currentLevel][yPos-1];
		let str1 = worldStr.slice(0,xPos); // before player
		let str2 = worldStr.slice(xPos + 1); // the rest of the string
		let str3 = "o"; //player
		let newStr = str1.concat(str3,str2); //add the 'o' to the end of the 'start' string, then the rest
		world.innerHTML = newStr; //set the actual HTML to the new string
		startFight(iForEnemyDiff, currentLevel);
	}
}

function drawEnemies() {
	if (conditions.fighting) {
		for (i = 0; i < game.enemies.num; i++) {
			let xPos = Number(maps[currentLevel + "EnemyPos"][i].charAt(0)) + 1;
			let yPos = Number(maps[currentLevel + "EnemyPos"][i].charAt(2)) + 1;
			let world = document.getElementById("world-"+(yPos));
			let worldStr = world.innerHTML;
			let str1 = worldStr.slice(0,xPos); // before enemy
			let str2 = worldStr.slice(xPos + 1); // the rest of the string
			let str3 = "x"; //enemy
			let newStr = str1.concat(str3,str2); //add the 'o' to the end of the 'start' string, then the rest
			world.innerHTML = newStr; //set the actual HTML to the new string
		}
		
	}
	
}
	
function defineVars() {
	iForEnemyXPos = Number(maps[currentLevel + "EnemyPos"][i].charAt(0)) + 1;
	iForEnemyYPos = Number(maps[currentLevel + "EnemyPos"][i].charAt(2)) + 1;
	iForEnemyDiff = Number(maps[currentLevel + "Diff"]);
}



document.getElementById("body").onkeydown = function() {
	var x = event.which || event.keyCode;
	if (currentTab == "fight") {
		if (!game.conditions.fighting) {
			switch (x) {
				case 87: tick("w"); break;
				case 65: tick("a"); break;
				case 83: tick("s"); break;
				case 68: tick("d"); break;
			}
			;
		} else {
			switch (x) {
				case 49: letter = 1; break;
				case 50: letter = 2; break;
				case 51: letter = 3; break;
				case 52: letter = 4; break;
			}
			var numToLettersAtk = ["basic","fire","ice","electricity"];
			fight(numToLettersAtk[letter-1]);
		}
	}
};

function display() { 
	if (currentEnemy == undefined) hide("stats"); hide("fighting..."); hide("turn..."); return;
	changeText("playerhp",game.stats.hp.current.toString());
	changeText("playermaxhp",game.stats.hp.max.toString());
	changeText("playeratk",game.stats.atk.toString());
	changeText("playerspd",game.stats.spd.toString());
	changeText("playerdef",game.stats.def.toString());
	//updateQuests(69);
	if (currentEnemy != undefined) {
		show("stats"); show("fighting..."); show("turn");
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
	
	if (items.equips.weapon.name == "none") setPlayerItem("fists","fists",1);
	
}
document.getElementById("quest1").onclick = function() {drawWorld("cave");}
setInterval(save(),30000);
