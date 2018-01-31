//This is for JS, HTML is in index.md - and don't change the name of the file, it won't work.
//Make it more like Idle Wizard ( https://www.kongregate.com/games/TwoWizards/idle-wizard?haref=HP_NG_idle-wizard )

var player = {
  money: 0,
  mps: 0,
  layers: 0,
  lps: 0,
  layerMult: 1,
  sellMult: 1,
  workers: {
	  cost: 10,
    affection: 0,
    amount: 0,
    mult: 1,
    max: 1,
  },
  minLayerForMult: 1e+5,
  achievements: [],
  resets: 0,
  infinitied: 0,
  qld: 0,
  totalTimePlayed: 0,
  totalMoney:0,
  totalLayers:0,
  workplace:"home",
  options: {
    notation: "scientific",
    theme: "normal",
  }
}
var tab="workers"
const TIER_NAMES=["d", "s", "m"]
var places=1;
var currentAction='none'

/*
function setTheme(name) {
    document.querySelectorAll("link").forEach( function(e) {
        if (e.href.includes("theme")) e.remove();
    });

    if(name === undefined) {
        document.getElementById("theme").innerHTML="Current theme: Normal";
    } else {
        document.getElementById("theme").innerHTML="Current theme: " + name;
    }

    if (name === undefined) return;

    var head = document.head;
    var link = document.createElement('link');

    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = "stylesheets/theme-" + name + ".css";

    head.appendChild(link);
}
*/

function formatValue(x, places) {
  var power = Math.floor(Math.log10(x))
  var matissa = x / Math.pow(10, power)
  if (x < 1000) return x.toFixed(0)
  else return ((matissa).toFixed(places) + "e" + power)
}

function save() {
	localStorage.setItem('layerSave',btoa(JSON.stringify(player)))
}


function load(savefile) {

	  player=JSON.parse(atob(savefile));
	  if (player.money==(undefined)||player.money==(NaN))player.money=10;
 	  if (player.options.notation==undefined) player.options.notation="scientific";
	  if (player.money==(Infinity))switchTab('empty');  	
    if (player.workers.amount==undefined||player.workers.amount==NaN) player.workers.amount = 0;
	  if (player.workers.cost==undefined||player.workers.cost==NaN) player.workers.cost=10;
  
}

function updateElement(elementID,value) {
	document.getElementById(elementID).innerHTML=value
}
	
function showElement(elementID) {
	document.getElementById(elementID).style.display="inline"
}
	
function hideElement(elementID) {
	document.getElementById(elementID).style.display='none'
}


function changeWorkplace() {
  switch (player.workplace) {
    case "home": player.workplace = "small office"; player.workers.max = 5;
    case "small office": player.workplace = "bigger office"; player.workers.max = 10;
    case "bigger office": player.workplace = "office complex"; player.workers.max = 25;
    case "office complex": player.workplace = "factory"; player.workers.max = 100;
    case "factory": player.workplace = "government facility"; player.workers.max = 1000;
    case "government facility": player.workplace = "Martian facility"; player.workers.max = 10000;
  }
}  


 
function switchTab(tabid) {
	hideElement(tab+'Tab')
	showElement(tabid+'Tab','block')
	tab=tabid
  display()
}

function changeAction(action) {
	currentAction=action
  if (currentAction=="layers") {
    player.lps += (1 * player.layerMult)
  } else if (currentAction=="sell") {
    player.mps += (1 * player.sellMult)
    player.subLayers += 1
  } 
}

function getMPS() {
  player.mps=player.workers.amount * (player.workers.mult * (Math.pow(1.1, player.workers.affection)))
}
getMPS();

function buyWorker() {
  if (player.money>=player.workers.cost) {
      player.workers.amount++;    
      player.money -= player.workers.cost;
      player.workers.cost = Math.pow(1.1,player.workers.cost);
  } 
  display();
}

function display() {

  updateElement("qlds", "You have " + formatValue(player.qld, 0) + " Quantum Layering Devices (QLD's).");
  updateElement("mps", formatValue(getMPS(), 2));
  updateElement("money", formatValue(player.money, 2));
  updateElement("layers", formatValue(player.layers, 2));

  if (tab == "workers") {
     hideElement('statstab')
     showElement('workertab')
     hideElement('optionstab')
     hideElement('achievestab')
     hideElement('inftab')
  
    updateElement("wCost", "Cost: " + formatValue(player.workers.cost, places));
    updateElement("wAmount", formatValue(player.workers.amount, 0));
		if (player.workplace == "home") {
			updateElement("workplace", "your home.");
		} else updateElement("workplace", "a " + player.workplace);
  } else
  
   if (tab == "stats") { //stats tab
    showElement("statstab");
    hideElement("workertab");
    hideElement("optionstab");
    hideElement("achievestab");
    hideElement("inftab");
    
    updateElement("totalTimeStat", player.totalTimePlayed);
    updateElement("totalMoneyStat", formatValue(player.totalMoney, 1));
    updateElement("infinitiedStat", formatValue(player.infinitied, 1));
    updateElement("resetStat", formatValue(player.resets, 1));
  } else
  
  if (tab == "options") { //options tab
    hideElement("statstab");
    hideElement("workertab");
    showElement("optionstab");
    hideElement("achievestab");
    hideElement("inftab"); 

  } else
  
  if (tab == "achieves") { //achieves tab
    hideElement("statstab");
    hideElement("workertab");
    hideElement("optionstab");
    showElement("achievestab");
    hideElement("inftab");
  } else
  
  if (tab == "inf") { //infinity tab
    hideElement("statstab");
    hideElement("workertab");
    hideElement("optionstab");
    hideElement("achievestab");
    showElement("inftab");
  }
}

function gameInit() {
	load(localStorage.getItem("layerSave"))
	
	var tickspeed=0 //speed at which it increases money
	updated=true
	setInterval(function(){
		if (updated) {
			updated=false
			setTimeout(function(){
				var startTime=new Date().getTime()
        getMPS();
					var increase=(player.mps)/1000;
					player.money+=increase
          player.layers+=player.lps
          player.layers-=player.subLayers
				tickspeed=(new Date().getTime()-startTime)*0.2+tickspeed*0.8
				updated=true
				display();
			},tickspeed)
		}
	},0)
	setInterval(save(),15000);
}
