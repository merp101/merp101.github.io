# Infinite Layers
## You have a block of clay.
### You have x layers.
<p>Click the button to play with your block of clay.</p>

<!--change to a variable, that once you click once, changes the text (story stuff here too, maybe? change block of clay to varMat (material) so it's consistent.--->

<button id="double-button">
  Play with some clay
</button> <!-- can be changed --->

<script> 
 
  var button = document.getElementById("double-button");
  var onButtonClick = function() {
    clickerButton.textContent += "Clicked";
  clickerButton.addEventListener("click", onButtonClick)

  </script>
  
