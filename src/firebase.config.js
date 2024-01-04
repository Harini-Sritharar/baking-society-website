import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyApoAGlZx0K-Um5UbcduQqMSQ7idCLHCdw",
  authDomain: "react-baking-soc-website.firebaseapp.com",
  projectId: "react-baking-soc-website",
  storageBucket: "react-baking-soc-website.appspot.com",
  messagingSenderId: "853431791788",
  appId: "1:853431791788:web:2c1b8f636d2b53412b2f09"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {db}