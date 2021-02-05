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
    let letter = readlineSync.question(underscore.join(' ') + '\nGuess: ').toLowerCase()
    while (attempt != 1) {
        if (letter == 'quit') {
            break;
        }
        if (guesses.includes(letter)) {
            console.log('You have already guessed that letter.');
            console.log('guesses: [ ' + guesses.join(' ') + ' ]');
        }
        else {
            if (word.includes(letter)) {
                let indexes = getIndex(word, letter);
                for (let index of indexes) {
                    underscore.splice(index, 1, letter)
                }
            }
            else {
                attempt--;
                console.log('Wrong!\t\tAttempts left: ' + attempt);
            }
            if (underscore.join('') === word) {
                console.log('Answer: ' + word);
                console.log('You win!');
                break;
            }
            guesses.push(letter);
        }
            letter = readlineSync.question(underscore.join(' ') + '\nGuess: ').toLowerCase();
    }
    if (underscore.join('') != word) {
        console.log('You lose');
        console.log('Answer: ' + word)
    }
    let again = readlineSync.question('Do you wanna play again?\n').toLowerCase();
    if (again === 'yes') {
        hangMan();
    }
    return;
}

hangMan()