// ui.js — owner: TABLE
// You decide what players see and click. You never change the rules.

const tableEl = document.getElementById("table");
const statusEl = document.getElementById("status");
const messageEl = document.getElementById("message");
const MOVES_PER_PAIR = 3;
let messageTimer = null;

function getMoveLimit() {
  return PAIRS * MOVES_PER_PAIR;
}

function getMovesLeft() {
  return Math.max(getMoveLimit() - state.moves, 0);
}

function showMessage(text) {
  messageEl.textContent = text;
  messageEl.className = "show";

  if (messageTimer !== null) {
    clearTimeout(messageTimer);
  }

  messageTimer = setTimeout(function () {
    messageEl.textContent = "";
    messageEl.className = "";
  }, 1200);
}

function render() {
  tableEl.innerHTML = "";

  state.cards.forEach(function (card, index) {
    const button = document.createElement("button");
    button.className = "card";
    if (card.flipped || card.matched) {
      button.textContent = card.face;
    } else {
      button.textContent = CARD_BACK;
    }
    button.addEventListener("click", function () {
      handleClick(index);
    });
    tableEl.appendChild(button);
  });

  // TODO T2: Show the number of moves and matches in statusEl.
  statusEl.textContent =
    "Moves left: " + getMovesLeft() + " | Matches: " + state.matches + " of " + PAIRS;

  // TODO T3: When isWon() is true, show a win message with the move count.
}

function handleClick(index) {
  const result = pickCard(index);
  render();
  if (result === "match") {
    showMessage("Wild match! Nice animal instincts!");
  }
  if (result === "miss") {
    setTimeout(function () {
      hideMiss();
      render();
    }, 800);
  }
}

// TODO T3: Add a "New game" button to index.html. When it's clicked,
// call newGame(PAIRS) and then render().

newGame(PAIRS);
render();
