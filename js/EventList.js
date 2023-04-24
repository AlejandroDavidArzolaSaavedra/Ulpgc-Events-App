async function getEvents() {
    let url = '../staticData/events.json'
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}
async function renderEvents() {
    var tableEvent = document.getElementById("table-event-list");
    const data = await getEvents();
    let tr = ""
    data.eventos.forEach(evento =>{
        tr += "<tr>";
        tr += `<td>${evento.nombreEvento}</td>`;
        tr += `<td>${evento.fecha.dia},${evento.fecha.mes},${evento.fecha.anio}</td>`;
        tr += `<td>${evento.tipoEvento}</td>`;
        tr += `<td>${evento.aforo}</td>`;
        tr += `<td style="text-align: center;" class="no-export">
                    <button class="btn btn-success" type="submit">
                        <span class="btn-label"></span>
                        <i class="far fa-edit"></i>Inscripciones
                    </button> 
                    <button class="btn btn-primary" type="submit">
                        <span class="btn-label"></span>
                        <i class="far fa-edit"></i>Edit
                    </button> 
                    <button class="btn btn-danger" type="submit">
                        <span class="btn-label"></span>
                        <i class="far fa-trash-alt"></i> Delete
                    </button>`;
        tr += `</tr>`;

        })
        tableEvent.innerHTML += tr;
};  
renderEvents();
function exportCSVExcel() {
    $('#table-event-list').table2excel({
        exclude: ".no-export",
        filename: "download.xls",
        fileext: ".xls",
        exclude_links: true,
        exclude_inputs: true,
        preserveColors: true
    });
}
