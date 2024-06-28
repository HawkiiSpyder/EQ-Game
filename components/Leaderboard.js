// File: components/Leaderboard.js
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Leaderboard = ({ onClose }) => {
  const [scores, setScores] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const scoresPerPage = 10;

  useEffect(() => {
    const storedScores = JSON.parse(localStorage.getItem('EQGameScores')) || [];
    setScores(storedScores);
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const filteredScores = scores.filter(
    (entry) =>
      (entry.name && entry.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (entry.difficulty && entry.difficulty.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const indexOfLastScore = currentPage * scoresPerPage;
  const indexOfFirstScore = indexOfLastScore - scoresPerPage;
  const currentScores = filteredScores.slice(indexOfFirstScore, indexOfLastScore);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-lg p-8 max-w-lg w-full shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
        <input
          type="text"
          placeholder="Search by name or difficulty"
          value={searchQuery}
          onChange={handleSearch}
          className="mb-4 p-2 border rounded w-full"
        />
        <ul>
          {currentScores
            .sort((a, b) => b.score - a.score)
            .map((entry, index) => (
              <li key={index} className="mb-2">
                {indexOfFirstScore + index + 1}. {entry.name} - Score: {entry.score} - Difficulty: {entry.difficulty ? entry.difficulty.charAt(0).toUpperCase() + entry.difficulty.slice(1) : ''}
              </li>
            ))}
        </ul>
        <div className="flex justify-between mt-4">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
          >
            Previous
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastScore >= filteredScores.length}
            className={`px-4 py-2 rounded ${indexOfLastScore >= filteredScores.length ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
          >
            Next
          </button>
        </div>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </motion.div>
  );
};

export default Leaderboard;
