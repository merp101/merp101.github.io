//This is for JS, HTML is in index.md - and don't change the name of the file, it won't work.
//Make it more like Idle Wizard ( https://www.kongregate.com/games/TwoWizards/idle-wizard?haref=HP_NG_idle-wizard )

var player = {
  money: 10,
  moneyMax: undefined,
  costs: [10,100,1000],
  amounts: [0,0,0],
  mults: [1,1,1,1,1,1], 
  minLayerForMult: 1e+5,
  achievements: [],
  resets: 0,
  infinitied: 0,
  qld: 0,
  totalTimePlayed: 0,
  totalMoney:0,
  materialNum: 0,
  material: "",
  options: {
    notation: "scientific",
    theme: "normal",
    
  }
}
var tab="workers"
const TIER_NAMES=["d", "s", "m"]
const costMults=[2,3,4]
var save;
var places=1;
var buyAmt;
var buyMult=1;

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
  try {
	  player=JSON.parse(atob(savefile));
    
	  if (player.money==(undefined)||player.money==(NaN))player.money=10;
 	  if (player.options.notation==undefined) player.options.notation="scientific";
	  if (player.money==(Infinity))document.getElementById("infButton").display="inline";
	  if (player.moneyMax==undefined)setMoneyMax();
  	for (var i=0;i<3;i++) {
     if (player.amounts[i]==(undefined)||player.amounts[i]==(NaN)) player.amounts[i] = 0;
 	  }
	  if (player.costs[0]==(undefined)||player.costs[0]==(NaN)) player.costs[0]=10;
	  if (player.costs[1]==(undefined)||player.costs[1]==(NaN)) player.costs[1]=100;
	  if (player.costs[2]==(undefined)||player.costs[2]==(NaN)) player.costs[2]=1000;
	 
	  
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
  switch (player.materialNum) {
    case 0: player.material = undefined;
    case 1: player.material = "clay";
    case 2: player.material = "copper";
    case 3: player.material = "tin";
    case 4: player.material = "bronze";
    case 5: player.material = "iron";
    case 6: player.material = "steel";
    case 7: player.material = "silver";
    case 8: player.material = "gold";
    case 9: player.material = "platinum";
    case 10: player.material = "diamond";
  }
  document.getElementById("material").innerHTML = player.material;
}  
getMaterialWord();

function setMoneyMax() {
  switch (player.material) {
    case "clay": player.moneyMax = 1e+5;
    case "copper": player.moneyMax = 1e+10;
    case "tin": player.moneyMax = 1e+20;
    case "bronze": player.moneyMax = 1e+50;
    case "iron": player.moneyMax = 1e+100;
    case "steel": player.moneyMax = 1e+150;
    case "silver": player.moneyMax = 1e+200;
    case "gold": player.moneyMax = 1e+250;
    case "platinum": player.moneyMax = 1e+300;
    case "diamond": player.moneyMax = Number.MAX_VALUE;
  }
}
setMoneyMax();
 
function switchTab(tabid) {
	hideElement(tab+'Tab')
	showElement(tabid+'Tab','block')
	tab=tabid
  display()
}

function getMPS() {
  let ret=0;
  for (var i=0;i<player.amounts.length;i++) ret+=(player.amounts[i] * Math.pow(10,i+1))*player.mults[i]
  return ret;
}
getMPS();

function buyWorker(tier) {
  if (player.money>=player.costs[tier]) {
      player.amounts[tier]++;    
      player.money = player.money-player.costs[tier];
      player.costs[tier] = player.costs[tier]*(costMults[tier]);
    }
  } 
  display();
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
  updateElement("mps", formatValue(getMPS(), 2));
  updateElement("moneyMax", formatValue(player.moneyMax, 0));
  updateElement("money", formatValue(player.money, 2));

  if (tab == "workers") {
     hideElement('statstab')
     showElement('workertab')
     hideElement('optionstab')
     hideElement('achievestab')
     hideElement('inftab')
  
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
  player.resets ++;
  player.money = 10;
  player.moneyMax = undefined;
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
}

function newMaterial() {
   if (player.money==player.moneyMax && player.moneyMax != Number.MAX_VALUE) {
     reset();
     getMaterialWord();
     setMoneyMax();
     getNextMults();
   }  else if (player.moneyMax == Number.MAX_VALUE && player.money==player.moneyMax) infinity();
}

function infinity() {
  if (player.money==Number.MAX_VALUE) {
    player.qld ++;
    player.infinitied ++;
    player.materialNum = 0;
    player.resets = 0;
    showElement('qlds')
    display();
    setMoneyMax();
  }
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

function gameInit() {
	load(localStorage.getItem("layerSave"))
	
	var tickspeed=0 //speed at which it increases money
	updated=true
	setInterval(function(){
		if (updated) {
			updated=false
			setTimeout(function(){
				var startTime=new Date().getTime()
				try {
					var increase=(getMPS())/tickspeed;
					player.money+=increase;
				} catch (e) {
					console.log('A game error has occured: '+e)
				}
				tickspeed=(new Date().getTime()-startTime)*0.2+tickspeed*0.8
				updated=true
			},tickspeed)
		}
	},0)
	setInterval(save(),15000);
}
