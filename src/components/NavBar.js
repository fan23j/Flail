import React from "react";
import LandingCSS from "./assets/css/landing.module.css";
import { Route, BrowserRouter as Router } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <nav className={LandingCSS.navigation}>
        <ul className={LandingCSS.navBarItems}>
          <Route
            render={({ history }) => (
              <li
                className={LandingCSS.loginButton}
                onClick={() => {
                  history.push("/login");
                }}
              >
                <a className={LandingCSS.loginTop}>Signup/Login</a>
              </li>
            )}
          />
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
