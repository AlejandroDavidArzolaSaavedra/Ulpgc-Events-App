import { getDocs, getDoc, updateDoc, collection, query, deleteDoc, where, doc} from "https://www.gstatic.com/firebasejs/9.19.0/firebase-firestore.js";
import { db } from "./firebase.js";

export const loadListEvents = (ListaEventos) => {
    var tableEvent = document.getElementById("table-event-list");
    let tr = "";
    ListaEventos.forEach((eventoUser) => {
      let evento = eventoUser
      var month = getMonthString(evento.fecha.month);
      tr += "<tr>";
      tr += `<td class="">${evento.eventoId}</td>`;
      tr += `<td class="nombre-evento-lista-usuario">${evento.nombre}</td>`;
      tr += `<td>${evento.fecha.day},${month},${evento.fecha.year}</td>`;
      tr += `<td>${evento.categoria}</td>`;
      if (compareDate(evento.fecha.day, evento.fecha.month, evento.fecha.year)) {
        tr += `<td class="text-success date-field">En Fecha</td>`;
      } else {
        tr += `<td class="text-danger date-field">Fuera de Fecha</td>`;
      }
      tr += `<td style="text-align: center;" class="no-export">
                <button class="btn btn-primary redirect-to-show" type="button" data-event-name="${evento.nombre}">
                  <span class="btn-label"></span>
                  <i class="fa-solid fa-eye"></i> Mirar
                </button> 
                <button class="btn btn-success user-event-inscrite user-event-modificate" type="button" onclick="userEvents(${evento})">
                  <span class="btn-label"></span>
                  <i class="far fa-edit"></i>Inscripciones
                </button> 
                <button class="btn btn-danger delete-event" type="button">
                  <span class="btn-label"></span>
                  <i class="far fa-trash-alt"></i> Borrar
                </button>
              </td>`;
      tr += `</tr>`;
    });
    tableEvent.innerHTML += tr;
    const patronCorreo = /@ulpgc\.[^.]+$/;
    const usuarioAlmacenado = localStorage.getItem('usuario');
    if(usuarioAlmacenado){
        const usuario = JSON.parse(usuarioAlmacenado)
        const buttonblink = document.querySelectorAll(".redirect-to-show");
        const buttonadapt = document.querySelectorAll(".user-event-modificate");
        if (patronCorreo.test(usuario.correo)) {
            buttonblink.forEach(optionblink => optionblink.style.display="none");
            buttonadapt.forEach(option => option.style.display="inline-block");
        }else{
            buttonadapt.forEach(option => option.style.display="none");
        }
    }
    

    const eventCards = document.querySelectorAll(".user-event-modificate");
    if(eventCards){
    eventCards.forEach((card) => {
      card.addEventListener("click", () => {
        window.location.href = `../html/userList.html?title=${encodeURIComponent("0")}`;
      });});}


 
  // Usa este código para abrir el modal de confirmación y esperar la respuesta del usuario:
 const deleteButtons = document.querySelectorAll('.delete-event');
 deleteButtons.forEach((button) => {
   button.addEventListener('click', () => {
     const row = button.parentNode.parentNode;
     const eventName = row.querySelector('.nombre-evento-lista-usuario').textContent;
     const modal = document.querySelector('#deleteEventModal');
     const deleteEventButton = document.querySelector('#deleteEventButton');
     const closeButton = document.querySelector('[data-dismiss="modal"]');
     const cancelDeleteButton = document.querySelector(".btn-secondary");
     
     if(cancelDeleteButton){
       cancelDeleteButton.addEventListener('click', () => {
       // Cerrar el modal sin eliminar el evento
       $(modal).modal('hide');
       });
   }

     
     if (closeButton) {
       closeButton.addEventListener('click', () => {
       $(modal).modal('hide');
       
       });}

     deleteEventButton.addEventListener('click', async () => {
       // Eliminar el evento si el usuario confirma
       
       if (row && row.parentNode) {
         row.parentNode.removeChild(row);

        const usuarioAlmacenado = localStorage.getItem('usuario');
        const correoComprobar = JSON.parse(usuarioAlmacenado).correo;

        const parametrosUsuario = localStorage.getItem('ParametrosUsuario');
        const uidUsuario = JSON.parse(parametrosUsuario).uid;

        const patronCorreo = /@ulpgc\.[^.]+$/;
        if (patronCorreo.test(correoComprobar)) {
          borradoDeLaBaseDeDatosFirebase(row.firstElementChild.textContent)
        }else{
          borradoDeLaBaseDeDatosFirebaseNoInstitutional(row.firstElementChild.textContent,uidUsuario)
        }
        }
       // Cerrar el modal
       $(modal).modal('hide');
     });
     modal.querySelector('.modal-body').textContent = `¿Está seguro que desea eliminar el evento "${eventName}"?`;
     $(modal).modal('show');
   });
 });

async function borradoDeLaBaseDeDatosFirebaseNoInstitutional(eventID, uidUsuario) {
  try {
      const eventoRef = doc(db, "evento", eventID);
      let comprobacion;
      const q = query(collection(db, "evento"), where("eventoId", "==", eventID));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        comprobacion = doc.data();
      });
      const listaDeUsuarios = comprobacion.listaDeUsuarios.filter(uid => uid !== uidUsuario);
      await updateDoc(eventoRef, { listaDeUsuarios });
      console.log("Usuario eliminado correctamente del evento");
  } catch (error) {
    console.log("Problemas al eliminar el usuario del evento", error);      
  }
}

async function borradoDeLaBaseDeDatosFirebase(eventID) {
  try {
    let comprobacion;
    const q = query(collection(db, "evento"), where("eventoId", "==", eventID));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      comprobacion = doc.data();
    });
    await deleteDoc(doc(db, "evento", comprobacion.eventoId));
    console.log("Documento eliminado correctamente");
    return 0;       
  } catch (error) {
    console.log("Problemas al eliminar", error);      
  }
}



function compareDate(day,month,year){

    var actualDate = new Date();
    var reservedDate = new Date(day, month-1, year)
    return reservedDate.getTime() > actualDate.getTime()
    
}
function getMonthString(index){
    var enMonthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
    var esMonthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dic"];
    return esMonthNames[index-1];  
}
}


/**
 * 
 * BOTON DE MODIFICAR PARA EL SPRINT 2
 * 
 *                <button class="btn btn-primary  user-event-modificate" type="button">
                  <span class="btn-label"></span>
                  <i class="far fa-edit"></i>Editar
                </button> 

                const eventCards = document.querySelectorAll(".redirect-to-show");
    eventCards.forEach((card) => {
      card.addEventListener("click", () => {
        const eventName = card.getAttribute("data-event-name");
        window.location.href = `../html/showEventInformation.html?title=${encodeURIComponent(eventName)}`;
      });
      const eventCards2 = document.querySelectorAll(".user-event-inscrite");
      eventCards2.forEach((card) => {
        card.addEventListener("click", () => {
  
          window.location.href = `../html/userList.html?title=${encodeURIComponent(eventName)}`;
      });**/
      



