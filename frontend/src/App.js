import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Player1Page from './Player1Page';
import Player2Page from './Player2Page';
import { GameProvider } from './GameContext';

function App() {
  return (
    <GameProvider>
      <Router>
        <div>
          <h1>Number Baseball Game</h1>
          <nav>
            <ul>
              <li>
                <Link to="/player_1">Player 1 - Guess Player 2's Number</Link>
              </li>
              <li>
                <Link to="/player_2">Player 2 - Guess Player 1's Number</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/player_1" element={<Player1Page />} />
            <Route path="/player_2" element={<Player2Page />} />
          </Routes>
        </div>
      </Router>
    </GameProvider>
  );
}

export default App;
