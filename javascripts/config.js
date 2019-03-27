const SPELLED = ["first","second","third","fourth","fifth","sixth","seventh","eighth","ninth","tenth"]; //can add more later, don't need to yet
const skillOrder = ["basic","strong","fire","ice","electric"];
const buffOrder = ["fire","ice","electric"];
var i;
function bubbleSort(numbers) {  
    var length = numbers.length;
    for (var i = (length - 1); i >= 0; i--) {
        for (var j = (length - i); j > 0; j--) {
            if (numbers[j] < numbers[j - 1]) {
                var nmbr = numbers[j];
                numbers[j] = numbers[j - 1];
                numbers[j - 1] = nmbr;
            }
        }
    }
    return numbers;
}

function switchArrayPos(array,pos1,pos2) {
	let value1 = array[pos1];
	let value2 = array[pos2];
	array[pos1] = value2;
	array[pos2] = value1;
}
	
var game = {
	stats: { //basically everything to do with combat: attack, defense, speed, level, other stats, buffs, skills unlocked, etc
		currentEnemy: 0,
		level: 1,
		hp: {
			max: 10,
			current: 10,
		},
		atk: 1,
		def: 1,
		spd: 1,
		magic: 1,
		buffs: [],
		skills: ["basic"]
	},
	items: {
		gold: 0,
		inventory: {
			normal: [],
			consumable: [""],
			special: [""],
		},
		equips: {
			head: {name: "none", def: 0},
			chest: {name: "none", def: 0},
			legs: {name: "none", def: 0},
			boots: {name: "none", def: 0},
			weapon: {name: "none", type: "", atk: 0},
			accessory: {name: "none", atk: 0, def: 0}
		},
	},
	enemies: { //this is master stats
		num: 0,
		numDefeated: 0,
		level: 0,
		hp: {
			max: 0,
			current: 0			
		},
		atk: 0,
		def: 0,
		spd: 0,
		tact: 0,
		range: 0,
		magic: 0
	},
	quest: { //unused, will add later
		list: [],
	},	
	conditions: {
		fighting: false,
		questing: false,
		turn: "your"
	},
	options: {
		
	}
}

var enemies = [];


var char = { //character IN FIGHTS (positon, mostly)
	pos: {
		x: 1,
		y: 1,
	}
}
var consts = { //attack skill damages, whatever else
	skills: {
		basic: {
			dmg: 1, // damage mult
			type: "melee", // the type of damage it uses
			effects: { // special effect the move has
				name: "none", //what it's called
				chance: 0 // the probability of it happening in percent (divide by 100 to get random() threshold, <=)
			}
		},
		strong: {
			dmg: 2,
			type: "melee",
			effects: {
				name: "none",
				chance: 0,
			}
		},
		fire: {
			dmg: 1.5,
			type: "magic",
			effects: {
				name: "fire",
				chance: 10
			}
		},
		ice: {
			dmg: .75,
			type: "magic",
			effects: {
				name: "freeze",
				chance: 10
			}
		},
		electric: {
			dmg: 2,
			type: "magic",
			effects: {
				name: "none",
				chance: 0
			}
		}
		
				
	},
	
	weaponTypeModifiers: {
		fists: {
			speed: 1.5,
			dmg: 1
		},
		oneHandSword: {
			speed: 1.25,
			dmg: 1.5
		},
		twoHandSword: {
			speed: 0.75,
			dmg: 2
		},
		bow: {
			speed: .25,
			dmg: 5
		}
	}
	
}

var loot = { //gold is base amount, items is possible drops
	cave: { //this is kind of a template
		gold: 10, //base gold drop
		items: [{name: "broken sword", chance: 1}, //weapon
			{name: "ragged cap", chance: 1}, //hat
			{name: "tattered shirt", chance: 1}, //shirt
			{name: "", chance: 1}, //pants
			{name: "", chance: 1}, //boots
			{name: "pebble", chance: 5}] //anything else
	}
	       	   
	
}
