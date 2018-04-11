const SPELLED_NUM = ["one","two","three","four","five","six","seven"]
var game = {
  player = {
		money: 0,
		weapon: {
			attack:1,
			speed:1,
			name:"fists"
		},
		inventory: [],
	},
	zone: {
		num: 1,
		max: -1
	},
	enemies: {
		stats: {},
  	init: function () {
    	for (let i = 0;i < 10;i++) {
      	let atk = Math.round(Math.pow(game.zone.num, 1.2));
      	let hp = Math.round(Math.pow(game.zone.num, 1.2));
      	this.stats["n"+(i+1)] = [atk, hp, i+1];
    	}
  	}
	},
	
	init: function() {
		this.enemies.init();
		if (this.zone.max < 1) this.zone.max = 1;
		if (this.money < 0) this.money = 0;
	}
	
}
