// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.19.0/firebase-auth.js"
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.19.0/firebase-firestore.js"
import { getStorage } from "https://www.gstatic.com/firebasejs/9.19.0/firebase-storage.js";

// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
    apiKey: "AIzaSyAv3QoKKOW_050RiN7aXHRzUpOwLxoqbP0",
    authDomain: "ulpgc-events-a59f5.firebaseapp.com",
    projectId: "ulpgc-events-a59f5",
    storageBucket: "ulpgc-events-a59f5.appspot.com",
    messagingSenderId: "1074689670789",
    appId: "1:1074689670789:web:b23976f4f3a2cf61dcf3ec",
    measurementId: "G-36W8TWRWWQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
