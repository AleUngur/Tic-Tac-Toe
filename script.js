"use strict"; //With strict mode, you can not use undeclared variables
//Delayed execution with browser event:
document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("#gameboard").addEventListener("click", markField);
  var current = 0,
    players = ["X", "O"],
    winner,
    finished, // game-over flag;
    fields = document.querySelectorAll("#gameboard button"), // the squares
    hint = document.querySelector("#hint");

  function markField(e) {
    var field = e.target;
    field.setAttribute("aria-label", players[current]);
    field.setAttribute("disabled", "disabled");
    current = 1 - current;
    hint.innerText = "Next is: " + players[current];
    checkIfCompleted();
  }

  function checkIfCompleted() {
    var fields = document.querySelectorAll("#gameboard button"), // fields is the list of our fields
      full = true; // we assume that all cells have been used
    // all fields marked?
    for (var i = 0; i < fields.length; i++) {
      if (!fields[i].hasAttribute("disabled")) {
        full = false;
      }
    }
    // if full then game over, if not full then not yet
    if (full) {
      full = true;
    }
    // determine winners
    for (i = 0; i < 3; i++) {
      // 3 vertical
      checkIfEquals(0 + i, 3 + i, 6 + i);
      // 3 horizontal
      checkIfEquals(i * 3, i * 3 + 1, i * 3 + 2);
      // diagonally top left to bottom right
      checkIfEquals(0, 4, 8);
      // diagonally top right to bottom left
      checkIfEquals(2, 4, 6);
    }
    // Game over?
    if (full || winner) {
      finished = true;
      if (winner == "X" || winner == "O") {
        hint.innerText = "The game is over because player " + winner + " won!";
        hint.className = "success";
      } else {
        // Game over because all fields are occupied
        hint.innerText =
          "The game ends in a draw because all fields are occupied.";
      }
      //new game?
      var newGame = confirm("New game?", "");
      if (newGame == true) {
        location.reload();
        return false;
      }
    }
  }

  function checkIfEquals(x, y, z) {
    if (
      fields[x].getAttribute("aria-label") != "" &&
      fields[x].getAttribute("aria-label") ==
        fields[y].getAttribute("aria-label") &&
      fields[y].getAttribute("aria-label") ==
        fields[z].getAttribute("aria-label")
    ) {
      // we have a winner!
      winner = fields[x].getAttribute("aria-label");
      highlightCells([fields[x], fields[y], fields[z]]);
    }
  }

  function highlightCells(cells) {
    for (var i = 0; i < 3; i++) {
      cells[i].classList.add("highlighted");
    }
  }
});
