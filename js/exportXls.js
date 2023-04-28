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
