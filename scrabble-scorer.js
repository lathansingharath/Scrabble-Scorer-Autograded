// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoringFunction system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //
let userInputedWord ="";
function initialPrompt() {
      userInputedWord = input.question("Please enter a word ");
      console.log(oldScrabbleScorer(userInputedWord));
};

//let simpleScorer;
let simpleScorer = (word) => {
   word = word.toUpperCase();
   for (let i = 0; i < word.length; i++) {
      console.log(`Points for '${word[i]}': 1`);
   }
  return word.length;
};

//console.log(simpleScorer("Jam")); //testing for bug
let vowelArr = ["A","E","I","O","U","Y"];
//let vowelBonusScorer;
let vowelBonusScorer = (word) => {
   word = word.toUpperCase();
   let letterPoints = 0;
   for (let i = 0; i < word.length; i++){
      if (vowelArr.includes(word[i])) {
         letterPoints += 3;
         console.log(`Points for '${word[i]}': 3`);
      } else {
         letterPoints += 1;
         console.log(`Points for '${word[i]}': 1`);
      }
   }
   return letterPoints;
};

//let scrabbleScorer;
let scrabbleScorer = (word) => {
   word = word.toUpperCase();
   let letterPoints=0;
	for (let i = 0; i < word.length; i++) {
 	  for (const pointValue in oldPointStructure) {
 		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += Number(pointValue);
		 }
 	  }
	}
	return letterPoints;
};

let scorringOptions = [simpleScorer,vowelBonusScorer,oldScrabbleScorer];
//let scorringOptions = [simpleScorer,vowelBonusScorer,scrabbleScorer];

let howToScoreScrabbleOne = {
   "name": "Simple Score",
   "description": "Each letter is worth 1 point.",
   "scoringFunction": scorringOptions[0],

};
let howToScoreScrabbleTwo = {
   "name": "Bonus Vowels",
   "description": "Vowels are 3 pts, consonants are 1 pt",
   "scoringFunction": scorringOptions[1],

};
let howToScoreScrabbleThree = {
   "name": "Scrabble",
   "description": "The traditional scoringFunction algorithm.",
   "scoringFunction": scorringOptions[2],

};
const scoringFunctionAlgorithms = [howToScoreScrabbleOne,howToScoreScrabbleTwo,howToScoreScrabbleThree];

function scorerPrompt() {
   console.log(`Here are your scoring options:
                0 : Simple
                1 : Vowel Bonus
                2: Old school Scrabble`);
   let userscoringFunctionOption = input.question("What scoring option would you like to use? ");
   return(scoringFunctionAlgorithms[userscoringFunctionOption]); //this returns an object
}

console.log(scorerPrompt()); //testing
console.log(scorerPrompt.scoringFunction); //testing

function transform() {};

let newPointStructure;

function runProgram() {
   initialPrompt();
   let userscoringFunctionOption = scorerPrompt();
   //console.log(userscoringFunctionOption);//testing
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringFunctionAlgorithms: scoringFunctionAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
