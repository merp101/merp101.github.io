//This is for JS, HTML is in index.md - and don't change the name of the file, it won't work.
//Make it more like Idle Wizard ( https://www.kongregate.com/games/TwoWizards/idle-wizard?haref=HP_NG_idle-wizard )
//Make costs scale

var player = {
  money: 10,
  moneyMax: undefined,
  mps: 0,
  buyMult: 1,
  tickspeed: 1000,
  costs: {
    d: undefined,
    s: undefined,
    m: undefined,
  },
  costUp: 0,
  amounts: {
    d: 0,
    s: 0,
    m: 0,
  },
  mults: {
    d: 1,
    s: 1,
    m: 1,
    nD: 1,
    nS: 1,
    nM: 1,
  },
  minLayerForMult: 1e+5,
  currentPage: 0,
  achievements: [],
  resets: 0,
  infinitied: 0,
  qld: 0,
  currentTimePlayed: 0,
  totalTimePlayed: 0,
  totalMoney: 0,
  materialNum: 0,
  material: "",
  options: {
    notation: "scientific",
    theme: "normal",
    
  }
}
const TIER_NAMES = ["d", "s", "m"];

function changeCostUp(tier) {
  if (tier == 0) {
    player.costUp = 1000;
  } else if (tier == 1) {
    player.costUp = 10000;
  } else if (tier == 2) {
    player.costUp = 100000;
  }
}

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

function setSave() {
  localStorage.setItem("layers",JSON.stringify(game));
}

function getSave() {
   if (localStorage.getItem("layers") !== null) {
        return JSON.parse(localStorage.getItem("layers"));
    }
}
//   Stuff
  


