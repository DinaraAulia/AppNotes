import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FiHome, FiArchive, FiLogOut, FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';
import { useLocale } from '../contexts/LocaleContext';

const Navigation = ({ logout, name }) => {
  const { theme, toggleTheme } = useTheme();
  const { locale, toggleLocale } = useLocale() || { locale: 'id', toggleLocale: () => {} };

  const localizedText = {
    id: {
      logout: 'Keluar',
    },
    en: {
      logout: 'Logout',
    },
  };

  return (
    <nav className="navigation">
      <ul>
        {name && (
          <>
            <li><Link to="/"><FiHome /></Link></li>
            <li><Link to="/archives"><FiArchive /></Link></li>
          </>
        )}
        <li><button onClick={toggleTheme} className="navigation__icon-button">{theme === 'dark' ? <FiSun /> : <FiMoon />}</button></li>
        <li><button onClick={toggleLocale} className="navigation__icon-button">{locale === 'id' ? 'en' : 'id'}</button></li>
        {name && (<li><button onClick={logout} className="navigation__icon-button">{name} <FiLogOut /></button></li>)}
      </ul>
    </nav>
  );
};

Navigation.propTypes = {
  logout: PropTypes.func, 
  name: PropTypes.string,
};

export default Navigation;