/* jshint esversion: 6 */

const CARD_TABLE = document.getElementById("card-table");
// TODO: Change CARD_AMOUNT to let and make the grid creation allow for larger games.
const CARD_AMOUNT = 16;
let last_click = false;
const ICONS = ['fas fa-basketball-ball pic', 'fas fa-bicycle pic', 'fas fa-bomb pic', 'fas fa-bolt pic', 'fas fa-frog pic', 'fas fa-football-ball pic', 'fas fa-beer pic', 'fas fa-dice pic'];

function getRandomInt(min, max) {
  //from MDN Documentation
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function game(event) {
  let card = event.target;
  if (card.classList.contains('pic')) {
    card = card.parentElement;
  }
  card.firstElementChild.style.display = 'initial';
  if (card.classList.contains('card') && card != last_click) {
    if (!last_click) {
      last_click = card;

      return 0;
    }

    if (card.firstElementChild.className == last_click.firstElementChild.className) {
      card.classList.add('match', 'animated', 'tada');
      last_click.classList.add('match', 'animated', 'tada');
      last_click = false;
    } else {
      card.classList.add('mismatch', 'animated', 'wobble');
      last_click.classList.add('mismatch', 'animated', 'wobble');

      CARD_TABLE.removeEventListener('click', game);
      setTimeout(function() {
        card.firstElementChild.style.display = 'none';
        last_click.firstElementChild.style.display = 'none';
        card.classList.remove('mismatch', 'animated', 'wobble');
        last_click.classList.remove('mismatch', 'animated', 'wobble');
        last_click = false;
        CARD_TABLE.addEventListener('click', game);
      }, 1000);
    }
  }


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
    card.append(icon);
    fragment.append(card); //appends card to the fragment
  }
  CARD_TABLE.append(fragment); //add the cards to the grid layout
}
makeGrid();
CARD_TABLE.addEventListener('click', game);