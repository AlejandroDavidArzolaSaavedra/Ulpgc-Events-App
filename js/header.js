
import { createUserWithEmailAndPassword, onAuthStateChanged, updateEmail, updatePassword, signOut,getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.19.0/firebase-auth.js";
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
    const q = query(eventsRef, orderBy('fechaDeSubida', 'desc'));
    const querySnapshot = await getDocs(q);
    const eventos = querySnapshot.docs.map((doc) => doc.data());
 
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
            checkbox.addEventListener("change", function() {
              if (this.checked) {
                button.removeAttribute("disabled");
              } else {
                button.setAttribute("disabled", true);
              }
            });  
            
            //Botón modo oscuro
            const botonModoNoche = document.getElementById('botonModoNoche');
            let modoOscuro = true;
            if(botonModoNoche){
            botonModoNoche.addEventListener("click", async () =>  {
                if(modoOscuro) {
                console.log("holaaa");
                const cuerpo = document.querySelector("#cuerpo-pagina");
                const header = document.querySelector("#header");
                if(header){
                    console.log(header);
                }
                header.style.backgroundColor = "#2C2C2C"
                cuerpo.style.backgroundColor = "black";
                const encabezado = document.querySelector(".encabezado-tabla");
                //Lista eventos modo oscuro
                if(encabezado){
                    const listaEventosTitulo = document.querySelector("#header-lista-eventos-usuario");
                    const nombreEvento = document.querySelector("#nombreEvento");
                    const fechaEvento = document.querySelector("#fechaEvento");
                    const tipoEvento = document.querySelector("#tipoEvento");
                    nombreEvento.style.color = "White";
                    fechaEvento.style.color = "White";
                    tipoEvento.style.color = "White";
                    encabezado.style.color = "White";
                    listaEventosTitulo.style.color = "white";
                }
                //Crear evento modo oscuro
                const evento = document.querySelector("#container-form-first-part-event");
                if(evento){
                    const crearEventoSecond = document.querySelector("#container-form-second-part-event");
                    const crearEventoThird = document.querySelector("#container-form-third-part-event");
                    const crearEventoFourth = document.querySelector("#container-form-fourth-part-event");
                    const crearEventoFifth = document.querySelector("#container-form-fifth-part-event");
                    const letrasUno = document.querySelector("#crearEventoLetrasUno");
                    const letrasDos = document.querySelector("#crearEventoLetrasDos");
                    const letrasTres = document.querySelector("#crearEventoLetrasTres");
                    const letrasCuatro = document.querySelector("#crearEventoLetrasCuatro");
                    const letrasCinco = document.querySelector("#crearEventoLetrasCinco");
                    const infoEventoUno = document.querySelector("#infoEventoUno");
                    const infoEventoDos = document.querySelector("#infoEventoDos");
                    const infoEventoTres = document.querySelector("#infoEventoTres");
                    const infoEventoCuatro = document.querySelector("#infoEventoCuatro");
                    const infoEventoCinco = document.querySelector("#infoEventoCinco");
                    infoEventoUno.style.color = "white";
                    infoEventoDos.style.color = "white";
                    infoEventoTres.style.color = "white";
                    infoEventoCuatro.style.color = "white";
                    infoEventoCinco.style.color = "white";
                    letrasUno.style.color = "white";
                    letrasDos.style.color = "white";
                    letrasTres.style.color = "white";
                    letrasCuatro.style.color = "white";
                    letrasCinco.style.color = "white";
                    evento.style.backgroundColor = "#2C2C2C";
                    crearEventoSecond.style.backgroundColor = "#2C2C2C";
                    crearEventoThird.style.backgroundColor = "#2C2C2C";
                    crearEventoFourth.style.backgroundColor = "#2C2C2C";
                    crearEventoFifth.style.backgroundColor = "#2C2C2C";
                    evento.style.border = "2px solid white";
                    crearEventoSecond.style.border = "2px solid white";
                    crearEventoThird.style.border = "2px solid white";
                    crearEventoFourth.style.border = "2px solid white";
                    crearEventoFifth.style.border = "2px solid white";
                }

                const informacionPerfil = document.querySelector(".InformacionPerfil");
                if(informacionPerfil){
                    const botonesPerfil = document.querySelector(".BotonesPerfil");
                    const informacionUsuario = document.querySelector(".InformacionUsuario");
                    const datosUsuario= document.querySelector(".datosUsuario");
                    informacionPerfil.style.backgroundColor = "#2C2C2C";
                    botonesPerfil.style.backgroundColor = "#2C2C2C";
                    informacionUsuario.style.color = "white";
                    datosUsuario.style.color = "white";
                }
                //informacion evento modo oscuro
                const informacionEvento = document.querySelector("#content-show-information");
                if(informacionEvento){
                    informacionEvento.style.backgroundColor = "black";
                    const letrasTitulo = document.querySelector("#title_header");
                    const letrasInformacion = document.querySelector(".paragraph");
                    const informacionInscripciones = document.querySelector(".paragraph-show-information");
                    const inscripcion = document.querySelector(".lil_header");
                    inscripcion.style.color = "white";
                    informacionInscripciones.style.color = "white";
                    letrasInformacion.style.color = "white";
                    letrasTitulo.style.color = "white";
                }
                modoOscuro = false;

                //volver a modo dia
            } else {
                const cuerpo = document.querySelector("#cuerpo-pagina");
                const header = document.querySelector(".container");
                if(header){
                    console.log(header);
                }
                header.style.backgroundColor = "white"
                cuerpo.style.backgroundColor = "white";
                const encabezado = document.querySelector(".encabezado-tabla");
                //Lista eventos modo oscuro
                if(encabezado){
                    const listaEventosTitulo = document.querySelector("#header-lista-eventos-usuario");
                    const nombreEvento = document.querySelector("#nombreEvento");
                    const fechaEvento = document.querySelector("#fechaEvento");
                    const tipoEvento = document.querySelector("#tipoEvento");
                    nombreEvento.style.color = "Black";
                    fechaEvento.style.color = "Black";
                    tipoEvento.style.color = "Black";
                    encabezado.style.color = "Black";
                    listaEventosTitulo.style.color = "Black";
                }
                //Crear evento modo oscuro
                const evento = document.querySelector("#container-form-first-part-event");
                if(evento){
                    const crearEventoSecond = document.querySelector("#container-form-second-part-event");
                    const crearEventoThird = document.querySelector("#container-form-third-part-event");
                    const crearEventoFourth = document.querySelector("#container-form-fourth-part-event");
                    const crearEventoFifth = document.querySelector("#container-form-fifth-part-event");
                    const letrasUno = document.querySelector("#crearEventoLetrasUno");
                    const letrasDos = document.querySelector("#crearEventoLetrasDos");
                    const letrasTres = document.querySelector("#crearEventoLetrasTres");
                    const letrasCuatro = document.querySelector("#crearEventoLetrasCuatro");
                    const letrasCinco = document.querySelector("#crearEventoLetrasCinco");
                    const infoEventoUno = document.querySelector("#infoEventoUno");
                    const infoEventoDos = document.querySelector("#infoEventoDos");
                    const infoEventoTres = document.querySelector("#infoEventoTres");
                    const infoEventoCuatro = document.querySelector("#infoEventoCuatro");
                    const infoEventoCinco = document.querySelector("#infoEventoCinco");
                    infoEventoUno.style.color = "Black";
                    infoEventoDos.style.color = "Black";
                    infoEventoTres.style.color = "Black";
                    infoEventoCuatro.style.color = "Black";
                    infoEventoCinco.style.color = "Black";
                    letrasUno.style.color = "Black";
                    letrasDos.style.color = "Black";
                    letrasTres.style.color = "Black";
                    letrasCuatro.style.color = "Black";
                    letrasCinco.style.color = "Black";
                    evento.style.backgroundColor = "white";
                    crearEventoSecond.style.backgroundColor = "white";
                    crearEventoThird.style.backgroundColor = "white";
                    crearEventoFourth.style.backgroundColor = "white";
                    crearEventoFifth.style.backgroundColor = "white";
                    evento.style.border = "2px solid black";
                    crearEventoSecond.style.border = "2px solid black";
                    crearEventoThird.style.border = "2px solid black";
                    crearEventoFourth.style.border = "2px solid black";
                    crearEventoFifth.style.border = "2px solid black";
                }

                const informacionPerfil = document.querySelector(".InformacionPerfil");
                if(informacionPerfil){
                    const botonesPerfil = document.querySelector(".BotonesPerfil");
                    const informacionUsuario = document.querySelector(".InformacionUsuario");
                    const datosUsuario= document.querySelector(".datosUsuario");
                    informacionPerfil.style.backgroundColor = "white";
                    botonesPerfil.style.backgroundColor = "white";
                    informacionUsuario.style.color = "black";
                    datosUsuario.style.color = "black";
                }
                //informacion evento modo dia
                const informacionEvento = document.querySelector("#content-show-information");
                if(informacionEvento){
                    informacionEvento.style.backgroundColor = "white";
                }
                modoOscuro = true;
            }
            });
            }
            const lockIndex4 = document.getElementById("content-show-information");
            if (lockIndex4 != undefined){
                loadInformationEvents(querySnapShot.docs);
            }

            if(registrarUsuario){
            registrarUsuario.addEventListener("submit", async(e)=>{
                e.preventDefault();
                const nombre = registrarUsuario["registrar-nombre"].value;
                const correo = registrarUsuario["registrar-correo"].value;
                const contra = registrarUsuario["registrar-contra"].value;
                const telefono = registrarUsuario["registrar-telefono"].value;
                

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
                    usuarioTemporal = usuario;
                    contraUser = contra;
                    localStorage.setItem('usuario', JSON.stringify(usuario));
    
                    if(usuario && usuarioTemporal.uid != undefined){
                        addUser(usuario);
                    }
                    
                    modalBoot.hide();
                    showMessage("Bienvenido " + nombre);
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
                correoValidacion = correo;
                contraUser = contra;
                const usuario = {
                    correo: correo,
                    contra: contra,
                }
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
                localStorage.removeItem('ParametrosUsuario');
                localStorage.removeItem('evento');
                await signOut(auth);
                window.location.href = "http://127.0.0.1:5501/html/index.html";
            });
            
            onAuthStateChanged(auth, async(user) =>{
                if(user) {         
                    usuarioTemporal = user;              
                    const patronCorreo = /@ulpgc\.[^.]+$/;
                    localStorage.setItem('ParametrosUsuario', JSON.stringify(usuarioTemporal));
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
                   
                    
async function getEvent(){
    try {
        const resultado = await getUser(usuarioTemporal.uid);
        let usuarioTemporalVisto = resultado;
        const response = await getInfoEvent(usuarioTemporal.uid); 
        return response;       
    } catch (error) {
        console.log("Problemas al añadir", error)        
    }
  }
  
  async function getInfoEvent(userId){
    try {
        const q = query(collection(db, "evento"), where("Creador", "==", userId));
        let usuarioDeLaAplicacion = [];
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            usuarioDeLaAplicacion.push(doc.data());
        });
        return usuarioDeLaAplicacion;
    } catch (error) {
        console.log("Hubo un error",error)
    }
  }

  async function getEventNoInstitutional (){
    try {
        const resultado = await getUser(usuarioTemporal.uid);
        let usuarioTemporalVisto = resultado;
        const response = await getEventNoInstitutionalInfoEvent(usuarioTemporal.uid); 
        return response;       
    } catch (error) {
        console.log("Problemas al añadir", error)        
    }
  }
  
  async function getEventNoInstitutionalInfoEvent(userId) {
    try {
      const q = query(collection(db, "evento"), where("listaDeUsuarios", "array-contains", userId));
      let eventosDelUsuario = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        eventosDelUsuario.push(doc.data());
      });
      return eventosDelUsuario;
    } catch (error) {
      console.log("Error al obtener los eventos del usuario:", error);
    }
  }
  

  
    const eventosUsuarioInstituctional = await getEvent(usuarioTemporal.uid);
    const eventosUusarioNoInstitutional = await getEventNoInstitutional(usuarioTemporal.uid);



    const lockIndex3 = document.getElementById("header-lista-eventos-usuario");
    if (lockIndex3 != undefined){

         
        const usuarioAlmacenado = localStorage.getItem('usuario');
        const correoComprobar = JSON.parse(usuarioAlmacenado).correo;
        const patronCorreo = /@ulpgc\.[^.]+$/;
       
        if (patronCorreo.test(correoComprobar)) {
            loadListEvents(eventosUsuarioInstituctional);
        }else{
            loadListEvents(eventosUusarioNoInstitutional);
        }
    }

                    if (lockPerfil != undefined){
                        const resultado = await getUser(usuarioTemporal.uid);

                        let lockUserPerfil = resultado;
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
        console.log("Hubo un error",error)
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
        console.log("Hubo un error",error)
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
        
        const resultado = await getUser(usuarioTemporal.uid);
        let editarPerfil = resultado;
        let contraAux;
        let mailAux = editarPerfil.correo;
        contraAux = editarPerfil.contra;
        let temp = document.getElementById("CorreoInformacionUsuario").value;
        
        editarPerfil.nombre = document.getElementById("NombreInformacionUsuario").value;
        
        editarPerfil.telefono = document.getElementById("TelefonoInformacionUsuario").value;

        
        editarPerfil.contra = document.getElementById("ContraseñaInformacionUsuario").value;
        const resultado2 = await getUser(usuarioTemporal.uid);   

        editarPerfil.correo = temp;
        //const resultado3 = await getUser(usuarioTemporal.uid);   

        // Actualizar firebase authentication
        let incremento = 0;
        let nopassnoemail = 1
        if(contraAux != document.getElementById("ContraseñaInformacionUsuario").value){
            incremento+=1
            nopassnoemail-=1
            addUser(editarPerfil)        
            functionActualizarFirebaseAuth(editarPerfil.correo);  
        }
        if(!incremento){
            if(mailAux != document.getElementById("CorreoInformacionUsuario").value){
                addUser(editarPerfil)
                actualizarFirebaseAuthentication(editarPerfil.correo);
                nopassnoemail-=1
            }
        }
        incremento=0;
        if(nopassnoemail){
            addUser(editarPerfil) 
        }
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
    updatePassword(auth.currentUser, newPassword)
    .then(() => {
      console.log("Contraseña actualizada con éxito");
    })
    .catch((error) => {
      console.log("Ocurrió un error al actualizar la contraseña:", error);
    });
  }