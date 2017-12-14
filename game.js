//This is for JS, HTML is in index.md - and don't change the name of the file, it won't work.

// more achievements!
var player = {
  money: 10,
  mps: 0,
  dCost: 10,
  sCost: 100,
  mCost: 1000,
  dAmount: 0,
  sAmount: 0,
  mAmount: 0,
  dBought: 0,
  sBought: 0,
  mBought: 0,
  achievements: [],
  infinited: 0,
  qld: 0,
  totalTimePlayed: 0,
  totalMoney: 0),
  materialNum: 0,
  material: "",
  options: {
    notation: "scientific",
    
  }
}
  
//   SAVES
  
  function set_save(name, value) {
    localStorage.setItem(name, btoa(JSON.stringify(value, function(k, v) { return (v === Infinity) ? "Infinity" : v; })))
}

function get_save(name) {
    if (localStorage.getItem("dimensionSave") !== null) {
        return JSON.parse(atob(localStorage.getItem(name), function(k, v) { return (v === Infinity) ? "Infinity" : v; }))
    }
}
 
function load_game() {
    var save_data = get_save('dimensionSave');
    if (!save_data) return;
    player = save_data;
    onLoad()
}


function save_game() {
    set_save('dimensionSave', player);
} 
  
//   Stuff
  
var decideMaterialWord = function() {
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
  document.getElementById("material").textContent(player.material);
}  

var buyDWorker = function() {
  player.dBought ++;
  player.dAmount ++;
  player.money = player.money - player.dCost;
  player.dCost = player.dCost * 10
}

var buySWorker = function() {
  player.sBought ++;
  player.sAmount ++;
  player.money = player.money - player.sCost;
  player.sCost = player.sCost * 100
}

var buyMWorker = function() {
  player.mBought ++;
  player.mAmount ++;
  player.money = player.money - player.mCost;
  player.mCost = player.mCost * 1000
}

var getMPS = function() {
  player.mps = (this.dAmount) + (this.sAmount * 10) + (this.mAmount * 100);
}

var displayLayers = function() {
  getMPS();
  document.getElementById("mps").innerHTML("You are getting " + player.mps + " layers per second.");
}
                                           
var infinity = function() {
  player.money = 10;
  player.dBought = 0;
  player.sBought = 0;
  player.mBought = 0;
  player.dAmount = 0);
  player.sAmount = 0);
  player.mAmount = 0);
  player.dCost = 10;
  player.sCost = 100;
  player.mCost = 1000;
  player.qld ++;
  player.infinitied ++;
  player.materialNum = 0;
}

var update = function() {
  displayLayers();
  decideMaterialWord();
}


// Loading cuz... reasons
  
 function onLoad() {
   
   if (player.totalMoney === undefined || isNaN(player.totalMoney)) player.totalMoney = player.Money;
   if (player.infinitied === undefined) player.infinitied = 0;
   if (player.options.notation === undefined) player.options.notation = "scientific";
  
 }
