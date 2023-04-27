export const loadInformationEvents = (ListaEventos) => {
    var tableEvent = document.getElementById("content-show-information");
    const urlParams = new URLSearchParams(window.location.search);
    const eventTitle = decodeURIComponent(urlParams.get("title"));
    let tr = ""
    ListaEventos.forEach(eventoUser =>{
        let evento = eventoUser.data();
        if(evento.nombre == eventTitle){
            console.log(evento.fecha[0], evento.fecha[1],evento.fecha[2],evento.fecha[3])
            var month = getMonthString(evento.fecha[1]);
            console.log("somos el mismo evento", evento.nombre, eventTitle)
            tr+=`<h1 id="title_header">${evento.nombre}</h1>
            <img class="h-25" src="${evento.imagenEvento}" id="imagen-show-event" style="border-radius: 10px;" alt="Imagen del evento"></img>
            </div>
            <div class="paragraph">
           <div class="icons-paragraph">
                <div class="text_w_icons" id="calendar-info">
                <i class="fa-regular fa-calendar-days feather-48"></i>
                    <p class="title_icon_text">      </p>
                </div>
                <div class="text_w_icons" id="hour-info">
                    <i class="fa-solid fa-clock feather-48"></i>
                    <p class="title_icon_text">      
                    </p>
                </div>
                <div class="text_w_icons" id="capacity-info">
                <i class="fa-solid fa-person feather-48"></i>
                    <p class="title_icon_text">      </p>
                </div>
                <div class="text_w_icons" id="ubi-info">
                <i class="fa-solid fa-map-location-dot feather-48"></i>
                    <p class="title_icon_text">      </p>
                </div>
                <p class="text_u_icons">${month}. ${evento.fecha[0]}, ${evento.fecha[2]}</p>
                <p class="text_u_icons" id="hora-show-event">${evento.fecha[3]}
                </p>
                <p class="text_u_icons" id="total-person-show-event">${evento.aforo} personas</p>
                <p class="text_u_icons">${evento.lugar}
                </p>
            </div>
            <h3 class="lil_header">Inscripción</h3>
            <p class="paragraph-show-information">Entradas disponibles:<span id="number-show-event">${evento.aforo}</span></p>
            <p class="paragraph-show-information">Disponible hasta:<span id="fecha-show-event">${month}. ${evento.fecha[0]}, ${evento.fecha[2]}</span></p>
            <button type="submit" class="lil_header" id="button-inscription" >Inscripcion</button>    
            </div>
            <div class="paragraph"> 
                <h2 class="parrafos-info-event" style="margin-top:4rem; margin-bottom:0; display: inline-block; width:50%; "> Info del evento</h2>
                <p class="parrafo-con-ubicacion paragraph-show-information" id="descripcion-show-event"style="display: inline-block; width:50%;">${evento.descripcion}</p>
                <img src="../images/mapa.PNG" class="image-mapa" alt="Mapa ubicacion"/>
            </div>
            <div class="paragraph"> 
            <h2 class="parrafos-info-event"> Info adicional del evento:</h2>
                <p id="info-add-show-event" class="paragraph-show-information"> ${evento.infoAdicional}</p>'
                `
        }
        console.log(evento.nombre);
        })
        tableEvent.innerHTML += tr;
}


function getMonthString(index){
    var enMonthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
    var esMonthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dic"];
    return esMonthNames[index-1];  
}