import game from "./config.js";

var currentTab = "cave";//Tabs: inv, map, cave
var stats = game.stats;
var items = game.items;
var enemies = game.enemies;
var conditions = game.conditions;
var options = game.options;

function save() {
	localStorage.setItem("caveSave",atob(game));
}

function load() {
	try {
		game = btoa(localStorage.getItem("caveSave"))
	} catch (e) {
		console.log(e);
		alert("There was a problem while loading your save.");
		//reset();
	}
}

function changeTab(tab) {
	hide(currentTab+"tab");
	show(tab+"tab","block");
	currentTab=tab;
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
 
function updateQuests(id, title, text) {
	//have to add unlock conditions, like levels or other quests
	var questlist = document.getElementById("questlist");
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

function gameTick() {
	//If you're questing, don't do anything else (probably will change)
	if (conditions.questing) return;
	else {
		
	}
}

function init() {
	window.setInterval(function(){
		window.setTimeout(gameTick(), 100);
	}, 0);
}
