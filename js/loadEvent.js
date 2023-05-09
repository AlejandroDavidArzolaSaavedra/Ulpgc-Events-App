document.addEventListener('DOMContentLoaded', init);

function loadTemplate() {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            // código para mostrar los detalles del evento
            const titulo = card.querySelector('.card-title').value;


            // Obtener los datos del Local Storage
            const eventos = JSON.parse(localStorage.getItem('eventos'));

            const evento = eventos.find(e => e.nombre === titulo);
            document.getElementById('title_header').innerHTML = evento.nombreEvento;
            document.getElementById('lugar-evento').innerHTML = evento.lugarEvento;
            document.getElementById('imagen-show-event').innerHTML = evento.imagenEvento;
            document.getElementById('tipo-evento-show-event').innerHTML = evento.tipoEvento;
            document.getElementById('descripcion-show-event').innerHTML = evento.descripcion;
            document.getElementById('total-person-show-event').innerHTML = evento.aforo;
            document.getElementById('hora-show-event').innerHTML = evento.fecha.hora;
            document.getElementById('info-add-show-event').innerHTML = evento.informacionAdicional;
            const fecha_nueva = new Date(evento.fecha.anio, evento.fecha.mes - 1, evento.fecha.dia, evento.fecha.hora);
            document.getElementById('fecha-show-event').innerHTML = fecha_nueva;
        });
    });
}

function loadEvents() {
    fetch('../staticData/events.json')
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('eventos', JSON.stringify(data.eventos));
            loadTemplate();
        });
}

document.addEventListener('DOMContentLoaded', loadEvents);

