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
}
  
//   GLOBAL VARIABLES

var displayLayerNum = player.money;

//   NUMBERS
  
// The variable to display (logarithmic notation)

if var currentLayers >= 1000 {
  var displayLayerNum = Math.log10(player.money);
} 


//    ACHIEVEMENTS (after everything else, don't do it now until we have ideas and know how to implement them)

if (currentLayers >= 2) {
  player.ach('r11') = true
  console.log(player.ach('r11'))

