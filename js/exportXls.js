export function exportCSVExcel(username) {
    $('#table-event-list').table2excel({
        exclude: ".no-export",
        filename: `${username}.xls`,
        fileext: ".xls",
        exclude_links: true,
        exclude_inputs: true,
        preserveColors: true
        });
}
