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
  totalMoney: new Decimal(0),
  materialNum: 0,
  material: "",
  options: {
    notation: "scientific",
    
  }
}

//   NUMBERS
  
// The variable to display (logarithmic notation)

if (player.money >= 1000) {
   var displayLayerNum = Math.log10(player.money);
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
  
//   HTML EDITING
  
var displayLayers = function() {
  player.money = player.money * 2;
  document.getElementById("money").innerHTML(player.money);
}
document.getElementById("new-clay-button").onclick = function() {
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

button.addEventListener("click", layerButton);
  // still WIP
var dWorkerButton =     
  document.getElementById("dButton");
  d-button.addEventListener("click", 
  d-button); 



var displayCurrentDWorkers = document.getElementById("currentDWorkers");
displayCurrentDWorkers.innerHTML(player.dAmount);

var displayMaterial = document.getElementById("material");
displayMaterial.innerHTML(player.material);

// Loading cuz... reasons
  
 function onLoad() {
   
   if (player.totalMoney === undefined || isNaN(player.totalMoney)) player.totalMoney = player.Money;
   if (player.infinitied === undefined) player.infinitied = 0;
  
 }
