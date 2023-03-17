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

/**********************************************************/
/**********TODO: FIX THE PROBLEMS**************************/
/**********************************************************/
/**********************************************************/

/* Parte de la autenticacion*/
import {login,logout} from "./auth";
/* El parametro del button login depende de lo que le metamos como id*/
const buttonLogin = document.querySelector("#button-login");
const buttonLogout = document.querySelector("#button-logout")


let currentUser;

firebase.auth().onAuthStateChanged( user => {
    if(user) {
        currentUser = user;
        console.log("User logged", currentUser.displayName)
    }else{
        console.log("User not logged")
    }
});

buttonLogin.addEventListener("click",async (e) => {
    try {
        currentUser = await login();
    }catch(error){}});