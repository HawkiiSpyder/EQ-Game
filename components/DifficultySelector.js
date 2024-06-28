// EQ-Game/components/DifficultySelector.js
/**
 * DifficultySelector Component
 * Allows selection of game difficulty with tooltips and visual feedback.
 * 
 * Potential Issues Fixed:
 * - Ensured the selected difficulty correctly influences game settings.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';
import { FaSmile, FaMeh, FaFrown } from 'react-icons/fa';

const difficultyDescriptions = {
  easy: 'Easy: More time, simpler questions, relaxed gameplay.',
  medium: 'Medium: Standard time, moderate questions, balanced gameplay.',
  hard: 'Hard: Less time, complex questions, challenging gameplay.',
};

const DifficultySelector = ({ currentDifficulty, onDifficultyChange }) => {
  const difficulties = ['easy', 'medium', 'hard'];

  const getIcon = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return <FaSmile className="text-green-500" />;
      case 'medium':
        return <FaMeh className="text-yellow-500" />;
      case 'hard':
        return <FaFrown className="text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">Select Difficulty:</h3>
      <div className="flex space-x-2">
        {difficulties.map((difficulty) => (
          <Tooltip
            key={difficulty}
            title={difficultyDescriptions[difficulty]}
            position="top"
            trigger="mouseenter"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onDifficultyChange(difficulty)}
              className={`flex items-center py-2 px-4 rounded-full font-bold ${
                currentDifficulty === difficulty
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {getIcon(difficulty)}
              <span className="ml-2">
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </span>
            </motion.button>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};

export default DifficultySelector;
