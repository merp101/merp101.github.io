function loadMap(r,c) { //rows, columns
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
}
