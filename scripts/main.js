/* jshint esversion: 6 */

const CARD_TABLE = document.getElementById("card-table");
// TODO: Change CARD_AMOUNT to let and make the grid creation allow for larger games.
const CARD_AMOUNT = 16;
let last_click = false;
let matches = 0;
let turns = 0;
const ICONS = ['fas fa-basketball-ball pic', 'fas fa-bicycle pic', 'fas fa-bomb pic', 'fas fa-bolt pic', 'fas fa-frog pic', 'fas fa-football-ball pic', 'fas fa-beer pic', 'fas fa-dice pic'];

function getRandomInt(min, max) {
  //from MDN Documentation
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function matchCount(){
  matches++;
  if (matches ===CARD_AMOUNT/2){
    while (CARD_TABLE.firstChild) {
      CARD_TABLE.removeChild(CARD_TABLE.lastChild);
    }
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
     // match_count();
      last_click = false;
    } 
    else {
      card.classList.add('mismatch', 'animated', 'shake');
      last_click.classList.add('mismatch', 'animated', 'shake');

      
      setTimeout(function () {
        card.firstElementChild.style.display = 'none';
        card.style.background = '#118ab2';
        last_click.firstElementChild.style.display = 'none';
        last_click.style.background = '#118ab2';
        card.classList.remove('mismatch', 'animated', 'shake');
        last_click.classList.remove('mismatch', 'animated', 'shake');
        last_click = false;
      }, 1000);
    }
    setTimeout(function () {
      CARD_TABLE.addEventListener('click', game);
    }, 1000);
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