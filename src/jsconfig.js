import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyAIasK3CnJGpLRb2qvvnSWA-JEzWFmwtPc",
    authDomain: "twitter-clone-b19eb.firebaseapp.com",
    projectId: "twitter-clone-b19eb",
    storageBucket: "twitter-clone-b19eb.appspot.com",
    messagingSenderId: "55553753104",
    appId: "1:55553753104:web:1c03a7bb70d934f77eca95",
    measurementId: "G-ZZTBJWCXD3"
  };

  const app = initializeApp(firebaseConfig);

  export const auth = getAuth(app);

  export const provider = new GoogleAuthProvider();

  export const db = getFirestore(app);