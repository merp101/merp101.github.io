import game from "./config.js";
const SPELLED = ["first","second","third","fourth","fifth","sixth","seventh","eighth","ninth","tenth"]; //can add more later, don't need to yet
let maxhp = game.stats.hp.max;
let hp = game.stats.hp.current;
let atk = game.stats.atk;
let def = game.stats.def;
let spd = game.stats.spd;
let tact = game.stats.tact;
let range = game.stats.range;
let magic = game.stats.magic;
let type = game.items.equips.weapon.type;
function setEnemies(difficulty) {
	game.enemies.num = difficulty;
	game.enemies.level = (difficulty * 2) / game.enemies.num;
	game.enemies.hp.max = Math.round(Math.pow(game.stats.hp.max, 0.25) + 1) * Math.pow(difficulty, 2);
	game.enemies.hp.current = game.enemies.hp.max;
	game.enemies.atk = Math.round(Math.pow(difficulty, 1.5)) + 1;
	game.enemies.def = Math.round(Math.pow(difficulty, 1.1)) + 1;
	game.enemies.spd = Math.round(Math.pow(difficulty, 1.05)) + 1;
	var enemies = {}
	for (let i = 0; i < game.enemies.num; i++) {
		enemies[SPELLED[i]+"Enemy"].level = game.enemies.level;
		enemies[SPELLED[i]+"Enemy"].hp.max = game.enemies.hp.max;
		enemies[SPELLED[i]+"Enemy"].hp.current = game.enemies.hp.current;
		enemies[SPELLED[i]+"Enemy"].atk = game.enemies.atk;
		enemies[SPELLED[i]+"Enemy"].def = game.enemies.def;
		enemies[SPELLED[i]+"Enemy"].spd = game.enemies.spd;
	}
}
function startFight(difficulty=0) {
	var damage;
	if (type == "melee") damage = atk * tact; else if (type == "ranged") damage = range * tact; else if (type == "magic") damage = magic * tact;
	var interval = (10 / spd) * difficulty; //time in seconds to complete task
	
	setEnemies(difficulty);
	game.conditions.fighting = true;
	var array = [damage,interval];
	return array;
}
function fight(array) {
	var damage = array[0];
	var interval = array[1];
	
	if (game.conditions.fighting) {
		
	}
}