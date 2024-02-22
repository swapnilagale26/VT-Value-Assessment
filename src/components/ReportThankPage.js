import SmallProgressBar from "./cards/SmallProgressBar";
import ReportThankPageImage from "./img/thankPage.png";
import { serverUrl } from "../Constant/ReportValue";

function ReportThankPage({progressBar}) {
  return (
    //   <div class="container mx-auto mt-4" style={{ backgroundColor: "#fffaf6" ,display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>

    //   <div className="image-banner" style={{ backgroundColor: "#fffaf6"}} >
    //   <img src={ReportThankPageImage} alt={"Banner Image"}  style={{width:'60%',filter:'brightness(.6)' }}/>
    //   <div className="banner-content">
    //      <h1 style={{fontWeight:'800'}}>{"Thanks You!"}</h1>
    //      <p style={{fontWeight:'600'}}>{"We Are Now Generating Your Report..."}</p>

    //   </div>
    // </div>

    //   <div>
    //   <div className="d-flex flex-column justify-content-center align-items-center BarWidth " >
    //           <SmallProgressBar Progress={0} />
    //           <div className="d-flex flex-row justify-content-between" style={{ width: '100%' }}>
    //             <div>
    //               {/* <Button
    //                 onClick={handleBack}
    //                 disabled={selectedCount != 0 ? false : true}
    //                 className="btn-next"
    //               >
    //                 Go Back
    //               </Button> */}
    //             </div>
    //             <div>
    //               {/* <Button
    //                 onClick={handleNext}
    //                 disabled={isDisabled}
    //                 className="btn-next"
    //               >
    //                 Next
    //               </Button> */}
    //             </div>
    //           </div>
    //         </div>
    //   </div>

    // </div>
    <div
      style={{
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        //position:'absolute'
      }}
    >
      <div
        style={{
          width: "51%",
          backgroundImage: `url(/thankPage.png)`,
          backgroundSize: "cover",
          backgroundColor: "#fffaf6",
          // filter: "brightness(.6)",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          zIndex: "0",
         position:'relative',
         marginTop:'5vh'
        }}
        className="thanksImage"
      >
        <div
          style={{
            position: "absolute",
            height:'100%',
            width: "100%",
            backgroundColor: "black",
            opacity: "0.45",
            zIndex: "1",
          }}
        ></div>
        <div style={{ color: "white", zIndex: "2" }}>
          <div className="Bannertitle" style={{ fontWeight: "800" ,lineHeight:'1',textAlign:'center'}}>
            {"Thank you!"}
          </div>
          <div className="text" style={{ fontWeight: "600",textAlign:'center' }}>
            {"We Are Now Generating Your Report..."}
          </div>
        </div>
      </div>
      <div style={{width:'50%'}}>
      <SmallProgressBar Progress={progressBar}  />
      </div>
    </div>
  );
}
export default ReportThankPage;
