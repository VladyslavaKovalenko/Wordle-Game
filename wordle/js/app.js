import { dictionary } from './dictionary.js';

const coont_guess = 6;
let guesses = coont_guess;
const check = document.getElementById('check');

let rightGuessString = dictionary[Math.floor(Math.random() * dictionary.length)]
console.log(rightGuessString)

// creating the fields
function game_board() {
    let board = document.getElementById('board');

    for (let i = 0; i < coont_guess; i++) {
        let row = document.createElement('div')
        row.className = 'row_of_board';  
        
        for (let j = 0; j < 5; j++) {
            let box = document.createElement('input')
            box.className = 'letter_box'
            row.appendChild(box)
        }

        board.appendChild(row)
    }
}
game_board()


let next_letter = 0;
let guess_curr= [];

// the body of game
document.addEventListener('keydown', (e) => {
    if (guesses === 0) {
        return
    }

// deleting the letters
    let letter_keypad = String(e.key)
    if (letter_keypad === 'Backspace' && next_letter !== 0) {
        let row = document.getElementsByClassName('row_of_board')[6 - guesses]
        let box = row.children[next_letter - 1]
        box.textContent = ''
        box.classList.remove('filled-box')
        guess_curr.pop()
        next_letter -= 1
        return
    }

// adding he letters
    let found = letter_keypad.match(/[а-я]/gi);
    if (!found || found.length > 1) {
        return
    } else {
        if (next_letter === 5) {
            return
        }
        let row = document.getElementsByClassName('row_of_board')[6 - guesses]
        let box = row.children[next_letter]
        box.textContent = letter_keypad;
        box.classList.add('filled-box')
        guess_curr.push(letter_keypad)
        next_letter += 1;
    }
});


 check.addEventListener('click', function(){
    let row = document.getElementsByClassName('row_of_board')[6 - guesses]
    let guess_str = ''
    let rightGuess = Array.from(rightGuessString)

for (const value of guess_curr) {
        guess_str += value
    }
    if (guess_str.length !== 5) {
        alert('Not enough letters!')
        return
    }
    if (!dictionary.includes(guess_str)) {
        alert('Not in Word list!')
        return
    }

    
    for (let i = 0; i < 5; i++) {
        let color = ''
        let box = row.children[i]
        // let letter = guess_curr[i]
        
        let letterPosition = rightGuess.indexOf(guess_curr[i])
        // is letter color
        if (letterPosition === -1) {
            color = 'grey'
        } else {
            if (guess_curr[i] === rightGuess[i]) {
               
                color = 'green'
            } else {
                
                color = 'yellow'
            }
        }
            box.style.backgroundColor = color
    }

    if (guess_str === rightGuessString) {
        alert('Congratulation! You are winner!')
        guesses = 0
        return
    } else {
        guesses -= 1;
        guess_curr = [];
        next_letter = 0;

        if (guesses === 0) {
            alert(' Game over!')
        }
    }
})
