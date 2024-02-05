// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scorerFunction system. 

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
   let wordPoints = 0; //my change
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
         console.log(`Points for '${word[i]}': ${pointValue}`); //testing
         //console.log(letterPoints); //testing
         wordPoints += Number(pointValue);
		 }
       // console.log(`Points for '${word[i]}': ${pointValue}`); //testing
 
	  }
     // console.log(`Points for '${word[i]}': ${pointValue}`); //testing

	}
  //console.log(`Points for '${word[i]}': ${pointValue}`); //testing
	//return letterPoints;
   return (wordPoints); //my change
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //
let userInputedWord ="";
function initialPrompt() {
      userInputedWord = input.question("Please enter a word ");
      //console.log(oldScrabbleScorer(userInputedWord));
};

//let simpleScorer;
let simpleScorer = (word) => {
   word = word.toUpperCase();
   for (let i = 0; i < word.length; i++) {
      console.log(`Points for '${word[i]}': 1`);
   }
  return word.length;
};


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
   let letterPoints = 0;
	for (let i = 0; i < word.length; i++) {
      if (word[i] in newPointStructure) {
         letterPoints += newPointStructure[i];
      }
     
     
      ////////////////////////
 	  /*for (const pointValue in newPointStructure) {
 		 if (newPointStructure[pointValue].includes(word[i])) {
			letterPoints += Number(pointValue);
		 }
 	  }*/
     ////////////////////
     /*if(word[i] in newPointStructure) {
      console.log("Heck Yeah");
     }*/

	}
	return letterPoints;
};

//console.log(scrabbleScorer("Lathan"));//testing

let scorringOptions = [simpleScorer,vowelBonusScorer,oldScrabbleScorer];
//let scorringOptions = [simpleScorer,vowelBonusScorer,scrabbleScorer];

let howToScoreScrabbleOne = {
   "name": "Simple Score",
   "description": "Each letter is worth 1 point.",
   "scorerFunction": scorringOptions[0],

};
let howToScoreScrabbleTwo = {
   "name": "Bonus Vowels",
   "description": "Vowels are 3 pts, consonants are 1 pt",
   "scorerFunction": scorringOptions[1],

};
let howToScoreScrabbleThree = {
   "name": "Scrabble",
   "description": "The traditional scoring algorithm.",
   "scorerFunction": scorringOptions[2],

};
const scoringAlgorithms = [howToScoreScrabbleOne,howToScoreScrabbleTwo,howToScoreScrabbleThree];

function scorerPrompt() {
   console.log(`Here are your scoring options:
                0 : Simple
                1 : Vowel Bonus
                2: Old school Scrabble`);
   let userscoringFunctionOption = input.question("What scoring option would you like to use? ");
   return(scoringAlgorithms[userscoringFunctionOption]); //this returns an object
}

function transform(oldStructure) {
   let tempNewPointStructure = {};
   let tempObjectTwo = {};
   let tempArr = []; //testing
   for (prop in oldStructure) {
      for (let i = 0; i < oldStructure[prop].length; i++) {
         tempNewPointStructure[oldPointStructure[prop][i].toLowerCase()] = Number(prop);
      } 
   }
  return tempNewPointStructure;
};
let newPointStructure = transform(oldPointStructure);
console.log(newPointStructure);//testing

function runProgram() {
   initialPrompt();
   let pickedScoringOption = scorerPrompt();
   let wordScore = pickedScoringOption.scorerFunction(userInputedWord);
   console.log(`Your total score for the word is ${wordScore}`);
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
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
