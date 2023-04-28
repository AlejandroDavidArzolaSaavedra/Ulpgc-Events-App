export const changeInfoUser = (listUsers,usuarioRegistrado) => {
    const Nombre = "isai@gmail.com";
    const usuarioAlmacenado = localStorage.getItem('usuario');
    const usuario = JSON.parse(usuarioAlmacenado);
    console.log(usuario.contra);
    
    listUsers.forEach(user => {
        const userInfo= user.data();
        if(Nombre == userInfo.correo){
            document.getElementById("NombreInformacionUsuario").value = userInfo.nombre;
            document.getElementById("CorreoInformacionUsuario").value = userInfo.correo;
            document.getElementById("TelefonoInformacionUsuario").value = userInfo.telefono;
            
        }
        if(usuario){
            document.getElementById("ContraseñaInformacionUsuario").value = usuario.contra;
        }
    });

  }
