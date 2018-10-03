
var currentTab = "cave";//Tabs: inv, map, cave
var stats = game.stats;
var items = game.items;
var conditions = game.conditions;
var options = game.options;

function element(id) {
	return document.getElementById(id);
}

function changeText(id, text) {
	element(id).innerHTML = text;
}

function save() {
    localStorage.setItem("caveSave", btoa(JSON.stringify(game)));
}

function load() {
	try {
		game = JSON.parse(atob(localStorage.getItem("caveSave")));
		return true;
	} catch (e) {
		console.log(e);
		alert("There was a problem while loading your save.");
		return false;
	}
}

function changeTab(tab) {
	hide(currentTab+"tab");
	show(tab+"tab","block");
	currentTab=tab;
}

function hide(elemId) {
	if (document.getElementById(elemId) != undefined) {
		document.getElementById(elemId).style.display = "none"; 
		return true;
	}   else {
		console.log("Element '" + elemId + "' not defined.");
		return false;
	}
}


function show(elemID,type="block") {
	let elem = document.getElementById(elemID);
	if (elem != undefined) {
		elem.style.display = type; 
		return true;
	}   else {
		console.log("Element '" + elemID + "' not defined."); 
		return false;
	}
}
 
function updateQuests(id, title, text) {
	//have to add unlock conditions, like levels or other quests
	var questlist = element("questlist");
	var quest = document.createElement("li");
	var h1 = quest.createElement("h1");
	var p = quest.createElement("p");
	var questtitle = h1.innerHTML(title)
	var questtext = p.innerHTML(text);
	var questHTML = questtitle + questtext;
	var questList = game.quests.list;

	quest.id = "quest-"+id;
	quest.appendChild(questHTML);
	questlist.appendChild(quest);
	game.quest.list.push(id);
}
function quest(type) {
	switch (type) {
		case "fight": game.stats.array = startFight();
	}
}

function setPlayerItem(name,type,dmg) {
	items.equips.weapon.name = name; 
	items.equips.weapon.dmg = dmg; 
	items.equips.weapon.type = type;
}

function tick(letter=0) {
	if (letter == 0) return;
	function move() {
		if (letter == "w") char.pos.y += 1;
		else if (letter == "a") char.pos.x -= 1;
		else if (letter == "s") char.pos.y -= 1;
		else if (letter == "d") char.pos.x += 1;
	}
	move();
	if (char.pos.x == currentEnemy.pos.x && char.pos.y == currentEnemy.pos.y) {startFight();}
	
}

function draw(thing) {
	if (thing === "world") {
		
	}
}



document.onKeyDown=function() {
	var letter = 0;
	if (!game.conditions.fighting) {
		switch (e.keyCode) {
			case 87: letter = "w";
			case 65: letter = "a";
			case 83: letter = "s";
			case 68: letter = "d";
		}
		tick(letter);
	} else {
		switch (e.keyCode) {
			case 49: letter = 1;
			case 50: letter = 2;
			case 51: letter = 3;
			case 52: letter = 4;
		}
		var numToLettersAtk = ["basic","fire","ice","electricity"];
		fight(numToLettersAtk[letter-1]);
	}
}

function display() { 
	if (currentEnemy == undefined) hide("stats"); return;
	changeText("playerhp",game.stats.hp.current.toString());
	changeText("playermaxhp",game.stats.hp.max.toString());
	changeText("playeratk",game.stats.atk.toString());
	changeText("playerspd",game.stats.spd.toString());
	changeText("playerdef",game.stats.def.toString());
	//updateQuests(69);
	if (currentEnemy != undefined) {
		changeText("enemyhp",currentEnemy.hp.current.toString());
		changeText("enemymaxhp",currentEnemy.hp.max.toString());
		changeText("enemyatk",currentEnemy.atk.toString());
		changeText("enemyspd",currentEnemy.spd.toString());
		changeText("enemydef",currentEnemy.def.toString());
		changeText("enemyname",currentEnemy.name);
		changeText("turn",game.conditions.turn);
	}
}

function init() {
	load();
	display();
	
	if (items.equips.weapon.name == "none") setPlayerItem("fists","fists",1);
	
}

setInterval(save(),30000);


init();
