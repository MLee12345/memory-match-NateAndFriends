// ui.js — owner: TABLE
// You decide what players see and click. You never change the rules.

const tableEl = document.getElementById("table");
const statusEl = document.getElementById("status");
const messageEl = document.getElementById("message");
const CARD_LEVELS = [16, 28, 36, 40];
const MOVES_PER_PAIR = 3;
let currentLevel = 0;
let messageTimer = null;

function getCurrentPairs() {
  return CARD_LEVELS[currentLevel] / 2;
}

function getMoveLimit() {
  return getCurrentPairs() * MOVES_PER_PAIR;
}

function getMovesLeft() {
  return Math.max(getMoveLimit() - state.moves, 0);
}

function startCurrentLevel() {
  newGame(getCurrentPairs());
  render();
}

function startNextLevel() {
  if (currentLevel < CARD_LEVELS.length - 1) {
    currentLevel += 1;
    startCurrentLevel();
  }
}

function getGridColumns(cardCount) {
  if (cardCount <= 16) {
    return 4;
  }
  if (cardCount <= 28) {
    return 7;
  }
  if (cardCount <= 36) {
    return 6;
  }
  return 8;
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
  tableEl.dataset.level = currentLevel + 1;
  tableEl.dataset.cards = state.cards.length;
  tableEl.style.setProperty("--card-columns", getGridColumns(state.cards.length));

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
    "Moves left: " +
    getMovesLeft() +
    " | Matches: " +
    state.matches +
    " of " +
    getCurrentPairs();

  // TODO T3: When isWon() is true, show a win message with the move count.
}

function handleClick(index) {
  const result = pickCard(index);
  render();
  if (result === "match") {
    showMessage("Wild match! Nice animal instincts!");
    if (isWon()) {
      setTimeout(startNextLevel, 800);
    }
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

startCurrentLevel();
