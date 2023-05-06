import { setDoc } from "https://www.gstatic.com/firebasejs/9.19.0/firebase-firestore.js";
const button = document.querySelector("#crear-evento-confirm-event");
console.log(button,"wwwwwwwwwwwwwwwwwwwwwwwwwwasdasssssssssssssssss");
if (button){
    console.log("joosssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss");
    setTimeout(() => { console.log("World!"); }, 50000);
    asdas
    button.addEventListener("submit", async(e)=>{
        e.preventDefault();
        console.log(button,"asdasssssssssssssssss")
        button.addEventListener('click', accesoclick);

    

const accesoALaBD = () =>{    
    const usuarioAlmacenado = localStorage.getItem('ParametrosUsuario');
    const creador = JSON.parse(usuarioAlmacenado).uid;
    const nombre = document.querySelector("#input-create-event-nombre").value;
    const lugar = document.querySelector("#input-create-event-lugar").value;
    const tipo  = document.querySelector("#input-create-type-event").value;
    const descripcion  = document.querySelector("#input-create-event-descripcion").value;
    const aforo = document.querySelector("#input-create-event-aforo").value;
    const urlEvent = document.querySelector("#file-input-event").value;
    const fecha = document.querySelector("#input-create-event-fecha");
    const hour = document.querySelector("#input-create-event-hour");
    


    const miFecha = new Date(miFechaInput.value);
    const day = miFecha.getDate();
    const month = miFecha.getMonth() + 1;
    const year = miFecha.getFullYear();

    const listaDeUsuarios = []
    const url = "./images/evento_festival.jpg";

    var ficheros = []
    var leer = new FileReader();
    leer.readAsDataURL(urlEvent);
    console.log("Esto es lo que se llama leer", leer)
    
    
    
    const infoAdicional = document.querySelector("#input-create-event-info-adicional").value;

    console.log("ejemploooooooooooooooooooooooooooooooooooooooooooooooooo")
    const evento = {
        Creador: creador,
        aforo: aforo,
        categoria: tipo,
        lugar: lugar,
        descripcion: descripcion,
        fechaDeSubida: {day,month,year,hour},
        imagenEvento: url,
        infoAdicional: infoAdicional,
        listaDeUsuarios: listaDeUsuarios,
        nombre: nombre
    };

    console.log("asdasdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    addEvent(evento);
}


async function insertEvent(event) {
    try {
      //const response = await setDoc(doc(db, "evento","0"), event);
      //return response;
    } catch (error) {
      console.log("Peto por error", error);
    }
  }
  
  async function addEvent(event) {
    try {
      const response = await insertEvent(event);
      console.log("Evento añadido correctamente");
      return response;
    } catch (error) {
      console.log("Problemas al añadir", error);
    }
  }

const accesoclick = ()  =>{
    console.log("EJEMPLOOOOO")
   const modal = document.querySelector('#confirmar-creacion-evento-modal');
    const deleteEventButton = document.querySelector('#deleteEventButton-Cancel');
    const closeButton = document.querySelector('[data-dismiss="modal"]');
    const crearEvento = document.querySelector('#CreateEventButtonCreate');
    const textCrearEvento = document.querySelector("#contenido-body-crear-evento");
    console.log(modal)
    $(modal).modal('show');

    if (closeButton) {
        closeButton.addEventListener('click', () => {
        $(modal).modal('hide');
        });}
 
      deleteEventButton.addEventListener('click', async () => {
        // Cerrar el modal
        $(modal).modal('hide');
      });
    if(crearEvento){
        crearEvento.addEventListener('click', () => {
            console.log()
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
        }});
    }