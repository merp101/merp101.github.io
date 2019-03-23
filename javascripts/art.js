/*function loadMap(r,c) { //rows, columns
  var map = document.getElementById("map");
  for (r; r--; r>0) {
    let row = document.createElement("ul");
    row.style = "";
    map.appendChild("row");
    for (c; c--; c>0) {
      let column = document.createElement("li");
      column.style = "width: 10%; padding-top: 0.526316vh; padding-bottom: 0.526316vh; font-size: 1.71429vh; border: 5px solid black; text-shadow: rgb(251, 117, 63) 0px 0px 15px;";
      map.appendChild("column");
    }
  }
}*/

var generalArt = {
  player: "<u>\\o/</u>",
  enemy: "<u>x</u>",
}

var invArt = "_____________________________________________________________________________________ <br>|                    |                    |                    |                    | <br>|                    |                    |                    |                    | <br>|                    |                    |                    |                    | <br>|                    |                    |                    |                    | <br>|                    |                    |                    |                    | <br>|                    |                    |                    |                    | <br>|____________________|____________________|____________________|____________________| <br>|                    |                    |                    |                    | <br>|                    |                    |                    |                    | <br>|                    |                    |                    |                    | <br>|                    |                    |                    |                    | <br>|                    |                    |                    |                    | <br>|                    |                    |                    |                    | <br>|____________________|____________________|____________________|____________________| <br>|                    |                    |                    |                    | <br>|                    |                    |                    |                    | <br>|                    |                    |                    |                    | <br>|                    |                    |                    |                    | <br>|                    |                    |                    |                    | <br>|                    |                    |                    |                    | <br>|____________________|____________________|____________________|____________________| <br>|                    |                    |                    |                    | <br>|                    |                    |                    |                    | <br>|                    |                    |                    |                    | <br>|                    |                    |                    |                    | <br>|                    |                    |                    |                    | <br>|                    |                    |                    |                    | <br>|____________________|____________________|____________________|____________________| <br>";

var maps = { // (length x height) chars
  cave: [" ________________ ", // 18x5
         "/                \\", // the backslash is an escape character, it'll only output one
         "|                 ", // 
         "|                 ", // 
         "|_________________"], //
  caveEnemyPos: ["5,1","8,1"], //x,y
  caveDiff: 0,
  forest: [],
  desert: [],
}
         
