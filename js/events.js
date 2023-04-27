export const setupEvents = (data) => {
  if (data.length){

     const eventList = document.querySelector(".card-cards");
     const searchIcon = document.querySelector(".fa-searchengin");
     const searchInput = document.querySelector("#input-search-head");


     let content = "";
     data.forEach(element => {
       const event= element.data();
       
       const template = `
         <a class="redirect-to-show">
         <div class="col">
            <div class="card h-100 card-show-event">
            <img src="${event.imagenEvento}" class="card-img-top" alt="...">
            <div class="card-body">
               <h5 class="card-title">${event.nombre}</h5>
               <p class="card-text">${event.descripcion}</p>
            </div>
            </div>
         </div>
      </div>
      </a>
       `; 
       content += template;
     });
     eventList.innerHTML = content;

     // Obtener todos los elementos con la clase "card-show-event"
      const eventCards = document.querySelectorAll(".card-show-event");

      // Recorrer cada elemento y agregar un evento de clic
      eventCards.forEach((card) => 
      {
         console.log(card)
      card.addEventListener("click", () => {
      // Obtener el elemento "card-title" dentro del elemento actual
      const cardTitle = card.querySelector(".card-title");

      // Obtener el título del evento
      const eventTitle = cardTitle.textContent;

      // Redirigir a la página de detalles del evento, pasando el título como parámetro
      window.location.href = `../html/showEventInformation.html?title=${encodeURIComponent(eventTitle)}`;
      });
      });

     searchIcon.addEventListener("click", () => {
      const searchTerm = document.querySelector(".search-input").value.toLowerCase();
      
      const eventList = document.querySelector(".card-cards");
      const searchInput = document.querySelector(".fa-searchengin");
      let content = "";
      data.forEach(element => {
         const event= element.data();
         const title = `${event.nombre}`;
         if (title.includes(searchTerm) && title.includes("")) {           
            const template = `
            <a href="../html/showEventInformation.html" class="redirect-to-show">
               <div class="col">
                  <div class="card h-100 card-show-event">
                  <img src="${event.imagenEvento}" class="card-img-top" alt="...">
                  <div class="card-body">
                     <h5 class="card-title">${event.nombre}</h5>
                     <p class="card-text">${event.descripcion}</p>
                  </div>
                  </div>
               </div>
            </div>
            </a>
            `; 
            content += template;
         }
      });      
      eventList.innerHTML = content;
            
         });

         searchInput.addEventListener("keyup", (event) => {
            const searchTerm = document.querySelector(".search-input").value.toLowerCase();
            const eventList = document.querySelector(".card-cards");
            const searchInput = document.querySelector(".fa-searchengin");
            let content = "";
            data.forEach(element => {
               const event= element.data();
               const title = `${event.nombre}`;
               if (title.toLowerCase().includes(searchTerm) && title.includes("")) {
                  const template = `
                  <a href="../html/showEventInformation.html" class="redirect-to-show">
                     <div class="col">
                        <div class="card h-100 card-show-event">
                        <img src="${event.imagenEvento}" class="card-img-top" alt="imagen-event">
                        <div class="card-body">
                           <h5 class="card-title">${event.nombre}</h5>
                           <p class="card-text">${event.descripcion}</p>
                        </div>
                        </div>
                     </div>
                  </div>
                  </a>
                  `; 
                  content += template;
               }
            }); 
            if(!content){
               content=`<div class="alert alert-warning h2 w-100" style="margin-bottom:20rem" role="alert">
                  No existen eventos con este nombre
                  </div>

                  `
            }      
            eventList.innerHTML = content;
                  
               });
   }else{
      console.log("heccho")
   }






}