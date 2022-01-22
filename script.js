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


function shuffle(array) {
  let counter = array.length;


  while (counter > 0) {

    let index = Math.floor(Math.random() * counter);

  
    counter--;

 
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);


function createDivsForColors(colorArray) {
  for (let color of colorArray) {

    const newDiv = document.createElement("div");

    newDiv.classList.add(color);

    newDiv.addEventListener("click", handleCardClick);

    gameContainer.append(newDiv);
  }
}
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

createDivsForColors(shuffledColors);
