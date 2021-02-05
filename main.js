var randomWords = require('random-words');
var readlineSync = require('readline-sync');

function getIndex(str, letter) {
    let arr = [];
    for (let i = 0; i < str.length; i++) {
        if (str[i] === letter) {
            arr.push(i);
        }
    }
    return arr;
}

function hangMan() {
    let word = randomWords();
    let underscore = [];
    let guesses = [];
    let attempt = 6;
    for (let i = 0; i < word.length; i++) {
        underscore.push('_');
    }
    console.log('Guess the word!')
    while (attempt != 0) {
        let letter = readlineSync.question(underscore.join(' ') + '\nGuess: ').toLowerCase();
        if (letter == 'quit') { // added this so I can stop the code without completing the game
            break;
        }
        if (guesses.includes(letter)) {
            console.log('You have already guessed that letter.\tAttempts left: ' + attempt);
            console.log('guesses: [ ' + guesses.join(' ') + ' ]');
        }
        else {
            if (word.includes(letter)) {
                let indexes = getIndex(word, letter);
                for (let index of indexes) { // adding correct letter to the underscores if correct
                    underscore.splice(index, 1, letter)
                }
            }
            else {
                attempt--;
                console.log('Wrong!\t\tAttempts left: ' + attempt);
            }
            if (underscore.join('') === word) { // winning scenario
                console.log('\nYou win!');
                console.log('Answer: ' + word);
                break;
            }
            guesses.push(letter);
        }
    }
    if (underscore.join('') != word) {
        console.log('\nYou lose');
        console.log('Answer: ' + word)
    }
    let again = readlineSync.question('Do you wanna play again?\n').toLowerCase();
    if (again === 'yes') { // for looping the game
        hangMan();
    }
    return;
}

hangMan()