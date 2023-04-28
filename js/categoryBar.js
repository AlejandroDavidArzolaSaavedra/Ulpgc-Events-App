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

function filterCards() {

    console.log("xxxxxxxxxxxx")
        console.log("xxxxxxxxxxxx")
    // Obtener todas las cards del contenedor
    const cards = document.querySelectorAll('.card-show-event');
  
    // Recorrer las cards y ocultar/mostrar según los filtros seleccionados
    cards.forEach((card) => {
      const category = card.querySelector('.options-category').textContent;
      const aforo = parseInt(card.querySelector('.aforo').textContent);
      const date = card.querySelector('.date').textContent;
        console.log(card,"XXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
        console.log("xxxxxxxxxxxx")
        console.log("xxxxxxxxxxxx")
      if (
        (selectedCategory === 'todos' || category === selectedCategory) &&
        (selectedAforo === 'todos' || aforo <= selectedAforos) &&
        (fromDate === '' || date >= fromDate) &&
        (toDate === '' || date <= toDate)
      ) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

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

            filterBtn.addEventListener('click', function() {
                categoryBar.classList.toggle('hidden');
                cards.classList.toggle('col-md-9');
                cards.classList.toggle('col-md-12');
            });

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

                // Hacer algo con los filtros seleccionados, por ejemplo, imprimirlos en la consola
                console.log('Categorías seleccionadas:', selectedCategories);
                console.log('Aforos seleccionados:', selectedAforos);
                console.log('Desde:', fromDate);
                console.log('Hasta:', toDate);
            });
        });
}
