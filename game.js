//This is for JS, HTML is in index.md - and don't change the name of the file, it won't work.

// more achievements!
var player = {
  money: 10,
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
Math.min(player.money, 0);

function setTheme(name) {
    document.querySelectorAll("link").forEach( function(e) {
        if (e.href.includes("theme")) e.remove();
    });

    if(name === undefined) {
        document.getElementById("theme").innerHTML="Current theme: Normal";
    } else if(name === "S1") {
        document.getElementById("theme").innerHTML="Current theme: " + secretThemeKey;
    } else if(name === "S2") {
        document.getElementById("theme").innerHTML="Current theme: " + secretThemeKey;
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
    player.material = "clay";
  } else if (player.materialNum === 1) {
    player.material = "copper";
  } else if (player.materialNum === 2) {
    player.material = "tin";
  } else if (player.materialNum === 3) {
    player.material = "bronze";
  } else if (player.materialNum === 4) {
    player.material = "iron";
  } else if (player.materialNum === 5) {
    player.material = "steel";
  } else if (player.materialNum === 6) {
    player.material = "silver";
  } else if (player.materialNum === 7) {
    player.material = "gold";
  } else if (player.materialNum === 8) {
    player.material = "platinum";
  } else if (player.materialNum === 9) {
    player.material = "diamond";
  }
  
}  

function getMPS() {
  player.mps = (player.dAmount) + (player.sAmount * 10) + (player.mAmount * 100);
}



function getDMaxCost() {
  player.dMaxCost = Math.floor(player.money / player.dCost);
  player.dMaxAmt = player.dMaxCost / 10;  
}

function getSMaxCost() {
  player.sMaxCost = Math.floor(player.money / player.sCost);
  player.sMaxAmt = player.sMaxCost / 100;
}

function getMMaxCost() {
  player.mMaxCost = Math.floor(player.money / player.mCost);
  player.mMaxAmt = player.sMaxCost / 1000;
}

function buyDWorker() {
  player.dAmount ++;
  player.money = player.money - player.dCost;
  player.dCost = player.dCost * 10
  getMPS();
}

function buyMaxD() {
  getDMaxCost();
  player.dAmount += player.dMaxAmt;
  player.money = player.money - player.dMaxCost;
  player.dCost = player.dCost * (player.dMaxAmt * 10);
  getMPS();
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
  document.getElementById("mps").innerHTML("You are getting " + player.mps + " layers per second.");
  document.getElementById("money").innerHTML(player.money);
  document.getElementById("dCost").innerHTML(player.dCost);
  document.getElementById("dMax").innerHTML(player.dMaxCost);
  document.getElementById("dAmount").innerHTML(player.dAmount);
  document.getElementById("sCost").innerHTML(player.sCost);
  document.getElementById("sMax").innerHTML(player.sMaxCost);
  document.getElementById("sAmount").innerHTML(player.sAmount);
  document.getElementById("mCost").innerHTML(player.mCost); 
  document.getElementById("mMax").innerHTML(player.mMaxCost);
  document.getElementById("mAmount").innerHTML(player.mAmount);  
}

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
  getDMaxCost();
  getSMaxCost();
  getMMaxCost();
  getMaterialWord();
}

function infinity() {
  reset();
  player.qld ++;
  player.infinitied ++;
  player.materialNum = 0;
  player.resets = 0;
}

function update() {
  display();
  getMaterialWord();
}
