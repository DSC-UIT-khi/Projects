import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJ8CvmT66AVtKuhfHHwbKjUIewA0W4hc8",
  authDomain: "whatsappclonehamza.firebaseapp.com",
  projectId: "whatsappclonehamza",
  storageBucket: "whatsappclonehamza.appspot.com",
  messagingSenderId: "569873937436",
  appId: "1:569873937436:web:ab43d894c7095c224d1bd9",
  measurementId: "G-HY1GTZDW60"
};

// initialize firebase app
const firebaseApp = firebase.initializeApp(firebaseConfig)
// acts as firestore instance basically it gets our database
const db = firebaseApp.firestore();
//authentication handler for all our authentication part
const auth = firebase.auth();
// we need this for google authentication this is what we will use for google auth
const provider = new firebase.auth.GoogleAuthProvider();

// now export these stuff
//explicit export
export {auth, provider};
//implicit export
export default db; //default as will be used quite more than other