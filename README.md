# merp101.github.io
var currentLayers = 1;
// the "press to double your layers"
if mousePressed() { 
  if currentLayers > 1 {
  currentLayers = currentLayers * 2 - 1;
  }
  else {
  currentLayers = currentLayers *2;
  }
};
// The variable to display (scientific notation)
if var currentLayers >= 1000 {
  var displayLayerNum = log10(currentLayers);
  else {
  var displayLayerNum = currentLayers;
  }
};
  
