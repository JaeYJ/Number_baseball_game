import React, { createContext, useContext, useState } from 'react';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [player1History, setPlayer1History] = useState([]);
  const [player2History, setPlayer2History] = useState([]);

  const [player1Number, setPlayer1Number] = useState('');
  const [player2Number, setPlayer2Number] = useState('');

  const resetGame = () => {
    setPlayer1History([]);
    setPlayer2History([]);
    setPlayer1Number('');
    setPlayer2Number('');
  };

  return (
    <GameContext.Provider value={{ player1History, setPlayer1History, player2History, setPlayer2History, 
      player1Number, setPlayer1Number, player2Number, setPlayer2Number, resetGame }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  return useContext(GameContext);
};
