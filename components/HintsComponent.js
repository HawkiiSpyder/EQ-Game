// File: components/HintsComponent.js
import React from 'react';

const HintsComponent = ({ hint, onUseHint }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <h3 className="text-xl font-bold mb-2">Hint</h3>
      <p className="mb-4">{hint}</p>
      <button 
        onClick={onUseHint}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Use Hint
      </button>
    </div>
  );
};

export default HintsComponent;