function onLoad() {
  getSave();
  if (player.money == undefined || player.money === NaN) player.money = 10;
  if (player.options.notation == undefined) player.options.notation = "scientific";
  if (player.money == Infinity) document.getElementById("infButton").display = "inline";
  if (player.moneyMax == undefined) setMoneyMax();
  if (player.costs.d == undefined || player.costs.d == NaN) player.costs.d = 10;
  if (player.costs.s == undefined || player.costs.s == NaN) player.costs.s = 100;
  if (player.costs.m == undefined || player.costs.m == NaN) player.costs.m = 1000;
  if (player.amounts.d == undefined || player.amounts.d == NaN) player.amounts.d = 0;
  if (player.amounts.s == undefined || player.amounts.s == NaN) player.amounts.s = 0;
  if (player.amounts.m == undefined || player.amounts.m == NaN) player.amounts.m = 0;
  if (player.mults.d == undefined || player.mults.d == NaN) player.mults.d = 1;
  if (player.mults.s == undefined || player.mults.s == NaN) player.mults.s = 1;
  if (player.mults.m == undefined || player.mults.m == NaN) player.mults.m = 1;
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
 
function setCosts() {
  if (player.costs.d == undefined) {
    player.costs.d = 10;
  } else player.costs.d = .57 * (player.amounts.d ^ 2);
  if (player.costs.s == undefined) {
    player.costs.s = 100;
  } else player.costs.s = .69 * (player.amounts.s ^ 2);
  if (player.costs.m == undefined) {
    player.costs.m = 1000;
  } else player.costs.m = .89 * (player.amounts.m ^ 2);
}

function getMPS() {
  player.mps = (player.amounts.d * player.mults.d) + ((player.amounts.s * 10) * player.mults.s) + ((player.amounts.m * 100) * player.mults.m);
}
getMPS();

function buyWorker(tier) {
  var level = TIER_NAMES[tier];
  setCosts();
  var buyAmt = player.buyMult - (player.amounts[level] % player.buyMult);
  if (player.money - (player.costs[level] * buyAmt) >= 0) {
    player.amounts[level] += buyAmt;    
    player.money -= (player.costs[level] * buyAmt);
    display();
  } 
}

function getNextMults() {
  player.mults.nD = Math.log10(player.money) ^ 2;
  player.mults.nS = (Math.log10(player.money) / 2) ^ 2;
  player.mults.nM = Math.log10(player.money) / 2;
}


function display() {
  getMPS();
  getNextMults();

  var qlds = document.getElementById("qlds");
  qlds.innerHTML = "You have " + formatValue(player.qld, 0) + " Quantum Layering Devices (QLD's).";
  
  var mps = document.getElementById("mps");
  mps.innerHTML = formatValue(player.mps, 2);
  
  var moneyMax = document.getElementById("moneyMax");
  moneyMax.innerHTML = formatValue(player.moneyMax, 0);
  
  var money = document.getElementById("money");
  money.innerHTML = formatValue(player.money, 2);

  
 
  
  /*if (player.currentPage == 0) {
     document.getElementById("statstab").display = "none";
     document.getElementById("workertab").display = "inline";
     document.getElementById("optionstab").display = "none";
     document.getElementById("achievestab").display = "none";
     document.getElementById("inftab").display = "none";*/
  
    if (player.materialNum > 1) {
      var resetbtn = document.getElementById("resetbtn");
      resetbtn.style.display = "inline";
    
      var minMult = document.getElementById("minMult");
      minMult.innerHTML = formatValue(player.minLayerForMult, 0);
    
      var nDMult = document.getElementById("dMult");
      nDMult.innerHTML = formatValue(player.mults.nD, 0);
  
      var nSMult = document.getElementById("sMult");
      nSMult.innerHTML = formatValue(player.mults.nS, 0);
  
      var nMMult = document.getElementById("mMult");
      nMMult.innerHTML = formatValue(player.mults.nM, 0);
    } 
    
    var buyMult = document.getElementById("buyMult");
    buyMult.innerHTML = "x" + player.buyMult;
  
    var dMult = document.getElementById("cDMult");
    dMult.innerHTML = "x" + formatValue(player.mults.d, 0);
  
    var sMult = document.getElementById("cSMult");
    sMult.innerHTML = "x" + formatValue(player.mults.s, 0);
  
    var mMult = document.getElementById("cMMult");
    mMult.innerHTML = "x" + formatValue(player.mults.m, 0);
  
    var dCost = document.getElementById("dCost");
    dCost.innerHTML = "Cost: " + formatValue(player.costs.d, 0);
  
    var dAmt = document.getElementById("dAmount");
    dAmt.innerHTML = formatValue(player.amounts.d, 0);
  
    var sCost = document.getElementById("sCost");
    sCost.innerHTML = "Cost: " + formatValue(player.costs.s, 0);
  
    var sAmt = document.getElementById("sAmount");
    sAmt.innerHTML = formatValue(player.amounts.s, 0);
  
    var mCost = document.getElementById("mCost");
    mCost.innerHTML = "Cost: " + formatValue(player.costs.m, 0); 
  
    var mAmt = document.getElementById("mAmount");
    mAmt.innerHTML = formatValue(player.amounts.m, 0); 
  /*} else
  
   if (player.currentPage == 1) { //stats tab
    document.getElementById("statstab").display = "inline";
    document.getElementById("workertab").display = "none";
    document.getElementById("optionstab").display = "none";
    document.getElementById("achievestab").display = "none";
    document.getElementById("inftab").display = "none";
    
    var totalTime = document.getElementById("totalTimeStat");
    totalTime.innerHTML = player.totalTimePlayed;
  
    var currentTime = document.getElementById("currentInfStat");
    //currentTime.innerHTML = player.currentTimePlayed;
    // it doesn't work for some reason, so it's a comment
  
    var totalLayers = document.getElementById("totalLayerStat");
    totalLayers.innerHTML = formatValue(player.totalMoney, 1);
  
    var infinitied = document.getElementById("infinitiedStat");
    infinitied.innerHTML = formatValue(player.infinitied, 1);
  
    var resetStat = document.getElementById("resetStat");
    resetStat.innerHTML = formatValue(player.resets, 1);
  } else
  
  if (player.currentPage == 2) { //options tab
    document.getElementById("statstab").display = "none";
    document.getElementById("workertab").display = "none";
    document.getElementById("optionstab").display = "inline";
    document.getElementById("achievestab").display = "none";
    document.getElementById("inftab").display = "none"; 
  } else
  
  if (player.currentPage == 3) { //achieves tab
    document.getElementById("statstab").display = "none";
    document.getElementById("workertab").display = "none";
    document.getElementById("optionstab").display = "none";
    document.getElementById("achievestab").display = "inline";
    document.getElementById("inftab").display = "none";
  } else
  
  if (player.currentPage == 4) { //infinity tab
    document.getElementById("statstab").display = "none";
    document.getElementById("workertab").display = "none";
    document.getElementById("optionstab").display = "none";
    document.getElementById("achievestab").display = "none";
    document.getElementById("inftab").display = "inline";
  }*/
}
display();

function reset() {
  var nD = player.mults.nD;
  var nS = player.mults.nS;
  var nM = player.mults.nM;
  player.resets ++;
  player.money = 10;
  player.moneyMax = undefined;
  player.mps = 0;
  player.costs.d = 10;
  player.costs.s = 100;
  player.costs.m = 1000;
  player.amounts.d = 0;
  player.amounts.s = 0;
  player.amounts.m = 0;
  player.mults.d = 1;
  player.mults.s = 1;
  player.mults.m = 1; 
  changeCostUp(0);
  setMoneyMax();
  display();
  player.mults.nD = nD;
  player.mults.nS = nS;
  player.mults.nM = nM;
}

function getMults() {
   if (player.materialNum > 1 && player.money >= player.minLayerForMult) {
     reset();
     player.mults.d = player.mults.nD;
     player.mults.s = player.mults.nS;
     player.mults.m = player.mults.nM;
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
  player.currentPage = 0;
  display();
}

document.getElementById("statsbtn").onclick = function() {
  player.currentPage = 1;
  display();
}

document.getElementById("optionsbtn").onclick = function() {
  player.currentPage = 2;
  display();
}

document.getElementById("achievesbtn").onclick = function() {
  player.currentPage = 3;
  display();
}

document.getElementById("infinitybtn").onclick = function() {
  player.currentPage = 4;
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
   if (player.money + player.mps <= player.moneyMax) {
     player.money += player.mps; 
     player.totalMoney += player.mps;
    } else player.money = player.moneyMax;
     display();
}

setInterval(function(){
   getMPS();
   increaseMoney();
   
 }, player.tickspeed);   

// setInterval(function(){setSave();}, 15000); Autosaving every 15 seconds, except for some reason it stops the above interval


