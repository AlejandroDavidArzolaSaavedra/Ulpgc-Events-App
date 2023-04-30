
import { createUserWithEmailAndPassword,EmailAuthProvider,reauthenticateWithCredential, onAuthStateChanged, updateEmail, updatePassword, signOut,getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.19.0/firebase-auth.js";
import { auth, db } from "./firebase.js";
import { showMessage } from "./showMessage.js";
import { setupEvents } from "./events.js";
import { getDocs, collection, query, orderBy, doc, setDoc, where } from "https://www.gstatic.com/firebasejs/9.19.0/firebase-firestore.js"
import { loadListEvents } from "./loadListEvents.js";
import { getUUID } from "./utils.js"; // GENERADOR RANDOM DE UUID
import { changeInfoUserSave,changeInfoUser } from "./modificarPerfil.js";
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
    changeInstitutional();
    loadTemplate('../html/components/header.html', 'header');
    loadTemplate('../html/components/footer.html', 'footer');
    loadEvents();
    registerUser();
}
let usuarioRegistradoTemporal;
async function loadEvents(){
    const eventsRef = collection(db, 'evento');
    const q = query(eventsRef, orderBy('fechaDeSubida', 'asc'));
  
    const querySnapshot = await getDocs(q);
    const eventos = querySnapshot.docs.map((doc) => doc.data());
    console.log(q);
    localStorage.setItem('evento', JSON.stringify(eventos));
    const lockIndex = document.getElementById('card-car-index');
    if (lockIndex != undefined) {
      setupEvents(querySnapshot.docs);
    }
}


