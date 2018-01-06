//This is for JS, HTML is in index.md - and don't change the name of the file, it won't work.

// more achievements!
var player = {
  money: 10,
  moneyMax: undefined,
  mps: 0,
  dCost: 10,
  sCost: 100,
  mCost: 1000,
  dTenCost: player.dCost * (10 ^ 10),
  sTenCost: player.sCost * (10 ^ 10),
  mTenCost: player.mCost * (10 ^ 10),
  dAmount: 0,
  sAmount: 0,
  mAmount: 0,
  dMult: 1,
  sMult: 1,
  mMult: 1,
  nDMult: 1,
  nSMult: 1,
  nMMult: 1,
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

function save() {
  localStorage.setItem("layers",JSON.stringify(game));
}


//   Stuff
  


function onLoad() {
  if (player.money == undefined || player.money === NaN) player.money = 10;
  if (player.options.notation == undefined) player.options.notation = "scientific";
  if (player.money == Infinity) document.getElementById("infButton").display = "inline";
  if (player.moneyMax == undefined) setMoneyMax();
}

function showStats() {
  document.getElementById("statstab").display = "inline";
  document.getElementById("workerstab").display = "none";
  document.getElementById("optionstab").display = "none";
  document.getElementById("achievestab").display = "none";
  document.getElementById("inftab").display = "none";
}

function showWorkers() {
  document.getElementById("statstab").display = "none";
  document.getElementById("workerstab").display = "inline";
  document.getElementById("optionstab").display = "none";
  document.getElementById("achievestab").display = "none";
  document.getElementById("inftab").display = "none";
}

function showOptions() {
  document.getElementById("statstab").display = "none";
  document.getElementById("workerstab").display = "none";
  document.getElementById("optionstab").display = "inline";
  document.getElementById("achievestab").display = "none";
  document.getElementById("inftab").display = "none"; 
}

function showAchieves() {
  document.getElementById("statstab").display = "none";
  document.getElementById("workerstab").display = "none";
  document.getElementById("optionstab").display = "none";
  document.getElementById("achievestab").display = "inline";
  document.getElementById("inftab").display = "none"; 
}

function showInfTab() {
  document.getElementById("statstab").display = "none";
  document.getElementById("workerstab").display = "none";
  document.getElementById("optionstab").display = "none";
  document.getElementById("achievestab").display = "none";
  document.getElementById("inftab").display = "inline";
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
  getMults();
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

function enforceMax() {
  if (Math.max(player.money, player.moneyMax) === player.money) {
    player.money = player.moneyMax;
    player.mps = 0;
  }
  
}
function getMPS() {
  player.mps = (player.dAmount * player.dMult) + ((player.sAmount * 10) * player.sMult) + ((player.mAmount * 100) * player.mMult);
}
getMPS();


function buyWorker(tier) {
  var level = TIER_NAMES[tier];
  if (player.money - player[level + "Cost"] >= 0) {
    player[level + "Amount"] ++;
    player.money -= player[level + "Cost"];
    player[level + "Cost"] = player[level + "Cost"] * 10
    getMPS();
  } 
}

function buyManyWorkers(tier) {
  var level = TIER_NAMES[tier];
  if (player.money - player[level + "TenCost"] >== 0) {
    for (var i = 0; i < 10; i++) {
      buyWorker(tier);
    }
  }
}





function display() {
  getMPS();
  
  player.nDMult = 2 * (Math.log10(player.money) ^ 2);
  player.nSMult = Math.log10(player.money) ^ 2;
  player.nMMult = (Math.log10(player.money) ^ 2) / 2;
  
  if (player.materialNum > 1) {
    var resetbtn = document.getElementById("resetbtn");
    resetbtn.style.display = "inline";
    
    var nDMult = document.getElementById("dMult");
    nDMult.innerHTML = formatValue(player.nDMult, 0);
  
    var nSMult = document.getElementById("sMult");
    nSMult.innerHTML = formatValue(player.nSMult, 0);
  
    var nMMult = document.getElementById("mMult");
    nMMult.innerHTML = formatValue(player.nMMult, 0);
  } 
  
  var dMult = document.getElementById("cDMult");
  dMult.innerHTML = "x" + formatValue(player.dMult, 0);
  
  var sMult = document.getElementById("cSMult");
  sMult.innerHTML = "x" + formatValue(player.sMult, 0);
  
  var mMult = document.getElementById("cMMult");
  mMult.innerHTML = "x" + formatValue(player.mMult, 0);
  

  var mps = document.getElementById("mps");
  mps.innerHTML = "You are getting " + formatValue(player.mps, 0) + " layers per second.";
  
  
  var money = document.getElementById("money");
  money.innerHTML = formatValue(player.money, 0);
  
  var qlds = document.getElementById("qlds");
  qlds.innerHTML = "You have " + formatValue(player.qld, 0) + " Quantum Layering Devices (QLD's).";
  
  var dCost = document.getElementById("dCost");
  dCost.innerHTML = "Cost: " + formatValue(player.dCost, 0);
  
  var dMax = document.getElementById("dMax");
  dMax.innerHTML = "Until 10. Cost: " + formatValue(player.dTenCost, 0);
  
  var dAmt = document.getElementById("dAmount");
  dAmt.innerHTML = formatValue(player.dAmount, 0);
  
  var sCost = document.getElementById("sCost");
  sCost.innerHTML = "Cost: " + formatValue(player.sCost, 0);
  
  var sMax = document.getElementById("sMax");
  sMax.innerHTML = "Until 10. Cost: " + formatValue(player.sTenCost, 0);
  
  var sAmt = document.getElementById("sAmount");
  sAmt.innerHTML = formatValue(player.sAmount, 0);
  
  var mCost = document.getElementById("mCost");
  mCost.innerHTML = "Cost: " + formatValue(player.mCost, 0); 
  
  var mMax = document.getElementById("mMax");
  mMax.innerHTML = "Until 10, Cost: " + formatValue(player.mTenCost, 0);
  
  var mAmt = document.getElementById("mAmount");
  mAmt.innerHTML = formatValue(player.mAmount, 0); 
  
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
  player.dCost = 10;
  player.sCost = 100;
  player.mCost = 1000;
  player.dTenCost = this.dCost * (10 ^ 10);
  player.sTenCost = this.sCost * (10 ^ 10);
  player.mTenCost = this.mCost * (10 ^ 10);
  player.dAmount = 0;
  player.sAmount = 0;
  player.mAmount = 0;
  player.dMult = 1;
  player.sMult = 1;
  player.mMult = 1;
  display();
  getMaterialWord();
  setMoneyMax();
}

function getMults() {
   if (player.materialNum > 1) {
     player.dMult = 2 * (Math.log10(player.money) ^ 2);
     player.sMult = Math.log10(player.money) ^ 2;
     player.mMult = (Math.log10(player.money) ^ 2) / 2;
     reset();
     player.resets --;
   }
}

function newMaterial() {
   if (player.money === player.moneyMax) {
     reset();
     var multbtn = document.getElementById("resetbtn");
     multbtn.display="inline"; 
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
  }
}



