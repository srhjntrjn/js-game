const button = document.querySelector(".showModalTip");
const modal = document.querySelector(".modal");
const closeModalBtn = document.querySelector(".closeModalTip");
const level=document.querySelectorAll(".btnLevel button");
const correctGuesses = document.getElementById("correct-guesses");
const keyboard = document.getElementById('keyboard');
//const modalGOver = document.querySelector(".modalGOver");
const modalCongrats = document.querySelector(".modalCongrats");
const startGame = document.querySelector(".modal .startGame");
const overlay = document.getElementById("overlay");
const GOshow = document.querySelector(".gameOver .tipText strong");
const onGame = document.querySelector(".onGame");
const playAgain= document.querySelector(".playAgain");
const play= document.querySelector(".play");
const showModalReset = document.querySelector(".showModalReset");
const restartGame= document.querySelector(".gameOver");

let word='';
let guess  ='';
let guesses=[];
let misstake=0;
//function to play
const reloadme = function () {
    location.reload();
}
//funtion to reset game
const reloadConfirmation = function () {
  var result = confirm("Are you sure you want to reset the game?");
    if (result=== true) {
      location.reload();
    } 
}
playAgain.addEventListener("click", reloadme);
play.addEventListener("click", reloadme);
showModalReset.addEventListener("click", reloadConfirmation);



arrguess= guess.split(" ");
console.log(arrguess);

//function showing tip 
const showModal = function () {
  modal.classList.remove("hidden");
  closeModalBtn.classList.remove("hidden");
  startGame.style.display = "none";
};
button.addEventListener("click", showModal);

//declararion of array for words
const easy = ['BROWSER','HTML','TASK','SHOW'];
const medium=['INDEX','EVENT','MONEY','CODES'];
const hard=['CONTENT','RECURSION','GITLAB','TERMINAL'];

///function clicking  x
const closeModal = function () {
  console.log("hidden");
  modal.classList.add("hidden");

};
closeModalBtn.addEventListener("click", closeModal);

// document.addEventListener("keydown", function (e) {
//   console.log(e);
//   if (e.key === "Escape") {
//     closeModal();
//   }
// });

//function when they startgame
const startgame = function () {
 // console.log("hidden");
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};
startGame.addEventListener("click", startgame);

//creating alphabet button
 const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

 for (let letters= 0; letters < alphabet.length; letters++) {
   const letterButton = document.createElement('button')
   // Set the button text to 'Can you click me?'
  
   letterButton.innerText = alphabet[letters].toUpperCase();
   letterButton.id =  alphabet[letters].toUpperCase();
  keyboard.appendChild(letterButton);
  letterButton.addEventListener("click", guessclick.bind(null,alphabet[letters].toUpperCase()));
 }

//function when alphabet button is click. and verifying if the letter has the same value to word
function guessclick(element){
  console.log(arrguess);
  guesses.push(element)
  console.log(guesses);
  console.log(element);
  misstake += 1;
  btnalp=document.getElementById(`${element}`);
  let index=word.indexOf(element);
  console.log(index);
      if(index!==-1)
      {
        console.log(word);
        for (i=0; i < word.length; i++)
        {
            console.log(word[i]);
            if (word[i] == element )
            {   
              arrguess[i] = element;
              console.log(arrguess);
              console.log(`The array contains letter ${element}`);
              btnalp.style.backgroundImage = "url('image/right.svg')";
              btnalp.style.backgroundRepeat = "no-repeat";
            }
        }
      }
     else 
     {
       hangman=document.getElementById(`hangman`);
       btnalp.style.backgroundImage = "url('image/wrong.svg')";
       btnalp.style.backgroundRepeat = "no-repeat";
       hangman.style.backgroundImage = `url("image/hangman${misstake}.svg")`;
       hangman.style.backgroundRepeat = "no-repeat";
       console.log(`The array doesn't contain letter ${element}`);
      }
    btnalp.style.backgroundSize = "90% 100%";
    btnalp.disabled=true;
    console.log(arrguess.join(' '));
    correctGuesses.innerHTML = arrguess.join(' ');
    if (arrguess.join('')=== word){
      showCongrats();
    }
    correctGuesses.classList.add('bold');
    if (misstake>=11){
      console.log('game over');
      gameOver();
    }

    correctGuesses.innerHTML = arrguess.join(' ');
    correctGuesses.classList.add('bold');

}

//function when they win
const showCongrats = function () 
{
  console.log("hidden");
  modalCongrats.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
//function when gave is over
const gameOver = function () 
{
  restartGame.classList.remove("hidden");
  document.querySelector('.correctWord').innerHTML=word;
  keyboard.disabled=true;
  overlay.classList.add("hidden");
};

//generating word by level
const generateWord = function(element)
{
  guess  =  '_ ';
  let selectedLevel= element.innerHTML.split(' ').join('');
  element.style.backgroundColor = "greenyellow"
  let randomNumber=0;
  if (selectedLevel == "Easy")
  {
    randomNumber = Math.floor(Math.random() * easy.length);
    word = easy[randomNumber];
    document.getElementById('Medium').disabled=true;
    document.getElementById('Hard').disabled=true;
  }
  else if (selectedLevel == "Medium")
  {
    randomNumber = Math.floor(Math.random() * medium.length);
    word = medium[randomNumber];
    document.getElementById('Easy').disabled=true;
    document.getElementById('Hard').disabled=true;
  }
  else if (selectedLevel == "Hard")
  {
    randomNumber = Math.floor(Math.random() * hard.length);
    word = hard[randomNumber];
    document.getElementById('Medium').disabled=true;
    document.getElementById('Easy').disabled=true;
    
  }
  onGame.classList.remove('hidden');
  showword(word);
}

//function for the _ _ _ _
let showword = function (word)
{
  guess='';
  for (i=0; i < word.length; i++)
  {
    guess  +=  '_ ';
    console.log(guess);
  
  }
  console.log(word);
  correctGuesses.innerHTML = guess;
  correctGuesses.classList.add('bold');
  arrguess= guess.split(" ");
}
///choosing level
//level is the queryselector all for button in a div
level.forEach(function (element) {
  // console.log(element);
  element.addEventListener("click", generateWord.bind(null,element));
  console.log(element.innerHTML);
});

