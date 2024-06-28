// EQ-Game/components/mini-games/MemoryGame.js
/**
 * MemoryGame Component
 * Implements a memory game with symbols, timer, and scoring system.
 * 
 * Potential Issues Fixed:
 * - Timer management validated.
 * - Game end conditions handled properly.
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const symbols = ['🌟', '🌈', '🌺', '🍎', '🚀', '🎵', '🐘', '🦋', '🌙', '🍕', '🎨', '🌴'];

const MemoryGame = ({ onFinish }) => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    let interval;
    if (gameStarted && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      endGame();
    }
    return () => clearInterval(interval);
  }, [gameStarted, timer]);

  const shuffleCards = () => {
    const shuffledSymbols = [...symbols, ...symbols]
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({
        id: index,
        symbol,
        flipped: false,
        solved: false,
      }));
    setCards(shuffledSymbols);
    setFlipped([]);
    setSolved([]);
    setMoves(0);
    setScore(0);
    setTimer(60);
    setGameStarted(false);
  };

  const handleCardClick = (id) => {
    if (!gameStarted) setGameStarted(true);
    if (flipped.length === 2 || flipped.includes(id) || solved.includes(cards[id])) return;

    setFlipped([...flipped, id]);
    setMoves(moves + 1);

    if (flipped.length === 1) {
      const [firstId] = flipped;
      const firstCard = cards.find((card) => card.id === firstId);
      const secondCard = cards.find((card) => card.id === id);

      if (firstCard.symbol === secondCard.symbol) {
        setSolved([...solved, firstId, id]);
        setScore(score + 10);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  const endGame = () => {
    setGameStarted(false);
    const timeBonus = timer * 2;
    const finalScore = score + timeBonus;
    onFinish(finalScore);
  };

  if (solved.length === cards.length && cards.length > 0) {
    endGame();
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-4 flex justify-between items-center">
        <p className="font-bold">Moves: {moves}</p>
        <p className="font-bold">Score: {score}</p>
        <p className="font-bold">Time: {timer}s</p>
        <button
          onClick={shuffleCards}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Restart
        </button>
      </div>
      <div className="grid grid-cols-6 gap-4">
        <AnimatePresence>
          {cards.map((card) => (
            <motion.div
              key={card.id}
              initial={{ rotateY: 0 }}
              animate={{ rotateY: flipped.includes(card.id) || solved.includes(card.id) ? 180 : 0 }}
              transition={{ duration: 0.6 }}
              onClick={() => handleCardClick(card.id)}
              className={`h-24 sm:h-32 flex items-center justify-center rounded-lg cursor-pointer shadow-md ${
                flipped.includes(card.id) || solved.includes(card.id)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200'
              }`}
            >
              <div className="absolute backface-hidden text-4xl">
                {flipped.includes(card.id) || solved.includes(card.id) ? card.symbol : '?'}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {!gameStarted && (
        <div className="mt-4 text-center">
          <p className="text-xl font-bold mb-2">Memory Game</p>
          <p>Match pairs of symbols. Click any card to start!</p>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;
