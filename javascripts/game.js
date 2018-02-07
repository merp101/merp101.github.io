//This is for JS, HTML is in index.md - and don't change the name of the file, it won't work.
//Make it more like Idle Wizard ( https://www.kongregate.com/games/TwoWizards/idle-wizard?haref=HP_NG_idle-wizard )

var player = {
  money: 0,//new Decimal(0),
  mps: 0,//new Decimal(0),
  layers: 0,//new Decimal(0),
  lps: 0,//new Decimal(0),
  layerMult: 1,
  sellMult: 1,
  workerscost: 0,//new Decimal(10),
  workersaffection: 0,
	affectionCosts: [10,1000,10000],
  workersamount: 0,
  workersmult: 1,
  workersmax: 1,
  achievements: [],
  resets: 0,//new Decimal(0),
  infinitied: 0,//new Decimal(0),
  qld: 0,
  totalTimePlayed: 0,
  totalMoney:0,
  totalLayers:0,
  workplace:"home",
	workplaceCost:1e+5,
  options: {
    notation: "scientific",
    theme: "normal",
  }
}
var tab="workers"
const TIER_NAMES=["d", "s", "m"]
var places=1;
var currentAction='none'
var prevAction='none'

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
    link.rel = 'stylesheet';F
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
	if (localStorage.getItem(savefile) != undefined) 	player=JSON.parse(atob(savefile));
	
	 if (player.money==undefined||player.money==NaN)player.money=0;
	 if (player.layers==undefined||player.layers==NaN)player.layers=0;
 	 if (player.options.notation==undefined) player.options.notation="scientific";
	 if (player.money==(Infinity))switchTab('empty');  	
   if (player.workersamount==undefined||player.workersamount==NaN) player.workersamount = 0;
	 if (player.workerscost==undefined||player.workerscost==NaN) player.workerscost=10;
	 if (player.workersaffection==undefined||player.workersaffection==NaN) player.workersaffection=0;
	 player.money=new Number(player.money)
	 player.mps=new Number(player.mps)
	 player.layers=new Number(player.layers)
	 player.lps=new Number(player.lps)
	 player.sellMult=new Number(player.sellMult)
	 player.layerMult=new Number(player.layerMult)
	 player.workerscost=new Number(player.workerscost)
	 player.workersaffection=new Number(player.workersaffection)
	 player.workersamount=new Number(player.workersamount)
	 player.workersmult=new Number(player.workersmult)
	 player.workersmax=new Number(player.workersmax)
	 player.resets=new Number(player.resets)
	 player.qld=new Number(player.qld)
	 player.infinitied=new Number(player.infinitied)
	 player.totalTimePlayed=new Number(player.totalTimePlayed)
	 player.totalMoney=new Number(player.totalMoney)
	 player.totalLayers=new Number(player.totalLayers)  
	 player.workplaceCost=new Number(player.workplaceCost)
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
	if (player.money>=player.workplaceCost) {
  	switch (player.workplace) {
    	case "home": player.workplace = "small office"; player.workersmax = 5; player.workplaceCost=1e+10;
    	case "small office": player.workplace = "bigger office"; player.workersmax = 10; player.workplaceCost=1e+25;
    	case "bigger office": player.workplace = "office complex"; player.workersmax = 25; player.workplaceCost=1e+50;
    	case "office complex": player.workplace = "factory"; player.workersmax = 100; player.workplaceCost=1e+100;
    	case "factory": player.workplace = "government facility"; player.workersmax = 1000; player.workplaceCost=1e+200;
    	case "government facility": player.workplace = "Martian facility"; player.workersmax = 10000; player.workplaceCost=Number.MAX_VALUE;
  	}	
	}  
}


 
function switchTab(tabid) {
	hideElement(tab+'Tab')
	showElement(tabid+'Tab','block')
	tab=tabid
  display()
}

function changeAction(action) {
	if (currentAction!=action) {
  	currentAction=action
	}
}

function getLPS() {
  player.lps=player.workersamount * (player.workersmult * (Decimal.pow(1.1, player.workersaffection)))
}
getLPS();

function buyWorker() {
  if (player.money>=player.workerscost) {
      player.workersamount++;    
      player.money -= player.workerscost;
      player.workerscost = Decimal.pow(1.1,player.workerscost);
  } 
  display();
}

function increaseAffection(type) {
	switch (type) {
		case 1: if (player.money>=player.affectionCosts[0])player.workersaffection++;player.money-=player.affectionCosts[0];//coffee
		case 2: if (player.money>=player.affectionCosts[1])player.workersaffection+=2;player.money-=player.affectionCosts[1];//buy a coffee machine
		case 3: if (player.money>=player.affectionCosts[2])player.workersaffection+=5;player.money-=player.affectionCosts[2];//boys' night out(bar)
	}
}

function increaseMults(mult) {
	switch (mult) {
		case "sell": player.sellMult++;
		case "layer":player.layerMult++;
	}
}

function display() {

  updateElement("qlds", "You have " + formatValue(player.qld, 0) + " Quantum Layering Devices (QLD's).");
  updateElement("mps", formatValue(player.mps, 2));
  updateElement("money", formatValue(player.money, 2));
	updateElement("lps", formatValue(player.lps, 2));
  updateElement("layers", formatValue(player.layers, 2));
	

  if (tab == "workers") {
     hideElement('statstab')
     showElement('workertab')
     hideElement('optionstab')
     hideElement('achievestab')
     hideElement('inftab')
  
    updateElement("wCost", "Cost: " + formatValue(player.workerscost, places));
    updateElement("wAmount", formatValue(player.workersamount, 0));
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
		updateElement("totalLayerStat", formatValue(player.totalLayers, 1));
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
		
		showElement('savebtn');

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
	
	if (tab == "empty") { //Big Crunch thing
		hideElement("statstab");
    hideElement("workertab");
    hideElement("optionstab");
    hideElement("achievestab");
    hideElement("inftab");
		showElement('infButton')
	}
}

function gameInit() {
	load(localStorage.getItem("layerSave"))
	
	var tickspeed=0 // distance from last game tick?
	updated=true
	setInterval(function(){
		if (updated) {
			updated=false
			setTimeout(function(){
				var startTime=new Date().getTime()
				if (currentAction=="layers") {
					if (prevAction=="none"||prevAction=="none")player.lps++;prevAction="layers"
					player.layers+=(player.lps*player.layerMult)/100
					player.totalLayers+=(player.lps*player.layerMult)/100
  			} else if (currentAction=="sell") {
						if (prevAction=="layers")player.lps--;prevAction="sell"
						player.money+=player.layers
						player.totalMoney+=player.layers
						player.layers=0
  			}       				
				tickspeed=(new Date().getTime()-startTime)*0.2+tickspeed*0.8
				updated=true
				display();
			},tickspeed)
		}
	},0)
	setInterval(save(),15000);
}
