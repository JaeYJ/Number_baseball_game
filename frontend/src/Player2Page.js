import React, { useState } from 'react';
import axios from 'axios';
import { useGameContext } from './GameContext';
import './App.css';

function Player2Page() {
    const [guess, setGuess] = useState('');
    const [result, setResult] = useState(null);
    const [history, setHistory] = useState([]);
    const [opponentHistory, setOpponentHistory] = useState([]);
    const { player2Number, setPlayer2Number } = useGameContext();

    // Function to handle the guess submission
    const handleGuess = async () => {
        try {
            const response = await axios.post('/player2/guess', { guess });
            setResult(response.data.result);
            setHistory(response.data.player2History);
            setOpponentHistory(response.data.player1History);
        } catch (error) {
            console.error(error);
        }
    };

    // Function to refresh histories
    const handleRefresh = async () => {
        try {
            const response = await axios.get('/player2/history');
            setHistory(response.data.player2History);
            setOpponentHistory(response.data.player1History);
        } catch (error) {
            console.error(error);
        }
    };

    // Function to reset the game
    const handleReset = async () => {
        try {
            await axios.post('/reset');
            setGuess('');
            setResult(null);
            setHistory([]);
            setOpponentHistory([]);
            setPlayer2Number('');
        } catch (error) {
            console.error(error);
        }

    };

    const handlePlayer2NumberChange = (e) => {
        setPlayer2Number(e.target.value);
    };

    const handleSetPlayer2Number = async () => {
        try {
            await axios.post('/setPlayer2Number', { number: player2Number });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">
            <div className="container_left">
                <h1>Player 2 - Guess Player 1's Number</h1>
                <input
                    type="text"
                    value={player2Number}
                    onChange={handlePlayer2NumberChange}
                    maxLength={3}
                    placeholder="Set Player 2's Secret Number"
                />
                <button className="set-number-button" onClick={handleSetPlayer2Number}>Set Number</button>
                <p>your number is "{player2Number}"</p>
                
                <div>
                    <input
                        type="text"
                        value={guess}
                        onChange={(e) => setGuess(e.target.value)}
                        maxLength={3}
                        placeholder="Enter 3-digit number"
                    />
                    <button onClick={handleGuess}>Submit Guess</button>
                </div>

                <button onClick={handleRefresh}>Refresh History</button>
                <button onClick={handleReset}>Reset Game</button>

                {result && (
                    <div>
                        <h2>Result: S:{result.strikes} B:{result.balls} OUT:{result.outs}</h2>
                    </div>
                )}
            </div>

            <div className="container_right">
                <h3>Your Guess History</h3>
                <ul>
                    {history.map((entry, index) => (
                        <li key={index}>
                            Guess: {entry.guess} - S:{entry.strikes} B:{entry.balls} OUT:{entry.outs}
                        </li>
                    ))}
                </ul>

                <h3>Opponent's Guess History</h3>
                <ul>
                    {opponentHistory.map((entry, index) => (
                        <li key={index}>
                            Guess: {entry.guess} - S:{entry.strikes} B:{entry.balls} OUT:{entry.outs}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Player2Page;
