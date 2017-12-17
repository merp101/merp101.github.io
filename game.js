//This is for JS, HTML is in index.md - and don't change the name of the file, it won't work.

// more achievements!
var player = {
  money: 10,
  moneyMax: undefined,
  mps: 0,
  dCost: 10,
  sCost: 100,
  mCost: 1000,
  dMaxCost: 10,
  sMaxCost: 100,
  mMaxCost: 1000,
  dMaxAmt: 0,
  sMaxAmt: 0,
  mMaxAmt: 0,
  dAmount: 0,
  sAmount: 0,
  mAmount: 0,
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
    
  }
}

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
  
//   Stuff
  


function onLoad() {
  if (player.money === undefined || player.money === NaN) player.money = 10;
  if (player.options.notation === undefined) player.options.notation = "scientific";
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
    player.moneyMax = 1000000;
  } else if (player.material === "steel") {
    player.moneyMax = 10000000;
  } else if (player.material === "silver") {
    player.moneyMax = 100000000;
  } else if (player.material === "gold") {
    player.moneyMax = 1000000000;
  } else if (player.material === "platinum") {
    player.moneyMax = 10000000000;
  } else if (player.material === "diamond") {
    player.moneyMax = 9999999999999;
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
  player.mps = (player.dAmount) + (player.sAmount * 10) + (player.mAmount * 100);
}
getMPS();


function getDMaxCost() {
  player.dMaxCost = Math.floor(player.money / player.dCost);
  player.dMaxAmt = Math.floor(player.dMaxCost / 10);  
}

function getSMaxCost() {
  player.sMaxCost = Math.floor(player.money / player.sCost);
  player.sMaxAmt = Math.floor(player.sMaxCost / 100);
}

function getMMaxCost() {
  player.mMaxCost = Math.floor(player.money / player.mCost);
  player.mMaxAmt = Math.floor(player.sMaxCost / 1000);
}

function buyDWorker() {
  if (player.money - player.dCost >= 0) {
    player.dAmount ++;
    player.money -= player.dCost;
    player.dCost = player.dCost * 10
    getMPS();
  }
}

function buyMaxD() {
   getDMaxCost();
  if (player.money - player.dMaxCost >= 0) { 
    player.dAmount += player.dMaxAmt;
    player.money -= player.dMaxCost;
    player.dCost = player.dCost * (player.dMaxAmt * 10);
    getMPS();
  }
}

function buySWorker() {
  player.sAmount ++;
  player.money = player.money - player.sCost;
  player.sCost = (player.sCost * 100);
  getMPS();
}

function buyMaxS() {
  getSMaxCost();
  player.sAmount += player.sMaxAmt;
  player.money = player.money - player.sMaxCost;
  player.sCost = player.sCost * (player.sMaxAmt * 100);
  getMPS();
}
  

function buyMWorker() {
  player.mAmount ++;
  player.money = player.money - player.mCost;
  player.mCost = player.mCost * 1000
  getMPS();
}

function buyMaxM() {
  getMMaxCost();
  player.mAmount += player.mMaxAmt;
  player.money = (player.money - player.mCost);
  player.mCost = player.mCost * (player.mMaxAmt * 1000);
  getMPS();
}
  
  


function display() {
  getMPS();
  getDMaxCost();
  getSMaxCost();
  getMMaxCost();
  
  var mps = document.getElementById("mps");
  mps.innerHTML = "You are getting " + player.mps + " layers per second.";
  
  var money = document.getElementById("money");
  money.innerHTML = player.money;
  
  var qlds = document.getElementById("qlds");
  qlds.innerHTML = "You have " + player.qld + " Quantum Layering Devices (QLD's).";
  
  var dCost = document.getElementById("dCost");
  dCost.innerHTML = "Cost: " + player.dCost;
  
  var dMax = document.getElementById("dMax");
  dMax.innerHTML = "Max buy. Buying: " + player.dMaxAmt + ". Cost: " + player.dMaxCost;
  
  var dAmt = document.getElementById("dAmount");
  dAmt.innerHTML = player.dAmount;
  
  var sCost = document.getElementById("sCost");
  sCost.innerHTML = "Cost: " + player.sCost;
  
  var sMax = document.getElementById("sMax");
  sMax.innerHTML = "Max buy. Buying: " + player.sMaxAmt + ". Cost: " + player.sMaxCost ;
  
  var sAmt = document.getElementById("sAmount");
  sAmt.innerHTML = player.sAmount;
  
  var mCost = document.getElementById("mCost");
  mCost.innerHTML = "Cost: " + player.mCost; 
  
  var mMax = document.getElementById("mMax");
  mMax.innerHTML = "Max buy. Buying: " + player.mMaxAmt + ". Cost: " + player.mMaxCost;
  
  var mAmt = document.getElementById("mAmount");
  mAmt.innerHTML = player.mAmount;  
}
display();

function reset() {
  player.resets ++;
  player.money = 10;
  player.dAmount = 0;
  player.sAmount = 0;
  player.mAmount = 0;
  player.dCost = 10;
  player.sCost = 100;
  player.mCost = 1000;
  player.mps = 0;
  player.dMaxCost = 10;
  player.dMaxAmt = 0;
  player.sMaxCost = 100;
  player.sMaxAmt = 0;
  player.mMaxCost = 1000;
  player.mMaxAmt = 0;
  display();
  getMaterialWord();
}

function newMaterial() {
   if (player.money === player.moneyMax) {
     reset();
     getMaterialWord();
   }  
}

function infinity() {
  reset();
  player.qld ++;
  player.infinitied ++;
  player.materialNum = 0;
  player.resets = 0;
}

function showInf() {
  if (player.money === player.moneyMax && player.material === "diamond") {
    document.getElementById("infButton").display = "visible";
    document.getElementById("qlds").display = "visible";
  }
}
