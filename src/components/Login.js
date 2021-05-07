import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import LandingCSS from "./assets/css/landing.module.css";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { Route, BrowserRouter as Router } from "react-router-dom";
import LoginCSS from "./assets/css/login.module.css";
import { auth } from "../firebase";
import { db } from "../firebase";
import logo from "./assets/logo.png";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    {
      /* A JSX comment */
    }

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);

      var user = auth.currentUser;
      if (user.emailVerified) {
      } else {
        return setError("Please verify email before logging in.");
      }

      history.push("/dashboard");
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }

  return (
    <div className={LoginCSS.bod}>
      <div className={LoginCSS.signInDiv}></div>

      <Card className={LoginCSS.divSize}>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button
              disabled={loading}
              className={`${LoginCSS.logPageButton} w-100`}
              type="submit"
            >
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}
