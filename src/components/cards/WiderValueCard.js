import React, { useEffect, useState } from "react";
import ValueCards from "../ValueCards";
import OuterValueCard from "./OuterValueCard";
import { useCharsticsContext } from "../../contex/charsticsProvider";
import { useArctypeContext } from "../../contex/ArctypeProvider";
import useGetAllValue from "../../hooks/useGetAllValue";
import { getAllValue, getBase64Image } from "../../service/authenticator";
import { faWeight } from "@fortawesome/free-solid-svg-icons";

// const cardData = [
//   {
//     name: "anc",
//     decription:
//       "Some quick example text to build on the card title and make up  bulk of the card's content.",
//     planets: {
//       sun: 10,
//       moon: 10,
//       mercury: 2,
//       venus: 1,
//     }
//   },
//   ,
//   {
//     name: "anc1",
//     decription:
//       "Some quick example text to build on the card title and make up  bulk of the card's content.",
//     planets: {
//       sun: 10,
//       moon: 10,
//       mercury: 12,
//       venus: 21,
//     },
//   },
//   {
//     name: "anc2",
//     decription:
//       "Some quick example text to build on the card title and make up  bulk of the card's content.",
//     planets: {
//       sun: 10,
//       moon: 10,
//       mercury: 12,
//       venus: 0,
//     },
//   },
//   {
//     name: "anc3",
//     decription:
//       "Some quick example text to build on the card title and make up  bulk of the card's content.",
//     planets: {
//       sun: 10,
//       moon: 10,
//       mercury: 2,
//       venus: 1,
//     },
//   },
//   {
//     name: "anc4",
//     decription:
//       "Some quick example text to build on the card title and make up  bulk of the card's content.",
//     planets: {
//       sun: 10,
//       moon: 10,
//       mercury: 12,
//       venus: 1,
//     },
//   },
//   {
//     name: "anc5",
//     decription:
//       "Some quick example text to build on the card title and make up  bulk of the card's content.",
//     planets: {
//       sun: 10,
//       moon: 10,
//       mercury: 12,
//       venus: 1,
//     },
//   },
//   {
//     name: "anc6",
//     decription:
//       "Some quick example text to build on the card title and make up  bulk of the card's content.",
//     planets: {
//       sun: 10,
//       moon: 10,
//       mercury: 0,
//       venus: 0,
//     },
//   },
//   {
//     name: "anc7",
//     decription:
//       "Some quick example text to build on the card title and make up  bulk of the card's content.",
//     planets: {
//       sun: 0,
//       moon: 0,
//       mercury: 0,
//       venus: 0,
//     },
//   },
//   {
//     name: "anc8",
//     decription:
//       "Some quick example text to build on the card title and make up  bulk of the card's content.",
//     planets: {
//       sun: 0,
//       moon: 0,
//       mercury: 0,
//       venus: 0,
//     },
//   },
//   {
//     name: "anc9",
//     decription:
//       "Some quick example text to build on the card title and make up  bulk of the card's content.",
//     planets: {
//       sun: 0,
//       moon: 0,
//       mercury: 0,
//       venus: 0,
//     },
//   },
//   {
//     name: "anc10",
//     decription:
//       "Some quick example text to build on the card title and make up  bulk of the card's content.",
//     planets: {
//       sun: 0,
//       moon: 0,
//       mercury: 0,
//       venus: 0,
//     },
//   },
//   {
//     name: "anc11",
//     decription:
//       "Some quick example text to build on the card title and make up  bulk of the card's content.",
//     planets: {
//       sun: 0,
//       moon: 0,
//       mercury: 0,
//       venus: 0,
//     },
//   },
//   {
//     name: "anc12",
//     decription:
//       "Some quick example text to build on the card title and make up  bulk of the card's content.",
//     planets: {
//       sun: 0,
//       moon: 0,
//       mercury: 0,
//       venus: 0,
//     },
//   },
// ];

const LIMIT = 22;

