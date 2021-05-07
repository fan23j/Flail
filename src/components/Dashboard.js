import Navbar from "./dashboardcomponents/Navbar/Navbar";
import Map from "./dashboardcomponents/Map/Map";
import LandingCSS from "./assets/css/landing.module.css";
import Chat from "./dashboardcomponents/Chat/Chat";
import Game from "./dashboardcomponents/Game/Game";
import "./assets/css/Dashboard.scss";
import React, { useEffect, useState, Component } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  HashRouter,
} from "react-router-dom";
import { flushSync } from "react-dom";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.setState({ Spage1: [] });
    this.setState({ Spage2: [] });
  }

  componentDidMount() {
    let s = document.getElementsByClassName("88").scrollWidth;
    let d = document.getElementsByClassName("con").offsetWidth;

    let buttons = Math.ceil(s / d);
    if (buttons === 2) {
      document.getElementsByClassName(
        "index-container"
      ).children[2].style.display = "none";
      document.getElementsByClassName(
        "index-container"
      ).children[1].style.display = "block";
      document.getElementsByClassName(
        "index-container"
      ).children[0].style.display = "block";
    } else if (buttons === 1) {
      document.getElementsByClassName(
        "index-container"
      ).children[2].style.display = "none";
      document.getElementsByClassName(
        "index-container"
      ).children[1].style.display = "none";
      document.getElementsByClassName(
        "index-container"
      ).children[0].style.display = "block";
    } else if (buttons === 0) {
      document.getElementsByClassName(
        "index-container"
      ).children[2].style.display = "block";
      document.getElementsByClassName(
        "index-container"
      ).children[1].style.display = "block";
      document.getElementsByClassName(
        "index-container"
      ).children[0].style.display = "block";
    }
  }

  render() {
    return (
      <>
        <Navbar />
        <Switch>
          <Route exact path="/dashboard">
            <Game />
          </Route>
          <Route exact path="/dashboard/chat">
            <Chat />
          </Route>
          <Route exact path="/dashboard/map">
            <Map />
          </Route>
        </Switch>
      </>
    );
  }
}
