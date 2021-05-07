import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../firebase";
import { db } from "../firebase";
import LoginCSS from "./assets/css/login.module.css";
import { Route, BrowserRouter as Router } from "react-router-dom";

export default function Signup() {
  const firstRef = useRef();
  const lastRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  var userTypeRef = "";

  async function handleSubmit(e) {
    e.preventDefault();

    firstRef.current.value =
      firstRef.current.value.charAt(0).toUpperCase() +
      firstRef.current.value.slice(1);
    lastRef.current.value =
      lastRef.current.value.charAt(0).toUpperCase() +
      lastRef.current.value.slice(1);

    const nameCheck = /^[A-Za-z\s]+$/;
    if (
      !nameCheck.test(firstRef.current.value) ||
      firstRef.current.value.trim().indexOf(" ") >= 0
    ) {
      return setError("Please enter a valid first name");
    }
    if (
      !nameCheck.test(lastRef.current.value) ||
      lastRef.current.value.trim().indexOf(" ") >= 0
    ) {
      return setError("Please enter a valid last name");
    }

    const emailTest = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailTest.test(emailRef.current.value)) {
      return setError("Please enter a valid email address");
    }

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    var specialchar = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
    var lowercase = /[a-z]/;
    var uppercase = /[A-Z]/;

    if (
      passwordRef.current.value.length < 8 ||
      !passwordRef.current.value.match(/\d+/g) ||
      !specialchar.test(passwordRef.current.value) ||
      !lowercase.test(passwordRef.current.value) ||
      !uppercase.test(passwordRef.current.value)
    ) {
      return setError(
        "Passwords must contain at least 8 characters, one uppercase letter, one lowercase letter, a number, and a special character"
      );
    }

    var radios = document.getElementsByName("radios");
    var count = 0;
    for (var i = 0, length = radios.length; i < length; i++) {
      if (radios[i].checked) {
        userTypeRef = radios[i].value;
      } else {
        count = count + 1;
      }
    }

    if (count === 2) {
      return setError("Please specify user type");
    }

    auth
      .fetchSignInMethodsForEmail(emailRef.current.value)
      .then(function (signInMethods) {
        if (signInMethods.length > 0) {
          return setError("Email is already taken");
        }
      });

    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then(function (user) {
        var user2 = auth.currentUser;
        var uid = user.uid;
        const userUid = user2.uid;
        const email2 = user2.email;
        const display = firstRef.current.value;
        const lastDisplay = lastRef.current.value;
        const userType = userTypeRef;

        const account = {
          userid: userUid,
          email: email2,
          firstName: display,
          lastName: lastDisplay,
          userType: userType,
          notes: [],
        };

        user2
          .updateProfile({
            displayName: display,
          })
          .then(function () {
            user2.sendEmailVerification().then(function () {
              db.collection("accounts")
                .doc(userUid)
                .set(account)
                .then((cred) => {
                  history.push("/");
                });
            });
          });
      });
  }

  return (
    <div className={LoginCSS.bod}>
      <div className={LoginCSS.signInDiv}></div>

      <Card className={LoginCSS.divSize}>
        <Card.Body>
          <h2 className={`${LoginCSS.fontSizeHtwo} text-center`}>Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit} noValidate>
            <Form.Group id="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" ref={firstRef} required />
            </Form.Group>
            <Form.Group id="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" ref={lastRef} required />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>

            <Button
              disabled={loading}
              className={`${LoginCSS.logPageButton} w-100`}
              type="submit"
            >
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </div>
  );
}
