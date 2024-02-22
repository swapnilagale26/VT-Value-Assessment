import React from "react";
import "./banner.scss";
import "./common.scss";


const Banner = ({ imageUrl, altText, title, subtitle, link, detail }) => {
  return (
    // <div className="image-banner">
    //   <img src={`${imageUrl}`} alt={altText}  style={{filter:'brightness(.6)',height:"50vw"}}/>
    //   <div className="banner-content">
    //     {title && <h1>{title}</h1>}
    //     {subtitle && <div>{subtitle}</div>}
    //     {/* {detail  && <p style={{fontSize:'18px'}}>{detail.firstPara}</p>} */}
    //     {/* {detail  && <p style={{fontSize:'18px'}}>{detail.secondPara}</p>} */}

    //     {/* {link && (
    //       <Button href={link.url}  className="banner-link">
    //         {link.text}
    //       </Button>
    //     )} */}
    //   </div>
    // </div>
    <div
      style={{
        width: "100vw",
        height: "50vw",
        backgroundImage: `url(/${imageUrl}.png)`,  // in this we use public folder
        // backgroundImage: `url(${imageUrl})`,
      // backgroundImage: `url(/firstImage.png)`,
        backgroundSize: "cover",
        // filter: "brightness(.6)",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "0",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "black",
          opacity: "0.45",
          zIndex: "1",
        }}
      ></div>
      <div  className="BannerDiv" style={{ color: "white", zIndex: "2" }}>
        <div className="Bannertitle" style={{textAlign:'center',lineHeight:'1.2'}}>{title}</div>
        <div className="text" style={{textAlign:'center',marginTop:'1%'}}>{subtitle}</div>
      </div>
    </div>
  );
};

export default Banner;
