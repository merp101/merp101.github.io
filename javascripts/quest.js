var quest = {
    display: function(xPos) {
		let location=document.getElementById("fight-location").value; //cave, plains,
		if (typeof location == "undefined") alert("Please choose a destination!"); return;
		document.getElementById("fight-location").innerHTML = "The " + location;
		let world.place = location;
		let lastWorld= world.level[world.level.length-1];
		if (typeof xPos == "undefined") xPos = 1;
		world.playable[xPos]="o";
		var enemies = [];
		for (let k = 0; k < world.monstNum; k++) {
			enemies.push(new Enemy(world, k));
		}

		lastWorld=lastWorld.replace("=","*");
		lastWorld=lastWorld.replace(" ","_");
  	    for (let i = 1;i < world.level.length; i++) {
    	    let place = document.getElementById("w"+i);
			    if (place == undefined) {
				    document.getElementById("maptab").insertAdjacentHTML('beforeend', '<div id="w'+i+'"></div>');
				    place = document.getElementById("w"+i);
			    }
    	    place.innerHTML=world.level[i-1];
  	    }
		return enemies;
	},
	
	
	startFight: function() {
		let location = document.getElementById("fight-location").value;
		let world = location;
		let lastWorld = world.level[world.level.length - 1];
		this.display();
		let xpos = 1;
		function move(xPos) {
			if (lastWorld.charAt(xPos+1) == "*") {this.fight(xPos+1); return false;}
			else xPos++;
			this.display(xPos);
		}
		updated = true;
		window.setInterval(function(){
			if (updated) {
				updated = false;
				window.setTimeout(function(){
					updated = true;
					move(xpos);
				}, 1000);
			}
		}, 0);
	},
	
	
	fight: function(enemyPos) {
		let location = document.getElementById("fight-location").value;
		let world = location;
		let lastWorld = world.level[world.level.length - 1];
		let enemies = this.display();
		let enemy;
		for (let i = 0; i < enemies.length; i++) {
			if (enemies[i].pos == enemyPos) enemy = enemies[i];
		}
		if (enemy.hp > 0) {
			enemy.hp -= player.weapon.attack;
			if (enemy.hp < 1) {
				let array = lastWorld.split("_");
				for (let j = 0; j < array.length; j++) {
					if (array[j].includes("*")) array[j] = "__";
				}
				lastWorld = array.join();
			}
			player.hp -= enemy.dmg;
		}
	}
}
