import {enemies} from 'javascripts/enemies.js';

var player = {
	money: 0,
	weapon: new Weapon("fists",1,2,0),//name, attack, speed, cost
	inventory: [],
	currentLocation: "cave"
}
const worlds = {
	//can only have up to 2 enemies in a world, currently
	cave: {
		level:["  -----------------     ",
		 			 " /                 \____",
		 		 	 "|                       ",
		 			 "|                       ",
		 			 "|                       ",
		 			 "| o           =         "],
		playable:[" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
		xlen:this.level[5].length,
		monstNum: 1,
		monstPos: [14]
	},
	
	
	display: function(xPos) {
		let location=document.getElementById("fight-location").value; //cave, plains,
		if (typeof location == "undefined") location = "cave";
		document.getElementById("fight-location").innerHTML = "The " + location;
		let world = worlds[location];
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
		let world = worlds[location];
		let lastWorld = world.level[world.level.length - 1];
		this.display();
		let xpos = 1;
		function move(xPos) {
			if (lastWorld.charAt(xPos+1) == "*") this.fight(xPos+1); return false;
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
	
	
	fight: function(enemyPos, enemy) {
		let location = document.getElementById("fight-location").value;
		let world = worlds[location];
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
var currentTab = "cave";//Tabs: inv, map, cave,

function Weapon(name, attack, speed, cost) {
	this.name = name;
	this.attack = attack;
	this.speed = speed;
	this.cost = cost;
}

function Enemy(world, i) {
	this.hp = enemies[world].hp;
	this.attack = enemies[world].dmg;
	this.pos = worlds[world].monstPos[i];
}

function changeTab(tab) {
	hide(currentTab+"tab");
	show(tab+"tab","inline");
}

function hide(elemID) {
	let elem = document.getElementById(elemID);
	if (elem != undefined) elem.display = "none";
	else console.log("Element " + elemID + " not defined.");
}
function show(elemID,type) {
	let elem = document.getElementById(elemID);
	if (elem != undefined) elem.display = type;
	else console.log("Element " + elemID + " not defined.");
}
  