const WiderValueCard = () => {
  const [isEnableOuterPage, setIsEnabledOuterPage] = useState(false);
  const { setSelectWiderCards, selectWiderCards } = useCharsticsContext();
  const { setHighestWiderArctype, highestWiderArctype, setImgUrl } =
    useArctypeContext();
  const [valueCard, setValueCard] = useState(null);
  const [showheading, setShowHeading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Assuming getAllValue returns a promise
        const result = await getAllValue();
        // set data to state variable
         setValueCard(result.data.result);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors if needed
      }
    };

    function toDataURL(src, callback, outputFormat) {
      // Create an HTML Image element
      var img = new Image();

      // Set the crossOrigin property to 'Anonymous' to allow cross-origin image loading
      img.crossOrigin = "Anonymous";

      // in onload event   this refers to img for which we call onload event
      // Set the onload event handler for the image
      img.onload = function () {
        // Create a canvas element to draw the image
        var canvas = document.createElement("CANVAS");
        var ctx = canvas.getContext("2d");
        var dataURL;

        // Set the canvas dimensions to match the image's natural dimensions
        canvas.height = this.naturalHeight;
        canvas.width = this.naturalWidth;

        // Draw the image onto the canvas
        ctx.drawImage(this, 0, 0);

        // Convert the canvas content to a Data URL with the specified output format
        dataURL = canvas.toDataURL(outputFormat);

        // Invoke the callback function with the Data URL as an argument
        callback(dataURL);
      };

      // Set the source of the image (this triggers the onload event when the image is loaded)
      img.src = src;

      // If the image is already complete or has an undefined complete property,
      // reset the image source to a 1x1 pixel transparent GIF and then set it back to the actual source
      if (img.complete || img.complete === undefined) {
        img.src =
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="; // it is basically base64 string of 1x1 gif image
        img.src = src;
      }
    }

    // Example usage of the function
    // toDataURL(
    //   'http://localhost:5000/uploads/ReportBackground.png',
    //   function(dataUrl) {
    //     console.log('RESULT:', dataUrl);
    //     // Assuming setImgUrl is a function to set the image URL in your React state
    //     setImgUrl([dataUrl]);
    //   }
    // );

    // Call the fetchData function
    fetchData();
  }, []);

  if (isEnableOuterPage) {
    setSelectWiderCards(
      selectWiderCards.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      )
    );
  }

  return valueCard ? (
    <>
      {!isEnableOuterPage ? (
        <div
          style={{
            backgroundColor: "#fffaf6",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {showheading ? (
            <div className="top_instructions">
              <div style={{ marginTop: "1rem" }} className="fw-bold heading">
                <span class="span_css">Universal Consciousness Values</span>
              </div>
              <div
                style={{ marginTop: ".5rem", marginInline: "0%" }}
                className="fw-200 headingDiscription"
              >
                <span>
                  Values are{" "}
                  <span class="spandetail_css">like lighthouses</span> they
                  provide{" "}
                  <span class="spandetail_css">
                    {" "}
                    direction, meaning and purpose.
                  </span>{" "}
                  Here is a list of{" "}
                  <span className="spandetail_css">108 values.</span>{" "}
                  <br/>
                  <span className="spandetail_css">Select 22 </span> that
                  resonate with you the most.
                </span>
              </div>
            </div>
          ) : null}
          {/* {showheading ? <div className="top_instructions"><h3 style={{ marginTop: '1rem' }} className=""><span class="span_css " >Values are like lighthouses ; they provide direction, meaning, and purpose. Here is a list of 108 values. Select the 22 that resonate with you the most.</span></h3></div> : null} */}

          <ValueCards
            selectedCards={selectWiderCards}
            setSelectedCards={setSelectWiderCards}
            limit={LIMIT}
            cardData={valueCard}
            setEnabled={setIsEnabledOuterPage}
            setHighestArctype={setHighestWiderArctype}
            cardSize={{ width: "12rem", height: "15rem" }}
            fontSize={{ headingSize: "1.4rem", descriptionSize: "0.89rem" }}
            setShowHeading={setShowHeading}
            className="widercardcss"
            cardsSelectionrequired={LIMIT}
          />
        </div>
      ) : (
        <OuterValueCard cardData={selectWiderCards} />
      )}
    </>
  ) : (<>
  <div class="spinner-border loader" role="status" style={{position:'fixed',zIndex:'2',top:'50vh',left:'50vw' ,width: '',height: ''}} >
    <span class="sr-only"></span>
  </div>
  <div class="d-flex justify-content-center" style={{width:'100%'}}>
  <ValueCards   cardSize={{ width: "12rem", height: "15rem" }}   cardsSelectionrequired={LIMIT}/>
</div>

  </>
   
  );
};

export default WiderValueCard;
