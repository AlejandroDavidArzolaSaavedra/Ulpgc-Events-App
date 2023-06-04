import {db } from "../js/firebase.js";
import {updateDoc, getDocs, collection } from "https://www.gstatic.com/firebasejs/9.19.0/firebase-firestore.js"
import {query, where } from "https://www.gstatic.com/firebasejs/9.19.0/firebase-firestore.js"

let originalNombre = '';
let originalCorreo = '';
let originalTelefono = '';
let originalContraseña = '';

export const changeInfoUserSave = (usuarioRegistrado) => {
    const usuarioAlmacenado = localStorage.getItem('usuario');
    const usuario = JSON.parse(usuarioAlmacenado);
    
    document.getElementById("cambiarNombreUsuario").value = usuarioRegistrado.nombre;
    document.getElementById("cambiarCorreoUsuario").value = usuarioRegistrado.correo;
    document.getElementById("cambiarTelefonoUsuario").value = usuarioRegistrado.telefono;
    document.getElementById("cambiarContraseñaUsuario").value = usuarioRegistrado.contra;
       
    const modificarBoton = document.getElementById("BotonModificarUsuario");
    modificarBoton.addEventListener("click", async () => {

        const nombre = document.getElementById("cambiarNombreUsuario").value;
        const correo = document.getElementById("cambiarCorreoUsuario").value;
        const telefono = document.getElementById("cambiarTelefonoUsuario").value;
        const contraseña = document.getElementById("cambiarContraseñaUsuario").value;
        const userDocRef = await getDocs(collection(db, "users"));
        
         await updateDoc(userDocRef, {
          nombre: nombre,
          correo: correo,
          telefono: telefono,
          contraseña: contraseña
        });
    });
    const botonEliminarCambios = document.getElementById('BotonEliminarCambios');
    botonEliminarCambios.addEventListener('click', async () => {
        console.log("wwwwwwwwwwwwwowwwwwwwwwwwwwwwwww");
        document.getElementById('cambiarNombreUsuario').value = originalNombre;
        document.getElementById('cambiarCorreoUsuario').value = originalCorreo;
        document.getElementById('cambiarTelefonoUsuario').value = originalTelefono;
        document.getElementById('cambiarContraseñaUsuario').value = originalContraseña;
    });
    
  }
/////////////////////////////////////////////////////////////
//                  INFORMACION DEL PERFIL
/////////////////////////////////////////////////////////////

  export const changeInfoUser = async (usuarioRegistrado) => {
    const Nombre = "isai@gmail.com";
    const usuarioAlmacenado = localStorage.getItem('usuario');
    const usuario = JSON.parse(usuarioAlmacenado);



    document.getElementById("NombreInformacionUsuario").value = usuarioRegistrado.nombre;
    document.getElementById("CorreoInformacionUsuario").value = usuarioRegistrado.correo;
    document.getElementById("TelefonoInformacionUsuario").value = usuarioRegistrado.telefono;        
    document.getElementById("ContraseñaInformacionUsuario").value = usuarioRegistrado.contra;
    }



  const buttonEdit = document.querySelector("#button-edit-perfil");
    const buttonSave = document.querySelector("#button-save-perfil");
    const buttonDeleteChanges = document.querySelector("#BotonEliminarCambios");
    if(buttonEdit){
    buttonEdit.addEventListener('click', function() {
        const buttonEd = document.querySelectorAll(".hidden");
        buttonEd.forEach( buttons => buttons.style.display = "inline-block");
        buttonEdit.style.display = "none"

    });}

 
if(buttonDeleteChanges){
    buttonDeleteChanges.addEventListener('click', function() {
        const buttonEd = document.querySelectorAll(".hidden");
        buttonEd.forEach( buttons => buttons.style.display = "none");
        buttonEdit.style.display = "inline-block"
        
    });}


    