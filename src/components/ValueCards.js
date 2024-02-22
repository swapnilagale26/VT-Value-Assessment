import React, { useState } from "react";
import { Row, Card } from "react-bootstrap";
import "./common.scss";
import { BsBook } from "react-icons/bs";
import { scoreCalculator, findHighestKeysAndValues } from "../utils/common";
import ChartiePopup, { HandleMultiSelction } from "./cards/ChartiePopup";
import BottomBar from "./BottomBar";
import ValueCardPop from "./ValueCardPop";
import { serverUrl } from "../Constant/ReportValue";
import './login.css'

const PlanetsAsp = {
  sun: "Arrogance",
  moon: "Neediness",
  mercury: "Worrying",
  mars: "Laziness",
  jupiter: "Impulsiveness",
  venus:"Vanity",
  saturn: "Rigidity",
  chiron: "Guilt",
  uranus: "Eccentricity",
  neptune: "Self-deception",
  pluto: "Manipulation",
  eris: "Disharmony",
};
const ValueCards = ({
  selectedCards = [],
  setSelectedCards,
  cardData,
  limit,
  setEnabled,
  setHighestArctype,
  cardSize,
  fontSize,
  setShowHeading,
  className,
  cardsSelectionrequired  // number of cards need to be select

}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [radioData, setRadioData] = useState({});
  const [totalSelectedValues, setTotalSelecetdValues] = useState(0);
  // it is basically show pop up of maximum card selection is done
  const [showModal,setShowModal]=useState(false);

  const handleCard = (item, isSelectedItem) => {
    if(totalSelectedValues==cardsSelectionrequired&& !isSelectedItem){
      return setShowModal(true); // we returning because we want to break further excution 
    }
    isSelectedItem
      ? setSelectedCards(selectedCards.filter((i) => i.name !== item.name))
      : setSelectedCards([...selectedCards, item]);

    isSelectedItem
      ? setTotalSelecetdValues(totalSelectedValues - 1)
      : setTotalSelecetdValues(totalSelectedValues + 1);
  };

  const renderCards = () => {
     let card;
     if(cardData){
     card = cardData.map((item, index) => {
      const isSelectedItem = selectedCards.some((i) => i.name === item?.name);
      return (
        <>
          <Card
            key={item.name}
            className={`card-warpper mx-1 mb-3 col-md-2 p-0`}
            onClick={() => handleCard(item, isSelectedItem)}

            style={{
              // position: 'relative',
              // backgroundImage: `url(http://localhost:5000/uploads/${item.image})`,
              // backgroundSize: '100%',
              // backgroundSize: 'cover', // You can adjust this property based on your design
              // backgroundPosition: 'center',
              width: cardSize.width,
              height: cardSize.height,

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
                 // backgroundImage: `url(http://13.201.96.75:5000/root/uploads/${item.image})`,
                 backgroundImage: `url(${serverUrl}/uploads/cardImage/${item.image})`,
               // backgroundImage: `url(http://localhost:5000/uploads/1701428530291-978784319.txt)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: isSelectedItem ? 'grayscale(0%)' : 'grayscale(100%)', // Adjust grayscale level
               // filter: isSelectedItem ?  'brightness(100%)':'brightness(40%)', // Adjust grayscale level

              }}
            ></div>

            <Card.Body className="d-flex align-items-start justify-content-center p-0 " style={{ marginTop: '4.3rem' }}  >
              <div className ={`d-flex align-items-center justify-content-center flex-column ${className} `}  style={{ border: '2px soild red', opacity: '1', color: 'white', width: "100%", zIndex: '3'}}>
                <div className=" mb-1" style={{ fontSize: fontSize.headingSize ,lineHeight:'1.3'}}>{item.name}</div>
                <div className="mb-1" style={{ width: '75%', height: '7px', backgroundColor: 'pink', marginLeft: '0px', color: 'black', borderRadius: '20px' }}></div>
                <div className=" px-1" style={{ fontSize: fontSize.descriptionSize, maxWidth: '100%', textAlign: 'center', lineHeight: '1.2' }}>
                  {item.description}
                </div>
              </div>
              <div style={{ position: "absolute", width: '100%', height: '40%', zIndex: '2', backgroundColor: '#433B39', opacity: '.46' }}>
              </div>

            </Card.Body>
          </Card>
        </>

      );
    });
  }
  else{
    card= Array(21).fill(0).map((item ,index)=>{
      return (
        <Card
        key={index}
        className={`card-warpper mx-1 mb-3 col-md-2 p-0 shimmer`}

        style={{
          width: cardSize.width,
          height: cardSize.height,

        }}
      >
      </Card>
      )

    })

  }

    return (
      <Row className="justify-content-center mx-1 mb-3 mt-1" >
        {card}
       
      </Row>
    );
  };

  const handleContinue = () => {
    const totalScore = scoreCalculator(selectedCards);
    const hightScore = findHighestKeysAndValues(totalScore);
    console.log(totalScore, ' hight', hightScore);
    if (Object.keys(hightScore).length > 1) {
      const keys = Object.keys(hightScore);
      const extractedValues = {};
      keys.forEach((key) => {
        if (PlanetsAsp.hasOwnProperty(key)) {
          extractedValues[key] = PlanetsAsp[key];
        }
      });
      setRadioData(extractedValues);
      setShowPopup(true);
      setShowHeading(false);
    }
    else {
      setEnabled(true);
      setHighestArctype({ ...hightScore });
    }
  };
  const isNextButtonDisabled = (selectedCards?.length !== limit);
  return (
    <>
      {/* it use to show screen when highest archetype  has more than 1 values to select it */}
      {showPopup ? (<HandleMultiSelction
        show={showPopup}
        handleClose={() => setShowPopup(false)}
        listData={radioData}
        setSelectChar={setHighestArctype}
        setEnabled={setEnabled}
        setShowPopup={setShowPopup}
        setTotalSelecetdValues={setTotalSelecetdValues}
      />) : (
        <>
           
          <div className="my-3">{renderCards()}</div>
           {/* it is basically show pop up of maximum card selection is done */}
         {showModal? <ValueCardPop cardsSelectionrequired={cardsSelectionrequired} setShowModal={setShowModal} showModal={showModal}/>:null}
          <BottomBar
            totalSelectedValues={totalSelectedValues}
            handleContinue={handleContinue}
            isDisabled={isNextButtonDisabled}
            cardsSelectionrequired={cardsSelectionrequired}
          />
        </>)
      }
    </>
  );
};

export default ValueCards;
