/* jshint esversion: 6 */

const CARD_TABLE = document.getElementById("card-table");
// TODO: Change CARD_AMOUNT to let and make the grid creation allow for larger games.
const CARD_AMOUNT = 16;

function makeGrid() {
  //TODO: remove all children from the table
  //storing the cards in a document fragment to be pushed all at once instead of manipulating the dom in the loops
  let fragment = document.createDocumentFragment();
  for (let i = 0; i < CARD_AMOUNT; i++) {
    fragment.append(document.createElement("div")); //appends card to the fragment
  }
  CARD_TABLE.append(fragment); //add the cards to the grid layout
}
makeGrid();