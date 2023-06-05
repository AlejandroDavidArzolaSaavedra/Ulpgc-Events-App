const onlyOne = (checkbox) =>{
    var checkboxes = document.getElementsByName('check');
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false
    });
}

const onlyOneCategory = (checkbox) =>{
    var checkboxes = document.getElementsByName('check-category')
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false
    })
}