import React, { useState } from "react";
import home from "../assets/dashboard.svg";
import chat1 from "../assets/chat1.svg";
import map from "../assets/search.svg";
import { Button } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import legend from "../assets/legend.png";
import { db } from "../../../firebase";

import "./Navbar.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  HashRouter,
} from "react-router-dom";

var score;

db.collection("accounts")
  .doc("JYiZVFFxW2NpSTS3HNhfmGmvI063")
  .onSnapshot(function (doc) {
    score = doc.data().score.high;
    console.log(score);
    console.log("Current data: ", doc.data());
  });

export default function Navbar() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/");
    } catch {
      setError("Failed to log out");
    }
  }

  let path = window.location.href;
  let links = 0;
  if (path.endsWith("/") === true) links = 0;
  if (path.endsWith("/chat") === true) links = 2;
  const [state, setstate] = useState(links);
  return (
    <div className="Navbar-navbar-container" id="77">
      <h2 className="Navbar-logo">Flail!</h2>
      <ul className="Navbar-navbar-links">
        <li>
          <Link
            onClick={() => {
              setstate(0);
            }}
            to="/dashboard"
            className="Navbar-li"
          >
            <div
              className={
                state === 0
                  ? "Navbar-icon-cont Navbar-active-cont "
                  : "Navbar-icon-cont"
              }
            >
              <div className="Navbar-icon">
                <img className="Navbar-homeIcon" alt="" src={home} />
              </div>
            </div>
            <div
              className={
                state === 0
                  ? "Navbar-link-notactive Navbar-active "
                  : "Navbar-link-notactive"
              }
            >
              Home
            </div>
          </Link>
        </li>
        <li>
          <Link
            onClick={() => {
              setstate(1);
            }}
            to="/dashboard/chat"
            className="Navbar-li"
          >
            <div
              className={
                state === 1
                  ? "Navbar-icon-cont Navbar-active-cont "
                  : "Navbar-icon-cont"
              }
            >
              <div className="Navbar-icon">
                <img alt="" src={chat1} />
              </div>
            </div>
            <div
              className={
                state === 1
                  ? "Navbar-link-notactive active"
                  : "Navbar-link-notactive"
              }
            >
              Chat
            </div>
          </Link>
        </li>
        <li>
          <Link
            onClick={() => {
              setstate(2);
            }}
            to="/dashboard/map"
            className="Navbar-li"
          >
            <div
              className={
                state === 2
                  ? "Navbar-icon-cont Navbar-active-cont "
                  : "Navbar-icon-cont"
              }
            >
              <div className="Navbar-icon">
                <img alt="" src={map} />
              </div>
            </div>
            <div
              className={
                state === 2
                  ? "Navbar-link-notactive Navbar-active "
                  : "Navbar-link-notactive"
              }
            >
              Map
            </div>
          </Link>
        </li>
      </ul>
      <img src={legend} className="legend" />
      <a className="logOut" variant="link" onClick={handleLogout}>
        Log Out
      </a>
      <div>
        <p>High Score: {score} </p>
      </div>
    </div>
  );
}
