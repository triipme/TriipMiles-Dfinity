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
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
};

console.log(process.env);

// Initialize Firebase
//analytics is optional for this tutoral
const storage = firebaseStorage.getStorage(firebase.initializeApp(firebaseConfig));

export { firebase, storage, firebaseStorage };
