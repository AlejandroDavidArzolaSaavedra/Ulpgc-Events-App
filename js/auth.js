
// Configura el SDK de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAv3QoKKOW_050RiN7aXHRzUpOwLxoqbP0",
    authDomain: "ulpgc-events-a59f5.firebaseapp.com",
    projectId: "ulpgc-events-a59f5",
    storageBucket: "ulpgc-events-a59f5.appspot.com",
    messagingSenderId: "1074689670789",
    appId: "1:1074689670789:web:b23976f4f3a2cf61dcf3ec",
    measurementId: "G-36W8TWRWWQ"
  };
  
  firebase.initializeApp(firebaseConfig);


firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log("Usuario registrado:", user);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("Error durante el registro:", errorCode, errorMessage);
  });

firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log("Usuario inició sesión:", user);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("Error durante la sesión:", errorCode, errorMessage);
  });

firebase.auth().signOut()
  .then(() => {
    console.log("Usuario cerró sesión");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("Error durante el cierre de sesión:", errorCode, errorMessage);
  });