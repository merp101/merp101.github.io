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

function createTextElement(text, parentid, id="", type="SPAN", br="true", first="false") {
	let node = document.createElement(type);
	let textNode = document.createTextNode(text);
	let parent = element(parentid);
	node.id = id;
	node.appendChild(textNode);
	let brtag = document.createElement('BR');
	if (first) {
		if (parent.childNodes[0] !== undefined) {
			if (br) {
				parent.insertBefore(brtag, parent.childNodes[0]);
			}
			parent.insertBefore(node, parent.childNodes[0]);
		} else {
			element(parentid).appendChild(node);
			if (br) {
				element(parentid).appendChild(brtag);
			}
		}
	} else {
		element(parentid).appendChild(node);
		if (br) {
			element(parentid).appendChild(brtag);
		}
	}
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
	gold: 0,
	inventory: {
		normal: [],
		consumable: [],
		special: [],
		gear: {
			weapon: [],
			helmet: [],
			chestplate: [],
			gloves: [],
			leggings: []
		}
	},
	items: {
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
		gold: 1, //base gold drop
		items: [{name: "broken sword", chance: 5, type: "weapon", desc: "A sword that is broken. What, did you expect something special?"}, //weapon
			{name: "ragged cap", chance: 5, type: "helmet", desc: "This cap is torn in multiple places. It really doesn't do much in terms of defense."}, //hat
			{name: "tattered shirt", chance: 5, type: "chestplate", desc: "There are holes specifically where your nipples are! Huh, it's almost like it's on purpose!"}, //shirt
			{name: "pair of ripped jeans", chance: 5, type: "leggings", desc: "Some skin is showin'. <br> I'm sorry. You know that that joke had to be made."}, //pants
			{name: "pebble", chance: 0.01, type: "accessory", desc: "It's an ordinary pebble. However, you feel an otherworldly aura emanating from this pebble... it seems to have been through a fight of gods. Its power was unaffected, though."}] //anything else
	}
	       	   
	
}
