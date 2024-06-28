// EQ-Game/components/mini-games/ReactionTimeGame.js
/**
 * ReactionTimeGame Component
 * Measures reaction times with multiple rounds and scoring based on speed and false starts.
 * 
 * Potential Issues Fixed:
 * - Accurate calculation and display of reaction times and false starts.
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ReactionTimeGame = ({ onFinish }) => {
  const [gameState, setGameState] = useState('idle');
  const [message, setMessage] = useState('Get ready!');
  const [startTime, setStartTime] = useState(null);
  const [reactionTimes, setReactionTimes] = useState([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [falseStarts, setFalseStarts] = useState(0);
  const [bestTime, setBestTime] = useState(null);
  const [averageTime, setAverageTime] = useState(null);
  const [countdown, setCountdown] = useState(3);
  const requestRef = useRef();
  const startTimeRef = useRef();

  const totalRounds = 5;
  const shapes = ['circle', 'square', 'triangle', 'diamond', 'star'];

  useEffect(() => {
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  const startGame = () => {
    setGameState('countdown');
    setMessage('Get ready...');
    setCountdown(3);
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(countdownInterval);
          initiateRound();
        }
        return prev - 1;
      });
    }, 1000);
  };

  const initiateRound = () => {
    setGameState('waiting');
    setMessage('Wait for the shape...');
    const delay = Math.random() * 3000 + 1000;
    setTimeout(() => {
      setGameState('ready');
      setMessage('Click now!');
      startTimeRef.current = performance.now();
      requestRef.current = requestAnimationFrame(updateTimer);
    }, delay);
  };

  const updateTimer = () => {
    if (gameState === 'ready') {
      requestRef.current = requestAnimationFrame(updateTimer);
    }
  };

  const handleClick = () => {
    if (gameState === 'waiting') {
      setFalseStarts(falseStarts + 1);
      setMessage('Too early! Wait for the shape.');
      setTimeout(initiateRound, 1500);
    } else if (gameState === 'ready') {
      const endTime = performance.now();
      const reactionTime = endTime - startTimeRef.current;
      setReactionTimes([...reactionTimes, reactionTime]);
      setCurrentRound(currentRound + 1);
      cancelAnimationFrame(requestRef.current);

      if (bestTime === null || reactionTime < bestTime) {
        setBestTime(reactionTime);
      }

      if (currentRound + 1 < totalRounds) {
        setTimeout(initiateRound, 1500);
      } else {
        finishGame();
      }
    }
  };

  const finishGame = () => {
    setGameState('finished');
    const avg = reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length;
    setAverageTime(avg);
    const score = Math.max(1000 - Math.floor(avg) - (falseStarts * 50), 0);
    onFinish(score);
  };

  const getReactionTimeColor = (time) => {
    if (time < 200) return 'text-green-500';
    if (time < 300) return 'text-blue-500';
    if (time < 400) return 'text-yellow-500';
    return 'text-red-500';
  };

  const renderShape = () => {
    const shape = shapes[currentRound % shapes.length];
    switch (shape) {
      case 'circle':
        return <div className="w-20 h-20 rounded-full bg-blue-500"></div>;
      case 'square':
        return <div className="w-20 h-20 bg-red-500"></div>;
      case 'triangle':
        return <div className="w-0 h-0 border-l-[40px] border-r-[40px] border-b-[69px] border-l-transparent border-r-transparent border-b-green-500"></div>;
      case 'diamond':
        return <div className="w-20 h-20 bg-yellow-500 transform rotate-45"></div>;
      case 'star':
        return (
          <div className="w-0 h-0 border-l-[30px] border-r-[30px] border-b-[80px] border-l-transparent border-r-transparent border-b-purple-500 relative">
            <div className="w-0 h-0 border-l-[30px] border-r-[30px] border-t-[80px] border-l-transparent border-r-transparent border-t-purple-500 absolute top-[25px] left-[-30px]"></div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="text-center max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Reaction Time Challenge</h2>
      <AnimatePresence>
        <motion.div
          key={gameState}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="p-8 rounded-lg shadow-lg bg-gray-100 transition-colors duration-300"
        >
          <h3 className="text-xl font-bold mb-4">{message}</h3>
          {gameState === 'idle' && (
            <button
              onClick={startGame}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Start Game
            </button>
          )}
          {gameState === 'countdown' && (
            <div className="text-6xl font-bold text-blue-500">{countdown}</div>
          )}
          {(gameState === 'waiting' || gameState === 'ready') && (
            <button
              onClick={handleClick}
              className="w-full h-40 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded flex items-center justify-center"
            >
              {gameState === 'ready' && renderShape()}
              {gameState === 'waiting' && "Wait for the shape!"}
            </button>
          )}
          {gameState === 'finished' && (
            <div>
              <p className="mb-2">Game Over! Your results:</p>
              {reactionTimes.map((time, index) => (
                <p key={index} className={`font-semibold ${getReactionTimeColor(time)}`}>
                  Round {index + 1}: {time.toFixed(2)} ms
                </p>
              ))}
              <p className="mt-2">False starts: {falseStarts}</p>
              <p className="font-bold mt-2">Best time: {bestTime ? bestTime.toFixed(2) : 'N/A'} ms</p>
              <p className="font-bold">Average time: {averageTime ? averageTime.toFixed(2) : 'N/A'} ms</p>
              <button
                onClick={() => onFinish(Math.max(1000 - Math.floor(averageTime) - (falseStarts * 50), 0))}
                className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              >
                Finish
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
      {gameState !== 'finished' && gameState !== 'idle' && (
        <div className="mt-4">
          <p>Round: {currentRound + 1} / {totalRounds}</p>
          <p>False starts: {falseStarts}</p>
        </div>
      )}
    </div>
  );
};

export default ReactionTimeGame;
