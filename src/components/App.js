import React from "react";
import Signup from "./Signup";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import Landingpage from "./Landingpage";
function App() {
  return (
    <div>
      <Router>
        <Route exact path="/" component={Landingpage} />

        <AuthProvider>
          <Switch>
            <PrivateRoute
              path="/dashboard"
              className="d-flex w-100align-items-center justify-content-center"
              style={{ maxWidth: "400px", minHeight: "100vh" }}
              component={Dashboard}
            />
            <PrivateRoute
              path="/update-profile"
              className="d-flex w-100 align-items-center justify-content-center"
              style={{ maxWidth: "400px", minHeight: "100vh" }}
              component={UpdateProfile}
            />
            <Route
              path="/signup"
              className="d-flex w-100 align-items-center justify-content-center"
              style={{ maxWidth: "400px", minHeight: "100vh" }}
              component={Signup}
            />
            <Route
              path="/login"
              className="d-flex w-100 align-items-center justify-content-center"
              style={{ maxWidth: "400px", minHeight: "100vh" }}
              component={Login}
            />
            <Route
              path="/forgot-password"
              className="d-flex w-100 align-items-center justify-content-center"
              style={{ maxWidth: "400px", minHeight: "100vh" }}
              component={ForgotPassword}
            />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
