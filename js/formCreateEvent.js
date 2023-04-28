function enviar(){
    console.log("Formulario enviado correctamente")
}

function valForm(nform){
    let var1,var2= "";
    switch(nform){
    case 1:
        var1="First";
        var2="Second";
        break;
    case 2:
        var1="Second";
        var2="Third";
        break;
    case 3:
        var1="Third";
        var2="Fourth";
        break;
        default:
            break;
    }
    
    const formactual = document.getElementById(var1)
    const formsig = document.getElementById(var2)
    console.log(formsig);
    formactual.classList.add("displayoff");
    formsig.classList.remove("displayoff")
    console.log("me han pulsado")
}