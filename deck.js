// deck.js — owner: DECK
// You decide what the cards look like. You do not decide the rules.

const CARD_BACK = "🦴";

function getFaces(pairs) {
  const faces = [
    "🐶",
    "🐱",
    "🐰",
    "🐹",
    "🐢",
    "🐠",
    "🐦",
    "🐭",
    "🦎",
    "🐍",
    "🐸",
    "🦔",
    "🦜",
    "🦀",
    "🐌",
    "🦐",
    "🦆",
    "🐔",
    "🦋",
    "🐞",
    "🦗",
  ];

  return faces.slice(0, pairs);
}
