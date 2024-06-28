import '../styles/globals.css';
import '../styles/themes.css';
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <AppContent>
        <Component {...pageProps} />
        <ToastContainer />
      </AppContent>
    </ThemeProvider>
  );
}

const AppContent = ({ children }) => {
  const { setThemeSettings } = useTheme();

  const [settings, setSettings] = useState({
    backgroundMusic: { volume: 0.5, enabled: true },
    clickSound: { volume: 1.0, enabled: true },
    successSound: { volume: 1.0, enabled: true },
    failureSound: { volume: 1.0, enabled: true },
    theme: 'light',
    textSize: 14,
    font: 'Arial',
    primaryColor: '#4CAF50',
    secondaryColor: '#ff5722',
    notifications: true,
    backgroundColor: '#ffffff',
    fontColor: '#000000'
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem('appSettings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setSettings(settings);
      setThemeSettings(settings);
    }
  }, [setThemeSettings]);

  const handleSaveSettings = (newSettings) => {
    setSettings(newSettings);
    localStorage.setItem('appSettings', JSON.stringify(newSettings));
    setThemeSettings(newSettings);
  };

  return children;
};

export default MyApp;
