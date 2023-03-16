import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAmZC5oQN8phGrFlpERQxEC_uvrozX9fYo",
    authDomain: "ulpgc-events.firebaseapp.com",
    projectId: "ulpgc-events",
    storageBucket: "ulpgc-events.appspot.com",
    messagingSenderId: "407218840468",
    appId: "1:407218840468:web:41acc33a1f2c677d696581",
    measurementId: "G-T1MZVYPYLT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);