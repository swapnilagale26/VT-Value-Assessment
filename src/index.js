import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
import "./global.css"
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { UserProvider } from "./contex/UserContext";
import { BrowserRouter } from "react-router-dom";
import SignInHandler from "./components/SignInHandler";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserProvider>
    <BrowserRouter>
      <SignInHandler />
    </BrowserRouter>
  </UserProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
