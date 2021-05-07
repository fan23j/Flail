import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const app = firebase.initializeApp({
  apiKey: "AIzaSyCDD8xPI6YOcKP17Z_R54hun4rTWBhwiE4",
  authDomain: "comp426-final-7f8d3.firebaseapp.com",
  projectId: "comp426-final-7f8d3",
  storageBucket: "comp426-final-7f8d3.appspot.com",
  messagingSenderId: "327391252774",
  appId: "1:327391252774:web:3f41c2ea893e31208af1e7",
  measurementId: "G-86M8GGX28G",
});

export const auth = app.auth();
export const db = app.firestore();
export default app;
