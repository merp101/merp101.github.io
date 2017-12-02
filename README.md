# merp101.github.io
//This is for JS, HTML is in index.md

//   OBJECTS
// more achievements!
var player = {
  ach = ['r11', 'r12', 'r13','r14'];
  totalInfinities = 0;
  


//   NUMBERS
var currentLayers = 2
var displayLayerNum = currentLayers;
// the "press to double your layers"
if (mousePressed()) { 
  if currentLayers > 1 {
  currentLayers = currentLayers * 2 - 1;
  }
  else {
  currentLayers = currentLayers * 2;
  }
};
// The variable to display (scientific notation)
if var currentLayers >= 1000 {

  var displayLayerNum = Math.log10(currentLayers);
 } else {
  var displayLayerNum = currentLayers;
  }
}


//    ACHIEVEMENTS (after everything else)

if (currentLayers >= 2) {
  player.ach('r11') = true
  console.log(player.ach('r11'))

