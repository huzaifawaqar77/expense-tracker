import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

// firebae Config

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
