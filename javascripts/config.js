var game = {
  var player = {
	money: 0,
	weapon: new Weapon("fists",1,2,0),//name, attack, speed, cost
	inventory: [],
	zone: {
		num: 1,
		max: -1
	},
	
	init: function() {
		enemies.init();
		if (this.zone.max < 1) this.zone.max = 1;
		if (this.money < 0) this.money = 0;
	}
}
