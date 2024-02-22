import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import React, { useContext, useEffect, useState } from "react";
import { useArctypeContext } from "../../contex/ArctypeProvider";
import Report from "../Report";
import ReportThankPage from "../ReportThankPage";
import InnerValueCard from "./InnerValueCard";
import { useCharsticsContext } from "../../contex/charsticsProvider";

const RankedTable = ({ selectedCombinations, combinations }) => {
  const selectedCombination = selectedCombinations.map((item) => item.name);
  const { selectInnerCards, setSelectInnerCards } = useCharsticsContext();
  const { setRankedArctype, RankedArctype} = useArctypeContext();


  const [innerCards, setInnerCards] = useState(null);
console.log("result");
useEffect(()=>{
  calculateRank(groupedKeysArray)
},[]);

  function generateCombinations(arr) {
    const combination = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        combination.push([arr[i], arr[j]]);
      }
    }
    return combination;
  }

  function findIndex(combination) {
    for (let i = 0; i < combinations.length; i++) {
      if (
        (combinations[i][0].name === combination[0] &&
          combinations[i][1].name === combination[1]) ||
        (combinations[i][0].name === combination[1] &&
          combinations[i][1].name === combination[0])
      ) {
        return selectedCombination[i];
      }
    }
    return combination;
  }

  const recursionCall = (arr) => {
    const frequencyMap = arr.reduce((map, item) => {
      !map[item] ? (map[item] = map[item] = 1) : (map[item] = map[item] + 1);
      return map;
    }, {});

    const entries = Object.entries(frequencyMap);
    // Sort the array in descending order based on values
    entries.sort((a, b) => b[1] - a[1]);
    const sortedObject = Object.fromEntries(entries);

    const groupedKeysArray = [];
    const seenValues = {};

    for (const key in sortedObject) {
      const value = sortedObject[key];
      if (!seenValues[value]) {
        seenValues[value] = true;
        groupedKeysArray.push([]);
      }
      groupedKeysArray[groupedKeysArray.length - 1].push(key);
    }

    return groupedKeysArray;
  };

    const groupedKeysArray = recursionCall(selectedCombination);
  

  // UI component of rank table 
  const RankTableUi = (flattenArray) => {
    return(
      <>
        {/* <div className="container mt-5">
          <table className="table">
            <thead>
              <tr>
                <th>Values</th>
                <th>Rank</th>
              </tr>
            </thead>
            <tbody>
              {flattenArray.map((item, index) => (
                <tr key={index}>
                  <td>{item}</td>
                  <td>{index + 1}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <button onClick={onClickReportGenerate} className=""> Generate Report</button>
        </div>
      </> */}
<Report />
</>)

  }

  const calculateRank = (groupedKeysArray) => {
    const outputArray = groupedKeysArray.map((curr) => {
      if (curr.length === 2) {
        let a = curr;
        curr = [findIndex(curr)];
        if (Array.isArray(a)) {
          const b = a.find((item) => item !== curr[0]);
          const m = selectedCombination.find((item) => item === b);
          curr.push(m);
        }
      }
      if (curr.length > 2) {
        const updated = generateCombinations(curr);
        const selectArray = updated.map((item) => {
          const a = findIndex(item);
          return a;
        });
        const based = recursionCall(selectArray);
        const c = based.map((item) => item.length);
        if (c.every((element) => element === 1)) {
          const d = curr;
          curr = [...based.flat(2)];
          const m = d.filter((item) => !curr.includes(item));
          curr = [...curr, ...m];
        }
        else {
          // const combo = generateCombinations(based);
          // const selectArray1 = combo[0].map((item) => {
          //     return findIndex(item);
          //   });
          //   const based1 = recursionCall(selectArray1);
          //   console.log(based1,"ddd")
        }
      }
      return curr;
    });

    const flattenArray = outputArray.flat(2);
    // set Rank Arctype  to context
    let InnerCards = flattenArray.map((ele) => {
      return selectInnerCards.find((item) => { return ele == item.name })
    });

    // it is basically use case when particular card is not selected among all 15 combination to solve that condition we basically write this logic
    let result= selectInnerCards.filter((ele)=>{return  !flattenArray.includes(ele.name)});
    // we find out out those entry which is not present and concat it ;
    InnerCards=InnerCards.concat(result);

     // set  inner level card order according to  table ranking  and set in context so that we can show it  in report 
      setSelectInnerCards(InnerCards);
    // setInnerCards(InnerCards);
     let resultRankedArcType=InnerCards.map((ele)=>{
      return ele.name
     })
      setRankedArctype(resultRankedArcType);
  };

return RankedArctype ? (<div style={{backgroundColor:'#fffaf6'}}>{<Report  innerCards={innerCards}/>}</div>) :null 
};

export default RankedTable;
