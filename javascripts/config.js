var game = {
	stats: { //basically everything to do with combat: attack, defense, speed, level, other stats, buffs, skills unlocked, etc
		array: [],
		level: 0,
		hp: {
			max: 0,
			current: 0,
		},
		atk: 0,
		def: 0,
		spd: 0,
		tact: 0,
		range: 0,
		magic: 0,
		buffs: [],
		skills: ["basic"]
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
		consumable: [""],
		special: [""]
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
	quest: {
		list: [],
	},	
	conditions: {
		fighting: false,
		questing: false
	},
	options: {
		
	}
}
var enemies = {}
var char = {
	pos: {
		x: 0,
		y: 0
	}
}
var consts = { //skill damages, whatever else
	skills: {
		basic: {
			damage: 1, // damage mult
			effects: { // special effect the move has
				name: "none", //what it's called
				chance: 0 // the probability of it happening (divide by 10 to get random() threshold, <=)
			}
		},
		fire: {
			damage: 1.5,
			effects: {
				name: "fire",
				chance: 10
			}
		},
		ice: {
			damage: .75,
			effects: {
				name: "freeze",
				chance: 10
			}
		},
		electricity: {
			damage: 2,
			effects: {
				name: "none",
				chance: 0
			}
		}
		
				
	},
	
	weaponTypeModifiers: {
		fists: {
			speed: 2,
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
			speed: .5,
			dmg: 5
		}
	}
	
}
