// File: components/GameOver.js
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const GameOver = ({ score, difficulty, onRestart, onMainMenu }) => {
  const [highScores, setHighScores] = useState([]);
  const [rank, setRank] = useState(null);

  useEffect(() => {
    // Fetch high scores from local storage or an API
    const storedScores = JSON.parse(localStorage.getItem('EQGameScores')) || [];
    const sortedScores = storedScores.sort((a, b) => b.score - a.score);
    setHighScores(sortedScores);

    // Determine the player's rank
    const currentRank = sortedScores.findIndex(s => s.score <= score) + 1;
    setRank(currentRank);

    // Save the current score to local storage
    localStorage.setItem('EQGameScores', JSON.stringify([...storedScores, { score }]));
  }, [score]);

  const shareScore = () => {
    const shareText = `I just scored ${score} points in the Emotional Intelligence Game! Can you beat my score? #EQGame`;
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: 'EQ Game',
        text: shareText,
        url,
      }).catch(console.error);
    } else {
      alert('Share feature is not supported in your browser.');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-lg p-8 max-w-md w-full text-center shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Game Over</h2>
        <p className="text-xl mb-2">Your Score: {score}</p>
        <p className="text-lg mb-4">Your Rank: {rank}</p>
        <p className="text-lg mb-4">Difficulty: {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</p>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">High Scores</h3>
          <ul>
            {highScores.slice(0, 5).map((entry, index) => (
              <li key={index} className="text-gray-700">
                {index + 1}. {entry.score}
              </li>
            ))}
          </ul>
        </div>
        <button 
          onClick={onRestart} 
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Play Again
        </button>
        <button 
          onClick={onMainMenu} 
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Main Menu
        </button>
        <button 
          onClick={shareScore} 
          className="bg-green-500 text-white px-4 py-2 rounded mt-4"
        >
          Share Score
        </button>
      </div>
    </motion.div>
  );
};

export default GameOver;
