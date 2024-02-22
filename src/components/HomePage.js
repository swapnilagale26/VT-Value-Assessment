import React from "react";
import Banner from "./Banner";
import banner from "./img/2.jpg"
import HomePageCard from "./cards/HomePageCard";
import image2 from "../components/img/secondImage.png";
import image3 from "../components/img/thirdImage.png";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router";
import { signInProvider } from "../contex/ArctypeProvider";
import { useContext } from "react";

const HomePage = () => {
  let history = useNavigate();
  const token = localStorage.getItem('token');
  const { isSignin, setIsSignIn } = useContext(signInProvider);

  //  function  for handle  take the assessmentClick
  const assessmentClick = () => {
    history("/signin");
    setIsSignIn(false);
  };
  return (
    <>
      <Banner
        imageUrl={"forthImage"}
        altText="Banner Image"
        title="Welcome to AstroCoaching™ Synergy Assessment Central"
        subtitle="Embark on a Journey of Professional Mastery and Personal Enlightenment, it's a partner in your journey through life's ambiguities."
        detail={{firstPara:"AstroCoaching™ Synergy Assessment Central introduces an unparalleled path of self-discovery and professional enrichment, uniquely combining cosmic insights with analytical precision. This innovative approach is designed for the ambitious individual, offering asophisticated toolkit to navigate the complexities of both personal and professional landscapes. Imagine confidently steering through life's uncertainties, guided by a cosmic compass aligning with your individual destiny and professional goals",
         secondPara:"Our AstroCoaching™ Synergy Kit is more than a tool; it's a partner in your journey through life's ambiguities. It empowers you to harness cosmic insights for both personal betterment and professional advancement. Transcend basic self-awareness and embark on a transformative pathway of empowerment and growth."}}
      />
      <HomePageCard
        imageUrl={"firstImage"}
        text="AstroValues Alignment is a pivotal element of AstroCoaching™, offering a deep exploration
        of your archetypal traits and how they resonate."      
        heading="AstroValues Alignment"
        buttonText="Take the Assessment"
        nevigateFunction={assessmentClick}
      />
      <HomePageCard
        imageUrl={"secondImage"}
        text="AstroStrengths Analysis delves into your inherent talents, providing clarity and direction for
        personal and professional advancement."
        heading="AstroStrengths Analysis"
        buttonText="Coming soon"
        reverseOrder
      />
      <HomePageCard
        imageUrl={"thirdImage"}
        text="AstroLeadership Archetype, a crucial component of the AstroCoaching™ toolkit, is dedicated
        to enhancing leadership effectiveness and self-awareness."
        heading="AstroLeadership Archetype"
        buttonText="Coming soon"
        nevigateFunction={null}

      />
    </>
  );
}

export default HomePage;