// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import * as firebaseStorage from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjACgViANUQNJAnKdSQ-025NWHIiJ5Sl4",
  authDomain: "triipicp.firebaseapp.com",
  projectId: "triipicp",
  storageBucket: "triipicp.appspot.com",
  messagingSenderId: "868785571176",
  appId: "1:868785571176:web:625877b19646bb4cfc02dd",
  measurementId: "G-G4QK88X4YN"
};

// Initialize Firebase
//analytics is optional for this tutoral
const storage = firebaseStorage.getStorage(firebase.initializeApp(firebaseConfig));

export { firebase, storage, firebaseStorage };
