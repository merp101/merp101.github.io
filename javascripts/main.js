import {game} from "javascripts/config.js"

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
  
