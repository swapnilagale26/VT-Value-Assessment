import React, { useState } from "react";
import MyNavbar from "./navBar/NavBar";
import App from "../App";
import Footer from "./Footer";
import { signInProvider } from "../contex/ArctypeProvider";

function SignInHandler(){
  let [isSignin,setIsSignIn]=useState(true);

  return(
    <signInProvider.Provider value={{isSignin:isSignin,setIsSignIn:setIsSignIn}}>
      <div style={{display:'flex',flexDirection:'column', minHeight:'100vh'}}>
      <div style={{flex: 'initial'}}><MyNavbar/></div>
      
      <div style={{flex: 'auto',backgroundColor:'#fffaf6 '}}><App  /></div>
      <div style={{flex: 'initial'}}><Footer  /></div>
      </div >
    </signInProvider.Provider>
  )
};

export default SignInHandler;