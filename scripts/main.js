/* jshint esversion: 6 */

const CARD_TABLE = document.getElementById("card-table");
// TODO: Change CARD_AMOUNT to let and make the grid creation allow for larger games.
let last_click = false;
const CARD_AMOUNT = 16;
const ICONS = ['orange fas fa-basketball-ball orange', 'fas fa-bicycle teal', 'fas fa-bomb red', 'fas fa-bolt yellow', 'fas fa-frog green', 'fas fa-football-ball black', 'fas fa-beer magenta', 'fas fa-dice pink'];

function getRandomInt(min, max) {
  //from MDN Documentation
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function game() {
  x = this;
  if (!last_click) {
    last_click = this;
    this.removeEventListener("click", game);
    return 0;
  }
  if (this.firstElementChild.className == last_click.firstElementChild.className) {
    this.style.background = 'green';
    last_click.style.background = 'green';
    this.removeEventListener("click", game);
  } else {
    let y = last_click;
    last_click.addEventListener("click", game);
    this.style.background = 'red';
    last_click.style.background = 'red';
    last_click = false;
    // TODO: bug where clicking fast will mess everything up
    setTimeout(function() {
      x.style.background = 'blue';
      y.style.background = 'blue';

    }, 500);
    //  setTimeout(this.style.background = '#f5f5f5', 2000);
  }
  last_click = false;
}

function match() {

}

function mismatch() {

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
    card.className = 'card';
    card.addEventListener("click", game);
    card.append(icon);
    fragment.append(card); //appends card to the fragment
  }
  CARD_TABLE.append(fragment); //add the cards to the grid layout
}
makeGrid();