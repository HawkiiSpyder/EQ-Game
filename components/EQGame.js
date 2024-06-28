// File: EQ-Game/components/EQGame.js

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Trophy, TrendingUp, Zap, Heart } from 'lucide-react';
import { questions } from '../data/questions';
import MainMenu from './MainMenu';
import ScenarioComponent from './ScenarioComponent';
import FeedbackComponent from './FeedbackComponent';
import LessonComponent from './LessonComponent';
import AchievementModal from './AchievementModal';
import PowerUpShop from './PowerUpShop';
import GameOver from './GameOver';
import Leaderboard from './Leaderboard';
import UserProfile from './UserProfile';
import DailyChallenge from './DailyChallenge';
import HintsComponent from './HintsComponent';
import Settings from './Settings';
import DifficultySelector from './DifficultySelector';
import MiniGameLauncher from './MiniGameLauncher';
import Tutorial from './Tutorial';
import ProgressChart from './ProgressChart';
import { initBackgroundMusic, loadAudioSettings, playBackgroundMusic, stopBackgroundMusic, playSound, setVolume } from './AudioManager';
import Navigation from './Navigation';
import { toast } from 'react-toastify';

const EQGame = () => {
  // Game State
  const [gameState, setGameState] = useState('menu');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [coins, setCoins] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [difficulty, setDifficulty] = useState('medium');

  // UI State
  const [showFeedback, setShowFeedback] = useState(false);
  const [showLesson, setShowLesson] = useState(false);
  const [showAchievementModal, setShowAchievementModal] = useState(false);
  const [showPowerUpShop, setShowPowerUpShop] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showMiniGame, setShowMiniGame] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showProgressChart, setShowProgressChart] = useState(false);
  const [showDailyChallenge, setShowDailyChallenge] = useState(false);

  // Game Mechanics
  const [selectedOption, setSelectedOption] = useState(null);
  const [timer, setTimer] = useState(30);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [activePowerUps, setActivePowerUps] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [dailyChallengeCompleted, setDailyChallengeCompleted] = useState(false);
  const [dailyChallenge, setDailyChallenge] = useState(null);

  // User Data
  const [userName, setUserName] = useState('');
  const [unlockedAchievements, setUnlockedAchievements] = useState({
    quickThinker: 0,
    empathyMaster: 0,
    consistentPerformer: 0,
    coinCollector: 0,
    miniGameChampion: 0,
    dailyChallenger: 0,
    eqExpert: 0,
    socialButterfly: 0
  });

  // Settings
  const [settings, setSettings] = useState({
    backgroundMusic: { volume: 0.5, enabled: true },
    clickSound: { volume: 0.5, enabled: true },
    successSound: { volume: 0.5, enabled: true },
    failureSound: { volume: 0.5, enabled: true },
    theme: 'light',
    textSize: 14,
    font: 'Arial',
    notifications: true,
    backgroundColor: '#ffffff',
    fontColor: '#000000'
  });

  // Progress Tracking
  const [progressData, setProgressData] = useState([]);
  const [personalBest, setPersonalBest] = useState(0);

  useEffect(() => {
    initBackgroundMusic();
    loadAudioSettings();
    playBackgroundMusic();
    loadGameState();
    return () => stopBackgroundMusic();
  }, []);

  useEffect(() => {
    setVolume(settings.backgroundMusic.volume);
  }, [settings.backgroundMusic.volume]);

  useEffect(() => {
    saveGameState();
  }, [currentQuestion, score, level, xp, streak, coins, difficulty, unlockedAchievements, userName, dailyChallengeCompleted]);

  useEffect(() => {
    let interval;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => setTimer(timer - 1), 1000);
    } else if (timer === 0) {
      handleTimeout();
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  const loadGameState = () => {
    const savedState = JSON.parse(localStorage.getItem('EQGameState'));
    if (savedState) {
      setCurrentQuestion(savedState.currentQuestion);
      setScore(savedState.score);
      setLevel(savedState.level);
      setXp(savedState.xp);
      setStreak(savedState.streak);
      setCoins(savedState.coins);
      setDifficulty(savedState.difficulty);
      setUnlockedAchievements(savedState.unlockedAchievements);
      setUserName(savedState.userName);
      setDailyChallengeCompleted(savedState.dailyChallengeCompleted);
      setHearts(savedState.hearts || 3);
      setPersonalBest(savedState.personalBest || 0);
      setProgressData(savedState.progressData || []);
      setSettings({
        ...settings,
        backgroundColor: savedState.backgroundColor || '#ffffff',
        fontColor: savedState.fontColor || '#000000',
      });
    }
    setDailyChallenge(generateDailyChallenge());
  };

  const saveGameState = () => {
    const gameState = {
      currentQuestion,
      score,
      level,
      xp,
      streak,
      coins,
      hearts,
      difficulty,
      unlockedAchievements,
      userName,
      dailyChallengeCompleted,
      personalBest,
      progressData,
      backgroundColor: settings.backgroundColor,
      fontColor: settings.fontColor,
    };
    localStorage.setItem('EQGameState', JSON.stringify(gameState));
  };

  const checkAchievement = useCallback((type) => {
    const newUnlockedAchievements = { ...unlockedAchievements };
    switch (type) {
      case 'correctAnswer':
        if (timer > 20) newUnlockedAchievements.quickThinker = Math.min((newUnlockedAchievements.quickThinker || 0) + 1, 3);
        if (streak === 5) newUnlockedAchievements.empathyMaster = Math.min((newUnlockedAchievements.empathyMaster || 0) + 1, 3);
        break;
      case 'levelUp':
        newUnlockedAchievements.consistentPerformer = Math.min((newUnlockedAchievements.consistentPerformer || 0) + 1, 3);
        break;
      case 'coinMilestone':
        if (coins >= 1000) newUnlockedAchievements.coinCollector = Math.min((newUnlockedAchievements.coinCollector || 0) + 1, 3);
        break;
      case 'miniGame':
        newUnlockedAchievements.miniGameChampion = Math.min((newUnlockedAchievements.miniGameChampion || 0) + 1, 3);
        break;
      case 'dailyChallenge':
        newUnlockedAchievements.dailyChallenger = Math.min((newUnlockedAchievements.dailyChallenger || 0) + 1, 3);
        break;
      case 'eqExpert':
        newUnlockedAchievements.eqExpert = Math.min((newUnlockedAchievements.eqExpert || 0) + 1, 3);
        break;
      case 'socialButterfly':
        newUnlockedAchievements.socialButterfly = Math.min((newUnlockedAchievements.socialButterfly || 0) + 1, 3);
        break;
      default:
        break;
    }
    setUnlockedAchievements(newUnlockedAchievements);
    if (JSON.stringify(newUnlockedAchievements) !== JSON.stringify(unlockedAchievements)) {
      toast.success('New achievement unlocked!');
    }
  }, [unlockedAchievements, timer, streak, coins]);

  const generateDailyChallenge = () => {
    const today = new Date().toDateString();
    const savedChallenge = localStorage.getItem('dailyChallenge');
    if (savedChallenge && JSON.parse(savedChallenge).date === today) {
      return JSON.parse(savedChallenge).challenge;
    }
    const newChallenge = {
      date: today,
      challenge: {
        title: "Daily EQ Challenge",
        description: "Complete 5 scenarios in a row without mistakes.",
        reward: 100
      }
    };
    localStorage.setItem('dailyChallenge', JSON.stringify(newChallenge));
    return newChallenge.challenge;
  };

  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty);
    setTimer(newDifficulty === 'easy' ? 45 : newDifficulty === 'medium' ? 30 : 20);
  };

  const handleAnswer = (index) => {
    setIsTimerRunning(false);
    setSelectedOption(index);
    setShowFeedback(true);
    if (questions[currentQuestion].options[index].correct) {
      playSound('success');
      const difficultyMultiplier = difficulty === 'easy' ? 1 : difficulty === 'medium' ? 1.5 : 2;
      const points = Math.round(timer * 10 * (1 + streak * 0.1) * difficultyMultiplier);
      setScore(score + points);
      setStreak(streak + 1);
      setXp(xp + points);
      setCoins(coins + Math.round(points / 10));
      if (xp + points >= level * 1000) {
        setLevel(level + 1);
        setXp(0);
        checkAchievement('levelUp');
      }
      checkAchievement('correctAnswer');
    } else {
      playSound('failure');
      setStreak(0);
      setHearts(hearts - 1);
      if (hearts - 1 <= 0) {
        setGameState('gameOver');
      }
    }
  };

  const handleTimeout = () => {
    setIsTimerRunning(false);
    setShowFeedback(true);
    setSelectedOption(null);
    setStreak(0);
    setHearts(hearts - 1);
    if (hearts - 1 <= 0) {
      setGameState('gameOver');
    }
    playSound('failure');
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowFeedback(false);
      setShowLesson(false);
      setSelectedOption(null);
      setTimer(difficulty === 'easy' ? 45 : difficulty === 'medium' ? 30 : 20);
      setIsTimerRunning(false);
    } else {
      finishGame();
    }
  };

  const finishGame = () => {
    setGameState('gameOver');
    const finalScore = score + (hearts * 50) + (level * 100);
    if (finalScore > personalBest) {
      setPersonalBest(finalScore);
      toast.success('New personal best!');
    }
    setProgressData([...progressData, { date: new Date(), score: finalScore }]);
    const storedScores = JSON.parse(localStorage.getItem('EQGameScores')) || [];
    const newEntry = { name: userName, score: finalScore, difficulty };
    localStorage.setItem('EQGameScores', JSON.stringify([...storedScores, newEntry]));
  };

  const restartGame = () => {
    setGameState('playing');
    setCurrentQuestion(0);
    setScore(0);
    setLevel(1);
    setXp(0);
    setStreak(0);
    setCoins(0);
    setHearts(3);
    setShowFeedback(false);
    setShowLesson(false);
    setSelectedOption(null);
    setTimer(difficulty === 'easy' ? 45 : difficulty === 'medium' ? 30 : 20);
    setIsTimerRunning(false);
    setDailyChallengeCompleted(false);
    setActivePowerUps([]);
  };

  const handleSaveSettings = (newSettings) => {
    setSettings(newSettings);
    setShowSettings(false);
    toast.success('Settings saved successfully!');
  };

  const handlePowerUpUse = (powerUpId) => {
    switch (powerUpId) {
      case 1: // Time Freeze
        setTimer(timer + 10);
        break;
      case 2: // Hint
        setCurrentHint(questions[currentQuestion].hint);
        setShowHint(true);
        break;
      case 3: // Double Points
        setScore((prevScore) => prevScore + (timer * 20 * (1 + streak * 0.1)));
        setCoins((prevCoins) => prevCoins + Math.round((timer * 20 * (1 + streak * 0.1)) / 10));
        break;
      case 4: // Skip Question
        nextQuestion();
        break;
      case 5: // Empathy Boost
        setScore((prevScore) => prevScore + 50);
        break;
      case 6: // Streak Shield
        setStreak((prevStreak) => prevStreak > 0 ? prevStreak : prevStreak + 1);
        break;
      case 7: // Heart Regeneration
        setHearts(Math.min(hearts + 1, 5));
        break;
      default:
        break;
    }
    setActivePowerUps(activePowerUps.filter(id => id !== powerUpId));
    toast.info('Power-up activated!');
  };

  const handleDailyChallengeComplete = () => {
    setDailyChallengeCompleted(true);
    setCoins(coins + dailyChallenge.reward);
    checkAchievement('dailyChallenge');
    toast.success('Daily challenge completed!');
  };

  const handleDailyChallengeClaim = (reward) => {
    setCoins(coins + reward);
    toast.success(`Claimed ${reward} coins!`);
  };

  const handleHome = () => {
    setGameState('menu');
    setShowSettings(false);
  };

  const handleBack = () => {
    if (gameState === 'playing') {
      setGameState('menu');
      setShowSettings(false);
    } else if (showAchievementModal || showPowerUpShop || showLeaderboard || showUserProfile || 
      showSettings || showMiniGame || showTutorial || showProgressChart) {
      setShowAchievementModal(false);
      setShowPowerUpShop(false);
      setShowLeaderboard(false);
      setShowUserProfile(false);
      setShowSettings(false);
      setShowMiniGame(false);
      setShowTutorial(false);
      setShowProgressChart(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-500 flex flex-col">
      <Navigation onHome={handleHome} onBack={handleBack} gameState={gameState} />

      <div className="flex-grow flex items-center justify-center p-4">
        {gameState === 'menu' && (
          <MainMenu 
            onStartGame={() => setGameState('playing')}
            onOpenLeaderboard={() => setShowLeaderboard(true)}
            onOpenAchievements={() => setShowAchievementModal(true)}
            onOpenProfile={() => setShowUserProfile(true)}
            onOpenSettings={() => setShowSettings(true)}
            onOpenMiniGames={() => setShowMiniGame(true)}
            onOpenDailyChallenge={() => setShowDailyChallenge(true)}
            onOpenTutorial={() => setShowTutorial(true)}
            onOpenProgressChart={() => setShowProgressChart(true)}
          />
        )}

        {gameState === 'playing' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full text-gray-800 animate-fadeIn"
          >
            <h1 className="text-3xl font-bold text-center mb-6">Goleman's Emotional Intelligence Master</h1>
            <DifficultySelector 
              currentDifficulty={difficulty} 
              onDifficultyChange={handleDifficultyChange} 
            />
            <div className="flex justify-between mb-4 text-lg">
              <motion.div whileHover={{ scale: 1.1 }} className="flex items-center">
                <Star className="w-6 h-6 text-yellow-500 mr-2" />
                <span>Level: {level}</span>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} className="flex items-center">
                <TrendingUp className="w-6 h-6 text-green-500 mr-2" />
                <span>XP: {xp}/{level * 1000}</span>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} className="flex items-center">
                <Trophy className="w-6 h-6 text-purple-500 mr-2" />
                <span>Streak: {streak}</span>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} className="flex items-center">
                <Zap className="w-6 h-6 text-orange-500 mr-2" />
                <span>Coins: {coins}</span>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} className="flex items-center">
                <Heart className="w-6 h-6 text-red-500 mr-2" />
                <span>Hearts: {hearts}</span>
              </motion.div>
            </div>

            {questions && questions.length > 0 && currentQuestion < questions.length ? (
              !showFeedback && !showLesson ? (
                <ScenarioComponent
                  scenario={questions[currentQuestion]}
                  handleAnswer={handleAnswer}
                  timer={timer}
                  isTimerRunning={isTimerRunning}
                  setIsTimerRunning={setIsTimerRunning}
                  activePowerUps={activePowerUps}
                  onUsePowerUp={handlePowerUpUse}
                />
              ) : showFeedback ? (
                <FeedbackComponent
                  scenario={questions[currentQuestion]}
                  selectedOption={selectedOption}
                  onContinue={() => {
                    setShowFeedback(false);
                    setShowLesson(true);
                  }}
                />
              ) : (
                <LessonComponent
                  scenario={questions[currentQuestion]}
                  onContinue={nextQuestion}
                />
              )
            ) : (
              <div>No questions available.</div>
            )}
            <div className="mt-4 flex justify-between flex-wrap">
              <motion.button 
                whileHover={{ scale: 1.1 }} 
                whileTap={{ scale: 0.9 }} 
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded m-1"
                aria-label="View Achievements"
                onClick={() => setShowAchievementModal(true)}
              >
                Achievements
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1 }} 
                whileTap={{ scale: 0.9 }} 
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded m-1"
                aria-label="Open Power-Up Shop"
                onClick={() => setShowPowerUpShop(true)}
              >
                Power-Up Shop
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1 }} 
                whileTap={{ scale: 0.9 }} 
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded m-1"
                aria-label="View Leaderboard"
                onClick={() => setShowLeaderboard(true)}
              >
                Leaderboard
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1 }} 
                whileTap={{ scale: 0.9 }} 
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded m-1"
                aria-label="User Profile"
                onClick={() => setShowUserProfile(true)}
              >
                User Profile
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1 }} 
                whileTap={{ scale: 0.9 }} 
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded m-1"
                aria-label="Play Mini-Game"
                onClick={() => setShowMiniGame(true)}
              >
                Mini-Game
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1 }} 
                whileTap={{ scale: 0.9 }} 
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded m-1"
                aria-label="Open Settings"
                onClick={() => {
                  console.log('Settings button clicked');
                  setShowSettings(true);
                }}
              >
                Settings
              </motion.button>
            </div>
          </motion.div>
        )}
        {gameState === 'gameOver' && (
          <GameOver 
            score={score}
            difficulty={difficulty}
            onRestart={restartGame}
            onMainMenu={() => setGameState('menu')}
            personalBest={personalBest}
          />
        )}
      </div>

      <AnimatePresence>
        {showAchievementModal && (
          <Modal onClose={() => setShowAchievementModal(false)}>
            <AchievementModal 
              unlockedAchievements={unlockedAchievements} 
              onClose={() => setShowAchievementModal(false)} 
            />
          </Modal>
        )}
        {showPowerUpShop && (
          <Modal onClose={() => setShowPowerUpShop(false)}>
            <PowerUpShop 
              coins={coins} 
              setCoins={setCoins}
              onClose={() => setShowPowerUpShop(false)}
              onPurchase={(powerUpId) => setActivePowerUps([...activePowerUps, powerUpId])}
            />
          </Modal>
        )}
        {showLeaderboard && (
          <Modal onClose={() => setShowLeaderboard(false)}>
            <Leaderboard 
              difficulty={difficulty}
              onClose={() => setShowLeaderboard(false)} 
            />
          </Modal>
        )}
        {showUserProfile && (
          <Modal onClose={() => setShowUserProfile(false)}>
            <UserProfile 
              onSave={(name) => {
                setUserName(name);
                setShowUserProfile(false);
              }} 
              initialName={userName}
            />
          </Modal>
        )}
        {showHint && (
          <Modal onClose={() => setShowHint(false)}>
            <HintsComponent 
              hint={currentHint} 
              onUseHint={() => setShowHint(false)} 
            />
          </Modal>
        )}
        {showDailyChallenge && dailyChallenge && (
          <Modal onClose={() => setShowDailyChallenge(false)}>
            <DailyChallenge 
              challenge={dailyChallenge}
              onComplete={handleDailyChallengeComplete}
              onClaim={handleDailyChallengeClaim}
              completed={dailyChallengeCompleted}
            />
          </Modal>
        )}
        {showSettings && (
          <Modal onClose={() => setShowSettings(false)}>
            <Settings 
              onClose={() => setShowSettings(false)}
              settings={settings}
              onSave={handleSaveSettings}
            />
          </Modal>
        )}
        {showMiniGame && (
          <Modal onClose={() => setShowMiniGame(false)}>
            <MiniGameLauncher 
              onClose={() => setShowMiniGame(false)}
              onComplete={(score) => {
                setCoins(coins + score);
                checkAchievement('miniGame');
              }}
            />
          </Modal>
        )}
        {showTutorial && (
          <Modal onClose={() => setShowTutorial(false)}>
            <Tutorial onClose={() => setShowTutorial(false)} />
          </Modal>
        )}
        {showProgressChart && (
          <Modal onClose={() => setShowProgressChart(false)}>
            <ProgressChart 
              progressData={progressData}
              personalBest={personalBest}
              onClose={() => setShowProgressChart(false)}
            />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

const Modal = ({ children, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="bg-white rounded-lg p-6 m-4 max-w-xl w-full relative"
    >
      {children}
      <button 
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        ×
      </button>
    </motion.div>
  </motion.div>
);

export default EQGame;
