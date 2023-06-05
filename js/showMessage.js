export function showMessage(message, type = "success"){
    Toastify({
        text: message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true, 
        style: {
          background: type === "success"? "orange":"red",
          fontWeight: "bold"
        },
        onClick: function(){}
      }).showToast();      
}
