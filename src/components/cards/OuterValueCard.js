import React, { useEffect, useRef, useState } from "react";
import ValueCards from "../ValueCards";
import InnerValueCard from "./InnerValueCard";
import { useCharsticsContext } from "../../contex/charsticsProvider";
import { useArctypeContext } from "../../contex/ArctypeProvider";

const LIMIT = 12;
const OuterValueCard = ({ cardData }) => {
  const [isEnableInnerPage, setIsEnabledInnerPage] = useState(false);
  const { selectOuterCards, setSelectOuterCards } = useCharsticsContext();
  const { highestOuterArctype, setHighestOuterArctype } = useArctypeContext();
  const [showheading, setShowHeading] = useState(true);
  const scrollIntoViewElement=useRef(null);
  useEffect(()=>{
    scrollIntoViewElement.current.scrollIntoView({behavior:'auto'});
  },[]);

  if (isEnableInnerPage) {
    setSelectOuterCards(
      selectOuterCards.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      )
    );
  }

  return (
    <>
      {!isEnableInnerPage ? (
        <div
          style={{
            backgroundColor: "#fffaf6",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          ref={scrollIntoViewElement}

        >
          {showheading ?
           (
          <div className="top_instructions">
          <div style={{ marginTop: "1rem" }} className="fw-bold heading"><span class="span_css">Transcendent Consciousness Values</span></div>
            <div style={{ marginTop: '.5rem' ,marginInline:'0%' }} className="fw-200 headingDiscription" > <span class="spandetail_css">Great Going! </span>You have successfully identified your <span class="spandetail_css">22 key </span>values. Now, take another step forward.<br/> From this refined list,<span class="spandetail_css"> select the 12 values </span>that are absolutely essential to you.</div>
           </div>
          ) : null}

          <ValueCards
            selectedCards={selectOuterCards}
            setSelectedCards={setSelectOuterCards}
            limit={LIMIT}
            cardData={cardData}
            setEnabled={setIsEnabledInnerPage}
            setHighestArctype={setHighestOuterArctype}
            cardSize={{ width: "22rem", height: "14rem" }}
            fontSize={{ headingSize: "1.6rem", descriptionSize: "1.1rem" }}
            setShowHeading={setShowHeading}
            className='outercardcss'
            cardsSelectionrequired={LIMIT}
          />
        </div>
      ) : (
        <InnerValueCard cardData={selectOuterCards}  />
      )}
    </>
  );
};

export default OuterValueCard;
