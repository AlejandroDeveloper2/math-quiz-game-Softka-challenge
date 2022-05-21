import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD3AIo1NXO5Z2MJ5hNsWW-PkTXEc9x5fS0",
  authDomain: "mathquizgame-da454.firebaseapp.com",
  projectId: "mathquizgame-da454",
  storageBucket: "mathquizgame-da454.appspot.com",
  messagingSenderId: "661379216560",
  appId: "1:661379216560:web:e0db11422b21269ee2f775",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const database = getFirestore(firebaseApp);
