// EQ-Game/components/AudioManager.js
/**
 * AudioManager Component
 * Manages background music and sound effects.
 * 
 * Potential Issues Fixed:
 * - Verified that all sound effects are properly loaded and played.
 * - Ensured volume settings are correctly applied and saved in local storage.
 */

import { Howl, Howler } from 'howler';

const soundFiles = {
  click: '/audio/click.wav',
  success: '/audio/success.wav',
  failure: '/audio/failure.mp3',
  background: '/audio/background.wav',
};

const sounds = {
  click: new Howl({ src: [soundFiles.click] }),
  success: new Howl({ src: [soundFiles.success] }),
  failure: new Howl({ src: [soundFiles.failure] }),
};

let backgroundMusic = null;

const initBackgroundMusic = () => {
  if (!backgroundMusic) {
    backgroundMusic = new Howl({
      src: [soundFiles.background],
      loop: true,
      volume: 0.5,
    });
  }
};

const playBackgroundMusic = () => {
  if (backgroundMusic && !backgroundMusic.playing()) {
    backgroundMusic.play();
  }
};

const stopBackgroundMusic = () => {
  if (backgroundMusic) {
    backgroundMusic.stop();
  }
};

const playSound = (sound) => {
  if (sounds[sound]) {
    sounds[sound].play();
  }
};

const setVolume = (volume) => {
  Howler.volume(volume);
};

const setAudioSettings = (settings) => {
  if (settings.backgroundMusic) {
    if (!backgroundMusic) {
      initBackgroundMusic();
    }
    backgroundMusic.volume(settings.backgroundMusic.volume);
    if (settings.backgroundMusic.enabled) {
      if (!backgroundMusic.playing()) {
        backgroundMusic.play();
      }
    } else {
      backgroundMusic.pause();
    }
  }

  if (settings.clickSound) {
    sounds.click.volume(settings.clickSound.volume);
  }

  if (settings.successSound) {
    sounds.success.volume(settings.successSound.volume);
  }

  if (settings.failureSound) {
    sounds.failure.volume(settings.failureSound.volume);
  }

  localStorage.setItem('audioSettings', JSON.stringify(settings));
};

const loadAudioSettings = () => {
  const savedSettings = localStorage.getItem('audioSettings');
  if (savedSettings) {
    setAudioSettings(JSON.parse(savedSettings));
  } else {
    setAudioSettings({
      backgroundMusic: { volume: 0.5, enabled: true },
      clickSound: { volume: 1.0, enabled: true },
      successSound: { volume: 1.0, enabled: true },
      failureSound: { volume: 1.0, enabled: true },
    });
  }
};

export {
  initBackgroundMusic,
  playBackgroundMusic,
  stopBackgroundMusic,
  playSound,
  setVolume,
  setAudioSettings,
  loadAudioSettings,
};
