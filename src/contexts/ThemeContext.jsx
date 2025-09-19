import React from 'react';

const ThemeContext = React.createContext();

export const useTheme = () => React.useContext(ThemeContext);

export default ThemeContext;