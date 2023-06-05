import { setDoc, doc, where,query,collection, getDocs, Timestamp } from "https://www.gstatic.com/firebasejs/9.19.0/firebase-firestore.js";
import { db } from "./firebase.js";
import { ref, getStorage, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.19.0/firebase-storage.js";
import { getUUID } from "./utils.js";

document.addEventListener('DOMContentLoaded', init);
  
function loadTemplate(fileName, id, callback) {
    fetch(fileName)
      .then((res) => res.text())
      .then((text) => {
        document.getElementById(id).innerHTML = text;
        if (callback) {
          callback();
        }
      });
  }
  let url_imagen;
  async function uploadProgress(file) {
    const storage = getStorage();
    const storageRef = ref(storage, 'Images/' + file.name);
  
    try {
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on('state_changed', (snapshot) => {
        const progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(2);
        const progresFile = document.querySelector('#upprogress');
        progresFile.innerHTML = `${progress}%`;
      }, (error) => {
        console.error('Error en la carga:', error);
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          url_imagen = downloadURL;
        }).catch((error) => {
          console.error('Error al obtener la URL de descarga:', error);
        });
      });
      console.log('Archivo subido con éxito:', uploadTask);
    } catch (error) {
      console.error('Error al subir archivo:', error);
    }
  }
  

  function init() {
    loadTemplate('./components/formCreateEvent.html', 'createEvent', function() {
          
        var ficheros = []
        const input = document.querySelector("#file-input-event");
        var reader = new FileReader();
        let file;        
        input.addEventListener("change", function(event) {
            file = event.target.files[0];
            reader.readAsDataURL(file);
          });
          let dataURL;
          const images = document.querySelector("#imagen-crear-evento");
          reader.onload = function() {
            images.src = reader.result;
            uploadProgress(file);
          };


          const ejemplo = document.querySelector("#crear_evento_confirm_event-confirm");
          if (ejemplo){
          ejemplo.addEventListener("click",function() {
            let fechaActual = new Date()
            const fecha = document.querySelector("#input-create-event-fecha").value;
            
            const modal = document.querySelector('#confirmar-creacion-evento-modal');
            $(modal).modal('show');        
            const deleteEventButton = document.querySelector('#deleteEventButton-Cancel');
            const closeButton = document.querySelector('[data-dismiss="modal"]');
            const crearEvento = document.querySelector('#CreateEventButtonCreate');
            const textCrearEvento = document.querySelector("#contenido-body-crear-evento");
            
    if (closeButton) {
        closeButton.addEventListener('click', () => {
        $(modal).modal('hide');
        });}
    if(deleteEventButton){
      deleteEventButton.addEventListener('click', async () => {
        $(modal).modal('hide');
      });
    }
    if(crearEvento){
        crearEvento.addEventListener('click', () => {
            crearEvento.style.display = "none";
            deleteEventButton.style.display = "none";
            console.log("Formulario enviado correctamente");
            textCrearEvento.innerHTML = "Subiendo evento a ULPGC EVENTS..."
            enviarDatosADb();
        });
        }
        function enviarDatosADb() {
            return new Promise(function(resolve) {
              setTimeout(function() {
                resolve();
              }, 2000);
            }).then(function() {
              $("#create-event-button").text("Evento creado correctamente");
              setTimeout(function() {
                accesoALaBD();     
              }, 1000);
            }).catch(function() {
              $(modal).modal('hide');
            });
          }
          });}
    });
  

    
}
        async function insertEvent(event, uid_evento) {
            try {
            const reponse = await setDoc(doc(db, "evento", uid_evento), event);
              return reponse;
            } catch (error) {
              console.log("Problemas al insertar", error);
            }
          }
          
          async function addEvent(event, uid_evento) {
            try {
              const response = await insertEvent(event, uid_evento);
              console.log("Evento añadido correctamente");
              return response;
            } catch (error) {
              console.log("Problemas al añadir", error);
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

          const accesoALaBD = async () =>{    
            const usuarioAlmacenado = localStorage.getItem('ParametrosUsuario');
            const creador = JSON.parse(usuarioAlmacenado).uid;
            
            const nombre = document.querySelector("#input-create-event-nombre").value;
            const lugar = document.querySelector("#input-create-event-lugar").value;
            const tipo  = document.querySelector("#input-create-type-event").value;
            const descripcion  = document.querySelector("#input-create-event-descripcion").value;
            const fecha = document.querySelector("#input-create-event-fecha");
            const aforo = document.querySelector("#input-create-event-aforo").value;
            const hour = document.querySelector("#input-create-event-hour").value;

            const miFecha = new Date(fecha.value);
            const day = miFecha.getDate();
            const month = miFecha.getMonth() + 1;
            const year = miFecha.getFullYear();
            
            const ejemplo = await getUser(creador);
            const listaDeUsuarios = []
            
            
            const infoAdicional = document.querySelector("#input-create-event-info-adicional").value;
            const uid_evento = getUUID()
            const evento = {
                Creador: ejemplo.uid,
                aforo: aforo,
                lugar: lugar,
                categoria: tipo,
                descripcion: descripcion,
                fechaDeSubida: Timestamp.now(),
                fecha: {day,month,year,hour},
                imagenEvento: url_imagen,
                eventoId: uid_evento,
                infoAdicional: infoAdicional,
                listaDeUsuarios: listaDeUsuarios,
                nombre: nombre
            };
            addEvent(evento, uid_evento);
        }
        