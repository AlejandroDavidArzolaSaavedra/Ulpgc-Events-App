import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.19.0/firebase-auth.js"
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.19.0/firebase-firestore.js"
import { getStorage } from "https://www.gstatic.com/firebasejs/9.19.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyDghEM8bhJCms9IdoMA0mCrLt_fUJN1IK4",
    authDomain: "ulpgc-events-2023-2ce40.firebaseapp.com",
    projectId: "ulpgc-events-2023-2ce40",
    storageBucket: "ulpgc-events-2023-2ce40.appspot.com",
    messagingSenderId: "960120953718",
    appId: "1:960120953718:web:a2f017e90ebd3b1a813857"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);