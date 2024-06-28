// File: components/UserProfile.js
import React, { useState } from 'react';
import UserAvatar from './UserAvatar';

const UserProfile = ({ onSave, initialName, initialAvatar, onClose }) => {
  const [name, setName] = useState(initialName);
  const [avatar, setAvatar] = useState(initialAvatar);
  const [bio, setBio] = useState('');

  const handleSave = () => {
    onSave(name, avatar, bio);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full text-gray-800 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">User Profile</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Enter your name" 
            className="mt-1 p-2 border rounded w-full bg-gray-100 text-gray-800"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Bio</label>
          <textarea 
            value={bio} 
            onChange={(e) => setBio(e.target.value)} 
            placeholder="Tell us about yourself" 
            className="mt-1 p-2 border rounded w-full bg-gray-100 text-gray-800"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Avatar</label>
          <UserAvatar onSave={setAvatar} />
        </div>
        <div className="flex justify-end">
          <button 
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
