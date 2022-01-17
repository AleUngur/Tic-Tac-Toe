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
    displayResult();
  }

  function getWinner() {
    var fields = document.querySelectorAll("#gameboard button"),
      full = true; // we assume that all cells have been used
    for (var i = 0; i < fields.length; i++) {
      if (!fields[i].hasAttribute("disabled")) {
        full = false;
      }
    }
    if (full) {
      // game over
      return true;
    }
    // determine winners
    for (i = 0; i < 3; i++) {
      if (checkIfEquals(0 + i, 3 + i, 6 + i)) {
        winner = fields[0 + i].getAttribute("aria-label");
        highlightCells([fields[0 + i], fields[3 + i], fields[6 + i]]);
      } else if (checkIfEquals(i * 3, i * 3 + 1, i * 3 + 2)) {
        winner = fields[i * 3].getAttribute("aria-label");
        highlightCells([fields[i * 3], fields[i * 3 + 1], fields[i * 3 + 2]]);
      } else if (checkIfEquals(0, 4, 8)) {
        winner = fields[0].getAttribute("aria-label");
        highlightCells([fields[0], fields[4], fields[8]]);
      } else if (checkIfEquals(2, 4, 6)) {
        winner = fields[2].getAttribute("aria-label");
        highlightCells([fields[2], fields[4], fields[6]]);
      }
    }
    //we have a winner
    return winner;
  }

  function displayResult() {
    // Game over?
    if (getWinner()) {
      finished = true;
      if (getWinner() == "X" || getWinner() == "O") {
        hint.innerText =
          "The game is over because player " + getWinner() + " won!";
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
      return true;
    } else return false;
  }

  function highlightCells(cells) {
    for (var i = 0; i < 3; i++) {
      cells[i].classList.add("highlighted");
    }
  }
});
