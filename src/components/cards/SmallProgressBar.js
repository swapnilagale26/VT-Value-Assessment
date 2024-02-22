import React from "react";
import ProgressBar1 from "react-bootstrap/ProgressBar";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "../common.scss"; // Create a custom CSS file for styling
import Progress from './GenerateCombination'


function SmallProgressBar({Progress}) {
  return (
    <div className="small-progress-bar" style={{position:'static',width:'100%'}}>  
      <ProgressBar1 now={Progress}  style={{backgroundColor:'#f0dcd6'}} className="custom-color" />
    </div>
  );
}
//label={`${Progress}%`}  we need to add this if we also want to show label on progress bar
export default SmallProgressBar;
