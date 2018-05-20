/* jshint esversion: 6 */

const CARD_TABLE = document.getElementById("card-table");
// TODO: Change CARD_AMOUNT to let and make the grid creation allow for larger games.
const CARD_AMOUNT = 16;
const ICONS = ['fas fa-basketball-ball', 'fas fa-bicycle', 'fas fa-bomb', 'fas fa-bolt', 'fas fa-frog', 'fas fa-football-ball', 'fas fa-beer', 'fas fa-dice'];

function getRandomInt(min, max) {
  //from MDN Documentation
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeGrid() {
  //TODO: remove all children from the table
  //2 copies of the ICONS array sliced for the amount of cards the game will use
  let icons = [...ICONS.slice(0, (CARD_AMOUNT / 2)), ...ICONS.slice(0, (CARD_AMOUNT / 2))];
  // TODO: just make an array that concats itself
  //storing the cards in a document fragment to be pushed all at once instead of manipulating the dom in the loops
  let fragment = document.createDocumentFragment();
  for (let i = CARD_AMOUNT; i > 0; i--) {
    let icon = document.createElement("i");
    icon.className = icons.splice(getRandomInt(0, i - 1), 1)[0];
    let card = document.createElement("div");
    card.append(icon);
    fragment.append(card); //appends card to the fragment
  }
  CARD_TABLE.append(fragment); //add the cards to the grid layout
}
makeGrid();