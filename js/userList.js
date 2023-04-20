console.log("Prueba");

document.addEventListener('DOMContentLoaded', init);

const listaEventos = JSON.parse(localStorage.getItem('eventos'));
const evento = listaEventos.find(e => e.nombre === titulo);