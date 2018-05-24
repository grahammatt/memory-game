/* jshint esversion: 6 */

const CARD_TABLE = document.getElementById("card-table");
// TODO: Change CARD_AMOUNT to let and make the grid creation allow for larger games.
const CARD_AMOUNT = 16;
const MODAL = document.getElementById("win-modal");
let last_click = false;
let matches = 0;
let turns = 0;
let icons = ['fas fa-basketball-ball pic', 'fas fa-bicycle pic', 'fas fa-bomb pic', 'fas fa-bolt pic', 'fas fa-frog pic', 'fas fa-football-ball pic', 'fas fa-beer pic', 'fas fa-dice pic'];
//2 copies of the ICONS array sliced for the amount of cards the game will use
icons = [...icons.slice(0, (CARD_AMOUNT / 2)), ...icons.slice(0, (CARD_AMOUNT / 2))];


function matchCount() {
  if (++matches === CARD_AMOUNT / 2) {
    matches = 0;
    MODAL.style.display = 'flex';

  }
}
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // eslint-disable-line no-param-reassign
  }
}

function game(event) {
  let card = event.target;
  if (card.classList.contains('pic')) {
    card = card.parentElement;
  }
  if (card.classList.contains("card-table") || card.classList.contains("match")) {
    return 0;
  }
  card.firstElementChild.style.display = 'initial';
  card.style.background = '#F5F5F5';
  if (card.classList.contains('card') && card != last_click) {
    if (!last_click) {
      card.firstElementChild.classList.add('animated', 'rubberBand');
      last_click = card;
      return 0;
    }
    last_click.firstElementChild.classList.remove('animated', 'rubberBand');
    CARD_TABLE.removeEventListener("click", game);
    if (card.firstElementChild.className == last_click.firstElementChild.className) {

      card.classList.add('match', 'animated', 'tada');
      last_click.classList.add('match', 'animated', 'tada');
      matchCount();
      last_click = false;
    } else {
      card.classList.add('mismatch', 'animated', 'shake');
      last_click.classList.add('mismatch', 'animated', 'shake');


      setTimeout(function() {
        card.firstElementChild.style.display = 'none';
        card.style.background = '#118ab2';
        last_click.firstElementChild.style.display = 'none';
        last_click.style.background = '#118ab2';
        card.classList.remove('mismatch', 'animated', 'shake');
        last_click.classList.remove('mismatch', 'animated', 'shake');
        last_click = false;
      }, 1000);
    }
    setTimeout(function() {
      CARD_TABLE.addEventListener('click', game);
    }, 1000);
  }


}

function makeGrid() {
  //storing the cards in a document fragment to be pushed all at once instead of manipulating the dom in the loops
  shuffleArray(icons);
  let fragment = document.createDocumentFragment();
  for (let i of icons) {
    let icon = document.createElement("i");
    icon.className = i;
    let card = document.createElement("div");
    card.className = 'card';
    card.append(icon);
    fragment.append(card); //appends card to the fragment
  }
  CARD_TABLE.append(fragment); //add the cards to the grid layout
}

document.getElementById('reset-game').addEventListener("click", function() {
  while (CARD_TABLE.firstChild) {
    CARD_TABLE.removeChild(CARD_TABLE.lastChild);
  }
  MODAL.style.display = 'none';
  makeGrid();
});

makeGrid();
CARD_TABLE.addEventListener('click', game);