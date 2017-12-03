<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  

  <style>
   body {
    font: sans-serif;
    text-align: center;
  }
  #logo {
   color: rgb(0,150,250);
   font-size: 100px;
    margin: 5px;
  }
   #materialDisplay {
    color: rgb(255, 100, 100);
    font-size: 40px;
    margin: 5px;
  }
  #currentLayers {
    font-size: 30px
    marign: 5px
  }
   #button {
    background-color: rgb(0,0,0);
    color: rgb(255, 255, 255);
    font-size: 15px;
  }
   #d_worker-button {
    background-color: rgb(0,0,0);
    color: rgb(255,255,255);
    font-size: 15px;
  }
   #s_worker-button {
    background-color: rgb(0,0,0);
    color: rgb(255,255,255);
    font-size: 15px;
   }
   #new-clay-button {
     background-color: rgb(100,100,100);
     color: rgb(255, 200, 255);
    }
  </style>

  </head>
   <body>
    <h1 id="logo"> Infinite Layers </h1>
    <h2 id="materialDisplay"> You have a block of clay. </h2>
    <h3 id="currentLayers"> You have <span id="displayLayers">currentLayers</span> layers. </h3>
    
    <button id="button">
    Play with some clay
    </button> <!-- can be changed --->
    
    <p>Click the button to play with your block of clay.</p>

<!--change to a variable, that once you click once, changes the text (story stuff here too, maybe? change block of clay to varMat (material) so it's consistent.--->



    <button id="d_worker-button">
    Hire a depressed worker for 10 layers
    </button>
     <p id="currentDWorkers">How many depressed workers you have</p>

    <button id="s_worker-button">
    Hire a satisfied worker
    </button>
    <p id="currentSWorkers">How many satsfied workers you have</p> 

    <button id="new-clay-button">
     Reset your progress to get a tougher material, in order to <div>increase the maximum layers you can have. Next material: iron</div>
    </button>
 
  <script> 
 

  var d-button = function() {
 document.getElementById("d_worker-button").textContent = "Hire a depressed worker for" + d-workerCost + "layers.";
 var d-workerAmt ++;
}

  

var dWorkerButton =     
  document.getElementById("d-button");
  d_worker-button.addEventListener("click", 
  d-button); 

var displayCurrentLayers = document.getElementById("displayLayers");
displayLayers.innerHTML("You have " + currentLayers + "layers.");

var displayCurrentDWorkers = document.getElementById("currentDWorkers");
displayCurrentDWorkers.innerHTML("You have " + d-workerAmt + " depressed workers.");

var displayNextMaterial = document.getElementById("new-clay-button");
displayNextMaterial.innerHTML("Reset your progress to get a tougher material, in order to increase the maximum layers you can have. Next material: " + nextMaterial);


  </script>
  
</body>
</html>
