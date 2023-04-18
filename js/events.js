// Importa el SDK de Firebase
import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyAv3QoKKOW_050RiN7aXHRzUpOwLxoqbP0",
    authDomain: "ulpgc-events-a59f5.firebaseapp.com",
    projectId: "ulpgc-events-a59f5",
    storageBucket: "ulpgc-events-a59f5.appspot.com",
    messagingSenderId: "1074689670789",
    appId: "1:1074689670789:web:b23976f4f3a2cf61dcf3ec",
    measurementId: "G-36W8TWRWWQ"
  };


// Inicializa Firebase
firebase.initializeApp(firebaseConfig);

// Accede a la base de datos
const database = firebase.database();

// Crear un nuevo evento
const nuevoEvento = {
    nombre: "Evento de prueba",
    fecha: "2023-05-01",
    lugar: "Ciudad de prueba",
    descripción: "Un evento de prueba para fines de demostración"
  };
  
  // Guardar el nuevo evento en la base de datos
  database.ref('eventos').push(nuevoEvento)
    .then(() => {
      console.log("Evento creado exitosamente");
    })
    .catch((error) => {
      console.error("Error al crear el evento:", error);
    });