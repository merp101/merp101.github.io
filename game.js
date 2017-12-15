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
  infinited: 0,
  qld: 0,
  totalTimePlayed: 0,
  totalMoney: 0,
  materialNum: 0,
  material: "",
  options: {
    notation: "scientific",
    
  }
}
  

  
//   Stuff
  
var getMaterialWord = function() {
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
  document.getElementById("material").innerHTML(player.material)
}  


var getDMaxCost = function() {
  player.dMaxCost = Math.floor(player.money / player.dCost);
  player.dMaxAmt = player.dMaxCost / 10;  
}

var getSMaxCost = function() {
  player.sMaxCost = Math.floor(player.money / player.sCost);
  player.sMaxAmt = player.sMaxCost / 100;
}

var getMMaxCost = function() {
  player.mMaxCost = Math.floor(player.money / player.mCost);
  player.mMaxAmt = player.sMaxCost / 1000;
}

var buyDWorker = function() {
  player.dAmount ++;
  player.money = player.money - player.dCost;
  player.dCost = player.dCost * 10
}

var buyMaxD = function() {
  player.dAmount += (player.dMaxCost / 10);
  player.money = player.money - player.dMaxCost
}
var buySWorker = function() {
  player.sAmount ++;
  player.money = player.money - player.sCost;
  player.sCost = (player.sCost * 100);
}

var buyMaxS = function() {
  player.sAmount += (player.sMaxCost / 100);
  player.money = player.money - player.sMaxCost;
}
  

var buyMWorker = function() {
  player.mAmount ++;
  player.money = player.money - player.mCost;
  player.mCost = player.mCost * 1000
}

var buyMaxM = function() {
  player.mAmount += (player.mMaxCost / 1000);
  player.money = (player.money - player.mCost);
  player.mCost
var getMPS = function() {
  player.mps = (this.dAmount) + (this.sAmount * 10) + (this.mAmount * 100);
}


var display = function() {
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

var reset = function() {
  player.money = 10;
  player.dAmount = 0;
  player.sAmount = 0;
  player.mAmount = 0;
  player.dCost = 10;
  player.sCost = 100;
  player.mCost = 1000;
}

var infinity = function() {
  reset();
  player.qld ++;
  player.infinitied ++;
  player.materialNum = 0;
}

var update = function() {
  display();
  decideMaterialWord();
}
