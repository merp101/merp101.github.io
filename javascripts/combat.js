// basic vars
var worldDrawn = false;
var currentQuest;
var home = false;
var currentLevel = "none";
var enemiesDefeated = 0;
var totalEnemiesDefeated = 0;
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
	currentEnemy = enemies[0];
	if (!enemiesDrawn) {drawEnemies();}
}

function startFight(difficulty=0) {
	//setting up the "fighting" part of stuff
	interval = difficulty / game.stats.spd; //time in seconds to complete task
	
	if (!enemiesSet) {
		setEnemies(difficulty);
	}
	game.conditions.fighting = true;
	show("stats"); show("fighting..."); show("turn");
	
}

function finishQuest() {
	for (i = 0; i < element("map").childNodes; i += 2) {
		hide(element("map").childNodes[i].id);
	}
	hide("combatmsg");
	hide("lootwarning");
	show("totalmessage");
	worldDrawn = false;
	enemiesDrawn = false;
	enemiesSet = false;
	char.pos.x = 1;
	char.pos.y = 1
	getTotalLoot();
	enemiesDefeated = 0;
	if (currentLevel == "cave") {
		home = true;
		char.pos.x = 9;
		drawWorld("hub");
	} //else {show("continuedecision");}
	
}

function fight(attack,buffs=[]) {
	if (game.stats.skills.includes(attack) && game.conditions.fighting) {
		damage = game.stats.atk + (game.items.equips.weapon.atk * consts.weaponTypeModifiers[game.items.equips.weapon.type].dmg);
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
		switch (game.items.equips.weapon.type) {
			case "onehandsword": changeText("fightplatform","<u>\\o-|==></u>                    <u>x</u>");
			case "twohandsword": changeText("fightplatform","<u>\\o-|==></u>                    <u>x</u>");
			case "fists": changeText("fightplatform","<u>\\o--3</u>                    <u>x</u>"); setTimeout(function(){changeText("fightplatform","<u><s>o/</s>-3</u>                    <u>x</u>");},250);
		} 
		setTimeout(function(){
			changeText("fightplatform","<u>\\o/</u>                    <u>x</u>");
			if (currentEnemy.hp.current <= 0) {
				currentEnemy.hp.current = 0;
				enemiesDefeated++;
				totalEnemiesDefeated++;
				getEnemyLoot();
				enemies.shift();
				currentEnemy = enemies[0];
				levelEnemies.shift();
				game.enemies.num --;
				game.conditions.fighting = false;
				display();
				drawEnemies();
				drawPlayer();
				return;
			}
			game.conditions.turn = "the enemy's";
			//enemy attacks
		}, (1000 / consts.weaponTypeModifiers[game.items.equips.weapon.type].speed));
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
		if (currentLevel == "none") {
			currentLevel = level;
		}
		let map = document.getElementById("map");
		let node;
		let br;
		let textNode;
		let str;
		for (let y = maps[level].length; y > 0; y--) {
			str = maps[level][y - 1];
		/*      let a = [];
			for (i = 0; i < str.length; i++) {
				if (str.charAt(i) == "\\") {
					a.push(i);
				}
			}
			if (a[0] != undefined) {
				for (i = 0; i < str.length; i++) {
					str = str.slice(0,a[i]) + "\\" + str.slice(a[i]);
					a.forEach(function(num,index,arr) {arr[index] = num + 1;});			  
				}
			} this is all for the auto-adding backslashes/underlines, but it no work */
			if (element("world-" + ((maps[level].length - y) + 1)) != undefined) {
				changeText("world-" + ((maps[level].length - y) + 1), str);
				//show("world-" + ((maps[level].length - y) + 1));
			} else {
				node = document.createElement("SPAN");
				br = document.createElement("BR");
				node.id = "world-" + ((maps[level].length - y) + 1);
				textNode = document.createTextNode(str);
				node.appendChild(textNode);
				if (map.childNodes[0] == undefined) {
					map.appendChild(node);
					map.appendChild(br);
				} else {
					map.insertBefore(br,map.childNodes[0]);
					map.insertBefore(node,map.childNodes[0]);	
				}
			}
		}
		for (i = 0; i < (maps[currentLevel].length - maps[level].length); i++) {
			
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
		if (currentLevel != "hub") {
			drawEnemies();
		}
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
				let str1 = worldStr.slice(0,xPos - Math.floor(generalArt.enemy.length / 2)); // before enemy
				let str2 = worldStr.slice(xPos + 1 + Math.floor(generalArt.enemy.length / 2)); // the rest of the string
				let newStr = str1.concat(generalArt.enemy,str2); //add the 'o' to the end of the 'start' string, then the rest
				world.innerHTML = newStr; //set the actual HTML to the new string
			}
		} else setEnemies(levelDiff, currentLevel);
		
	}
	
}
