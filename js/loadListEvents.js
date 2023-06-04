import { getDocs, getDoc, updateDoc, collection, query, deleteDoc, where, doc} from "https://www.gstatic.com/firebasejs/9.19.0/firebase-firestore.js";
import { exportCSVExcel } from "./exportXls.js"
import { db } from "./firebase.js";

export const loadListEvents = (ListaEventos) => {
    var tableEvent = document.getElementById("table-event-list");
    let tr = "";
    var lang = localStorage.getItem("fullLang");
    if(ListaEventos){
    ListaEventos.forEach((eventoUser) => {
      let evento = eventoUser
      var month = getMonthString(evento.fecha.month);
      tr += '<tr class="cambiarOscuro" style="background-color: white;">';
      tr += `<td class="hidden no-export">${evento.eventoId}</td>`;
      tr += `<td class="nombre-evento-lista-usuario">${evento.nombre}</td>`;
      tr += `<td class="d-none d-sm-table-cell">${evento.fecha.day},${month},${evento.fecha.year}</td>`;
      tr += `<td class="d-none d-sm-table-cell">${evento.categoria}</td>`;
      if (compareDate(evento.fecha.day, evento.fecha.month, evento.fecha.year)) {
        switch (lang) {
          case "Español":
              tr += `<td class="text-success date-field">En Fecha</td>`;
              break;
          case "Deutsch":
            tr += `<td class="text-success date-field">Zum Datum</td>`;
              break;
          case "русский":
            tr += `<td class="text-success date-field">По дате</td>`;
              break;
          case "Português":
            tr += `<td class="text-success date-field">Na data</td>`;
              break;
          case "中国":
            tr += `<td class="text-success date-field">按日期</td>`;
              break;
          case "French":
            tr += `<td class="text-success date-field">À date</td>`;
            break;
          case "English":
            default:
              tr += `<td class="text-success date-field">On date</td>`;
                break;
      }

      } else {
        
        switch (lang) {
          case "Español":
            tr += `<td class="text-danger date-field">Fuera de Fecha</td>`;
              break;
          case "Deutsch":
            tr += `<td class="text-danger date-field">Außerhalb des Datums</td>`;
              break;
          case "русский":
            tr += `<td class="text-danger date-field">Вне даты</td>`;
              break;
          case "Português":
            tr += `<td class="text-danger date-field">Fora da data</td>`;
              break;
          case "中国":
            tr += `<td class="text-danger date-field">超过日期</td>`;
              break;
          case "French":
            tr += `<td class="text-danger date-field"Hors date</td>`;
            break;
          case "English":
            default:
              tr += `<td class="text-danger date-field">Out of date</td>`;
                break;
      }

      }
      tr += `<td style="text-align: center;" class="no-export">
      <button class="btn btn-primary  user-event-modificate" type="button">
      <span class="btn-label"></span>
      <i class="far fa-edit"></i>Editar
    </button> 
                <button class="btn btn-primary redirect-to-show" type="button" data-event-name="${evento.nombre}">
                  <span class="btn-label"></span>
                  <i class="fa-solid fa-eye"></i> Mirar
                </button> 
                <button class="btn btn-success user-event-inscrite user-event-modificate inscription-event-button" type="button" onclick="userEvents(${evento})">
                  <span class="btn-label"></span>
                  <i class="far fa-edit"></i>Users
                </button> 
                <button class="btn btn-danger delete-event-button" type="button">
                  <span class="btn-label"></span>
                  <i class="far fa-trash-alt"></i> Delete
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
        const eventoId = card.parentNode.parentNode.querySelector('.hidden.no-export').textContent;
        window.location.href = `../html/editEvent.html?eventoId=${encodeURIComponent(eventoId)}`;
      });});}}


 
  // Usa este código para abrir el modal de confirmación y esperar la respuesta del usuario:
 const deleteButtons = document.querySelectorAll('.delete-event-button');
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

const button = document.getElementById("excel-button");
button.addEventListener("click", async function() {
  const userId = JSON.parse(localStorage.getItem("ParametrosUsuario")).uid
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
  console.log(userId)
  var user = await getInfoUser(userId)
  var username = user.nombre;
  exportCSVExcel(username)
});


function compareDate(day,month,year){

    var actualDate = new Date();
    var reservedDate = new Date(year, month-1,day)
    console.log(reservedDate)
    console.log(day,month,year)
    return reservedDate.getTime() > actualDate.getTime()
    
}

function getMonthString(index) {
  var lang = localStorage.getItem("fullLang");
  var monthNames;
  console.log(lang)
  switch (lang) {
      case "Español":
          monthNames =  ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dic"];
          break;
      case "Deutsch":
          monthNames = ["Jan", "Feb", "März", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
          break;
      case "русский":
          monthNames = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];
          break;
      case "Português":
          monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
          break;
      case "中国":
          monthNames = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
          break;
      case "French":
          monthNames = ["Janv", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Déc"];
          break;
      case "English":
      default:
          monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          break;
  }
  
  return monthNames[index - 1];
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
      



