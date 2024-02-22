import ValueCards from "../ValueCards";
import { Row, Card } from "react-bootstrap";
import "../common.scss";
import "./HomePageCard.css"
import React, { useEffect, useState } from "react";
import RankedTable from "./RankedTable";
import { Button } from "react-bootstrap";
import SmallProgressBar from "./SmallProgressBar";
import { serverUrl } from "../../Constant/ReportValue";



const CombinationsRenderer = ({ cardData }) => {
  const combinationLength = 2; // Set the combination length to 2
  const [combinations, setCombinations] = useState([]);
  const [selectedCombination, setSelectedCombination] = useState([]);
  const [selectedCount, setSelectedCount] = useState(0);
  const [isShowTable, setIsShowTable] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [progress, setProgress] = useState(0);
  // const [popCombination, setPopCombination] = useState(null);
  const resulting=23;



  // Function to generate unique combinations of "name" properties
  function generateCombinations(currentCombination, remainingElements) {
    if (currentCombination.length === combinationLength) {
      setCombinations((prevCombinations) => [
        ...prevCombinations,
        currentCombination,
      ]);
    } else {
      for (let i = 0; i < remainingElements.length; i++) {
        const newCombination = [...currentCombination, remainingElements[i]];
        const newRemainingElements = remainingElements.slice(i + 1);
        generateCombinations(newCombination, newRemainingElements);
      }
    }
  }

  useEffect(() => {
    cardData=cardData.sort((a, b) =>
       a.name.toLowerCase().localeCompare(b.name.toLowerCase())
     );
    generateCombinations([], cardData);
  }, [cardData]);

  useEffect(() => {
    setCombinations((prevCombinations) => {
      const uniqueCombinations = prevCombinations.map((combo) =>
        combo.map((item) => JSON.stringify(item))
      );
      return [...new Set(uniqueCombinations.map(JSON.stringify))].map(
        (combo) => {
          const parseCombo = JSON.parse(combo);
          return parseCombo.map((i) => JSON.parse(i));
        }
      );
    });
  }, []);

  const handleCombClick = (item) => {
    if (selectedCombination.length === selectedCount + 1) {
      selectedCombination.pop();
      setSelectedCombination([...selectedCombination, item]);
    } else {
      setSelectedCombination([...selectedCombination, item]);
    }
    setIsDisabled(false);
  };

  const renderCombinationCards = (comb) => {
    const card = comb.map((combination, index) => {
      const isSelectedItem =
        combination.name ===
        (selectedCombination.length === selectedCount + 1 &&
          selectedCombination[selectedCount].name);
      return (
        <>
          {/* <Card
            key={combination.name + selectedCount + index}
            onClick={() => handleCombClick(combination)}
            className={`card-warpper ${isSelectedItem ? "selectCard" : ""} m-5`}
            style={{ backgroundImage: `url(http://localhost:5000/uploads/${combination.image})` , 
            backgroundSize:'100%'
         }}
          >
            <Card.Body>
              <Card.Title>{combination.name}</Card.Title>
              <Card.Text> {combination.description}</Card.Text>
              <div className="text-end">
                <BsBook size={25} />
              </div>
            </Card.Body>
          </Card> */}

          <Card
            key={combination.name + selectedCount + index}
            className={`card-warpper mx-2 mb-3 col-md-1 p-0  cardefined`}
            onClick={() => handleCombClick(combination)}

            style={{
              // position: 'relative',
              // backgroundImage: `url(http://localhost:5000/uploads/${item.image})`,
              // backgroundSize: '100%',
              // backgroundSize: 'cover', // You can adjust this property based on your design
              // backgroundPosition: 'center',
              width: '25rem',
              height: '16rem',

            }}
          >
            <div
              className="background-image"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: '1',
                //  backgroundImage: `url(http://localhost:5000/uploads/${combination.image})`,
                backgroundImage: `url(${serverUrl}/uploads/cardImage/${combination.image})`,
                //backgroundImage: `url(http://localhost:5000/uploads/1701428530291-978784319.txt)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: isSelectedItem ? 'grayscale(0%)' : 'grayscale(90%)', // Adjust grayscale level
              }}
            ></div>

            <Card.Body className="d-flex align-items-start justify-content-center p-0" style={{marginTop:'18%'}} >
              <div className="d-flex flex-column align-items-center justify-content-center p-0" style={{ opacity: '1', color: 'white', width: "100%", zIndex: '3' }}>
                <div className="h4 mb-2 Combinationheading" style={{ }}>{combination.name}</div>
                <div className="mb-2" style={{ width: '85%', height: '7px', backgroundColor: 'pink', marginLeft: '17px', color: 'pink', borderRadius: '20px' }}></div>
                <div className=" px-1 Combinationdescription" style={{ maxWidth: '100%', textAlign: 'center' }}>
                  {combination.description}
                </div>
              </div>
              <div  className="combinationpatchSize" style={{ position: "absolute", width: '100%', zIndex: '2', backgroundColor: '#433B39', opacity: '.46' }}></div>
            </Card.Body>
          </Card>
          {index == 0 ? <div className="mb-3 col-md-1 "
            style={{ color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="rounded-circle p-2" style={{ backgroundColor: '#B28D94', color: 'white', fontSize: '2rem', opacity: '1' }}>OR</div></div> : null}

        </>
      );
    });
    return (
      <>
        <Row className="justify-content-center mt-3" md={3}>
          {card}
        </Row>
      </>
    );
  };

  const handleNext = () => {
    if (combinations.length - 1 === selectedCount) {
      setIsShowTable(true);
    } else {
      setSelectedCount(selectedCount + 1);
    }
    setIsDisabled(true)
    let temp = Math.round(((selectedCount + 1) / 15) * 100);
    setProgress(temp);
  };
  const handleBack = () => {
    setSelectedCount(selectedCount == 0 ? selectedCount : selectedCount - 1);
    selectedCombination.pop();
    let temp = Math.round(((selectedCount - 1) / 15) * 100);
    setProgress(temp);

  }

  return (
    <div>
      {!isShowTable ? (
        <div className="card-container d-flex flex-column align-items-center justify-content-center" md={1} style={{ backgroundColor: '#fffaf6', paddingBottom: '3%' }}>
          <div className="top_instructions">
          <div style={{ marginTop: '2vw',marginInline:'6%' ,marginBottom:"1vw"}} className="fw-200 headingDiscription" >Now, let's establish <span class="spandetail_css">your hierarchy </span>of values. In each pair presented, decide which value holds <span class="spandetail_css">greater importance to you.</span> This process will help you <span class="spandetail_css">prioritize and determine  </span>the order of your top <span class="spandetail_css">6 values, </span>from the most essential to the significant.</div>

            {/* <div className="top_instructions"><h3 style={{ marginTop: '.5rem' }} className="fw-bold"> <span class="span_css">Now, let's establish your hierarchy of values. In each pair presented, decide which value holds greater importance to you. This process will help you prioritize and determine the order of your top 6 values, from the most essential to the significant.</span></h3></div> */}
          </div>
          {combinations.length &&
            renderCombinationCards(combinations[selectedCount])}
          <div className="d-flex flex-column justify-content-center align-items-center BarWidth " style={{marginTop:'.5vw'}} >
            <SmallProgressBar Progress={progress} />
            <div className="d-flex flex-row justify-content-between" style={{ width: '100%' }}>
              <div>
                <Button
                  onClick={handleBack}
                  disabled={selectedCount != 0 ? false : true}
                  className="btn-next"
                >
                  Go Back
                </Button>
              </div>
              <div>
                <Button
                  onClick={handleNext}
                  disabled={isDisabled}
                  className="btn-next"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <RankedTable
          selectedCombinations={selectedCombination}
          combinations={combinations}
        />
      )}
    </div>
  );
};

export default CombinationsRenderer;