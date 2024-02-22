import React, { useState ,useEffect,useRef} from "react";
import ValueCards from "../ValueCards";
import CombinationsRenderer from "./GenerateCombination";
import { useCharsticsContext } from "../../contex/charsticsProvider";
import { useArctypeContext } from "../../contex/ArctypeProvider";

const LIMIT = 6;
const InnerValueCard = ({ cardData }) => {
  const [isEnableInnerPage, setIsEnabledInnerPage] = useState(false);
  const { selectInnerCards, setSelectInnerCards } = useCharsticsContext();
  const { setHighestInnerArctype, highestInnerArctype } = useArctypeContext();
  const [showheading, setShowHeading] = useState(true);
  const scrollIntoViewElement=useRef(null);
  useEffect(()=>{
    scrollIntoViewElement.current.scrollIntoView({behavior:'auto'});
  },[]);
  // if (isEnableInnerPage) {
  //   setSelectInnerCards(
  //     selectInnerCards.sort((a, b) =>
  //       a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  //     )
  //   );
  // }

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
          {showheading ? (
            <div className="top_instructions">
              <div style={{ marginTop: "1rem" }} className="fw-bold heading">
                <span class="span_css">Soul-Level Consciousness</span>
              </div>
              <div
                style={{ marginTop: ".5rem", marginInline: "6%" }}
                className="fw-200 headingDiscription"
              >
                {" "}
                <span class="spandetail_css">Almost there! </span>From your{" "}
                <span class="spandetail_css">chosen 12, </span>identify the
                <span class="spandetail_css"> 6 values </span>that lie at the
                heart of your being. These are your
                <span class="spandetail_css"> pillars, </span>the fundamental
                beliefs that shape every aspect of your life.
              </div>

              {/* <h3 style={{ marginTop: "1rem" }} className="fw-bold"><span class="span_css">Soul-Level Consciousness</span></h3>
              <h3 style={{ marginTop: ".5rem" }} className="fw-bold"><span class="span_css">Almost there!</span></h3>
              <div className="top_instructions"><h3 style={{ marginTop: '.5rem' }} className="fw-bold"> <span class="span_css">From your chosen 12, identify the 6 values that lie at the heart of your being. These are your pillars, the fundamental beliefs that shape every aspect of your life.</span></h3></div> */}
            </div>
          ) : null}

          <ValueCards
            selectedCards={selectInnerCards}
            setSelectedCards={setSelectInnerCards}
            limit={LIMIT}
            cardData={cardData}
            setEnabled={setIsEnabledInnerPage}
            setHighestArctype={setHighestInnerArctype}
            cardSize={{ width: "24rem", height: "16rem" }}
            fontSize={{ headingSize: "1.7rem", descriptionSize: "1.2rem" }}
            setShowHeading={setShowHeading}
            className="innercardcss"
            cardsSelectionrequired={LIMIT}
          />
        </div>
      ) : (
        <CombinationsRenderer cardData={selectInnerCards} />
      )}
      {/* <BottomBar /> */}
    </>
  );
};

export default InnerValueCard;
