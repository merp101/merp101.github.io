var game = {
	stats: {
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
		magic: 0
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
	enemies: {
		num: 0,
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
	
	conditions: {
		fighting: false,
		questing: false
	},
	options: {
		
	}
}
var enemies = {}
export {game};
export {enemies};
