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

function Enemy(level,hpmax,atk,def,spd) {
	this.level = level;
	this.hp.max = hpmax;
	this.hp.current = hpmax;
	this.atk = atk;
	this.def = def;
	this.spd = spd;
}
function setEnemies(difficulty) {
	game.enemies.num = difficulty;
	if (difficulty === 0) {
		game.enemies.level = 1;
	} else game.enemies.level = (difficulty * 2) /game.enemies.num;
	game.enemies.hp.max = Math.round(Math.pow(game.stats.hp.max, 0.25) + 1) * Math.pow(difficulty, 2);
	game.enemies.hp.current = game.enemies.hp.max;
	game.enemies.atk = Math.round(Math.pow(difficulty, 1.5)) + 1;
	game.enemies.def = Math.round(Math.pow(difficulty, 1.1)) + 1;
	game.enemies.spd = Math.round(Math.pow(difficulty, 1.05)) + 1;
	
	for (let i= 0; i < game.enemies.num; i++) {
		enemies[SPELLED[i]] = new Enemy(game.enemies.level,game.enemies.hp.max,game.enemies.atk,game.enemies.def,game.enemies.spd);
	}
	currentEnemy = "first";
	/*for (let i = 0; i < game.enemies.num; i++) {
		enemies.prototype[SPELLED[i]+"Enemy"].prototype.level = game.enemies.level;
		enemies.prototype[SPELLED[i]+"Enemy"].prototype.hp.max = game.enemies.hp.max;
		enemies.prototype[SPELLED[i]+"Enemy"].prototype.hp.current = game.enemies.hp.current;
		enemies.prototype[SPELLED[i]+"Enemy"].prototype.atk = game.enemies.atk;
		enemies.prototype[SPELLED[i]+"Enemy"].prototype.def = game.enemies.def;
		enemies.prototype[SPELLED[i]+"Enemy"].prototype.spd = game.enemies.spd;
	}*/
}
function startFight(difficulty=1) {
	var damage;
	if (type == "melee") damage = atk * tact; else if (type == "ranged") damage = range * tact; else if (type == "magic") damage = magic * tact;
	var interval = (10 / spd) * difficulty; //time in seconds to complete task
	
	setEnemies(difficulty);
	game.conditions.fighting = true;
	game.stats.currentEnemy = 1;
	var array = [damage,interval];
	return array;
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
	}
}
