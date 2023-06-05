const button = document.querySelector("#crear-evento-confirm-event");
if (button){
    setTimeout(() => { console.log("Esperando..."); }, 50000);
    asdas
    button.addEventListener("submit", async(e)=>{
        e.preventDefault();
        button.addEventListener('click', accesoclick);

    

const accesoALaBD = () =>{    
    const usuarioAlmacenado = localStorage.getItem('usuario');
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
  
    const infoAdicional = document.querySelector("#input-create-event-info-adicional").value;
    const evento = {
      Creador: creador,
      aforo: aforo,
      categoria: tipo,
      lugar: lugar,
      descripcion: descripcion,
      fechaDeSubida: { day, month, year, hour },
      imagenEvento: imagenes[i],
      infoAdicional: infoAdicional,
      listaDeUsuarios: listaDeUsuarios,
      nombre: "SUPERINCREIBLE"
  }
  addEvent(evento);
}


async function insertEvent(event) {
    try {
    } catch (error) {
      console.log("Ocurrio un error", error);
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
   const modal = document.querySelector('#confirmar-creacion-evento-modal');
    const deleteEventButton = document.querySelector('#deleteEventButton-Cancel');
    const closeButton = document.querySelector('[data-dismiss="modal"]');
    const crearEvento = document.querySelector('#CreateEventButtonCreate');
    const textCrearEvento = document.querySelector("#contenido-body-crear-evento");
    $(modal).modal('show');

    if (closeButton) {
        closeButton.addEventListener('click', () => {
        $(modal).modal('hide');
        });}
 
      deleteEventButton.addEventListener('click', async () => {
        $(modal).modal('hide');
      });
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
        }});
    }