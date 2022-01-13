//Delayed execution with browser event
//"use strict";
document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("#gameboard").addEventListener("click", markField);
  var current = 0,
    players = ["x", "o"];

  function markField(e) {
    var field = e.target;
    field.setAttribute("aria-label", players[current]);
    field.setAttribute("disabled", "disabled");
    current = 1 - current; //the player changes
    document.querySelector("#hint").innerText =
      "next player: " + players[current];
  }

  function checkIfCompleted() {
    var fields = document.querySelectorAll("#gameboard button"), // fields is the list of our fields
      full = true; // we assume that all cells have been used
    console.log("full initial= ", full);
    // all fields marked?
    for (var i = 0; i < fields.length; i++) {
      if (!fields[i].hasAttribute("disabled")) {
        full = false;
      }
    }
    // if full, then game over, if not full, then not yet
    if (full) {
      console.log("full = ", full, "plin");
      // game over because all fields are occupied
      document.querySelector("#hint").innerText =
        "The game is over because all the fields are occupied";
      document.querySelector("#hint").className = "warning";
    }
  }
});
