import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

// firebae Config
const firebaseConfig = {
  apiKey: "AIzaSyAGOpzJ1c30-ih3c54wW-Lyf3PyBk0_7nQ",
  authDomain: "recipe-directory-nextjs.firebaseapp.com",
  projectId: "recipe-directory-nextjs",
  storageBucket: "recipe-directory-nextjs.appspot.com",
  messagingSenderId: "94181069324",
  appId: "1:94181069324:web:655079f85cf6a998361429",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Initialize Services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

const timestamp = firebase.firestore.Timestamp;
// Exports
export { projectFirestore, projectAuth, timestamp };
