var player = {
	money: 0,
	weapon: new Weapon("fists",1,2,0),
	inventory: [],
	
}
const worlds = {
	cave: ["  -----------------     ",
				 " /                 \____",
				 "|                       ",
				 "|                       ",
				 "|                   ____",
				 "\  \o/             /    "],
	
}
var currentWorld = "none";
var currentTab = "story";//Tabs: world, inv, map, text(will be changed),

function displayWorld() {
	let world = worlds[document.getElementById("fight-location").value];
  for (let i = 1;i < world.length; i++) {
    let place = document.getElementById("w"+i);
    place.innerHTML=world[i-1];
  }
}

function startFight(startPos) {
	
	function move() {
		
}

function Weapon(name, attack, speed, cost) {
	this.name = name;
	this.attack = attack;
	this.speed = speed;
	this.cost = cost;
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
  
