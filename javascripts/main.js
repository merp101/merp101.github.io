var player = {
	money: 0,
	weapon: new Weapon("fists",1,2,0),
}
const worlds = {}
var currentTab = "story";//Tabs: world, inv, map, text(will be changed),

function displayWorld(world) {
  for (let i = 1;i < world.length; i++) {
    let place = document.getElementById("w"+i);
    place.innerHTML=world[i-1];
  }
}

function Weapon(name, attack, speed, cost) {
	this.name = name;
	this.attack = attack;
	this.speed = speed;
	this.cost = cost;
}

function changeTab(tab) {
	hide(currentTab+"tab");
	show(tab+"tab",inline);
}

function hide(elemID) {
	document.getElementById(elemID).display="none";
}
function show(elemID,type) {
	document.getElementById(elemID).display=type;
}
  
