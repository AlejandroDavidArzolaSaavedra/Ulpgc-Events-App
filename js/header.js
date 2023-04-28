
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.19.0/firebase-auth.js";
import { auth, db } from "./firebase.js";
import { showMessage } from "./showMessage.js";
import { setupEvents } from "./events.js";
import { changeInfoUser } from "./perfil.js";
import { changeInfoUserSave } from "./modificarPerfil.js";
import { getDocs, collection } from "https://www.gstatic.com/firebasejs/9.19.0/firebase-firestore.js"
import { loadListEvents } from "./loadListEvents.js";
import { loadInformationEvents } from "./showInformationEvent.js";

document.addEventListener('DOMContentLoaded', init);
function loadTemplate(fileName, id, callback) {

    fetch(fileName).then((res) => {
        return res.text();
    }).then((text) => {
        document.getElementById(id).innerHTML = text;
        if(callback){
            callback();
        }
    })
}

function init() {
    loadTemplate('../html/components/header.html', 'header');
    changeInstitutional();
    loadTemplate('../html/components/footer.html', 'footer');
    loadEvents();
    registerUser();
}



async function loadEvents(){
    const querySnapShot = await getDocs(collection(db, "evento"));       
    const lockIndex = document.getElementById("card-car-index");
    if (lockIndex != undefined){
        setupEvents(querySnapShot.docs);
    }
}

function changeInstitutional(){
    const verifyInstitucional = document.querySelectorAll(".user-institutional");   
    const usuarioAlmacenado = localStorage.getItem('usuario');
    const patronCorreo = /@ulpgc\.[^.]+$/;
    const usuario = JSON.parse(usuarioAlmacenado);
    console.log(!patronCorreo.test(usuario.correo));
    if (!patronCorreo.test(usuario.correo)) {
        verifyInstitucional.forEach(veryfyUser => veryfyUser.classList.add("hidden"));
    } else {
        verifyInstitucional.forEach(veryfyUser => veryfyUser.classList.remove("hidden"));
    }  
}

