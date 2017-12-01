# merp101.github.io
//This is for HTML, formatting the page! Nothing else here!





//   OBJECTS
// more achievements!
var player = {
  ach = ['A single layer... how sad', 'more achievements'];
  totalInfinities = 0;
  





//   NUMBERS

var currentLayers = 1;
var displayLayerNum = currentLayers;
// the "press to double your layers"
if (mousePressed()) { 
  if currentLayers > 1 {
  currentLayers = currentLayers * 2 - 1;
  }
 } else {
  currentLayers = currentLayers *2;
  }
}
// The variable to display (scientific notation) 
if var currentLayers >= 1000 {
  var displayLayerNum = Math.log10(currentLayers);
 } else {
  var displayLayerNum = currentLayers;
  }
}
// Visual boxes to click, or show currentLayers or QLDS? add

//
