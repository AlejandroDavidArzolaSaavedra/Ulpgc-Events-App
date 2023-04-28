export const setupEvents = (data) => {
  if (data.length){
     const eventList = document.querySelector(".card-cards");
     const searchInput = document.querySelector(".fa-searchengin");
     let content = "";
     data.forEach(element => {
       const event= element.data();
       
       
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
     });
     eventList.innerHTML = content;


     searchInput.addEventListener("click", () => {
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


  }else{
   console.log("No se han cargado")
  }
}