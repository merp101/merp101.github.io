//This is for JS, HTML is in index.md - and don't change the name of the file, it won't work.


var player = {
  money: 10,
  moneyMax: undefined,
  mps: 0,
  costs: {
    d: 10,
    s: 100,
    m: 1000,
  },
  tenCosts: {
    d: 0,
    s: 0,
    m: 0,
  },
  costUp: 0,
  amounts: {
    d: 0,
    s: 0,
    m: 0,
  },
  bought: {
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

function getTenCosts() {
  player.tenCosts.dTen = player.costs.d * 10;
  player.tenCosts.sTen = player.costs.s * 10;
  player.tenCosts.mTen = player.costs.m * 10;
}
getTenCosts();

function changeCostUp(tier) {
  if (tier == 0) player.costUp = 10;
  else if (tier == 1) player.costUp = 100;
  else if (tier == 2) player.costUp = 1000;
}
  

parseFloat(player.money);

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
  if (player.tenCosts.d == undefined || player.tenCosts.d == NaN) getTenCosts();
  if (player.tenCosts.s == undefined || player.tenCosts.s == NaN) getTenCosts();
  if (player.tenCosts.m == undefined || player.tenCosts.m == NaN) getTenCosts();
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
  if (player.material === "clay") {
    player.moneyMax = 100;
  } else if (player.material === "copper") {
    player.moneyMax = 1000;
  } else if (player.material === "tin") {
    player.moneyMax = 10000;
  } else if (player.material === "bronze") {
    player.moneyMax = 100000;
  } else if (player.material === "iron") {
    player.moneyMax = 1e+10;
  } else if (player.material === "steel") {
    player.moneyMax = 1e+25;
  } else if (player.material === "silver") {
    player.moneyMax = 1e+50;
  } else if (player.material === "gold") {
    player.moneyMax = 1e+100;
  } else if (player.material === "platinum") {
    player.moneyMax = 1e+200;
  } else if (player.material === "diamond") {
    player.moneyMax = Number.MAX_VALUE;
  }
}
setMoneyMax();
 
function getMPS() {
  player.mps = (player.amounts.d * player.mults.d) + ((player.amounts.s * 10) * player.mults.s) + ((player.amounts.m * 100) * player.mults.m);
}
getMPS();

function changeCostAtTen(tier) {
  var level = TIER_NAMES[tier];
  if (player.bought[level] == 10) {
    changeCostUp(tier);
    player.costs[tier] *= player.costUp;
    player.bought[level] = 0;
  } 
}


function buyWorker(tier) {
  var level = TIER_NAMES[tier];
  if (player.money - player.costs[level] >= 0) {
    player.amounts[tier] ++;
    player.bought[tier] ++;
    player.money -= player.costs[level];
    getMPS();
    changeCostAtTen(tier);
    display();
  } 
}

function buyManyWorkers(tier) {
  var level = TIER_NAMES[tier];
  var cost = player.costs[level] * (10 - player.bought[level]);
  player.amounts[level] = player.amounts[level] + (10 - player.bought[level]);
  player.bought[level] = 0;
  player.money -= cost;
  changeCostAtTen();
  display();
}




function display() {
  getMPS();
  
  player.mults.nD = 2 * (Math.log10(player.money) ^ 2);
  player.mults.nS = Math.log10(player.money) ^ 2;
  player.mults.nM = (Math.log10(player.money) ^ 2) / 2;
  
  /*
  if (player.materialNum > 1) {
    var resetbtn = document.getElementById("resetbtn");
    resetbtn.style.display = "inline";
    
    var nDMult = document.getElementById("dMult");
    nDMult.innerHTML = formatValue(player.mults.nD, 0);
  
    var nSMult = document.getElementById("sMult");
    nSMult.innerHTML = formatValue(player.mults.nS, 0);
  
    var nMMult = document.getElementById("mMult");
    nMMult.innerHTML = formatValue(player.mults.nM, 0);
  } 
  */
  
  var dMult = document.getElementById("cDMult");
  dMult.innerHTML = "x" + formatValue(player.mults.d, 0);
  
  var sMult = document.getElementById("cSMult");
  sMult.innerHTML = "x" + formatValue(player.mults.s, 0);
  
  var mMult = document.getElementById("cMMult");
  mMult.innerHTML = "x" + formatValue(player.mults.m, 0);
  

  var mps = document.getElementById("mps");
  mps.innerHTML = "You are getting " + formatValue(player.mps, 0) + " layers per second.";
  
  
  var money = document.getElementById("money");
  money.innerHTML = formatValue(player.money, 0);
  
  var qlds = document.getElementById("qlds");
  qlds.innerHTML = "You have " + formatValue(player.qld, 0) + " Quantum Layering Devices (QLD's).";
  
  var dCost = document.getElementById("dCost");
  dCost.innerHTML = "Cost: " + formatValue(player.costs.d, 0);
  
  var dMax = document.getElementById("dMax");
  dMax.innerHTML = "Until 10. Cost: " + formatValue(player.tenCosts.dTen, 0);
  
  var dAmt = document.getElementById("dAmount");
  dAmt.innerHTML = formatValue(player.amounts.d, 0);
  
  var sCost = document.getElementById("sCost");
  sCost.innerHTML = "Cost: " + formatValue(player.costs.s, 0);
  
  var sMax = document.getElementById("sMax");
  sMax.innerHTML = "Until 10. Cost: " + formatValue(player.tenCosts.sTen, 0);
  
  var sAmt = document.getElementById("sAmount");
  sAmt.innerHTML = formatValue(player.amounts.s, 0);
  
  var mCost = document.getElementById("mCost");
  mCost.innerHTML = "Cost: " + formatValue(player.costs.m, 0); 
  
  var mMax = document.getElementById("mMax");
  mMax.innerHTML = "Until 10, Cost: " + formatValue(player.tenCosts.mTen, 0);
  
  var mAmt = document.getElementById("mAmount");
  mAmt.innerHTML = formatValue(player.amounts.m, 0); 
  
  var totalTime = document.getElementById("totalTimeStat");
  totalTime.innerHTML = player.totalTimePlayed;
  
  var currentTime = document.getElementById("currentInfStat");
  //currentTime.innerHTML = player.currentTimePlayed;
  // it doesn't work for some reason, don't remove the "//"
  
  var totalLayers = document.getElementById("totalLayerStat");
  totalLayers.innerHTML = formatValue(player.totalMoney, 1);
  
  var infinitied = document.getElementById("infinitiedStat");
  infinitied.innerHTML = formatValue(player.infinitied, 1);
  
  var resetStat = document.getElementById("resetStat");
  resetStat.innerHTML = formatValue(player.resets, 1);
}
display();

function reset() {
  player.resets ++;
  player.money = 10;
  player.moneyMax = undefined;
  player.mps = 0;
  player.costs.d = 10;
  player.costs.s = 100;
  player.costs.m = 1000;
  getTenCosts();
  player.amounts.d = 0;
  player.amounts.s = 0;
  player.amounts.m = 0;
  player.mults.d = 1;
  player.mults.d = 1;
  player.mults.d = 1;
  display();
  setMoneyMax();
}

function getMults() {
   display();
   if (player.materialNum > 1) {
     reset();
     player.mults.d = player.mults.nD;
     player.mults.s = player.mults.nS;
     player.mults.m = player.mults.nM;
     player.resets --;
   }
}

function newMaterial() {
   if (player.money === player.moneyMax) {
     reset();
     getMaterialWord();
     setMoneyMax();
   }  
}

function infinity() {
  if (player.money === player.moneyMax && player.material == "diamond") {
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
}

document.getElementById("sCost").onclick = function() {
  buyWorker(1);
}
                        
document.getElementById("mCost").onclick = function() {
  buyWorker(2);
}

document.getElementById("dMax").onclick = function() {
  buyManyWorkers(0);
}

document.getElementById("sMax").onclick = function() {
  buyManyWorkers(1);
}

document.getElementById("mMax").onclick = function() {
  buyManyWorkers(2);
}

document.getElementById("resetbtn").onclick = function() {
  getMults();
}

document.getElementById("statsbtn").onclick = function() {
  document.getElementById("statstab").display = "inline";
  document.getElementById("workerstab").display = "none";
  document.getElementById("optionstab").display = "none";
  document.getElementById("achievestab").display = "none";
  document.getElementById("inftab").display = "none";
}

document.getElementById("workersbtn").onclick = function() {
  document.getElementById("statstab").display = "none";
  document.getElementById("workerstab").display = "inline";
  document.getElementById("optionstab").display = "none";
  document.getElementById("achievestab").display = "none";
  document.getElementById("inftab").display = "none";
}

document.getElementById("optionsbtn").onclick = function() {
  document.getElementById("statstab").display = "none";
  document.getElementById("workerstab").display = "none";
  document.getElementById("optionstab").display = "inline";
  document.getElementById("achievestab").display = "none";
  document.getElementById("inftab").display = "none"; 
}

document.getElementById("achievesbtn").onclick = function() {
  document.getElementById("statstab").display = "none";
  document.getElementById("workerstab").display = "none";
  document.getElementById("optionstab").display = "none";
  document.getElementById("achievestab").display = "inline";
  document.getElementById("inftab").display = "none"; 
}

document.getElementById("infinitybtn").onclick = function() {
  document.getElementById("statstab").display = "none";
  document.getElementById("workerstab").display = "none";
  document.getElementById("optionstab").display = "none";
  document.getElementById("achievestab").display = "none";
  document.getElementById("inftab").display = "inline";
}
