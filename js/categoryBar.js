
document.addEventListener('DOMContentLoaded', init);

function loadTemplate(fileName, id, callback) {
    fetch(fileName).then((res) => {
        return res.text();
    }).then((text) => {
        document.getElementById(id).innerHTML = text;
        if(callback){
            callback();
        }
        })
}
let category;
let aforo;
let date;
let dateTo;


function compareDate(dateFrom, dateWhile){
    return reservedDate.getTime() > actualDate.getTime()
}

const filterEvents = (category, capacityRange, dateStamp, dateStampWhile, events) => {
    // Objeto que asocia los rangos de capacidad con los valores mínimos y máximos
    const capacityRanges = {
      "0-50": [0, 50],
      "50-100": [50, 100],
      "100-150": [100, 150],
      "150-200": [150, 200],
      "+200": [201, Infinity]
    };
    let dateFrom;
    let dateToStop;
    if(dateStamp){
        const dateTransform = new Date(dateStamp);
        dateFrom = dateTransform;
    }
    if(dateStampWhile){
        const dateToTransform = new Date(dateStampWhile);
        dateToStop = dateToTransform;
    }
    // Filtra los eventos por categoría, rango de capacidad y fecha
    const filteredEvents = events.filter((event) => {
      let match = true;
      if(category){
      if (category.toLowerCase() && event.categoria.toLowerCase() !== category.toLowerCase()) {
        match = false;
      }}
      if (capacityRange) {
        const [minCapacity, maxCapacity] = capacityRanges[capacityRange];
        if (event.aforo < minCapacity || event.aforo > maxCapacity) {
          match = false;
        }
      }
      if (dateFrom && new Date(event.fecha) < new Date(dateFrom)) {
        match = false;
      }
      if (dateToStop && new Date(event.fecha) > new Date(dateToStop)) {
        match = false;
      }
      return match;
    });
  
    return filteredEvents;
  }
  

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

  
const filterCards =() => {
    fetch('../html/components/categoryBar.html')
        .then((res) => {
            return res.text();
        })
        .then(async (text) => {
    const categoriaBuscada = new String(category);
    const querySnap = localStorage.getItem('evento');
    const cardsEvents = JSON.parse(querySnap);
    const eventosFiltrado = filterEvents(category[0], aforo[0], date,dateTo, cardsEvents)

    const eventList = document.querySelector(".card-cards");

     let content = "";
     eventosFiltrado.forEach(element => {
       const template = `
       <a class="redirect-to-show">
       <div class="col">
          <div class="card h-100 card-show-event ${getCategoryClass(element.categoria)}">
             <img src="${element.imagenEvento}" class="card-img-top" alt="...">
             <div class="card-body">
                <h5 class="card-title">${element.nombre}</h5>
                <p class="card-text">${element.descripcion}</p>
             </div>
          </div>
       </div>
    </a>
       `; 
       content += template;
     });
     if(!content){
        content=`<div class="alert alert-warning h2 w-100" style="margin-bottom:20rem" role="alert">
           No existen eventos con estos filtros
           </div>
           `
     }      
     eventList.innerHTML = content;
     const eventCards = document.querySelectorAll(".card-show-event");

      // Recorrer cada elemento y agregar un evento de clic
      eventCards.forEach((card) => 
      {
      card.addEventListener("click", () => {
      // Obtener el elemento "card-title" dentro del elemento actual
      const cardTitle = card.querySelector(".card-title");

      // Obtener el título del evento
      const eventTitle = cardTitle.textContent;

      // Redirigir a la página de detalles del evento, pasando el título como parámetro
      window.location.href = `../html/showEventInformation.html?title=${encodeURIComponent(eventTitle)}`;
      });
      });
  });}

function onlyOneCategory(checkbox) {
    var checkboxes = document.getElementsByName('check-category')
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false
    })
}

function onlyOne(checkbox) {
    var checkboxes = document.getElementsByName('check')
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false
    })
}


function init() {
    loadTemplate('../html/components/categoryBar.html', 'categoryBar', selectFilters);
}

function selectFilters(){
    fetch('../html/components/categoryBar.html')
        .then((res) => {
            return res.text();
        })
        .then(async (text) => {
            // Obtener los elementos del DOM
            const filtersForm = document.querySelector('.categoryBarComponent');
            const applyFiltersButton = filtersForm.querySelector('button');
            const categoryCheckboxes = filtersForm.querySelectorAll(".filtro-bar");
            const aforoCheckboxes = filtersForm.querySelectorAll('.filtro-category');
            const fromDateInput = filtersForm.querySelector('input[type="date"]');
            const toDateInput = filtersForm.querySelectorAll('input[type="date"]')[1]; 
            const filterBtn = document.getElementById('filter-btn');
            const categoryBar = document.getElementById('category-bar');
            const cards = document.getElementById('cards');

            if(filterBtn){
            filterBtn.addEventListener('click', function() {
                categoryBar.classList.toggle('hidden');
                cards.classList.toggle('col-md-9');
                cards.classList.toggle('col-md-12');
            });}

            // Añadir un listener al botón de aplicar filtros
            applyFiltersButton.addEventListener('click', () => {
                // Obtener los valores de las categorías seleccionadas
                const selectedCategories = Array.from(categoryCheckboxes)
                    .filter((checkbox) => checkbox.checked)
                    .map((checkbox) => checkbox.nextElementSibling.textContent.trim());


                // Obtener los valores de aforo seleccionados
                const selectedAforos = Array.from(aforoCheckboxes)
                    .filter((checkbox) => checkbox.checked)
                    .map((checkbox) => checkbox.nextElementSibling.textContent.trim());

                // Obtener las fechas seleccionadas
                const fromDate = fromDateInput.value;
                const toDate = toDateInput.value;
                category = selectedCategories;
                aforo = selectedAforos;
                date = fromDateInput.value;
                dateTo = toDateInput.value
            });
        });
}

function deleteFilter(){
  var checkboxes = document.getElementsByName('check');
    checkboxes.forEach((item) => {
        item.checked = false
    });
    var checkboxes = document.getElementsByName('check-category');
    checkboxes.forEach((item) => {
        item.checked = false
    });

    var checkboxes = document.getElementsByName('check-date');
    checkboxes.forEach((item) => {
        item.value = ""
    });

    const aplicar = document.getElementById('aplicar-filtros');
    aplicar.click();
}

window.addEventListener('scroll', function(){
  var object = document.getElementById('categoryBar');
  var footer = document.querySelector('footer');
  var objectRect = object.getBoundingClientRect();
  var footerRect = footer.getBoundingClientRect();

  if (objectRect.top + objectRect.height <= footerRect.top) {
    // Si el objeto todavía no ha alcanzado el pie de página
    object.style.top = window.pageYOffset + 'px';
  } else {
    // Si el objeto ha alcanzado el pie de página
    object.style.top = footerRect.top - objectRect.height + 'px';
  }
});