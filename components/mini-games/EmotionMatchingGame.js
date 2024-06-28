//EQ-Game/components/mini-games/EmotionMatchingGame.js
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const emotions = ['Happy', 'Sad', 'Angry', 'Surprised', 'Fearful', 'Disgusted', 'Excited', 'Calm', 'Confused', 'Proud', 'Bored', 'Tired'];
const emotionEmojis = {
  'Happy': '😊',
  'Sad': '😢',
  'Angry': '😠',
  'Surprised': '😲',
  'Fearful': '😨',
  'Disgusted': '🤢',
  'Excited': '😆',
  'Calm': '😌',
  'Confused': '😕',
  'Proud': '😌',
  'Bored': '😐',
  'Tired': '😴'
};

const EmotionMatchingGame = ({ onFinish }) => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);

  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    let interval;
    if (gameStarted && solved.length < emotions.length) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, solved.length]);

  const shuffleCards = () => {
    const shuffledEmotions = [...emotions, ...emotions]
      .sort(() => Math.random() - 0.5)
      .map((emotion, index) => ({ id: index, emotion, flipped: false, solved: false }));
    setCards(shuffledEmotions);
    setFlipped([]);
    setSolved([]);
    setMoves(0);
    setTimer(0);
    setGameStarted(false);
    setShowInstructions(true);
  };

  const handleCardClick = (id) => {
    if (showInstructions) {
      setShowInstructions(false);
      setGameStarted(true);
    }
    if (!gameStarted) setGameStarted(true);
    if (flipped.length === 2 || flipped.includes(id) || solved.includes(cards[id].emotion)) return;
    
    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);
    setMoves(moves + 1);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (cards[first].emotion === cards[second].emotion) {
        setSolved([...solved, cards[first].emotion]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  const calculateScore = () => {
    const baseScore = 1000;
    const movesPenalty = moves * 10;
    const timePenalty = timer * 2;
    return Math.max(baseScore - movesPenalty - timePenalty, 100);
  };

  if (solved.length === emotions.length) {
    const score = calculateScore();
    return (
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-4">Congratulations! You've matched all emotions!</h3>
        <p className="mb-2">You completed the game in {moves} moves and {timer} seconds.</p>
        <p className="text-xl font-bold mb-4">Your score: {score}</p>
        <button 
          onClick={() => onFinish(score)}
          className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Finish
        </button>
        <button 
          onClick={shuffleCards}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <AnimatePresence>
        {showInstructions && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="text-center mb-4 p-4 bg-yellow-100 rounded-lg"
          >
            <h3 className="text-xl font-bold mb-2">How to Play</h3>
            <p>Match pairs of emotion cards. Click on a card to reveal its emotion, then find its match!</p>
            <button
              onClick={() => {
                setShowInstructions(false);
                setGameStarted(true);
              }}
              className="mt-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              Start Game
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="mb-4 flex justify-between items-center">
        <p className="font-bold">Moves: {moves}</p>
        <p className="font-bold">Time: {timer}s</p>
        <button 
          onClick={shuffleCards}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded text-sm"
        >
          Restart
        </button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`h-24 flex items-center justify-center rounded-lg cursor-pointer shadow-md ${
              flipped.includes(card.id) || solved.includes(card.emotion)
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{ rotateY: flipped.includes(card.id) || solved.includes(card.emotion) ? 180 : 0 }}
          >
            <div className="absolute backface-hidden text-3xl">
              {flipped.includes(card.id) || solved.includes(card.emotion) ? emotionEmojis[card.emotion] : '?'}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EmotionMatchingGame;
