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
function filterCards() {
    
    fetch('../html/components/categoryBar.html')
        .then((res) => {
            return res.text();
        })
        .then(async (text) => {
    // Obtener todas las cards del contenedor
    const cards = document.querySelectorAll('.card-show-event');
    const categoriaBuscada = new String(category);
    // Recorrer las cards y ocultar/mostrar según los filtros seleccionados
    cards.forEach((card) => {
        console.log(card)
        let categoriaCard = new String(card.categoria);
        console.log(categoriaCard, card.categoria, card.nombre)
        if(categoriaBuscada.toLowerCase()  === categoriaCard.toLowerCase()){
            console.log("El coche", card.nombre,"tiene la misma categoria",category)
        }
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
                category = selectedCategories;
                aforo = selectedAforos;
                date = fromDate;
            });
        });
}
