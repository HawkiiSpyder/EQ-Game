// File: pages/daily-challenge.js
import React from 'react';
import { dailyChallenges } from '../data/dailyChallenges';
import DailyChallenge from '../components/DailyChallenge';

const DailyChallengePage = () => {
  const handleChallengeComplete = (id) => {
    console.log(`Daily Challenge ${id} Completed!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-500 flex flex-col items-center justify-center p-4">
      {dailyChallenges.map((challenge) => (
        <DailyChallenge 
          key={challenge.id}
          challenge={challenge}
          onComplete={() => handleChallengeComplete(challenge.id)}
        />
      ))}
    </div>
  );
};

export default DailyChallengePage;
