
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
        var month = getMonthString(evento.fecha.mes);
        tr += "<tr>";
        tr += `<td>${evento.nombreEvento}</td>`;
        tr += `<td>${evento.fecha.dia},${month},${evento.fecha.anio}</td>`;
        tr += `<td>${evento.tipoEvento}</td>`;
        if(compareDate(evento.fecha.anio, evento.fecha.mes, evento.fecha.dia)){
            tr += `<td class="text-success date-field">En Fecha</td>`;
        }else{
            tr += `<td class="text-danger date-field">Fuera de Fecha</td>`;
        }
        tr += `<td style="text-align: center;" class="no-export">
                    <button class="btn btn-success" type="submit" onclick="userEvents(${evento})">
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
function compareDate(day,month,year){

    var actualDate = new Date();
    var reservedDate = new Date(day, month-1, year)
    return reservedDate.getTime() > actualDate.getTime()
    
}
function getMonthString(index){
    var enMonthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
    var esMonthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dic"];
    return esMonthNames[index-1];  
}