function registerUser() {
    fetch('../html/components/header.html')
        .then((res) => {
            return res.text();
        })
        .then(async (text) => {
            const registrarUsuario = document.querySelector("#registrarse-form");
            const iniciarSesion = document.querySelector("#logearse-form");
            console.log(registrarUsuario,iniciarSesion,"asdasdasdsa")
            const linksRegistrado = document.querySelectorAll(".usuario-registrado");
            const linksNoRegistrado = document.querySelectorAll(".usuario-no-registrado");
            let correoValidacion = iniciarSesion["login-correo"].value;
            
            const querySnapShot = await getDocs(collection(db, "evento"));
            const querySnapShotUser = await getDocs(collection(db, "users"));
            let password;
            

            const lockIndex3 = document.getElementById("header-lista-eventos-usuario");
            if (lockIndex3 != undefined){
                loadListEvents(querySnapShot.docs);
            }

<<<<<<< HEAD
=======
            const lockIndex4 = document.getElementById("content-show-information");
            if (lockIndex4 != undefined){
                loadInformationEvents(querySnapShot.docs);
            }
>>>>>>> 01e1e3d7bc8a0e0a58c0cfa4f5ac94ec444a9b51


            registrarUsuario.addEventListener("submit", async(e)=>{
                e.preventDefault();
                const nombre = registrarUsuario["registrar-nombre"].value;
                const correo = registrarUsuario["registrar-correo"].value;
                const contra = registrarUsuario["registrar-contra"].value;
<<<<<<< HEAD
                password = contra;
=======
                const telefono = registrarUsuario["registrar-telefono"].value;
                const usuario = {
                    nombre: nombre,
                    correo: correo,
                    contra: contra,
                    telefono: telefono
                };

                localStorage.setItem('usuario', JSON.stringify(usuario));

>>>>>>> 01e1e3d7bc8a0e0a58c0cfa4f5ac94ec444a9b51
                correoValidacion = correo;
                try {    
                    const credenciales = await createUserWithEmailAndPassword(auth, correo, contra);
                    const modalRegistrar = document.querySelector("#registrarseModal");
                    const modalBoot =bootstrap.Modal.getInstance(modalRegistrar);
                    modalBoot.hide();
                    showMessage("Bienvenido " + nombre);
                    const usuario = {
                        nombre: nombre,
                        correo: correo,
                        contra: contra,
                        telefono: telefono
                    };
                    localStorage.setItem('usuario', JSON.stringify(usuario));
                } catch (error) {
                    let errorDeUsuario = error.code;
                    if(errorDeUsuario === 'auth/invalid-email'){
                        showMessage("Correo no válido " , "warning");
                    }else if(errorDeUsuario === 'auth/weak-password'){
                        showMessage("la contraseña es débil" , "warning");
                    }else if(errorDeUsuario === 'auth/email-already-in-use'){
                        showMessage("El correo ya se esta usando" , "warning");
                    }else{
                        showMessage("Problemas al registrarse" , "warning");
                    }
                }
            })

            
            
            iniciarSesion.addEventListener("submit", async e =>{
                e.preventDefault()
                const correo = iniciarSesion["login-correo"].value;
                const contra = iniciarSesion["login-contra"].value;
                password = contra;
                correoValidacion = correo;
                const usuario = {
                    correo: correo,
<<<<<<< HEAD
                    contra: contra
                };
                localStorage.setItem('usuario', JSON.stringify(usuario));
=======
                    contra: contra,
                };
                console.log("estoy aqui")
                localStorage.setItem('usuario', JSON.stringify(usuario));

>>>>>>> 01e1e3d7bc8a0e0a58c0cfa4f5ac94ec444a9b51
                try {
                    const credenciales = await signInWithEmailAndPassword(auth, correo, contra);
                    const modalIniciar = document.querySelector("#logearseModal");
                    const modalBoot = bootstrap.Modal.getInstance(modalIniciar);
                    modalBoot.hide();
                    showMessage("Bienvenido " + correo);
                } catch (error) {
                    let errorDeUsuario = error.code;
                    if(errorDeUsuario ===  'auth/wrong-password'){
                        showMessage("Contraseña incorrecta " , "warning");
                    }else if(errorDeUsuario === 'auth/user-not-found'){
                        showMessage("Usuario no encontrado" , "warning");
                    }
                }
            });


            const cerrarSesion = document.querySelector("#cerrar-sesion");
            cerrarSesion.addEventListener("click",async () =>{
                await signOut(auth);
            });
            
            onAuthStateChanged(auth, async(user) =>{

                if(user) {                       
                    const patronCorreo = /@ulpgc\.[^.]+$/;
                    const verifyInstitucional = document.querySelectorAll(".user-institutional");   
                    const nameUser = document.querySelector("#nombre-header");
                    linksNoRegistrado.forEach(links => links.style.display="none");
                    linksRegistrado.forEach(links => links.style.display="block");

                    const usuarioAlmacenado = localStorage.getItem('usuario');
                    const usuario = JSON.parse(usuarioAlmacenado);
                    if (!patronCorreo.test(correoValidacion) && !patronCorreo.test(usuario.correo)) {
                        verifyInstitucional.forEach(veryfyUser => veryfyUser.style.display="none");
                    }else{
                        verifyInstitucional.forEach(veryfyUser => veryfyUser.style.display="block");
                    }
                    const querySnapShotUser = await getDocs(collection(db, "users"));
                    const lockPerfil = document.getElementById("CorreoInformacionUsuario");
                    const lockChangePerfil = document.getElementById("cambiarCorreoUsuario");
                    console.log(lockChangePerfil);
                    console.log(password);
                    if (lockPerfil != undefined){
                        changeInfoUser(querySnapShotUser.docs,password);
                    }

                    if (lockChangePerfil != undefined){
                        changeInfoUserSave(querySnapShotUser.docs,password);
                    }
                }else{
                    linksRegistrado.forEach(links => links.style.display="none");
                    linksNoRegistrado.forEach(links => links.style.display="block");
                }
            })
        })
}

