const usersEvents = (event) => {

    console.log(event);
    
    const users = event.usuarios;

    users.forEach(element => {
        const template = `
        <tr>
            <td>${element.nombre}</td>
            <td>${element.correo}</td>
            <td>${element.telefono}</td>
        </tr>`;
    });
}