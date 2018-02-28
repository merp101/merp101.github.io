//This is for JS, HTML is in index.md - and don't change the name of the file, it won't work.
//Make it more like Idle Wizard ( https://www.kongregate.com/games/TwoWizards/idle-wizard?haref=HP_NG_idle-wizard )

var player = {
  money: 0,//new Decimal(0),
  mps: 0,//new Decimal(0),
  layers: 0,//new Decimal(0),
  lps: 0,//new Decimal(0),
  playerlps: 0,//new Decimal(0)
  layerMult: 1,
  sellMult: 1,
  clay: 1,
  workerscost: 10,//new Decimal(10),
  workersaffection: 0,
	affectionCosts: [10,1000,10000],
  workersamount: 0,
  workersmult: 1,
  workersmax: 1,
  achievements: [],
  resets: 0,//new Decimal(0),
  infinitied: 0,//new Decimal(0),
  qld: 0,
	story: 0,
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
const storyMessages=['You have a block of clay. You feel the urge to play with it.','This is oddly satisfying, but you need to get a job.','','']
var places=1;
var currentAction='none'
var prevAction='none'
var qld=false;


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
	if (savefile != undefined) 	player=JSON.parse(atob(savefile));
	
	if (player.money==undefined||player.money==NaN)player.money=0;
	if (player.layers==undefined||player.layers==NaN)player.layers=0;
	if (player.mps==undefined||player.mps==NaN)player.mps=0;
	if (player.lps==undefined||player.lps==NaN)player.lps=0;
 	if (player.options.notation==undefined) player.options.notation="scientific";
	if (player.money==(Infinity))switchTab('empty');  	
  if (player.workersamount==undefined||player.workersamount==NaN) player.workersamount = 0;
	if (player.workerscost==undefined||player.workerscost==NaN) player.workerscost=10;
	if (player.workersaffection==undefined||player.workersaffection==NaN) player.workersaffection=0;
	player.money=new Number(player.money)
	player.mps=new Number(player.mps)
	player.layers=new Number(player.layers)
	player.lps=new Number(player.lps)
	player.playerlps=new Number(player.playerlps)
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

function updateStory(num,elementid) {
	document.getElementById('storyText').innerHTML=storyMessages[num];
	if (elementid!=undefined)showElement(elementid);
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
		player.money-=player.workplaceCost;
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
  	currentAction=action;
	}
}

function getLPS() {
  player.lps=player.workersamount * (player.workersmult * (Math.pow(1.1, player.workersaffection)));
}
getLPS();

function buyWorker() {
  if (player.money>=player.workerscost) {
      player.workersamount++;    
      player.money -= player.workerscost;
      player.workerscost = Math.pow(player.workerscost,1.1);
      getLPS();
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
  updateElement("lps", formatValue(player.lps+player.playerlps, 2));
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
		updateElement("workplacecost", player.workplaceCost)
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

function increaseCurrency(currency) {
	if (currency == "layers") {
		if (player.layers+((player.playerlps*player.layerMult)/10)<=player.clay*50){
			player.layers+=(player.playerlps*player.layerMult)/10
			player.totalLayers+=player.layers
		} else player.layers=player.clay*50;
	}
	if (currency == "money") {
		player.money+=player.layers
		player.totalMoney+=player.money
	}
}		

function randAct(story) {
	if (story==0) if (player.layers==0){player.layers+=1;}else player.layers*=2;
	if (story==1) player.lps=1;changeAction("sell");
	if (story==2) player.money-=100;showElement("smashbtn");
}

function gameLoop() {
	if (currentAction=="layers") {
		if (prevAction=="none"||prevAction=="sell")player.playerlps++;prevAction="layers"
		increaseCurrency("layers");
		player.mps=0;
  } else if (currentAction=="sell") {
		increaseCurrency("money");
		player.layers=0
		if (prevAction=="layers"){
			player.playerlps--;
			player.mps=player.lps
			player.lps=0;
			prevAction="sell"
		}
	}
	getLPS();
	player.layers+=player.lps/10
	//if (player.story==0) updateStory(0); updateElement('randomAct','Play with some clay');
	//if (player.layers>=10 && player.story==1) updateStory(1);	updateElement('randomAct', 'Get a job');				
	//if (player.money>100 && player.story==2) updateStory(2); updateElement('randomAct','Buy the Quantum Layering Device');
}

function gameInit() {
	load(localStorage.getItem("layerSave"))
	updated=true
	setInterval(function(){
		if (updated) {
			updated=false
			setTimeout(function(){
				gameLoop();
				updated=true
				display();
			},100)
		}
	},0)
	setInterval(save(),15000);
}
