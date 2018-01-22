//This is for JS, HTML is in index.md - and don't change the name of the file, it won't work.
//Make it more like Idle Wizard ( https://www.kongregate.com/games/TwoWizards/idle-wizard?haref=HP_NG_idle-wizard )

var player = {
  money: 10,
  moneyMax: undefined,
  mps: 0,
  buyMult: 1,
  tickspeed: 1000,
  costs: [10,100,1000],
  costMults: [2,3,4],
  amounts: [0,0,0],
  mults: [1,1,1,1,1,1], 
  minLayerForMult: 1e+5,
  currentPage: 0,
  achievements: [],
  resets: 0,
  infinitied: 0,
  qld: 0,
  totalTimePlayed: 0,
  totalMoney: 0,
  materialNum: 0,
  material: "",
  options: {
    notation: "scientific",
    theme: "normal",
    
  }
}
var tab="workers"
const TIER_NAMES=["d", "s", "m"]
const costMults=[2,2.5,3]
var save;
var places=1;

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
  saved=true
}


function load(savefile) {
  try {
	  player=JSON.parse(atob(savefile));
    
	  if (player.money==undefined||player.money==NaN)player.money=10;
 	  if (player.options.notation==undefined) player.options.notation="scientific";
	  if (player.money==Infinity)document.getElementById("infButton").display="inline";
	  if (player.moneyMax==undefined)setMoneyMax();
  	for (var i=0;i<3;i++) {
     if (player.amounts[i] == undefined || player.amounts[i] == NaN) player.amounts[i] = 0;
 	  }
    for (var i=0;i<3;i++) {
      if(player.costs[i]==undefined||player.costs[i]==NaN)if(i==0)player.costs[i]=10; if(i==1)player.costs[i]=100; if(i==2)player.costs[i]=1000;
    }
	  //if the value is a Decimal, set it to be a Decimal here.
	  player.money = new Decimal(player.money)
	  player.totalMoney = new Decimal(player.totalMoney)
	  
	  increaseMoney()
	  console.log('Game loaded!')
  } catch (e) {
	  console.log('Your save failed to load:\n'+e)
  }
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


function getMaterialWord() {
  player.materialNum ++;
  if (player.materialNum === 0) {
    player.material = undefined;
  } else if(player.materialNum === 1) {
     player.material = "clay";
    }  else if (player.materialNum === 2) {
     player.material = "copper";
    } else if (player.materialNum === 3) {
     player.material = "tin";
    } else if (player.materialNum === 4) {
     player.material = "bronze";
    } else if (player.materialNum === 5) {
     player.material = "iron";
    } else if (player.materialNum === 6) {
     player.material = "steel";
    } else if (player.materialNum === 7) {
     player.material = "silver";
    } else if (player.materialNum === 8) {
     player.material = "gold";
    } else if (player.materialNum === 9) {
     player.material = "platinum";
    } else if (player.materialNum === 10) {
     player.material = "diamond";
   }
  document.getElementById("material").innerHTML = player.material;
}  
getMaterialWord();

function setMoneyMax() {
  if (player.material == "clay") {
    player.moneyMax = 1e+5;
  } else if (player.material == "copper") {
    player.moneyMax = 1e+10;
  } else if (player.material == "tin") {
    player.moneyMax = 1e+20;
  } else if (player.material == "bronze") {
    player.moneyMax = 1e+50;
  } else if (player.material == "iron") {
    player.moneyMax = 1e+100;
  } else if (player.material == "steel") {
    player.moneyMax = 1e+150;
  } else if (player.material == "silver") {
    player.moneyMax = 1e+200;
  } else if (player.material == "gold") {
    player.moneyMax = 1e+250;
  } else if (player.material == "platinum") {
    player.moneyMax = 1e+300;
  } else if (player.material == "diamond") {
    player.moneyMax = Number.MAX_VALUE;
  }
}
setMoneyMax();
 
function switchTab(tabid) {
	hideElement(tab+'Tab')
	showElement(tabid+'Tab','block')
	tab=tabid
}

function getMPS() {
  player.mps = (player.amounts[0] * player.mults[0]) + ((player.amounts[1] * 10) * player.mults[1]) + ((player.amounts[2] * 100) * player.mults[2]);
}
getMPS();

function buyWorker(tier) {
  if (player.money>=(player.costs[tier]*buyAmt)) {
    for (i=0;i<buyAmt;i++) {
      var buyAmt = player.buyMult - (player.amounts[tier] % player.buyMult);
      player.amounts[tier]+=buyAmt;    
      player.money-=(player.costs[tier]*buyAmt);
      player.costs[tier]*=player.costMults[tier];
      display();
    }
  } 
}

function getNextMults() {
  player.mults[3] = Math.log10(player.money) ^ 2;
  player.mults[4] = (Math.log10(player.money) / 2) ^ 2;
  player.mults[5] = Math.log10(player.money) / 2;
}


function display() {
  getMPS();
  getNextMults();

  updateElement("qlds", "You have " + formatValue(player.qld, 0) + " Quantum Layering Devices (QLD's).");
  updateElement("mps", formatValue(player.mps, 2));
  updateElement("moneyMax", formatValue(player.moneyMax, 0));
  updateElement("money", formatValue(player.money, 2));

  if (tab == "workers") {
     document.getElementById("statstab").display = "none";
     document.getElementById("workertab").display = "inline";
     document.getElementById("optionstab").display = "none";
     document.getElementById("achievestab").display = "none";
     document.getElementById("inftab").display = "none";
  
    if (player.materialNum > 1) {
      showElement("resetbtn")
      updateElement("minMult", formatValue(player.minLayerForMult, 0));
      updateElement("dMult", formatValue(player.mults[3], places));
      updateElement("sMult", formatValue(player.mults[4], places));
      updateElement("mMult", formatValue(player.mults[5], places));
    } 
    updateElement("buyMult", "x" + player.buyMult);
    updateElement("cDMult", "x" + formatValue(player.mults[0], places));
    updateElement("cSMult", "x" + formatValue(player.mults[1], places));
    updateElement("cMMult", "x" + formatValue(player.mults[2], places));
    updateElement("dCost", "Cost: " + formatValue(player.costs[0], places));
    updateElement("dAmount", formatValue(player.amounts[0], 0));
    updateElement("sCost", "Cost: " + formatValue(player.costs[1], places));
    updateElement("sAmount", formatValue(player.amounts[1], 0));
    updateElement("mCost", "Cost: " + formatValue(player.costs[2], places)); 
    updateElement("mAmount", formatValue(player.amounts[2], 0)); 
  } else
  
   if (tab == "stats") { //stats tab
    showElement("statstab");
    hideElement("workertab");
    hideElement("optionstab");
    hideElement("achievestab");
    hideElement("inftab");
    
    updateElement("totalTimeStat", player.totalTimePlayed);
    updateElement("totalLayerStat", formatValue(player.totalMoney, 1));
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
display();

function reset() {
  getNextMults();
  var nD = player.mults[3];
  var nS = player.mults[4];
  var nM = player.mults[5];
  player.resets ++;
  player.money = 10;
  player.moneyMax = undefined;
  player.mps = 0;
  player.costs[0] = 10;
  player.costs[1] = 100;
  player.costs[2] = 1000;
  player.amounts[0] = 0;
  player.amounts[1] = 0;
  player.amounts[2] = 0;
  player.mults[0] = 1;
  player.mults[1] = 1;
  player.mults[2] = 1; 
  setMoneyMax();
  display();
  player.mults[3] = nD;
  player.mults[4] = nS;
  player.mults[5] = nM;
}

function getMults() {
   if (player.materialNum > 1 && player.money >= player.minLayerForMult) {
     reset();
     player.mults[0] = player.mults[3];
     player.mults[1] = player.mults[4];
     player.mults[2] = player.mults[5];
     player.resets --;
     display();
   }
}

function newMaterial() {
   if (player.money === player.moneyMax) {
     reset();
     getMaterialWord();
     setMoneyMax();
     getNextMults();
   }  
}

function infinity() {
  if (player.money == player.moneyMax && player.material == "diamond") {
    reset();
    player.qld ++;
    player.infinitied ++;
    player.materialNum = 0;
    player.resets = 0;
    document.getElementById("qlds").display = "inline";
    display();
    setMoneyMax();
  }
}



document.getElementById("dCost").onclick = function() {
  buyWorker(0);
  display();
}

document.getElementById("sCost").onclick = function() {
  buyWorker(1);
  display();
}
                        
document.getElementById("mCost").onclick = function() {
  buyWorker(2);
  display();
}

document.getElementById("resetbtn").onclick = function() {
  getMults();
  display();
}

document.getElementById("workersbtn").onclick = function() {
  switchTab("worker")
  display();
}

document.getElementById("statsbtn").onclick = function() {
  switchTab("stats");
  display();
}

document.getElementById("optionsbtn").onclick = function() {
  switchTab("options");
  display();
}

document.getElementById("achievesbtn").onclick = function() {
  switchTab("achieves");
  display();
}

document.getElementById("infinitybtn").onclick = function() {
  switchTab("inf");
  display();
}

document.getElementById("savebtn").onclick = function() {
  setSave();
}

document.getElementById("infButton").onclick = function() {
  infinity();
}

document.getElementById("buyMult").onclick = function() {
  if (player.buyMult == 1) {
    player.buyMult = 5;
  } else if (player.buyMult == 5) {
    player.buyMult = 10;
  } else if (player.buyMult == 10) {
    player.buyMult = 25;
  } else if (player.buyMult == 25) {
    player.buyMult = 50;
  } else if (player.buyMult == 50) {
    player.buyMult = 100;
  } else if (player.buyMult == 100) {
    player.buyMult = 1;
  }
  display();
}

function increaseMoney() {
   getMPS();
   if (player.money + player.mps <= player.moneyMax) {
     player.money += player.mps; 
     player.totalMoney += player.mps;
   } else player.money = player.moneyMax;
   display();
}

function gameInit() {
	load(localStorage.getItem("layerSave"))
	
	var tickspeed=0
	updated=true
	setInterval(function(){
		if (updated) {
			updated=false
			setTimeout(function(){
				var startTime=new Date().getTime()
				try {
					increaseMoney()
				} catch (e) {
					console.log('A game error has been occured: '+e)
				}
				tickspeed=(new Date().getTime()-startTime)*0.2+tickspeed*0.8
				updated=true
			},tickspeed)
		}
	},0)
	setInterval(save,10000);
}

setInterval(function(){
   increaseMoney();
 }, player.tickspeed);   

// setInterval(function(){setSave();}, 15000); Autosaving every 15 seconds, except for some reason it stops the above interval


