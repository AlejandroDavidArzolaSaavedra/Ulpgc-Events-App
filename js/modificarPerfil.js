import {db } from "../js/firebase.js";
import {updateDoc, getDocs, collection } from "https://www.gstatic.com/firebasejs/9.19.0/firebase-firestore.js"

let originalNombre = '';
let originalCorreo = '';
let originalTelefono = '';
let originalContraseña = '';

export const changeInfoUserSave = (listUsers,usuarioRegistrado) => {
    const Nombre = "isai@gmail.com";
    const usuarioAlmacenado = localStorage.getItem('usuario');
    const usuario = JSON.parse(usuarioAlmacenado);
    listUsers.forEach(user => {
        const userInfo= user.data();
        if(Nombre == userInfo.correo){
            originalNombre = userInfo.nombre;
            originalCorreo = userInfo.correo;
            originalTelefono = userInfo.telefono;
            originalContraseña = usuario.contra;

            document.getElementById("cambiarNombreUsuario").value = userInfo.nombre;
            document.getElementById("cambiarCorreoUsuario").value = userInfo.correo;
            document.getElementById("cambiarTelefonoUsuario").value = userInfo.telefono;
            document.getElementById("cambiarContraseñaUsuario").value = usuario.contra;
        }
    });
    const modificarBoton = document.getElementById("BotonModificarUsuario");
    console.log(modificarBoton);
    modificarBoton.addEventListener("click", async () => {

        const nombre = document.getElementById("cambiarNombreUsuario").value;
        const correo = document.getElementById("cambiarCorreoUsuario").value;
        const telefono = document.getElementById("cambiarTelefonoUsuario").value;
        const contraseña = document.getElementById("cambiarContraseñaUsuario").value;
        console.log(nombre);
        console.log(correo);
        console.log(telefono);
        console.log(contraseña);
        const userDocRef = await getDocs(collection(db, "users"));
        
       
        console.log(userDocRef,"ASDASDSDSDADASDASDASD");
         await updateDoc(userDocRef, {
          nombre: nombre,
          correo: correo,
          telefono: telefono,
          contraseña: contraseña
        });
    });
    const botonEliminarCambios = document.getElementById('BotonEliminarCambios');
    botonEliminarCambios.addEventListener('click', async () => {
   
        document.getElementById('cambiarNombreUsuario').value = originalNombre;
        document.getElementById('cambiarCorreoUsuario').value = originalCorreo;
        document.getElementById('cambiarTelefonoUsuario').value = originalTelefono;
        document.getElementById('cambiarContraseñaUsuario').value = originalContraseña;
    });
    
  }
