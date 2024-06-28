// File: components/MiniGameLauncher.js

import React, { useState } from 'react';
import EmotionMatchingGame from '../components/mini-games/EmotionMatchingGame';
import ReactionTimeGame from '../components/mini-games/ReactionTimeGame';
import MemoryGame from '../components/mini-games/MemoryGame';
import { motion } from 'framer-motion';

const MiniGameLauncher = ({ onClose, onComplete }) => {
  const [selectedGame, setSelectedGame] = useState(null);

  const games = [
    { id: 'emotion-matching', name: 'Emotion Matching', component: EmotionMatchingGame },
    { id: 'reaction-time', name: 'Reaction Time', component: ReactionTimeGame },
    { id: 'memory-game', name: 'Memory Game', component: MemoryGame },
  ];

  const handleGameComplete = (score) => {
    onComplete(score);
    setSelectedGame(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-lg">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold mb-4 text-center"
        >
          Mini-Games
        </motion.h2>
        {!selectedGame ? (
          <div>
            {games.map((game) => (
              <motion.button
                key={game.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedGame(game)}
                className="block w-full text-left p-3 bg-blue-500 text-white rounded mb-2 transition transform hover:bg-blue-600"
              >
                {game.name}
              </motion.button>
            ))}
          </div>
        ) : (
          <selectedGame.component onFinish={handleGameComplete} />
        )}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Close
        </motion.button>
      </div>
    </div>
  );
};

export default MiniGameLauncher;