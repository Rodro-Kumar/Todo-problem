import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAQozMiLEVj7BdIqem93qIzeoSQP0Z-CEI",
  authDomain: "todo4-2f157.firebaseapp.com",
  projectId: "todo4-2f157",
  storageBucket: "todo4-2f157.appspot.com",
  messagingSenderId: "589705239272",
  appId: "1:589705239272:web:7b4422396d9baf4470c75d",
  measurementId: "G-YM65EB3RWB",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
