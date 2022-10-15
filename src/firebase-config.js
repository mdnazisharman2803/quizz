import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcH7bEi9gVKrGfylbzc3aWirxQaCpLeHI",
  authDomain: "mcqapp-6eded.firebaseapp.com",
  databaseURL: "https://mcqapp-6eded-default-rtdb.firebaseio.com",
  projectId: "mcqapp-6eded",
  storageBucket: "mcqapp-6eded.appspot.com",
  messagingSenderId: "819301737405",
  appId: "1:819301737405:web:8b41bdac36e3c689ba28d4",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
