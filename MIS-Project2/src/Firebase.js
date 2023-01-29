

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBFBhamzY_rUhNm8heoOBcrOi4DtvjfJ3k",
  authDomain: "current-affairs-mis-project.firebaseapp.com",
  projectId: "current-affairs-mis-project",
  storageBucket: "current-affairs-mis-project.appspot.com",
  messagingSenderId: "485064444558",
  appId: "1:485064444558:web:345b8529c477ded41717df",
  measurementId: "G-1K40GX4D1S"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
