
import React, { createContext, useState, useContext } from "react";

const ArctypeContext = createContext({});
// This context basically provide information about   highet arctype(sun ,moon...)  for each wider , inner ,outer arctype
// Final Ranked table array creates by comparision of arctype value which we select during innear value arctype  card select

const ArctypeProvider = ({ Element }) => {
    const [highestWiderArctype, setHighestWiderArctype] = useState(null);
    const [highestInnerArctype, setHighestInnerArctype] = useState(null);
    const [highestOuterArctype, setHighestOuterArctype] = useState(null);
    const [imgUrl, setImgUrl] = useState([]);

    const [RankedArctype, setRankedArctype] = useState(null); // array consist of  RankedTableArctype   
     const [archetypeValues, setArchetypeValues] = useState({});// set data of card  in form of object


    return (
        <ArctypeContext.Provider
            value={{
                highestWiderArctype,
                highestInnerArctype,
                highestOuterArctype,
                RankedArctype,
                imgUrl,
                setHighestWiderArctype,
                setHighestInnerArctype,
                setHighestOuterArctype,
                setRankedArctype,
                setImgUrl
            }}
        >{
                Element
                /* component  WiderValueCard   which we pass in LearnerDashboard.js to our  CharProvide  component,  
                 use that component in  ArctypeProvide component   by passing in the form  prop by charProvide*/
            }  
              </ArctypeContext.Provider>
    );
};

const useArctypeContext = () => {
    return useContext(ArctypeContext);
};

// context for handling sign in and sign out button
const  signInProvider=createContext(null);
export { ArctypeProvider, useArctypeContext,signInProvider};
