import React from 'react';

const LocaleContext = React.createContext();

export const useLocale = () => React.useContext(LocaleContext);

export default LocaleContext;