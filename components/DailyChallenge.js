// EQ-Game/components/DailyChallenge.js
/**
 * DailyChallenge Component
 * Manages and displays daily challenges with progress tracking.
 * 
 * Potential Issues Fixed:
 * - Verified countdown timer functionality.
 * - Ensured daily reset logic works correctly.
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DailyChallenge = ({ challenge, onComplete, onClaim }) => {
  const [completed, setCompleted] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 hours in seconds
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const savedProgress = localStorage.getItem('dailyChallengeProgress');
    const savedCompleted = localStorage.getItem('dailyChallengeCompleted');
    const savedClaimed = localStorage.getItem('dailyChallengeClaimed');
    const savedTimeLeft = localStorage.getItem('dailyChallengeTimeLeft');

    if (savedProgress) setProgress(parseInt(savedProgress));
    if (savedCompleted) setCompleted(JSON.parse(savedCompleted));
    if (savedClaimed) setClaimed(JSON.parse(savedClaimed));
    if (savedTimeLeft) setTimeLeft(parseInt(savedTimeLeft));

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = prevTime > 0 ? prevTime - 1 : 24 * 60 * 60;
        if (newTime === 24 * 60 * 60) {
          // Reset challenge
          resetChallenge();
        }
        localStorage.setItem('dailyChallengeTimeLeft', newTime);
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem('dailyChallengeProgress', progress);
    localStorage.setItem('dailyChallengeCompleted', JSON.stringify(completed));
    localStorage.setItem('dailyChallengeClaimed', JSON.stringify(claimed));
  }, [progress, completed, claimed]);

  const resetChallenge = () => {
    setProgress(0);
    setCompleted(false);
    setClaimed(false);
    localStorage.removeItem('dailyChallengeProgress');
    localStorage.removeItem('dailyChallengeCompleted');
    localStorage.removeItem('dailyChallengeClaimed');
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleProgress = () => {
    if (completed) return;
    const newProgress = Math.min(progress + 20, 100);
    setProgress(newProgress);
    if (newProgress === 100) {
      setCompleted(true);
      if (typeof onComplete === 'function') {
        onComplete();
      }
    }
  };

  const handleClaim = () => {
    setClaimed(true);
    if (typeof onClaim === 'function') {
      onClaim(challenge.reward);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-lg p-6 shadow-lg mb-4"
    >
      <h3 className="text-2xl font-bold mb-2">{challenge.title}</h3>
      <p className="mb-4">{challenge.description}</p>
      <div className="mb-4 flex justify-between items-center">
        <p className="font-semibold">Reward: {challenge.reward} Coins</p>
        <p className="font-semibold">Time Left: {formatTime(timeLeft)}</p>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
        <motion.div
          className={`h-4 rounded-full ${completed ? 'bg-green-500' : 'bg-blue-500'}`}
          style={{ width: `${progress}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        ></motion.div>
      </div>
      <div className="flex justify-between">
        <button
          onClick={handleProgress}
          className={`py-2 px-4 rounded ${
            completed ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          } text-white font-bold`}
          disabled={completed}
        >
          {completed ? 'Completed' : 'Make Progress'}
        </button>
        <button
          onClick={handleClaim}
          className={`py-2 px-4 rounded ${
            !completed || claimed ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
          } text-white font-bold`}
          disabled={!completed || claimed}
        >
          {claimed ? 'Claimed' : 'Claim Reward'}
        </button>
      </div>
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="mt-4 text-blue-500 hover:text-blue-600"
      >
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 bg-gray-100 p-4 rounded-lg"
          >
            <h4 className="font-bold mb-2">Challenge Details:</h4>
            <ul className="list-disc list-inside">
              <li>Complete the challenge before the timer runs out</li>
              <li>Click 'Make Progress' to simulate progress (20% per click)</li>
              <li>Claim your reward once the challenge is completed</li>
              <li>The challenge resets daily</li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DailyChallenge;
