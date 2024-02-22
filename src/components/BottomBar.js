import React, { useState } from "react";
import "./common.scss";
import { Button } from "react-bootstrap";

const BottomBar = ({totalSelectedValues, isDisabled, handleContinue,cardsSelectionrequired}) => {
  return (<>
    <div className="bottom-navigation" style={{zIndex:'5'}}>
      <div style={{alignContent:"middle"}}>{`Total Selected card  `}<span style={{fontSize: "20px", fontWeight:600}}>{totalSelectedValues}</span> out of <span style={{fontSize: "20px", fontWeight:600}}>{cardsSelectionrequired}</span></div>
      <Button style ={{marginLeft: "auto", marginRight:"1rem"}} disabled={isDisabled} onClick={handleContinue}>Next</Button>
    </div>
      </>
  );
};

export default BottomBar;
