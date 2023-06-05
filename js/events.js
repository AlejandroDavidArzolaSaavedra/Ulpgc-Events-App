function getCategoryClass(categoria) {
   let casteo = categoria.toString();
   if(casteo.toLowerCase()  === "Reunion informativa".toLowerCase()){
      return "card text-white bg-primary mb-3";}
   if(categoria.toLowerCase() === "Curso formativo".toLowerCase()){
      return "card text-dark bg-warning mb-3";
   }
   switch (categoria) {
     case "Asadero":
       return "card text-white bg-dark mb-3";
       case "Charla":
       return "card bg-light mb-3";
     case "Otros":
         return "card text-white bg-success mb-3";
   }
 }

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
       <div class="col" ">
          <div class="card h-100 card-show-event ${getCategoryClass(event.categoria)}">
             <img src="${event.imagenEvento}" class="card-img-top" alt="...">
             <div class="card-body">
                <h5 class="card-title" style="font-size:calc(10rem+20vw);">${event.nombre}</h5>
                <p class="card-text">${event.descripcion}</p>
             </div>
          </div>
       </div>
    </a>
       `; 
       content += template;
     });
     eventList.innerHTML = content;
      const eventCards = document.querySelectorAll(".card-show-event");
      eventCards.forEach((card) => 
      {
      card.addEventListener("click", () => {
      const cardTitle = card.querySelector(".card-title");
      const eventTitle = cardTitle.textContent;
      window.location.href = `../html/eventView.html?title=${encodeURIComponent(eventTitle)}`;
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
            <a class="redirect-to-show">
       <div class="col">
          <div class="card h-100 card-show-event ${getCategoryClass(event.categoria)}">
             <img src="${event.imagenEvento}" class="card-img-top" alt="...">
             <div class="card-body">
                <h5 class="card-title">${event.nombre}</h5>
                <p class="card-text">${event.descripcion}</p>
             </div>
          </div>
       </div>
    </a>
            `; 
            content += template;
         }
      });      
      eventList.innerHTML = content;
      const eventCards = document.querySelectorAll(".card-show-event");
      eventCards.forEach((card) => 
      {
      card.addEventListener("click", () => {
      const cardTitle = card.querySelector(".card-title");
      const eventTitle = cardTitle.textContent;
      window.location.href = `../html/eventView.html?title=${encodeURIComponent(eventTitle)}`;
      });
      });       
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
                  <a class="redirect-to-show">
                     <div class="col">
                        <div class="card h-100 card-show-event ${getCategoryClass(event.categoria)}">
                           <img src="${event.imagenEvento}" class="card-img-top" alt="...">
                           <div class="card-body">
                              <h5 class="card-title">${event.nombre}</h5>
                              <p class="card-text">${event.descripcion}</p>
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
            const eventCards = document.querySelectorAll(".card-show-event");
            eventCards.forEach((card) => 
            {
            card.addEventListener("click", () => {
            const cardTitle = card.querySelector(".card-title");
            const eventTitle = cardTitle.textContent;
            window.location.href = `../html/eventView.html?title=${encodeURIComponent(eventTitle)}`;
            });
            });
      });
   }
}