const SPELLED_NUM = ["one","two","three","four","five","six","seven"]
var game = {
  player = {
		money: 0,
		combat: {
			hp: 10,
			weapon: {
				attack:1,
				speed:1,
				name:"fists",
			},
			fighting: false,
		},
		inventory: [],
	},
	zone: {
		num: 1,
		max: -1,
	},
	enemies: {
		stats: {},
  	init: function () {
    	for (let i = 0;i < 10;i++) {
      	let atk = Math.round(Math.pow(game.zone.num, 1.2)) + 1;
      	let hp = Math.round(Math.pow(game.zone.num, 1.5)) + 3;
      	this.stats["n"+(i+1)] = [atk, hp, i+1];
    	}
  	}
	},	
}

var quest = {
	enemyNum: 1,
	startFight: function() {
	
	},
	fight: function(enemyHP,enemyATK,enemySPD) {
		if (enemyHP < 1) this.enemyNum ++; return;
	}
}

export game;
export quest;
