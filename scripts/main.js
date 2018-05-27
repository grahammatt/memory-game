/* jshint esversion: 6 */
//cache frequently accessed DOM elements
const CARD_TABLE = document.getElementById('card-table');
const MODAL = document.getElementById('win-modal');
const TIMER = document.getElementById('timer');
// TODO: Change CARD_AMOUNT to let and make the grid creation allow for larger games.
const CARD_AMOUNT = 16;

let lastClick;
let matches;
let turns;
let timer = new Timer(); //easytimer.js


function testWin() {
  //if the game is won
  if (++matches === CARD_AMOUNT / 2) {
    timer.stop(); //stop the time from counting
    MODAL.style.display = 'flex'; //display win modal
    MODAL.append(document.getElementById('stats')); //move #stats element to the modal
    timer.stop(); //stop the timer
  }
}
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function updateStars() {
  // decides if a star needs to be taken away from the rank
  mismatch = turns - matches;
  if (mismatch == 11) {
    document.getElementById('star1').className = 'far fa-star'; //changes the fontawesome icon
  } else if (mismatch == 8) {
    document.getElementById('star2').className = 'far fa-star';
  } else if (mismatch == 5) {
    document.getElementById('star3').className = 'far fa-star';
  }
}

function game(event) {
  let card = event.target;
  //get parent of the icon element is clicked instead of the card
  if (card.classList.contains('pic')) {
    card = card.parentElement;
  }
  //if the clicked area is a matched card or inbetween cards all game logic is skipped
  if (card.classList.contains('card-table') || card.classList.contains('match') || card == lastClick) {
    return 0;
  }
  if (turns === 0) {
    //starts easytimer from http://albert-gonzalez.github.io/easytimer.js/
    //if it is the first turn
    timer.start();
    timer.addEventListener('secondsUpdated', function(e) {
      TIMER.innerHTML = timer.getTimeValues().toString();
    });
  }
  //reveal card. show icon and change background to white
  card.firstElementChild.style.display = 'initial';
  card.style.background = '#F5F5F5';
  //if this is the first of a pair of cards
  if (!lastClick) {
    //animate and set lastClick to this card
    card.firstElementChild.classList.add('animated', 'rubberBand');
    lastClick = card;
    return 0; //break out of game function
  }

  lastClick.firstElementChild.classList.remove('animated', 'rubberBand');
  CARD_TABLE.removeEventListener('click', game);
  if (card.firstElementChild.className == lastClick.firstElementChild.className) {
    //the cards match. animate them
    card.classList.add('match', 'animated', 'tada');
    lastClick.classList.add('match', 'animated', 'tada');
    //reset the last click
    lastClick = false;
    setTimeout(function() {
      //test for a win after the animation finishes
      testWin();
      //allow clicking again
      CARD_TABLE.addEventListener('click', game);
    }, 1000);
  } else {
    //the cards dont match
    card.classList.add('mismatch', 'animated', 'shake');
    lastClick.classList.add('mismatch', 'animated', 'shake');
    //increase mismatches and check if stars should be updated
    updateStars();
    // after the animation finishes hid the cards again
    setTimeout(function() {
      card.firstElementChild.style.display = 'none';
      card.style.background = '#118ab2';
      lastClick.firstElementChild.style.display = 'none';
      lastClick.style.background = '#118ab2';
      //remove the added classes
      card.classList.remove('mismatch', 'animated', 'shake');
      lastClick.classList.remove('mismatch', 'animated', 'shake');
      lastClick = false;
      CARD_TABLE.addEventListener('click', game);
    }, 1000);
  }
  //increase turns after a pair has been clicked
  document.getElementById('turns').innerHTML = ++turns;
}

function makeGrid() {
  //set values to the default
  matches = 0;
  turns = 0;
  lastClick = false;
  //storing the cards in a document fragment to be pushed all at once instead of manipulating the dom in the loops
  let icons = ['fas fa-basketball-ball pic', 'fas fa-bicycle pic', 'fas fa-bomb pic', 'fas fa-bolt pic', 'fas fa-frog pic', 'fas fa-football-ball pic', 'fas fa-beer pic', 'fas fa-dice pic'];
  //2 copies of the ICONS array sliced for the amount of cards the game will use
  icons = [...icons, ...icons];
  shuffleArray(icons);
  //creating a document fragment to store the cards in until they are added to the DOM
  let fragment = document.createDocumentFragment();
  //loops over the whole array
  for (let i of icons) {
    let icon = document.createElement('i');
    icon.className = i;
    let card = document.createElement('div');
    card.className = 'card';
    card.append(icon);
    fragment.append(card); //appends card to the fragment
  }
  CARD_TABLE.append(fragment); //add the cards to the grid layout
}

document.getElementById('reset-game').addEventListener('click', function() {
  timer.stop();
  TIMER.innerHTML = '00:00:00';
  document.getElementById('turns').innerHTML = 0;
  document.getElementById('star1').className = 'fas fa-star';
  document.getElementById('star2').className = 'fas fa-star';
  document.getElementById('star3').className = 'fas fa-star';
  //remove last shild while there are still children
  while (CARD_TABLE.firstChild) {
    CARD_TABLE.removeChild(CARD_TABLE.lastChild);
  }
  //hide modal
  MODAL.style.display = 'none';
  //move #stats back to its original location
  document.querySelector('.stats-wrap').append(document.getElementById('stats'));
  //repopulate the card table
  makeGrid();
});
//make the grid when the website is first loaded and add the click listener
makeGrid();
CARD_TABLE.addEventListener('click', game);