import React, { createContext, useState, useContext } from "react";
import { ArctypeProvider } from "./ArctypeProvider";

const CharsticsContext = createContext();

const CharProvider = ({ children }) => {
  const [selectWiderCards, setSelectWiderCards] = useState([]);
  const [selectOuterCards, setSelectOuterCards] = useState([]);
  const [selectInnerCards, setSelectInnerCards] = useState([]);
  return (
    <CharsticsContext.Provider
      value={{
        selectWiderCards,
        selectOuterCards,
        selectInnerCards,
        setSelectWiderCards,
        setSelectOuterCards,
        setSelectInnerCards,
      }}
    >
      <ArctypeProvider Element={children}/>
    </CharsticsContext.Provider>
  );
};

const useCharsticsContext = () => {
  return useContext(CharsticsContext);
};

export { CharProvider, useCharsticsContext };
