// File: components/Settings.js

import React, { useState, useEffect } from 'react';
import { setAudioSettings } from './AudioManager';
import ReactSlider from 'react-slider';
import { useTheme } from '../context/ThemeContext';

const Settings = ({ onClose, settings, onSave }) => {
  const { theme, toggleTheme, availableThemes, backgroundColor, changeBackgroundColor, fontColor, changeFontColor } = useTheme();
  const [localSettings, setLocalSettings] = useState(settings || {
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

  const [activeTab, setActiveTab] = useState('audio');

  useEffect(() => {
    if (settings) {
      setLocalSettings(settings);
    }
  }, [settings]);

  const handleChange = (key, value) => {
    setLocalSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSoundChange = (soundType, key, value) => {
    setLocalSettings(prev => ({
      ...prev,
      [soundType]: { ...prev[soundType], [key]: value }
    }));
  };

  const handleSave = () => {
    onSave(localSettings);
    setAudioSettings(localSettings);
    changeBackgroundColor(localSettings.backgroundColor);
    changeFontColor(localSettings.fontColor);
    onClose();
  };

  const renderSoundSetting = (soundType, label) => (
    <div className="mb-4">
      <label>{label} Volume</label>
      <ReactSlider
        className="horizontal-slider"
        thumbClassName="example-thumb"
        trackClassName="example-track"
        value={localSettings[soundType].volume}
        onChange={(value) => handleSoundChange(soundType, 'volume', value)}
        min={0}
        max={1}
        step={0.01}
      />
      <label className="flex items-center mt-2">
        <input
          type="checkbox"
          checked={localSettings[soundType].enabled}
          onChange={() => handleSoundChange(soundType, 'enabled', !localSettings[soundType].enabled)}
          className="mr-2"
        />
        Enable {label}
      </label>
    </div>
  );

  const tabs = [
    { id: 'audio', label: 'Audio' },
    { id: 'appearance', label: 'Appearance' },
    { id: 'gameplay', label: 'Gameplay' },
  ];

  return (
    <div className="settings-modal bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>
      
      <div className="mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`mr-2 px-4 py-2 rounded ${
              activeTab === tab.id ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'audio' && (
        <div>
          {renderSoundSetting('backgroundMusic', 'Background Music')}
          {renderSoundSetting('clickSound', 'Click Sound')}
          {renderSoundSetting('successSound', 'Success Sound')}
          {renderSoundSetting('failureSound', 'Failure Sound')}
        </div>
      )}

      {activeTab === 'appearance' && (
        <div>
          <div className="mb-4">
            <label className="block mb-2">Theme</label>
            <select
              value={localSettings.theme}
              onChange={(e) => handleChange('theme', e.target.value)}
              className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
            >
              {availableThemes.map((theme) => (
                <option key={theme} value={theme}>{theme.charAt(0).toUpperCase() + theme.slice(1)}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Text Size</label>
            <ReactSlider
              className="horizontal-slider"
              thumbClassName="example-thumb"
              trackClassName="example-track"
              value={localSettings.textSize}
              onChange={(value) => handleChange('textSize', value)}
              min={12}
              max={24}
              step={1}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Font</label>
            <select
              value={localSettings.font}
              onChange={(e) => handleChange('font', e.target.value)}
              className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
            >
              <option value="Arial">Arial</option>
              <option value="Helvetica">Helvetica</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Courier New">Courier New</option>
              <option value="Georgia">Georgia</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Background Color</label>
            <input
              type="color"
              value={localSettings.backgroundColor}
              onChange={(e) => handleChange('backgroundColor', e.target.value)}
              className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Font Color</label>
            <input
              type="color"
              value={localSettings.fontColor}
              onChange={(e) => handleChange('fontColor', e.target.value)}
              className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
            />
          </div>
        </div>
      )}

      {activeTab === 'gameplay' && (
        <div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={localSettings.notifications}
                onChange={() => handleChange('notifications', !localSettings.notifications)}
                className="mr-2"
              />
              Enable Notifications
            </label>
          </div>
          {/* Add more gameplay settings here */}
        </div>
      )}

      <div className="flex justify-end mt-6">
        <button
          onClick={handleSave}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Save & Close
        </button>
        <button
          onClick={onClose}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Settings;
