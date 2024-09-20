const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Store guess history for both players
let player1History = [];
let player2History = [];

let player1Number = ''; // Initially empty
let player2Number = ''; // Initially empty

// Endpoint for Player 1 guessing Player 2's number
app.post('/player1/guess', (req, res) => {
    const { guess } = req.body;
    const result = checkGuess(guess, player2Number);

    // Store the guess in history
    player1History.push({ guess, ...result });

    // Send both histories to Player 1
    res.json({ result, player1History, player2History });
});

// Endpoint for Player 2 guessing Player 1's number
app.post('/player2/guess', (req, res) => {
    const { guess } = req.body;
    const result = checkGuess(guess, player1Number);

    // Store the guess in history
    player2History.push({ guess, ...result });

    // Send both histories to Player 2
    res.json({ result, player1History, player2History });
});

// Endpoint to get histories for Player 1
app.get('/player1/history', (req, res) => {
    res.json({ player1History, player2History });
});

// Endpoint to get histories for Player 2
app.get('/player2/history', (req, res) => {
    res.json({ player1History, player2History });
});

// Endpoint to reset the game
app.post('/reset', (req, res) => {
    player1History = [];
    player2History = [];
    res.json({ message: 'Game reset successful' });
});

// Endpoint to set Player 2's secret number
app.post('/setPlayer2Number', (req, res) => {
    const { number } = req.body;
    player2Number = number; // Update Player 2's number
    res.sendStatus(200);
});

// Endpoint to set Player 1's secret number
app.post('/setPlayer1Number', (req, res) => {
    const { number } = req.body;
    player1Number = number; // Update Player 1's number
    res.sendStatus(200);
});

app.get('/player1/number', (req, res) => {
    res.json({ player1Number }); // Return the stored number
});

app.get('/player2/number', (req, res) => {
    res.json({ player2Number }); // Return the stored number
});



// Function to check guesses and return strikes, balls, and outs
function checkGuess(guess, secretNumber) {
    let strikes = 0;
    let balls = 0;

    const guessArray = guess.split('');
    const secretArray = secretNumber.split('');
    const secretCopy = [...secretArray];

    // First pass: Check for strikes
    guessArray.forEach((digit, index) => {
        if (digit === secretArray[index]) {
            strikes++;
            secretCopy[index] = null; // Remove matched digit
        }
    });

    // Second pass: Check for balls
    guessArray.forEach((digit) => {
        const foundIndex = secretCopy.indexOf(digit);
        if (foundIndex !== -1) {
            balls++;
            secretCopy[foundIndex] = null; // Remove matched digit
        }
    });

    // Calculate outs
    const outs = guessArray.length - strikes - balls;

    return { strikes, balls, outs };
}

const PORT = 5000; // Ensure this matches your frontend proxy
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
