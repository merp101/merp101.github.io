# merp101.github.io
//This is for JS, HTML is in index.md - and don't change the name of the file, it won't work

//   OBJECTS

// more achievements!
var player = {
  money: new Decimal(1),
  dCost: new Decimal(10),
  sCost: new Decimal(100),
  mCost: new Decimal(1000),
  dAmount: new Decimal(0),
  sAmount: new Decimal(0),
  mAmount: new Decimal(0),
  dBought: 0,
  sBought: 0,
  mBought: 0,
  achievements: [],
  infinited: 0,
  qld: new Decimal(0),
  totalTimePlayed: 0,
  totalMoney: new Decimal(0)
}
  
//   GLOBAL VARIABLES

var displayLayerNum = player.money;

//   NUMBERS
  
// The variable to display (logarithmic notation)

if (player.money >= 1000) {
  displayLayerNum = Math.log10(player.money);
} 


//   ACHIEVEMENTS (after everything else, don't do it now until we have ideas and know how to implement them)

if (currentLayers >= 2) {
  player.ach('r11') = true
  console.log(player.ach('r11'))

  
//   SAVES
  
  function set_save(name, value) {
    localStorage.setItem(name, btoa(JSON.stringify(value, function(k, v) { return (v === Infinity) ? "Infinity" : v; })))
}

function get_save(name) {
    if (localStorage.getItem("dimensionSave") !== null) {
        return JSON.parse(atob(localStorage.getItem(name), function(k, v) { return (v === Infinity) ? "Infinity" : v; }))
    }
}
 
  
//   HTML EDITING
  
var layerButton = function() {
    player.money = player.money * 2;
    return player.money;
  }
    
  var doubleLayers = function() {
    button.addEventListener("click", layerButton);
  }

  var d-button = function() {
 document.getElementById("d_workerCost").textContent = d-workerCost;
 d-workerAmt ++;
}

var dWorkerButton =     
  document.getElementById("d-button");
  d-button.addEventListener("click", 
  d-button); 

var displayCurrentLayers = document.getElementById("displayLayers");
displayLayers.innerHTML(displayLayerNum);

var displayCurrentDWorkers = document.getElementById("currentDWorkers");
displayCurrentDWorkers.innerHTML(d-workerAmt);

var displayNextMaterial = document.getElementById("new-clay-button");
displayNextMaterial.innerHTML("Reset your progress to get a tougher material, in order to increase the maximum layers you can have. Next material: " + nextMaterial);

  
 function onLoad() {
   
   if (player.totalMoney === undefined || isNaN(player.totalMoney)) player.totalMoney = player.Money;
    if (player.options === undefined) {
        player.options = {
            scientific: false,
        }
    }
   if (player.infinitied === undefined) player.infinitied = 0;
  
 }
