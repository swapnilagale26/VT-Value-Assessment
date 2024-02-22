import React, { useState, useRef, useEffect } from "react";
import { useArctypeContext } from "../contex/ArctypeProvider";
import { useCharsticsContext } from "../contex/charsticsProvider";
import ReportThankPage from "./ReportThankPage";
import { generatePdf ,saveUserReport} from "../service/authenticator";
import {
  reportHeader,
  outerLevelArctypeText,
  innerLevelArctypeText,
  widerLevelArctypeText,
  serverUrl,
} from "../Constant/ReportValue";
import "./Report.css";
import { Container, Image, Button } from "react-bootstrap";
import html2canvas from "html2canvas";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import banner from "./img/Reportfirst.png";
import { font } from "../Constant/SansProFont";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

window.pdfMake.vfs = font;

const ImageGenerator = (elementRef, setImageUrl) => {
  if (elementRef.current) {
    html2canvas(elementRef.current)
      .then((canvas) => {
        // Convert the canvas to a data URL and display or save it
        const dataUrl = canvas.toDataURL();
        setImageUrl(dataUrl);
      })
      .catch((error) => {
        console.error("Error capturing image:", error);
      });
  }
};

// Report Body UI


//Report UI
const Report = ({innerCards}) => {
  let reportPdfAddress = useRef(null);
  let [reportGenerate, setReportgenerate] = useState(false);
  let [progressBar,setProgressBar]=useState(20);
  const username = localStorage.getItem("username");

  useEffect(() => {
    reportGenration();
  },[]);

  let { selectWiderCards, selectOuterCards, selectInnerCards } =useCharsticsContext();
  const {
    highestWiderArctype,
    highestInnerArctype,
    highestOuterArctype,
    RankedArctype,
  } = useArctypeContext();

  const reportGenration = async () => {
    let result = await generatePdf({
      widerMiddleDiscription,
      outerMiddleDiscription,
      innerMiddleDiscription,
      username,
      outerLevelArctypeText,
      innerLevelArctypeText,
      widerLevelArctypeText,
      highestWiderArctype,
      highestInnerArctype,
      highestOuterArctype,
      selectWiderCards,
      selectOuterCards,
      selectInnerCards,
    });
    reportPdfAddress.current=result.data.filename;
  setProgressBar(90);
  setTimeout(()=>{setReportgenerate(true)},3000);
  await saveUserReport({email:localStorage.getItem("email"),filenamesave:result.data.filename})
      
    
  };
  // of of wider , inner , outer level archetype data which we map for creates report  the data we fetch from context ,constant files

  let widerMiddleDiscription =
    widerLevelArctypeText.archetypeTextmiddleDescription[
      Object.keys(highestWiderArctype)[0]
    ];
  let outerMiddleDiscription =
    outerLevelArctypeText.archetypeTextmiddleDescription[
      Object.keys(highestOuterArctype)[0]
    ];
  let innerMiddleDiscription =
    innerLevelArctypeText.archetypeTextmiddleDescription[
      Object.keys(highestInnerArctype)[0]
    ];
  function pdfDownload() {
    // Now you can use the base64Data as needed

    var oXHR = new XMLHttpRequest();
    oXHR.open(
      "GET",
      `${serverUrl}/uploads/${reportPdfAddress.current}`,
      true
    );
    oXHR.responseType = "blob";

    oXHR.onload = function (event) {
      var blob = oXHR.response;

      // Create a temporary anchor element to initiate the download
      var link = document.createElement("a");
      link.href = URL.createObjectURL(blob);

      // Set the download attribute to specify the filename for the downloaded file
      link.setAttribute("download", `${username}.pdf`);

      // Trigger the click event on the anchor element
      link.click();

      // Clean up - revoke the object URL and remove the anchor element after the click event has been triggered
      URL.revokeObjectURL(link.href);
    };

    oXHR.send();
  }

  return reportGenerate ? (
    <div class="container mx-auto mt-4" style={{ backgroundColor: "#fffaf6" }}>
      <div className="image-banner" style={{ backgroundColor: "#fffaf6" }}>
        <img
          src={'/Reportfirst.png'}
          alt={"Banner Image"}
          style={{ width: "60%", filter: "brightness(.6)" }}
        />
        <div className="banner-content">
          <h1 style={{ fontWeight: "800" }}>
            {"Your AstroValues Alignment Report is Ready!"}
          </h1>
        </div>
      </div>

      <div>
        <div className={`image-text-button-container`}>
          <div className="">
            <div className="text-button-containerreport d-flex align-items-center justify-content-center">
              <div>
                <p className="reporttext">
                  Your personalized AstroValues Alignment Report is now
                  available. Click the 'Download Now' button below to access
                  your report immediately. For your convenience, a download link
                  has also been sent to your email.
                </p>
              </div>
              <div className="button-container">
                <Button
                  className="button2 btn-block"
                  onClick={() => {
                    pdfDownload();
                  }}
                >
                  Download Now
                </Button>
              </div>
              <p className="reporttext" style={{ color: "red" }}>
                We recommend downloading your report promptly. Please note that
                the download link will expire in 48 hours. Thank you for
                engaging with our AstroValues Alignment process.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <ReportThankPage  progressBar={progressBar}/>
    </div>
  );
};
export default Report;
