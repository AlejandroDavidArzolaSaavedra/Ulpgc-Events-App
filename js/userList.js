import { getDocs, getDoc, updateDoc, collection, query, deleteDoc, where, doc} from "https://www.gstatic.com/firebasejs/9.19.0/firebase-firestore.js";
import { db } from "./firebase.js";

export const usersEvents = (usuarioDelEvento) => {
    console.log(usuarioDelEvento)
    console.log("prueba a corregir")
    var tableEvent = document.getElementById("table-event-list");
    let tr = "";
    usuarioDelEvento.forEach((usuarios) => {
      let evento = eventoUser
      tr += "<tr>";
      tr += `<td class="">${usuarios.userId}</td>`;
      tr += `<td class="nombre-evento-lista-usuario">${usuarios.nombre}</td>`;
      tr += `<td>${usuarios.correo}</td>`;
      tr += `<td>${evento.telefono}</td>`;
      tr += `<td style="text-align: center;" class="no-export">
                <button class="btn btn-primary redirect-to-show" type="button" data-event-name="${evento.nombre}">
                  <span class="btn-label"></span>
                  <i class="fa-solid fa-eye"></i> Mirar
                </button> 
                <button class="btn btn-danger delete-event" type="button">
                  <span class="btn-label"></span>
                  <i class="far fa-trash-alt"></i> Borrar
                </button>
              </td>`;
      tr += `</tr>`;
    });
    tableEvent.innerHTML += tr;
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
       console.log(cancelDeleteButton);
       
       if (row && row.parentNode) {
         row.parentNode.removeChild(row);
        borradoDeLaBaseDeDatosFirebase(row.firstElementChild.textContent)
        }
       // Cerrar el modal
       $(modal).modal('hide');
     });
     modal.querySelector('.modal-body').textContent = `¿Está seguro que desea eliminar al usuario "${eventName}"?`;
     $(modal).modal('show');
   });
 });


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

console.log("FINAL DEL DOCUMENTO")