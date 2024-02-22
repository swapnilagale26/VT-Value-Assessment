// UserContext.js
import React, { createContext, useState, useContext } from 'react';

const ValueContext = createContext();

const ValueProvider = ({ children }) => {
  const [Value, setValue] = useState(''); // Set an initial value if needed

  return (
    <ValueContext.Provider value={{ Value, setValue }}>
      {children}
    </ValueContext.Provider>
  );
};

const useValueContext = () => {
  return useContext(ValueContext);
};

export { ValueProvider, useValueContext };
