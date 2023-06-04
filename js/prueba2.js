import { setDoc,query,collection,where,getDocs, doc, Timestamp } from "https://www.gstatic.com/firebasejs/9.19.0/firebase-firestore.js";
import { db, app, storage } from "./firebase.js";
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
    loadTemplate('./components/formEditEvent.html', 'createEvent', async function() {
          
        var ficheros = []
        const input = document.querySelector("#file-input-event");
        const urlParams = new URLSearchParams(window.location.search);
        const eventoId = urlParams.get('eventoId');
        console.log(eventoId);

        const q = query(collection(db, "evento"), where("eventoId", "==", eventoId));
        let usuarioDeLaAplicacion = [];
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            usuarioDeLaAplicacion.push(doc.data());
        });

        console.log(usuarioDeLaAplicacion);
        const nombre = document.querySelector("#input-create-event-nombre");
        const lugar = document.querySelector("#input-create-event-lugar");
        const tipo  = document.querySelector("#input-create-type-event");
        const descripcion  = document.querySelector("#input-create-event-descripcion");
        const aforo = document.querySelector("#input-create-event-aforo");
        const infoAdd = document.querySelector("#input-create-event-info-adicional");
        
        const fecha = document.querySelector("#input-create-event-fecha");
        const hour = document.querySelector("#input-create-event-hour");       
        const evento = usuarioDeLaAplicacion[0];

        nombre.value = evento.nombre;
        lugar.value = evento.lugar;
        tipo.value = evento.categoria;
        descripcion.value = evento.descripcion;
        aforo.value = evento.aforo;
        infoAdd.value = evento.infoAdicional;
        hour.value =  evento.fecha.hour;
        
        if (evento.fecha.month < 10 && evento.fecha.day < 10) {
          fecha.value = `${evento.fecha.year}-0${evento.fecha.month}-0${evento.fecha.day}`;
        } else if (evento.fecha.month < 10) {
          fecha.value = `${evento.fecha.year}-0${evento.fecha.month}-${evento.fecha.day}`;
        } else if (evento.fecha.day < 10) {
          fecha.value = `${evento.fecha.year}-${evento.fecha.month}-0${evento.fecha.day}`;
        } else {
          fecha.value = `${evento.fecha.year}-${evento.fecha.month}-${evento.fecha.day}`;
        }
        

          
          const ejemplo = document.querySelector("#modify_evento_confirm_event-confirm");
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
        // Cerrar el modal
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
            return new Promise(function(resolve, reject) {
              // Simulación de acceso a la base de datos
              setTimeout(function() {
                resolve();
              }, 2000);
            }).then(function() {
              // Si la promesa se resuelve correctamente
              $("#create-event-button").text("Evento creado correctamente");
              setTimeout(function() {
                accesoALaBD();
                //window.location.href = "http://127.0.0.1:5501/html/showEventList.html";         
              }, 1000);
            }).catch(function() {
              // Si la promesa es rechazada
              $(modal).modal('hide');
            });
          }
          });}
        }  )};


        async function insertEvent(event, uid_evento) {
            try {
            console.log(event)
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
  

          const accesoALaBD = () =>{    
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
            

            const listaDeUsuarios = []
            const rak = localStorage.getItem('evento');
            const less = JSON.parse(rak)[0].imagenEvento;

            const url = less;
            console.log(url)
  
            const event_uid = JSON.parse(rak)[0].eventoId;
            
            
            const infoAdicional = document.querySelector("#input-create-event-info-adicional").value;
            console.log("ejeeaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
           
            const evento = {
                Creador: localStorage.getItem('uid_evento').replace(/"/g, ''),
                aforo: aforo,
                lugar: lugar,
                categoria: tipo,
                descripcion: descripcion,
                fechaDeSubida: Timestamp.now(),
                fecha: {day,month,year,hour},
                imagenEvento: url,
                eventoId: event_uid,
                infoAdicional: infoAdicional,
                listaDeUsuarios: listaDeUsuarios,
                nombre: nombre
            };
            addEvent(evento, event_uid);
        }
        