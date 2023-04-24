export function showMessage(message, type = "success"){
    Toastify({
        text: message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: type === "success"? "orange":"red",
          fontWeight: "bold"
        },
        onClick: function(){} // Callback after click
      }).showToast();      
}
