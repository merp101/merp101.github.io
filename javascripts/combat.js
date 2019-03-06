// basic vars
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
var iForEnemyXPos; // = iForEnemyXPos = Number(maps[currentLevel + "EnemyPos"][i].charAt(0)) + 1;
var iForEnemyYPos; // =	iForEnemyYPos = Number(maps[currentLevel + "EnemyPos"][i].charAt(2)) + 1;
var levelDiff;	// =	levelDiff = Number(maps[currentLevel + "Diff"]);
var numToLettersAtk = ["basic","fire","ice","electricity"];

// Enemy creator function
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

// sets enemies' stats for the level/difficulty
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
	}*/ //this is old codeaa
}

function startFight(difficulty=1, type="melee") {
	//setting up basic conditions for fight: base damage and interval
	var damage;
	if (type == "melee") damage = atk * tact; else if (type == "ranged") damage = range * tact; else if (type == "magic") damage = magic * tact;
	var interval = (10 / spd) * difficulty; //time in seconds to complete task
	
	setEnemies(difficulty, currentLevel);
	game.conditions.fighting = true;
	var array = [damage,interval];
	game.stats.array = array;
	
	drawEnemies();
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
	game.items.equips.weapon.name = name; 
	game.items.equips.weapon.dmg = dmg; 
	game.items.equips.weapon.type = type;
}

// Draw functions

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
		levelDiff = Number(maps[currentLevel + "Diff"]);
	}
}

function drawPlayer() {
	if (currentLevel != "none") {
		let xPos = char.pos.x + 1;
		let yPos = char.pos.y + 1;
		let world = document.getElementById("world-"+(yPos));
		let worldStr = maps[currentLevel][maps[currentLevel].length - yPos];
		let str1 = worldStr.slice(0,xPos); // before player
		let str2 = worldStr.slice(xPos + 1); // the rest of the string
		let str3 = "o"; //player
		let newStr = str1.concat(str3,str2); //add the 'o' to the end of the 'start' string, then the rest
		world.innerHTML = newStr; //set the actual HTML to the new string
		startFight(levelDiff, currentLevel);
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