function changeInstitutional(){
    const verifyInstitucional = document.querySelectorAll(".user-institutional");   
    const usuarioAlmacenado = localStorage.getItem('usuario');
    const patronCorreo = /@ulpgc\.[^.]+$/;
    const usuario = JSON.parse(usuarioAlmacenado);
    if (usuario!=undefined){
    if (!patronCorreo.test(usuario.correo)) {
        verifyInstitucional.forEach(veryfyUser => veryfyUser.classList.add("hidden"));
        
    } else {
        verifyInstitucional.forEach(veryfyUser => veryfyUser.classList.remove("hidden"));
    }  }
}
let contraUser;
let usuarioTemporal;
function registerUser() {
    fetch('../html/components/header.html')
        .then((res) => {
            return res.text();
        })
        .then(async (text) => {
            const registrarUsuario = document.querySelector("#registrarse-form");
            const iniciarSesion = document.querySelector("#logearse-form");
            const linksRegistrado = document.querySelectorAll(".usuario-registrado");
            const linksNoRegistrado = document.querySelectorAll(".usuario-no-registrado");
            let correoValidacion;
            
            const querySnapShot = await getDocs(collection(db, "evento"));
            const checkbox = document.getElementById("blankCheckbox");
            const button = document.getElementById("registrar-btn");
            console.log(checkbox)
            checkbox.addEventListener("change", function() {
              if (this.checked) {
                button.removeAttribute("disabled");
              } else {
                button.setAttribute("disabled", true);
              }
            });  

            const lockIndex3 = document.getElementById("header-lista-eventos-usuario");
            if (lockIndex3 != undefined){
                loadListEvents(querySnapShot.docs);
            }


            if(registrarUsuario){
            registrarUsuario.addEventListener("submit", async(e)=>{
                e.preventDefault();
                const nombre = registrarUsuario["registrar-nombre"].value;
                const correo = registrarUsuario["registrar-correo"].value;
                const contra = registrarUsuario["registrar-contra"].value;
                password = contra;
                correoValidacion = correo;
                try {    
                    const credenciales = await createUserWithEmailAndPassword(auth, correo, contra);
                    const modalRegistrar = document.querySelector("#registrarseModal");
                    const modalBoot =bootstrap.Modal.getInstance(modalRegistrar);
                
                    const usuario = {
                        nombre: nombre,
                        correo: correo,
                        contra: contra,
                        telefono: telefono,
                        uid: getUUID(),
                        userId: usuarioTemporal.uid,
                    };
                    usuarioRegistradoTemporal=usuario;

                    contraUser = contra;
                    localStorage.setItem('usuario', JSON.stringify(usuario));
    
                    if(usuario && usuarioTemporal.uid != undefined){
                        addUser(usuario);
                    }
                    
                    modalBoot.hide();
                    showMessage("Bienvenido " + nombre);
                    const usuario2 = {
                        nombre: nombre,
                        correo: correo,
                        contra: contra,
                        telefono: telefono
                    };
                    localStorage.setItem('usuario', JSON.stringify(usuario2));
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
        }
            
            if(iniciarSesion){
            iniciarSesion.addEventListener("submit", async e =>{
                e.preventDefault()
                const correo = iniciarSesion["login-correo"].value;
                const contra = iniciarSesion["login-contra"].value;
                password = contra;
                correoValidacion = correo;
                contraUser = contra;
                const usuario = {
                    correo: correo,
                    contra: contra
                };
                localStorage.setItem('usuario', JSON.stringify(usuario));
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

        }
            const cerrarSesion = document.querySelector("#cerrar-sesion");
            cerrarSesion.addEventListener("click",async () =>{
                localStorage.removeItem('usuario');
                await signOut(auth);
                window.location.href = "http://127.0.0.1:5501/html/index.html";
            });
            
            onAuthStateChanged(auth, async(user) =>{
                if(user) {         
                    usuarioTemporal = user;              
                    const patronCorreo = /@ulpgc\.[^.]+$/;
                    const verifyInstitucional = document.querySelectorAll(".user-institutional");   
                    const nameUser = document.querySelector("#nombre-header");
                    linksNoRegistrado.forEach(links => links.style.display="none");
                    linksRegistrado.forEach(links => links.style.display="block");
                    const option_no_Institucional = document.querySelectorAll(".mis-eventos-no-institucional");  
                    
                    const usuarioAlmacenado = localStorage.getItem('usuario');
                    const usuario = JSON.parse(usuarioAlmacenado);
                    if (usuario){
                    if (!patronCorreo.test(correoValidacion) && !patronCorreo.test(usuario.correo)) {
                        verifyInstitucional.forEach(veryfyUser => veryfyUser.style.display="none");
                    }else{
                        verifyInstitucional.forEach(veryfyUser => veryfyUser.style.display="block");
                        if(option_no_Institucional){
                        option_no_Institucional.forEach(option => option.style.display="none");}
                    }
                }
                    //////////////////////////////////////////////
                    const querySnapShotUser = await getDocs(collection(db, "users"));
                    const lockPerfil = document.getElementById("CorreoInformacionUsuario");
                    const lockChangePerfil = document.getElementById("cambiarCorreoUsuario");
                   


                    if (lockPerfil != undefined){
                        const resultado = await getUser(usuarioTemporal.uid);
                        console.log(resultado,"ssssss")
                        let lockUserPerfil = resultado;
                        console.log(usuarioTemporal.uid)
                        changeInfoUser(lockUserPerfil);
                    }

                    if (lockChangePerfil != undefined){
                        changeInfoUserSave(querySnapShotUser.docs,contraUser);
                    }
                    //////////////////////////////////////////////                    
                }else{
                    linksRegistrado.forEach(links => links.style.display="none");
                    linksNoRegistrado.forEach(links => links.style.display="block");
                }
            })
        })
}

///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////



async function insertUser(user){
    try {
        const reponse = await setDoc(doc(db, "users", user.userId), user);
        return reponse;
    } catch (error) {
        console.log("Peto por error",error)
    }
}

async function addUser(user){
    try {
        const response = await insertUser(user);        
    } catch (error) {
        console.log("Problemas al añadir", error)        
    }
}


async function getUser(user){
    try {
        const response = await getInfoUser(user); 
        return response;       
    } catch (error) {
        console.log("Problemas al añadir", error)        
    }
}

async function getInfoUser(userId){
    try {
        const q = query(collection(db, "users"), where("userId", "==", userId));
        let usuarioDeLaAplicacion;
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            usuarioDeLaAplicacion = doc.data();
        });
        return usuarioDeLaAplicacion;
    } catch (error) {
        console.log("Peto por error",error)
    }
}

///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////

const buttonSave = document.querySelector("#button-save-perfil");
const confirmModal = document.getElementById('confirm-modal');
const confirmMessage = document.getElementById('confirm-message');
const confirmButton = document.getElementById('confirm-button');
const cancelModalButton = document.getElementById('cancel-modal-button');
const exitModalButton = document.getElementById('exit-close');
const buttonEdit = document.querySelector("#button-edit-perfil");

let paswrodAuxiliarCambio;

if(buttonEdit){
buttonEdit.addEventListener('click', function() {
    const buttonEd = document.querySelectorAll(".hidden");
    buttonEd.forEach( buttons => buttons.style.display = "inline-block");
    buttonEdit.style.display = "none"

});}

if(buttonSave){
buttonSave.addEventListener('click', function() {
    confirmMessage.innerText = '¿Estás seguro que deseas guardar los cambios?';
    confirmModal.style.display = 'block';
    
    confirmButton.onclick = async function() {
        
        
        console.log("CHUTTTYYY")
        const resultado = await getUser(usuarioTemporal.uid);
        let editarPerfil = resultado;
        let contraAux;
        let mailAux = editarPerfil.correo;
        contraAux = editarPerfil.contra;
        console.log(editarPerfil.userId)
        let temp = document.getElementById("CorreoInformacionUsuario").value;
        
        editarPerfil.nombre = document.getElementById("NombreInformacionUsuario").value;
        
        editarPerfil.telefono = document.getElementById("TelefonoInformacionUsuario").value;
        
        console.log(editarPerfil)
        console.log(contraAux,"asdasdas")    
        
        editarPerfil.contra = document.getElementById("ContraseñaInformacionUsuario").value;
        const resultado2 = await getUser(usuarioTemporal.uid);   

        editarPerfil.correo = temp;
        //const resultado3 = await getUser(usuarioTemporal.uid);   

        // Actualizar firebase authentication
        let incremento = 0;
        if(contraAux != document.getElementById("ContraseñaInformacionUsuario").value){
            console.log("contras distintas")
            incremento+=1
            addUser(editarPerfil)        
            functionActualizarFirebaseAuth(editarPerfil.correo);  
        }
        if(!incremento){
            if(mailAux != document.getElementById("CorreoInformacionUsuario").value){
                addUser(editarPerfil)
                actualizarFirebaseAuthentication(editarPerfil.correo);
            }
        }
        incremento=0;
        
        // Aquí iría el código para guardar los cambios
        confirmModal.style.display = 'none';
        
        // Oculta los botones de edición
        const buttonEd = document.querySelectorAll(".hidden");
        buttonEd.forEach(button => button.style.display = "none");

        // Muestra el botón de editar
        buttonEdit.style.display = "inline-block";
    }

    cancelModalButton.onclick = function(){
        // Aquí iría el código para guardar los cambios
        confirmModal.style.display = 'none';
        
    } 

    exitModalButton.onclick = function(){
        // Aquí iría el código para guardar los cambios
        confirmModal.style.display = 'none';
        
    } 
});
}

function actualizarFirebaseAuthentication( newEmail) {
    updateEmail(auth.currentUser, newEmail)
      .then(() => {
        console.log("Correo electrónico actualizado correctamente");
      })
      .catch((error) => {
        console.log("Error al actualizar el correo electrónico:", error);
      });
  }

  function functionActualizarFirebaseAuth(newPassword) {

    paswrodAuxiliarCambio = newPassword;
    console.log(newPassword,"ASSSSSS")
    updatePassword(auth.currentUser, newPassword)
    .then(() => {
      console.log("Contraseña actualizada con éxito");
    })
    .catch((error) => {
      console.log("Ocurrió un error al actualizar la contraseña:", error);
    });
  }
  


  async function getEvent(user){
    try {
        const response = await getInfoEvent(user); 
        return response;       
    } catch (error) {
        console.log("Problemas al añadir", error)        
    }
}

async function getInfoEvent(userId){
    try {
        const q = query(collection(db, "events"), where("Creador", "==", userId));
        let usuarioDeLaAplicacion;
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            usuarioDeLaAplicacion = doc.data();
        });
        return usuarioDeLaAplicacion;
    } catch (error) {
        console.log("Peto por error",error)
    }
}
