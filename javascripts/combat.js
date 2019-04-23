// basic vars
var worldDrawn = false;
var currentLevel = "none";
var interval;
var damage;
var enemyDefeated = false;
var currentEnemy;
var currentEnemyNum = 0;
var enemiesDrawn = false;
var enemiesSet = false;
var levelEnemies;
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
	var names;
	var rarity;
	
	if (random <= 0.10) {rarity = 4}
	else if (random <= 0.25) {rarity = 3} 
	else if (random <= 0.5) {rarity = 2}
	else if (random <= 1) {rarity = 1}
	this.rarity = rarity;
	if (rarity == 1) {names = ["goblin","imp","spider"];}
	else if (rarity == 2) {names = ["hobgoblin","fiery imp"];}
	else if (rarity == 3) {names = ["orc","demon"];}
	else if (rarity == 4) {names = ["treasure"];}
	
	random = Math.random();
	for (let j = 0; j < names.length; j++) {
		if (random <= (j + 1) / names.length) {name = names[j]}
	}
	this.name = name;
	
}

// sets enemies' stats for the level/difficulty
function setEnemies(difficulty=0, level=currentLevel) {
	game.enemies.num = maps[level + "EnemyPos"].length;
	if (difficulty === 0) {
		game.enemies.level = 1;
	} else game.enemies.level = (difficulty * 2) - 1;
	game.enemies.hp.max = (Math.round(Math.pow(game.stats.hp.max, 0.25) + 1) * Math.pow(difficulty, 2)) + 1;
	game.enemies.hp.current = game.enemies.hp.max;
	game.enemies.atk = (Math.round(Math.pow(difficulty, 1.5))) + 1;
	game.enemies.def = (Math.round(Math.pow(difficulty, 1.1))) + 1;
	game.enemies.spd = (Math.round(Math.pow(difficulty, 1.05))) + 1;
	
	for (i= 0; i < game.enemies.num; i++) {
		enemies[i] = new Enemy(game.enemies.level,game.enemies.hp.max,game.enemies.atk,game.enemies.def,game.enemies.spd);
	}
	enemiesSet = true;
	currentEnemy = enemies[currentEnemyNum];
	if (!enemiesDrawn) {drawEnemies();}
}

function startFight(difficulty=0) {
	//setting up the "fighting" part of stuff
	interval = difficulty / game.stats.spd; //time in seconds to complete task
	
	if (!enemiesSet) {
		setEnemies(difficulty);
	}
	game.conditions.fighting = true;
	currentEnemyNum = 0;
	currentEnemy = enemies[currentEnemyNum];
	show("stats"); show("fighting..."); show("turn");
	
}

function finishQuest() {
	for (i = 0; i < element("map").childNodes.length; i++) {
		hide(element("map").childNodes[i]);
	}
	worldDrawn = false;
	enemiesDrawn = false;
	enemiesSet = false;
	getTotalLoot();
}

function fight(attack,buffs=[]) {
	if (game.stats.skills.includes(attack)) {
		damage = game.stats.atk;
		var dmgMult;
		if (!attack.includes("buff")) { 
			dmgMult = consts.skills[attack].dmg;
		} else {
			buffs.push(attack);
		}

		if (buffs.includes("ice")) dmgMult += 1.25;
		if (buffs.includes("fire")) dmgMult += 1.5;
		if (buffs.includes("electric")) dmgMult += 2;
		
	
		currentEnemy.hp.current -= (damage * dmgMult) - Math.floor(currentEnemy.def / 2); //can be changed
		if (currentEnemy.hp.current <= 0) {
			currentEnemy.hp.current = 0;
			getEnemyLoot();
			currentEnemyNum++;
			currentEnemy = enemies[currentEnemyNum];
			levelEnemies.shift();
			game.enemies.num --;
			game.conditions.fighting = false;
			display();
			drawEnemies();
			drawPlayer();
			return;
		
		}
		game.conditions.turn = "the enemy's";
	}
	
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
			if (element("world-" + y) == undefined) {
				node = document.createElement("SPAN");
				br = document.createElement("BR");
				node.id = "world-" + y;
	  			textNode = document.createTextNode(maps[level][maps[level].length - y]);
				node.appendChild(textNode);
				map.appendChild(node);
				map.appendChild(br);
			} else {changeText("world-" + y, maps[level][maps[level].length - y]);
				
			for (i = 0; i < element("map").childNodes.length; i++) {
				show(map.childNodes[i]);
			}
	}
		}
		worldDrawn = true;
		currentLevel = level;
		conv = maps[level + "EnemyPos"]
		levelEnemies = conv;
		drawPlayer();
		levelDiff = Number(maps[level + "Diff"]);
		
	}
}

function drawPlayer() {
	if (currentLevel != "none") {
		let xPos = char.pos.x + 4;
		let yPos = char.pos.y;
		let world = document.getElementById("world-"+(yPos));
		let worldStr = maps[currentLevel][maps[currentLevel].length - yPos];
		let str1 = worldStr.slice(0,xPos - 1); // before player
		let str2 = worldStr.slice(xPos + 2); // the rest of the string
		let newStr = str1.concat(generalArt.player,str2); //add the 'o' to the end of the 'start' string, then the rest
		world.innerHTML = newStr; //set the actual HTML to the new string
		drawEnemies();
	}
}

function drawEnemies() {
	if (!enemiesDrawn) {
		if (enemiesSet) {
			for (i = 0; i < maps[currentLevel + "EnemyPos"].length; i++) {
				if (levelEnemies[i] == undefined) return;
				let xPos = Number(levelEnemies[i].charAt(0)) + 3;
				let yPos = Number(levelEnemies[i].charAt(2));
				let world = document.getElementById("world-"+(yPos));
				let worldStr = world.innerHTML;
				let str1 = worldStr.slice(0,xPos); // before enemy
				let str2 = worldStr.slice(xPos + 1); // the rest of the string
				let newStr = str1.concat(generalArt.enemy,str2); //add the 'o' to the end of the 'start' string, then the rest
				world.innerHTML = newStr; //set the actual HTML to the new string
			}
		} else setEnemies(levelDiff, currentLevel);
		
	}
	
}
