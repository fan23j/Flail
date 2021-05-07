import React from "react";
import LandingCSS from "./assets/css/landing.module.css";
import Hero from "./Hero";
import { Route, BrowserRouter as Router } from "react-router-dom";

const Landingpage = () => {
  return (
    <div className={LandingCSS.landingPageStyle}>
      <h1 className={LandingCSS.h1}>Flail!</h1>
      <p className={LandingCSS.text}>
        Move your limbs to match <br></br>the indicators on screen.<br></br>Can
        you twist and turn <br></br>your way to the prize?<br></br>
        <br></br>
        Insert your ticket in <br></br>the "Login" slot!
      </p>
      <p className={LandingCSS.credits}>
        Built using
        <ul>
          <li>poseNet</li>
          <li>p5.js</li>
          <li>Firebase</li>
          <li>React</li>
          <li>PubNub</li>
        </ul>
      </p>
      <p className={LandingCSS.warning}>!Webcam Required!</p>
      <Route
        render={({ history }) => (
          <li
            className={LandingCSS.loginButton}
            onClick={() => {
              history.push("/login");
            }}
          >
            Signup/Login
          </li>
        )}
      />
      <Hero />
    </div>
  );
};

export default Landingpage;
