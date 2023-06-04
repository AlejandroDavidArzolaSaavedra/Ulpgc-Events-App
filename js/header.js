
import { createUserWithEmailAndPassword, onAuthStateChanged, updateEmail, updatePassword, signOut,getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.19.0/firebase-auth.js";
import { auth, db } from "./firebase.js";
import { showMessage } from "./showMessage.js";
import { setupEvents } from "./events.js";
import { getDocs, collection,updateDoc, query,deleteDoc, orderBy, doc, setDoc, where } from "https://www.gstatic.com/firebasejs/9.19.0/firebase-firestore.js"
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

async function deleteUserOfEvent(userUID) {
    const collectionRef = collection(db, "evento");
    const querySnapshot = await getDocs(collectionRef);
  
    for (const doc of querySnapshot.docs) {
      const listaDeUsuarios = doc.data().listaDeUsuarios || [];
      
      // Verificar si el usuario está presente en el array
      if (listaDeUsuarios.includes(userUID)) {
        // Eliminar el usuario del array
        const updatedListaDeUsuarios = listaDeUsuarios.filter((uid) => uid !== userUID);
  
        try {
          // Actualizar el campo listaDeUsuarios en el documento
          await updateDoc(doc.ref, { listaDeUsuarios: updatedListaDeUsuarios });
          console.log("Usuario eliminado del array en el documento:", doc.id);
        } catch (error) {
          console.error("Error al actualizar el documento:", doc.id, error);
        }
      }
    }
  }
  
  
  
  


let contraUser;
let usuarioTemporal;
function registerUser() {
    fetch('../html/components/header.html')
        .then((res) => {
            return res.text();
        })
        .then(async (text) => {
            console.log("sssssssssssssssss")

            // Obtener la referencia al botón "Ocultar filtros"
            const ocultarFiltrosBtn = document.getElementById('ocultar-filtros-category');

            // Obtener la referencia a la componente de categoría y los cards de eventos
            const categoryBarComponent = document.getElementById('categoryBarComponent');
            const cardSection = document.getElementById('card-car-index');

            // Variable para almacenar el número de columnas actual
            let numColumnas = 2;
            // Función para cambiar el número de columnas de los cards
            function cambiarColumnas() {
            if (numColumnas === 2) {
                cardSection.classList.remove('row-cols-md-2');
                cardSection.classList.add('row-cols-md-3');
                numColumnas = 3;
                document.getElementById('col-container').classList.add('col-lg-12', 'col-md-12', 'col-12');
                document.getElementById('col-container').classList.remove('col-lg-9', 'col-md-9', 'col-12');
                document.getElementById('categoryBar').classList.add('hidden');
            } else {
                cardSection.classList.remove('row-cols-md-3');
                cardSection.classList.add('row-cols-md-2');
                numColumnas = 2;
                document.getElementById('col-container').classList.add('col-lg-9', 'col-md-9', 'col-12');
                document.getElementById('col-container').classList.remove('col-lg-12', 'col-md-12', 'col-12');
                document.getElementById('categoryBar').classList.remove('hidden');
            }
            }

            // Manejador de clic para el botón "Ocultar filtros"
            if(ocultarFiltrosBtn){
            ocultarFiltrosBtn.addEventListener('click', function() {
            categoryBarComponent.classList.toggle('oculto');
            cambiarColumnas();
            });
        }


            var lang = localStorage.getItem('lang') || 'es'; // Obtener el idioma guardado en el localStorage o por defecto, español
            var fullLang = localStorage.getItem('fullLang') || 'Español'; // Obtener el nombre del idioma guardado en el localStorage o por defecto, español
            $('.selectpicker').val('#' + lang);
            $('.selectpicker option:selected').text(fullLang);
/*
            const categoryBar = document.querySelector(".categoryBarComponent");
const ocultarBtn = document.querySelector("#ocultar-filtros-category");
console.log(ocultarBtn)
if (jQuery(ocultarBtn).length) {
    jQuery(ocultarBtn).on('click', () => {
        console.log("wwwwwwwwwwwwwwww")
        console.log("xxx ",jQuery(categoryBar).css('width'))
      if (jQuery(categoryBar).css('width') == '272px') {
        console.log("entroooo")
        jQuery(categoryBar).animate({width: '59%'}, 5000000);
        jQuery(ocultarBtn).html('Mostrar filtros');
        console.log("llego al final")
      } else {
        // si los filtros están ocultos, mostrarlos
        jQuery(categoryBar).animate({width: '100%'}, 272);
        jQuery(ocultarBtn).html('Ocultar filtros');
      }
    });
  }
*/
            const iconoModo = document.querySelector('.fa-moon');
            const fondoHeader = document.querySelector('#contenedor-navbar-header');
            const fondoCuerpo = document.querySelector('#cuerpo-pagina');
            const bordePagina = document.querySelector('.navbar-expand-lg');
            const categoryFilter = document.querySelector('.categoryBarComponent');
            const bodyFooter = document.querySelector('#footer');
            const infoEvent = document.querySelectorAll('.white-color-background');

            const modalRegister = document.querySelector('#modal-registrarse');
            const modalLogearse = document.querySelector('#modal-logearse');
            const cerrarModal = document.querySelectorAll('.btn-close');
            const modalCrearEvento = document.querySelector('#modal-crear-evento');
            const modalEditProfile = document.querySelector('#edit-profile');
            const modaldelProfile = document.querySelector('#delete-profile-content');            
            if (localStorage.getItem('modo') == 'day') {
                console.log("uuuuu")
            }
  /*
            let variable = 0;
            if(variable==0){
                for (let i = 0; i < 50; i++) {
                const usuario = {
                    nombre: "usuario"+i,
                    correo: "usuario"+i+"@gmail.com",
                    contra: "123123123",
                    telefono: "6"+i+i+"1122",
                    uid: getUUID(),
                };
                usuarioTemporal = usuario;
                addUser(usuario);
            }
            variable+=1
            }
*/
            if (localStorage.getItem('modo') == 'night') {
                fetch('../html/profile.html')
                .then((res) => {
                    return res.text();
                })
                .then(async (text) => {
                if (iconoModo.classList.contains('fa-moon')) {
                    iconoModo.classList.remove('fa-moon');
                    iconoModo.classList.add('fa-sun');
                    iconoModo.style.fontSize = '2em';
                    localStorage.setItem('modo', 'night');
    
                    fondoHeader.classList.remove("bg-body-tertiary");
                    fondoHeader.style.backgroundColor = "#22272e";
                    if(categoryFilter){
                        categoryFilter.style.background = "#23395d";
                        categoryFilter.style.border="1px #22272e solid";

                    }
                    if(modalRegister){
                        modalRegister.style.backgroundColor ="#4D4C4C";
                    }
                    if(modalLogearse){
                        modalLogearse.style.backgroundColor ="#4D4C4C";
                    }
                    if(modalEditProfile){
                        modalEditProfile.style.backgroundColor ="#4D4C4C";
                    }
                    if(modaldelProfile){
                        modaldelProfile.style.backgroundColor ="#4D4C4C";
                    }
                    const modalCreateEvento = document.querySelector('#modal-crear-evento');
                    if(modalCreateEvento){
                        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                        modalCreateEvento.style.backgroundColor = "#4D4C4C";
                    }

                    const modalDeleteEvento = document.querySelector('#modal-delete_list-evento');
                    if(modalDeleteEvento){
                        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                        modalDeleteEvento.style.backgroundColor = "#4D4C4C";
                    }
                    
                    const titleinfoEvent = document.getElementById("title_header");
                
                    const information = document.getElementById("inscripcion-info-event");
                    const dispohasta = document.getElementById("entradas-disponibles-event");
                    const dispoInfo = document.getElementById("disponible-hasta-texto");
                    const textoInfo = document.getElementById("descripcion-show-event");
                    const textoAddInfo = document.getElementById("info-add-show-event");
    
                    if(titleinfoEvent){
                        titleinfoEvent.style.color = "white";
                        information.style.color = "white";
                        dispohasta.style.color = "white";
                        dispoInfo .style.color = "white";
                        textoInfo.style.color = "white";
                        textoAddInfo.style.color = "white";
                    }
    
                    fetch('../html/profile.html')
                    .then((res) => {
                        return res.text();
                    })
                    .then(async (text) => {
                    const modalCreateEvento = document.querySelector('#modal-crear-evento');
                    var botonCrearEvento = document.getElementById("crear_evento_confirm_event-confirm");
                    const modalTextEvento = document.querySelector('#confirm-message');
                    const confirmMessage = document.getElementById('contenido-body-crear-evento');
                    const secondConfirm = document.getElementById("confirmar-creacion-titulo");
                    
                    if(botonCrearEvento){
                        console.log("xdddd")
                        botonCrearEvento.addEventListener("click", function() {
                            modalCreateEvento.style.backgroundColor = "#4D4C4C";
                            if(modalTextEvento){
                                modalTextEvento.style.color="white";
                                console.log("cambio")
                            }
                            if(confirmMessage){
                                confirmMessage.style.color="white";
                                secondConfirm.style.color = "white";
                            }
                            console.log("cambio2")
                        });
                    }});

                    bodyFooter.style.backgroundColor = "#22272e";
                    bordePagina.style.borderBottom = '1px solid #22272e';
                    fondoCuerpo.style.background = "#2e333e";
                    fondoCuerpo.style.color = "white";
                    
    
                    cerrarModal.forEach(element => {
                        element.style.backgroundColor = "white";
                    });
    
                    infoEvent.forEach(element => {
                        element.style.color = "white";
                    });
                    

                } else {
                    console.log("rrrrrrrrrrrrrrrrrrrrrrrr")
                    iconoModo.classList.remove('fa-sun');
                    iconoModo.classList.add('fa-moon');
                    localStorage.setItem('modo', 'day');
                    if(categoryFilter){
                    categoryFilter.style.background = "#4D4C4C";
                    categoryFilter.style.border="1px black solid";
                    }
                    if(modalRegister){
                        modalRegister.style.backgroundColor ="white";
                    }
                    if(modalLogearse){
                        modalLogearse.style.backgroundColor ="white";
                    }
                    const modaldelProfile = document.querySelector('#delete-profile-content');
                    if(modaldelProfile){
                        modaldelProfile.style.backgroundColor ="white";
                    }
                    const modalCreateEvento = document.querySelector('#modal-crear-evento');
                    if(modalCreateEvento){
                        modalCreateEvento.style.backgroundColor = "white";
                        console.log("esta jodido")
                    }
                    
                    const modalDeleteEvento = document.querySelector('#modal-delete_list-evento');
                    if(modalDeleteEvento){
                        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                        modalDeleteEvento.style.backgroundColor = "white";
                    }
                    
                    
                    fetch('../html/profile.html')
                    .then((res) => {
                        return res.text();
                    })
                    .then(async (text) => {
                    const modalCreateEvento = document.querySelector('#modal-crear-evento');
                    var botonCrearEvento = document.getElementById("crear_evento_confirm_event-confirm");
                    const modalTextEvento = document.querySelector('#confirm-message');
                    console.log("cambiazoooo")
                    if(botonCrearEvento){
                        console.log("xdddd")
                        botonCrearEvento.addEventListener("click", function() {
                            modalCreateEvento.style.backgroundColor = "white";
                            modalTextEvento.style.color="black";
                            const confirmMessage = document.getElementById('confirm-message');
                            const confirm2Message = document.getElementById('modal-crear-evento');
                            if(confirm2Message){
                                confirm2Message.style.background="black";
                            }
                            if(confirmMessage){
                                confirmMessage.style.background="black";
                            }
                            const secondConfirm = document.getElementById("confirmar-creacion-titulo");
                            if(confirmMessage){
                                confirmMessage.style.color="black";
                                secondConfirm.style.color = "black";
                            }

                        });
                    }});
                    if(modalEditProfile){
                        modalEditProfile.style.backgroundColor ="white";
                    }
                    if(modaldelProfile){
                        modaldelProfile.style.backgroundColor ="#4D4C4C";
                    }
                    cerrarModal.forEach(element => {
                        element.style.backgroundColor = "none";
                    });
    
                    
                    fondoHeader.classList.add("bg-body-tertiary");
                    fondoCuerpo.style.background = "white";
                    bodyFooter.style.backgroundColor = "#4D4C4C";
                    bordePagina.style.borderBottom = '1px solid #ccc';
                    fondoHeader.classList.remove("text-white");
                    fondoCuerpo.style.color = "black";
                    infoEvent.forEach(element => {
                        element.style.color = "black";
                    });
                    }    
              }
            );}
            if(iconoModo){
            iconoModo.addEventListener('click', () => {
            if (iconoModo.classList.contains('fa-moon')) {
                iconoModo.classList.remove('fa-moon');
                iconoModo.classList.add('fa-sun');
                iconoModo.style.fontSize = '2em';
                localStorage.setItem('modo', 'night');

                fondoHeader.classList.remove("bg-body-tertiary");
                fondoHeader.style.backgroundColor = "#22272e";
                if(categoryFilter){
                    categoryFilter.style.background = "#23395d";
                    categoryFilter.style.border="1px #22272e solid";
                }
                if(modalRegister){
                    modalRegister.style.backgroundColor ="#4D4C4C";
                }
                if(modalLogearse){
                    modalLogearse.style.backgroundColor ="#4D4C4C";
                }
                
                const modalDeleteEvento = document.querySelector('#modal-delete_list-evento');
                if(modalDeleteEvento){
                    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                    modalDeleteEvento.style.backgroundColor = "#4D4C4C";
                }

                bodyFooter.style.backgroundColor = "#22272e";
                bordePagina.style.borderBottom = '1px solid #22272e';
                fondoCuerpo.style.background = "#2e333e";
                fondoCuerpo.style.color = "white";
                

                cerrarModal.forEach(element => {
                    element.style.backgroundColor = "white";
                });

                infoEvent.forEach(element => {
                    element.style.color = "white";
                });
                const confirmMessage = document.getElementById('contenido-body-crear-evento');
                const secondConfirm = document.getElementById("confirmar-creacion-titulo");
                const cuerpoConfirm = document.getElementById("modal-crear-evento");
                const titleinfoEvent = document.getElementById("title_header");
                
                const information = document.getElementById("inscripcion-info-event");
                const dispohasta = document.getElementById("entradas-disponibles-event");
                const dispoInfo = document.getElementById("disponible-hasta-texto");
                const textoInfo = document.getElementById("descripcion-show-event");
                const textoAddInfo = document.getElementById("info-add-show-event");

                if(confirmMessage){
                    cuerpoConfirm.style.backgroundColor = "#22272e";
                    confirmMessage.style.color="white";
                    secondConfirm.style.color = "white";
                }
                if(titleinfoEvent){
                    titleinfoEvent.style.color = "white";
                    information.style.color = "white";
                    dispohasta.style.color = "white";
                    dispoInfo .style.color = "white";
                    textoInfo.style.color = "white";
                    textoAddInfo.style.color = "white";
                }

                const modaldelProfile = document.querySelector('#delete-profile-content');
                if(modaldelProfile){
                    modaldelProfile.style.backgroundColor ="#222272e";
                }

                const modalDeleEvento = document.querySelector('#modal-delete_list-evento');
                if(modalDeleEvento){
                    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                    modalDeleEvento.style.backgroundColor = "#222272e";
                }

            } else {
                iconoModo.classList.remove('fa-sun');
                iconoModo.classList.add('fa-moon');
                localStorage.setItem('modo', 'day');
                if(categoryFilter){
                categoryFilter.style.background = "#4D4C4C";
                categoryFilter.style.border="1px black solid";
                }
                if(modalRegister){
                    modalRegister.style.backgroundColor ="white";
                }
                if(modalLogearse){
                    modalLogearse.style.backgroundColor ="white";
                }

                if(modalCrearEvento){
                    modalCrearEvento.style.backgroundColor ="white";
                    console.log("eeeeeeeeeeeeeeeeeeeeeeeeeee")
                }

                const modalDeleEvento = document.querySelector('#modal-delete_list-evento');
                if(modalDeleEvento){
                    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                    modalDeleEvento.style.backgroundColor = "white";
                }
                cerrarModal.forEach(element => {
                    element.style.backgroundColor = "none";
                });

                const titleinfoEvent = document.getElementById("title_header");
                const information = document.getElementById("inscripcion-info-event");
                const dispohasta = document.getElementById("entradas-disponibles-event");
                const dispoInfo = document.getElementById("disponible-hasta-texto");
                const textoInfo = document.getElementById("descripcion-show-event");
                const textoAddInfo = document.getElementById("info-add-show-event");
                if(titleinfoEvent){
                    titleinfoEvent.style.color = "black";
                    information.style.color = "black";
                    dispohasta.style.color = "black";
                    dispoInfo .style.color = "black";
                    textoInfo.style.color = "black";
                    textoAddInfo.style.color = "black";
                }

                fondoHeader.classList.add("bg-body-tertiary");
                fondoCuerpo.style.background = "white";
                bodyFooter.style.backgroundColor = "#4D4C4C";
                bordePagina.style.borderBottom = '1px solid #ccc';
                fondoHeader.classList.remove("text-white");
                fondoCuerpo.style.color = "black";
                infoEvent.forEach(element => {
                    element.style.color = "black";
                });
                }
                
            });
            }



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
                        userUID: usuarioTemporal.uid
                    };
                    usuarioRegistradoTemporal=usuario;
                    usuarioTemporal = usuario;
                    console.log("apsdkasopkdaspodksad",usuario)
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
                    if (localStorage.getItem('modo') == 'night') {
                        console.log("de noche");
                        const modalIniciar = document.querySelector("#inscripcion-info-event");
                        const modales = document.querySelector("#entradas-disponibles-event");
                        const modal = document.querySelector("#disponible-hasta-texto");
                        const modalright = document.querySelector("#descripcion-show-event");
                        const modalLeft = document.querySelector("#info-add-show-event");
                        const fixHeader = document.querySelector("#title_header");

                        
                        
                        if(modalIniciar){
                            console.log("existe")
                            modalIniciar.style.color = "white";
                            modales.style.color = "white";
                            modal.style.color = "white";
                            modalright.style.color = "white";
                            modalLeft.style.color = "white";
                            fixHeader.style.color = "white";
                        }
                        const modaldelProfile = document.querySelector('#delete-profile-content');
                        if(modaldelProfile){
                            modaldelProfile.style.backgroundColor ="white";
                        }        
           
                    }else{
                        console.log("dicha");

                        const modaldelProfile = document.querySelector('#delete-profile-content');
                        if(modaldelProfile){
                            modaldelProfile.style.backgroundColor ="#222272e";
                        }
        
                    }
                    console.log(user,"el sasdasdasd")
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
        const usuarioAlmacenado = localStorage.getItem('ParametrosUsuario');
        const correoComprobar = JSON.parse(usuarioAlmacenado).uid;

        const q = query(collection(db, "users"), where("userUID", "==", correoComprobar));
        let usuarioDeLaAplicacion = [];
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            usuarioDeLaAplicacion.push(doc.data());
        });
        localStorage.setItem('uid_evento', JSON.stringify(usuarioDeLaAplicacion[0].uid));
        const response = await getInfoEvent(usuarioDeLaAplicacion[0].uid); 
        return response;       
    } catch (error) {
        console.log("Problemas al añadir", error)        
    }
  }
  
  async function getInfoEvent(userId){
    try {
        console.log("bbbbbbbbbbbbbbbbbbbbbb",userId)
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
        const usuarioAlmacenado = localStorage.getItem('usuario');
        const correoComprobar = JSON.parse(usuarioAlmacenado).uid;
  
        const resultado = await getUser(correoComprobar);
        let usuarioTemporalVisto = resultado;
        const response = await getEventNoInstitutionalInfoEvent(correoComprobar); 
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
  
  window.onscroll = function(){
    var header = document.getElementById("header");
    if(window.pageYOffset > 0){
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky")
    }
}

    const lockIndex3 = document.getElementById("header-lista-eventos-usuario");
    if (lockIndex3 != undefined){

         
        const usuarioAlmacenado = localStorage.getItem('usuario');
        const correoComprobar = JSON.parse(usuarioAlmacenado).correo;
        const patronCorreo = /@ulpgc\.[^.]+$/;
       
        if (patronCorreo.test(correoComprobar)) {
            const eventosUsuarioInstituctional = await getEvent(usuarioTemporal.uid);
            loadListEvents(eventosUsuarioInstituctional);
        }else{
            const eventosUusarioNoInstitutional = await getEventNoInstitutional(usuarioTemporal.uid);
            loadListEvents(eventosUusarioNoInstitutional);
        }
    }

                    if (lockPerfil != undefined){
                        console.log("denaaaaaaa"+ usuarioTemporal.uid)
                        console.log(JSON.stringify(usuarioTemporal))
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
        const reponse = await setDoc(doc(db, "users", user.uid), user);
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
        
        console.log("asdasdasd",user)
        const response = await getInfoUser(user); 
        return response;       
    } catch (error) {
        console.log("Problemas al añadir", error)        
    }
}

async function getInfoUser(userId){
    try {
        const q = query(collection(db, "users"), where("userUID", "==", userId));
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
const buttonDelete = document.querySelector("#delete-profile");

const confirmModal = document.getElementById('confirm-modal');
const confirmMessage = document.getElementById('confirm-message');

const confirmButton = document.getElementById('confirm-button');
const cancelModalButton = document.getElementById('cancel-modal-button');
const exitModalButton = document.getElementById('exit-close');

const buttonEdit = document.querySelector("#button-edit-perfil");
const buttonDeleteChange = document.querySelector("#button-delete-perfil");
let paswrodAuxiliarCambio;

if(buttonEdit){
buttonEdit.addEventListener('click', async e  =>{
    e.preventDefault();
    const buttonEd = document.querySelectorAll("hidden");
    buttonEd.forEach( buttons => buttons.style.display = "block");
    buttonEdit.style.display = "none"
    buttonDelete.style.display = "none"
    buttonSave.style.display ="block";  
    buttonSave.style.marginBottom = "2px";
    buttonDelete.style.marginTop = "2px";
});}

const confirmarMessage = document.getElementById('confirm-message-delete');
const buttonDeleteProfile = document.querySelector("#delete-profile");

if(buttonDeleteProfile){
    buttonDeleteProfile.addEventListener('click', async e  =>{
        e.preventDefault();
        if(confirmarMessage){
            var lang = localStorage.getItem('lang') || 'es';
            var headerFile;
            var headerData;
                    if (lang === 'es') {
                        headerFile = '../staticData/language/esp.json';
                    } else if (lang === 'en') {
                        headerFile = '../staticData/language/eng.json';
                    } else if (lang === 'de') {
                        headerFile = '../staticData/language/deu.json';
                    }else if (lang === 'fr') {
                        headerFile = '../staticData/language/fr.json';
                    }
                    else if (lang === 'pt') {
                        headerFile = '../staticData/language/por.json';
                    }
                    else if (lang === 'ru'){
                        headerFile = '../staticData/language/rus.json';
                    }else {
                        headerFile = '../staticData/language/ch.json';
                    }
                    $.getJSON(headerFile, function(data) {
                        headerData = data
                        confirmarMessage.innerText = headerData.modalUsuario.preguntaModal;
                        const secondConfirm = document.getElementById("confirm-button-user-delete");
                        secondConfirm.innerText = headerData.modalUsuario.tituloModal;
                        const thirdConfirm = document.getElementById("cancel-modal-button-delete");
                        const fourthConfirm = document.getElementById("confirm-button-delete");
                        thirdConfirm.innerText = headerData.modalUsuario.cancelar;
                        fourthConfirm.innerText = headerData.modalUsuario.aceptar;
                    });
                    const modalCreateEvento = document.querySelector('#delete-profile-content'); 
                    if (localStorage.getItem('modo') == 'night') {
                        confirmMessage.style.color="white";
                        if(modalCreateEvento){
                            modalCreateEvento.style.background="#4D4C4C";
                        }
            
                        console.log("es de noche")
                        
                    }else{
                        confirmMessage.style.color="black";
                        if(modalCreateEvento){
                            modalCreateEvento.style.background="white";
                        }
                        console.log("es de dia")
                    }
                    
                    $('#confirm-modal-delete').modal('show');
                            const exitdelete = document.querySelector("#exit-close-delete");

                    const fourthConfirm = document.getElementById("confirm-button-delete");
                    if(fourthConfirm){
                        console.log("exit")
                        fourthConfirm.onclick = async function(){
                            // Aquí iría el código para guardar los cambios
                            console.log("jugarsela")
                            $('#confirm-modal-delete').modal('hide')

                            const usuarioAlmacenado = localStorage.getItem('usuario');
                            const correoComprobar = JSON.parse(usuarioAlmacenado).uid;
                            console.log("te escuchamos ",correoComprobar)
                            await deleteUserOfEvent(correoComprobar);
                            await borrarUsuarioDeLaBaseDeDatosFirebase(usuarioTemporal);
                            localStorage.removeItem('usuario');
                            localStorage.removeItem('ParametrosUsuario');
                            //window.location.href = "http://127.0.0.1:5501/html/index.html";
                        } }
                    

                    if(exitdelete){
                        console.log("exit")
                        exitdelete.onclick = function(){
                            // Aquí iría el código para guardar los cambios
                            $('#confirm-modal-delete').modal('hide')
                        } }
                    
                    const extdelete = document.querySelector("#cancel-modal-button-delete");
                    if(extdelete){
                        console.log("asad")
                        extdelete.onclick = function(){
                            // Aquí iría el código para guardar los cambios
                            $('#confirm-modal-delete').modal('hide')
                        }
                        }
                    }
        });
    }

async function borrarUsuarioDeLaBaseDeDatosFirebase(userUid) {
    try {
      let comprobacion;
      console.log(userUid.uid)
      const q = query(collection(db, "users"), where("userUID", "==", userUid.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        comprobacion = doc.data();
      });
      var user = auth.currentUser;
      console.log(comprobacion, "ejemplo final")

    console.log(comprobacion.uid,"AQUI ESTOY")
    const eventosQuery = query(collection(db, "evento"), where("Creador", "==", comprobacion.uid));
    const eventosSnapshot = await getDocs(eventosQuery);
    let eventoDelUsuario = [];
    // Eliminar cada evento asociado al usuario
    eventosSnapshot.forEach(async (eventoDoc) => {
        eventoDelUsuario.push(eventoDoc.data());
        const evento = eventoDoc.data();
        await deleteDoc(doc(db, "evento", evento.eventoId));
    });
    console.log(eventoDelUsuario)
    console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwww")

      await deleteDoc(doc(db, "users", comprobacion.uid));
      user.delete()
                .then(function() {
                    // El usuario ha sido eliminado exitosamente
                    console.log('Usuario eliminado');
                })
                .catch(function(error) {
                    // Ocurrió un error al intentar eliminar el usuario
                    console.error('Error al eliminar el usuario:', error);
                });
      console.log("Usuario eliminado correctamente");
      return 0;       
    } catch (error) {
      console.log("Problemas al eliminar", error);      
    }
  }



if(buttonDeleteChange){
    buttonDeleteChange.addEventListener('click', async e  =>{
        e.preventDefault();
        const buttonEd = document.querySelectorAll("hidden");
        buttonEd.forEach( buttons => buttons.style.display = "block");
        const resultado = await getUser(usuarioTemporal.uid);
        document.getElementById('NombreInformacionUsuario').value = resultado.nombre;
        document.getElementById('CorreoInformacionUsuario').value = resultado.correo;
        document.getElementById('ContraseñaInformacionUsuario').value = resultado.telefono;
        document.getElementById('TelefonoInformacionUsuario').value = resultado.contra;
        console.log("2este es un ejemplo",resultado)
        buttonEdit.style.display = "block"
        buttonDelete.style.display = "block"
        buttonSave.style.display ="none";
        buttonDeleteChange.style.display="none"
        buttonSave.style.marginBottom = "2px";
        buttonDelete.style.marginTop = "2px";
    });}




if(buttonSave){
buttonSave.addEventListener('click', async e  =>{
    e.preventDefault();
    console.log("wwwwwwwwwwwwwwww")
    console.log("fffffffffffffffffffffffffffffffff")
    if(confirmMessage){
        console.log("he llegado")
        var lang = localStorage.getItem('lang') || 'es';
        var headerFile;
        var headerData; 
                if (lang === 'es') {
                    headerFile = '../staticData/language/esp.json';
                } else if (lang === 'en') {
                    headerFile = '../staticData/language/eng.json';
                } else if (lang === 'de') {
                    headerFile = '../staticData/language/deu.json';
                }else if (lang === 'fr') {
                    headerFile = '../staticData/language/fr.json';
                }
                else if (lang === 'pt') {
                    headerFile = '../staticData/language/por.json';
                }
                else if (lang === 'ru'){
                    headerFile = '../staticData/language/rus.json';
                }else {
                    headerFile = '../staticData/language/ch.json';
                }
                $.getJSON(headerFile, function(data) {
                    headerData = data
                    confirmMessage.innerText = headerData.modalUsuario.preguntaModal;
                    const secondConfirm = document.getElementById("confirm-button-user");
                    secondConfirm.innerText = headerData.modalUsuario.tituloModal;
                    const thirdConfirm = document.getElementById("cancel-modal-button");
                    const fourthConfirm = document.getElementById("confirm-button");
                    thirdConfirm.innerText = headerData.modalUsuario.cancelar;
                    fourthConfirm.innerText = headerData.modalUsuario.aceptar;
                });
        confirmModal.style.display = 'block';
        const modalCreateEvento = document.querySelector('#edit-profile');
        const modalCrearEvento = document.querySelector('#modal-crear-evento');

        if (localStorage.getItem('modo') == 'night') {
            
            confirmMessage.style.color="white";
            if(modalCreateEvento){
                modalCreateEvento.style.background="#4D4C4C";
            }


            if(modalCrearEvento){
                modalCrearEvento.style.background="#4D4C4C";
            }
            console.log("es de noche")
            
        }else{
            confirmMessage.style.color="black";
            if(modalCreateEvento){
                modalCreateEvento.style.background="white";
            }
            if(modalCrearEvento){
                modalCrearEvento.style.background="white";
            }
            console.log("es de dia")
        }
    
    confirmButton.onclick = async function() {
        console.log("iiiiiii")
        console.log(usuarioTemporal)
        const resultado = await getUser(usuarioTemporal.uid);
        let editarPerfil = resultado;
        let contraAux;
        let mailAux = editarPerfil.correo;
        contraAux = editarPerfil.contra;
        let temp = document.getElementById("CorreoInformacionUsuario").value;
        
        editarPerfil.nombre = document.getElementById("NombreInformacionUsuario").value;
        
        editarPerfil.telefono = document.getElementById("TelefonoInformacionUsuario").value;

        
        editarPerfil.contra = document.getElementById("ContraseñaInformacionUsuario").value;
        //const resultado2 = await getUser(usuarioTemporal.uid);   
        console.log(usuarioTemporal.uid)

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
                console.log("pase por incremento")
                nopassnoemail-=1
            }
        }
        incremento = 0;
        if(nopassnoemail){
            addUser(editarPerfil)
            console.log("pase por nopassemail")
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
    if(exitModalButton){
    exitModalButton.onclick = function(){
        // Aquí iría el código para guardar los cambios
        confirmModal.style.display = 'none';
        
    } }
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

    window.onscroll = function(){
        var header = document.getElementById("header");
        if(window.pageYOffset > 0){
            console.log("moviendose")
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky")
        }
    }
  }