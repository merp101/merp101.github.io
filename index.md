# Infinite Layers
## You have a block of clay.
### You have x layers.
<p>Click the button to play with your block of clay.</p>

<!--change to a variable, that once you click once, changes the text (story stuff here too, maybe? change block of clay to varMat (material) so it's consistent.--->

<button id="double-button">
  Play with some clay
</button> <!-- can be changed --->

<button id="d_worker-button">
 Hire a depressed worker   10 layers
 </button>
 
 <button id="s_worker-button">
 Hire a satisfied worker
 </button>
 
 <button id="new-clay-button">
 Reset your progress to get a tougher material, in order to increase the maximum layers you can have.
 </button>
 
<script> 
 
  var button = document.getElementById("button");
  clickerButton.addEventListener("click", function() {
    document.getElementById("button").textContent += "Clicked";
    });
   
  </script>
  
