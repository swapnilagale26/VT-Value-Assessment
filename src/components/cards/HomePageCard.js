import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Login from "../Login";
import "../common.scss";
import "../../components/cards/HomePageCard.css";
import { useNavigate } from "react-router";
const HomePageCard = ({
  imageUrl,
  text,
  heading,
  buttonText,
  reverseOrder,
  nevigateFunction,
}) => {
  let history = useNavigate();
  return (
    // <Container>
    //   <Row>
    //     <Col md={6}>
    //       <img src={image1} alt="Left Image" className="img-fluid" />
    //     </Col>
    //     <Col md={6}>
    //       <div className="text-container">
    //         <h1>AstroValues Alignment</h1>
    //         <p>
    //           Et maiores ducimus ex velit laboriosam eos Quis odio sed
    //           voluptatem deleniti et mollitia nihil et voluptates officia,
    //         </p>
    //         <Button variant="primary">Take the Assessment</Button>
    //       </div>
    //     </Col>
    //   </Row>
    // </Container>
    <div 
      className={`image-text-button-container ${
        reverseOrder && "reverse-order"
      }`}
    style={{minHeight:'30vw'}}
    >
      <div
        className="left-side col-6"
        style={{
          backgroundImage: `url(/${imageUrl}.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          //backgroundImage: `url(../img/firstImage.png)`,
        }}
      >
        {/* <img src={imageUrl} alt="Left Image" className="img-fluid" />  */}
      </div>
      <div className={`right-side ${reverseOrder && "with-background"} col-6` } >
        <div className="text-button-container" style={{justifyContent:'space-evenly'}}>
          <div className="title">{heading}</div>
          <div className="text">{text}</div>
          <div className="button-container">
            <Button
              className="button1 btn-block"
              variant="primary"
              onClick={nevigateFunction}
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// const HomePageCard = ({
//   icon,
//   title,
//   description,
//   buttonText,
//   disabled,
//   openSignupForm,
//   closeSignUpForm,
//   handleSubmitSignUp,
//   setSignUpForm,
//   signUpForm,
// }) => {
//   const openForm = () => {
//     <SignUpForm
//       show={openSignupForm}
//       closeForm={closeSignUpForm}
//       handleSubmitSignUp={handleSubmitSignUp}
//       setForm={setSignUpForm}
//       form={signUpForm}
//     />;
//   };

//   return (
//     <>
//       <div  >
//         <h3 className="card-title">{title}</h3>
//         <p className="card-description">{description}</p>
//         <Button
//           onClick={openForm}
//           className="btn btn-primary mb-10"
//           disabled={disabled}
//         >
//           {buttonText}
//         </Button>
//       </div>
//     </>
//   );
// };

// const InfographicCardList = ({ openRegisterForm }) => {
//   let imgUrl =
//     "https://personalvalu.es/_next/image?url=%2Fimages%2Farticles%2Flighthouse.jpg&w=1920&q=75";
//   const colStyle = {
//     border: "2px solid black",
//     backgroundImage: `url(${imgUrl})`,
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     minHeight: "200px", // Set a minimum height to ensure the background is visible
//   };
//   return (
//     <div>
//       <Row>
//         <Col md={6} style={colStyle}>
//           <Image
//             src={imgUrl}
//             alt="Image"
//             style={{ width: "100%", height: "auto" }}
//           />
//         </Col>
//         <Col md={6} style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
//           <HomePageCard
//             icon={faInfoCircle}
//             title="STRENGTH ASSESSMENT"
//             description="Every day thousands of people discover their core strength with our free test."
//             buttonText="Coming soon"
//             disabled="true"
//             link="/"
//           />
//         </Col>
//       </Row>
//       <Row>
//         <Col md={6} style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
//           <div>
//             <HomePageCard
//               icon={faInfoCircle}
//               title="STRENGTH ASSESSMENT"
//               description="Every day thousands of people discover their core strength with our free test."
//               buttonText="Coming soon"
//               disabled="true"
//               link="/"
//             />
//           </div>
//         </Col>
//         <Col md={6} style={colStyle}>
//           <Image
//             src={imgUrl}
//             alt="Image"
//             style={{ width: "100%", height: "auto" }}
//             fluid
//           />
//         </Col>
//       </Row>
//       <Row>
//         <Col md={6} style={colStyle}>
//           <Image
//             src={imgUrl}
//             alt="Image"
//             style={{ width: "100%", height: "auto" }}
//           />
//         </Col>
//         <Col md={6} style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
//           <div>
//             <HomePageCard
//               icon={faInfoCircle}
//               title="LEADERSHIP ASSESSMENT"
//               description="Explore your leadership qualities."
//               buttonText="Coming soon"
//               disabled="true"
//             />
//           </div>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// const InfographicCardList = ({ openRegisterForm }) => {
//   let imgUrl =
//     "https://personalvalu.es/_next/image?url=%2Fimages%2Farticles%2Flighthouse.jpg&w=1920&q=75";
//   return (
//     <Container className="mt-5 mb-5">
//       <Row>
//         <Col md={12}>
//           <Card>
//             <div className="row no-gutters">
//               <div className="col-md-6">
//                 <Card.Img variant="top" src={imgUrl} />
//               </div>
//               <div className="col-md-6">
//                 <Card.Body>
//                   <Card.Title>Card title</Card.Title>
//                   <Card.Text>
//                     This is a wider card with supporting text below as a natural
//                     lead-in to additional content. This content is a little bit
//                     longer.
//                   </Card.Text>
//                 </Card.Body>
//                 <Card.Footer className="text-right">
//                   <small className="text-muted">Last updated 3 mins ago</small>
//                 </Card.Footer>
//                 {/* <HomePageCard
//                   icon={faInfoCircle}
//                   title="STRENGTH ASSESSMENT"
//                   description="Every day thousands of people discover their core strength with our free test."
//                   buttonText="Coming soon"
//                   disabled="true"
//                   link="/"
//                 /> */}
//               </div>
//             </div>
//           </Card>
//         </Col>
//       </Row>

//       <Row>
//         <Col md={6}>
//           <Card>
//             <div className="row no-gutters">
//               <div className="col-md-6">
//                 <Card.Img variant="top" src={imgUrl} />
//               </div>
//               <div className="col-md-6">
//                 <Card.Body>
//                   <HomePageCard
//                     icon={faInfoCircle}
//                     title="STRENGTH ASSESSMENT"
//                     description="Every day thousands of people discover their core strength with our free test."
//                     buttonText="Coming soon"
//                     disabled="true"
//                     link="/"
//                   />
//                 </Card.Body>
//                 <Card.Footer className="text-right">
//                   <small className="text-muted">Last updated 3 mins ago</small>
//                 </Card.Footer>
//               </div>
//             </div>
//           </Card>
//         </Col>
//         <Col md={6}>
//           <Card>
//             <div className="row no-gutters">
//               <div >
//                 <Card.Body>
//                   <Card.Title>Card title</Card.Title>
//                   <Card.Text>
//                     This is a wider card with supporting text below as a natural
//                     lead-in to additional content. This content is a little bit
//                     longer.
//                   </Card.Text>
//                 </Card.Body>
//                 <Card.Footer className="text-right">
//                   <small className="text-muted">Last updated 3 mins ago</small>
//                 </Card.Footer>
//               </div>
//             </div>
//           </Card>
//         </Col>
//       </Row>

//       <Row>
//         <Col md={12}>
//           <Card>
//             <div className="row no-gutters">
//               <div className="col-md-6">
//                 <Card.Img variant="top" src="holder.js/100px160" />
//               </div>
//               <div className="col-md-6">
//                 <Card.Body>
//                   <HomePageCard
//                     icon={faInfoCircle}
//                     title="LEADERSHIP ASSESSMENT"
//                     description="Explore your leadership qualities."
//                     buttonText="Coming soon"
//                     disabled="true"
//                   />
//                 </Card.Body>
//               </div>
//             </div>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

export default HomePageCard;
