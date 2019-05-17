var currentTab = "fight";//Tabs: inv, fight
var moved = false;

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
	if (element(elemId) != undefined) {
		document.getElementById(elemId).style.display = "none"; 
		return true;
	}   else {
		console.log("Element '" + elemId + "' not defined.");
		return false;
	}
}


function show(elemId,type="block") {
	if (element(elemId) != undefined) {
		element(elemId).style.display = type; 
		return true;
	}   else {
		console.log("Element '" + elemId + "' not defined."); 
		return false;
	}
}
 
/*function updateQuests(id, title, text) {
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
} */



function tick(letter=0) {
	if (letter == 0) return;
	function move() {
		switch(letter) {
			case "a": if (char.pos.x > 1) char.pos.x -= 1; break;
			case "d": if (char.pos.x < element("world-"+(char.pos.y+1)).innerHTML.length - 3) char.pos.x += 1; break;
		}
	}
	if (letter == "w") { //interact
		//npc dialogue
		let npc;
		for (i = 0; i < Object.keys(npcs).length; i++) {
			npc = npcs[npcList[i]];
			if (char.pos.x + 2 == npc.pos || char.pos.x + 1 == npc.pos || char.pos.x == npc.pos || char.pos.x - 1 == npc.pos || char.pos.x - 2 == npc.pos) {
				cycleNPCDialogue(npc);
				npc.isInteracting = true;
			}
		}
		//enter area
		if (currentLevel == "hub") {
			if (char.pos.x == 6 || char.pos.x == 7 || char.pos.x == 8 || char.pos.x == 9 || char.pos.x == 10 || char.pos.x == 11 || char.pos.x == 12) {
				finishQuest();
				char.pos.x = 14;
				drawWorld("cave");
			}
		}
	}
	for (i = 0; i < Object.keys(npcs).length; i++) {
		npc = npcs[npcList[i]];
		if (npc.isInteracting) {
			if (char.pos.x - 2 > npc.pos || char.pos.x + 2 < npc.pos) {
				hide("npcdialogue"); 
				npc.isInteracting = false;
				npc.hasInteracted = true;
			}
		}
	}
	if (!game.conditions.fighting) {
		move();
		if (currentLevel != "hub") {
			if (levelEnemies[0] != undefined) {
				if ((char.pos.x - 1 == Number(levelEnemies[0].charAt(0)) || char.pos.x + 2 == Number(levelEnemies[0].charAt(0))) && char.pos.y == Number(levelEnemies[0].charAt(2))) {
					startFight(levelDiff, currentLevel);
					if (letter == "d") {
						char.pos.x--;
					}
				}
			}
		}
		drawPlayer();
	}
	
}

element("body").onkeypress = function() {
	if (!moved) {
		var x = event.which || event.keyCode;
		//console.log(x);
		if (currentTab == "fight") {
			if (worldDrawn) {
				switch (x) {
						// movement
					case 119: tick("w"); break; // w
					case 97: tick("a"); break; // a
					case 115: tick("s"); break; // s
					case 100: tick("d"); break; // d
						
						//hotkeys
					//attacks
					case 49: fight(numToLettersAtk[0]);; break; // 1
					case 50: fight(numToLettersAtk[1]);; break; // 2
					case 51: fight(numToLettersAtk[2]);; break; // 3
					case 52: fight(numToLettersAtk[3]);; break; // 4
				}
			} 
		}
		moved = true;
	}
};

element("body").onkeyup = function() {
	moved = false;
}

element("yesd").onclick = function() {
	let npc;
	for (i = 0; i < Object.keys(npcs).length; i++) {
		npc = npcs[npcList[i]];
		if (npc.isInteracting) {
			cycleNPCDialogue(npc, true)
		}
	}
}

element("nod").onclick = function() {
	let npc;
	for (i = 0; i < Object.keys(npcs).length; i++) {
		npc = npcs[npcList[i]];
		if (npc.isInteracting) {
			cycleNPCDialogue(npc, false)
		}
	}
}

function display() { 
	if (!game.conditions.fighting) {hide("stats"); hide("fighting..."); hide("fightplatform"); show("map"); hide("turn..."); hide("playerattacks"); return;}
	if (game.conditions.fighting) {
		show("stats"); show("fighting..."); show("turn..."); show("fightplatform"); hide("map"); show("playerattacks");
		
		//stats
		changeText("playerhp",game.stats.hp.current.toString());
		changeText("playermaxhp",game.stats.hp.max.toString());
		changeText("playeratk",game.stats.atk.toString());
		changeText("playerspd",game.stats.spd.toString());
		changeText("playerdef",game.stats.def.toString());
		changeText("enemyhp",currentEnemy.hp.current.toString());
		changeText("enemymaxhp",currentEnemy.hp.max.toString());
		changeText("enemyatk",currentEnemy.atk.toString());
		changeText("enemyspd",currentEnemy.spd.toString());
		changeText("enemydef",currentEnemy.def.toString());
		changeText("gold",game.gold);
		//attacks
		var skill;
		for (i = 0; i < skillOrder.length; i++) { //attacks
			skill = skillOrder[i]; //the attack skill it checks for
			if (game.stats.skills.includes(skill)) { //if that skill is unlocked, then
				show(skill + "atk"); //show the element for it
			} else {
				hide(skill + "atk");
			}
		}
		for (i = 0; i < buffOrder.length; i++) { //buffs
			skill = buffOrder[i]; //the buff skill it checks for
			if (game.stats.skills.includes(skill)) {
				show(skill + "buff");
			} else {
				hide(skill + "buff");
			}
		}
		let count = 0;
		for (i = 0; i < buffOrder.length; i++) { //hide the "buff" thing if there are no buffs unlocked (not for skills cuz you always have "basic" skill unlocked
			if (element(skill + "buff").style.display == "none") {
				count++;
			}				
		}
		if (count == buffOrder.length) {
			hide("buffs");
		}
		
		//enemy name
		//if it starts with a vowel (lowercase or capital) then it is "an", otherwise "a"
		if (currentEnemy.name.charAt(0) === "a" || currentEnemy.name.charAt(0) === "e" || currentEnemy.name.charAt(0) === "i" || currentEnemy.name.charAt(0) === "o" || currentEnemy.name.charAt(0) === "u" || currentEnemy.name.charAt(0) === "A" || currentEnemy.name.charAt(0) === "E" || currentEnemy.name.charAt(0) === "I" || currentEnemy.name.charAt(0) === "O" || currentEnemy.name.charAt(0) === "U") {
			changeText("enemyname", "an " + currentEnemy.name);
		} else {changeText("enemyname", "a " + currentEnemy.name);}
			
		//turn
		changeText("turn",game.conditions.turn);
	}
	if (worldDrawn) {
		show("combatmsg");
	}
	changeText("gold", "You have " + game.gold + " gold.");
}

function init() {
	load();
	display();

	changeText("inv", invArt);
	drawWorld("cave");
	
	if (game.items.equips.weapon.name == "none") setPlayerItem("fists","fists",1);
	
}

setInterval(function(){ 
	display();
	if (worldDrawn) {
		if (char.pos.x == element("world-"+(char.pos.y + 1)).innerHTML.length - 3 && enemies[0] == undefined) {
			finishQuest();
		}
	}
		
},100);


setInterval(save(),30000);
init();
