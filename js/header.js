document.addEventListener('DOMContentLoaded', init);

function loadTemplate(fileName, id, callback) {

    fetch(fileName).then((res) => {
        return res.text();
    }).then((text) => {
        document.getElementById(id).innerHTML = text;
        //console.log(text)
        if(callback){
            callback();
        }
    })
}


function init() {
    loadTemplate('./components/headerUserNotLogged.html', 'header');
  
}


function changeRegister(event){
    event.preventDefault();
    let name = document.getElementById("signup-name");
    name.style.display = "none";
    let correo = document.getElementById("signup-email");

    let telefono = document.getElementById("signup-phone");
    telefono.style.display = "none";
    let contra = document.getElementById("signup-password");

    let contrarepe = document.getElementById("signup-repeat-password");
    contrarepe.style.display = "none";
    if (correo.value.trim() === "" || contra.value.trim() === "" ) {
        console.log("VACIO");
    }else{
        console.log("LLENO");
    }
}

function displayDate(){
    document.getElementById("signup-name").style.display = "block";
    document.getElementById("signup-phone").style.display = "block";
    document.getElementById("signup-repeat-password").style.display = "block";
    console.log("TOCADO")
}


function cambiarValores() {
    console.log("Eventos")
  }