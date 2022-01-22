const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}
// TODO: Implement this function!
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

function handleCardClick(event) {
    if (lockBoard) return;
    if (this === firstCard) return;
    
    let currentCard = event.target;
    currentCard.style.backgroundColor = currentCard.classList[0];

    if(!hasFlippedCard){
      hasFlippedCard = true;
      firstCard = this;

      return;
    }
      secondCard = this;

      checkMatch();

    }

    function checkMatch(){
      let card1 = firstCard.className;
      let card2 = secondCard.className;
      let isMatch = card1 === card2;

      isMatch ? disableCards() : unflipCards();
    }

    function disableCards(){
      firstCard.removeEventListener("click", handleCardClick);
      secondCard.removeEventListener("click", handleCardClick);

      resetBoard();
    }

    function unflipCards(){
      lockBoard = true;
      setTimeout(()=> {
        firstCard.style.backgroundColor = "";
        secondCard.style.backgroundColor = "";
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

      resetBoard();
        },1000);
    }

    function resetBoard(){
      [hasFlippedCard, lockBoard] = [false, false];
      [firstCard, secondCard] = [null, null];
    }
  // you can use event.target to see which element was clicked
  //console.log("you just clicked", event.target);


// when the DOM loads
createDivsForColors(shuffledColors);
