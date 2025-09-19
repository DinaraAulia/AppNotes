import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ArchivePage from './pages/ArchivePage';
import NoteDetailPage from './pages/NoteDetailPage';
import AddNotePage from './pages/AddNotePage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Navigation from './components/Navigation';

import { getUserLogged, putAccessToken } from './utils/network-data';
import ThemeContext from './contexts/ThemeContext';
import LocaleContext from './contexts/LocaleContext';

const App = () => {
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [locale, setLocale] = useState(localStorage.getItem('locale') || 'id');

  useEffect(() => {
    async function getInitialData() {
      const { data } = await getUserLogged();
      setAuthedUser(data);
      setInitializing(false);
    }
    getInitialData();
  }, []);

  const themeContextValue = useMemo(() => {
    const toggleTheme = () => {
      setTheme((prevTheme) => {
        const newTheme = prevTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        return newTheme;
      });
    };
    return { theme, toggleTheme };
  }, [theme]);

  const localeContextValue = useMemo(() => {
    const toggleLocale = () => {
      setLocale((prevLocale) => {
        const newLocale = prevLocale === 'id' ? 'en' : 'id';
        localStorage.setItem('locale', newLocale);
        return newLocale;
      });
    };
    return { locale, toggleLocale };
  }, [locale]);

  const onLoginSuccess = async ({ accessToken }) => {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    setAuthedUser(data);
  };
  
  const onLogout = () => {
    setAuthedUser(null);
    putAccessToken('');
  };
  
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  if (initializing) {
    return null;
  }

  return (
    <LocaleContext.Provider value={localeContextValue}>
      <ThemeContext.Provider value={themeContextValue}>
        <div className="app-container">
          <header>
            <h1>{locale === 'id' ? 'Aplikasi Catatan' : 'Notes App'}</h1>
            {authedUser ? (
              <Navigation logout={onLogout} name={authedUser.name} />
            ) : (
              <Navigation />
            )}
          </header>
          <main>
            <Routes>
              {authedUser ? (
                <>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/archives" element={<ArchivePage />} />
                  <Route path="/notes/:id" element={<NoteDetailPage />} />
                  <Route path="/notes/new" element={<AddNotePage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </>
              ) : (
                <>
                  <Route path="/login" element={<LoginPage loginSuccess={onLoginSuccess} />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="*" element={<LoginPage loginSuccess={onLoginSuccess} />} />
                </>
              )}
            </Routes>
          </main>
        </div>
      </ThemeContext.Provider>
    </LocaleContext.Provider>
  );
};

export default App;