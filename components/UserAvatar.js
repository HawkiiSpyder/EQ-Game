// File: components/UserAvatar.js
import React, { useState, useRef } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { motion } from 'framer-motion';

const UserAvatar = ({ onSave }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('none');
  const editorRef = useRef(null);

  const handleSave = () => {
    if (editorRef.current && image) {
      const canvas = editorRef.current.getImage().toDataURL();
      onSave(canvas);
    } else {
      alert("Please upload an image before saving.");
    }
  };

  const handleFileChange = (e) => {
    setLoading(true);
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const filters = [
    { name: 'None', value: 'none' },
    { name: 'Grayscale', value: 'grayscale(100%)' },
    { name: 'Sepia', value: 'sepia(100%)' },
    { name: 'Invert', value: 'invert(100%)' },
  ];

  return (
    <div className="flex flex-col items-center">
      {loading ? (
        <div className="loader"></div>
      ) : (
        <AvatarEditor
          ref={editorRef}
          image={image}
          width={250}
          height={250}
          border={50}
          borderRadius={125}
          scale={1.2}
          style={{ filter }}
        />
      )}
      <input
        type="file"
        onChange={handleFileChange}
        className="mt-4"
      />
      <div className="mt-4 flex space-x-2">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-2 rounded ${filter === f.value ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            {f.name}
          </button>
        ))}
      </div>
      <motion.button 
        whileHover={{ scale: 1.1 }} 
        whileTap={{ scale: 0.9 }} 
        onClick={handleSave}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Save Avatar
      </motion.button>
      <style jsx>{`
        .loader {
          border: 16px solid #f3f3f3;
          border-radius: 50%;
          border-top: 16px solid blue;
          width: 120px;
          height: 120px;
          animation: spin 2s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default UserAvatar;
