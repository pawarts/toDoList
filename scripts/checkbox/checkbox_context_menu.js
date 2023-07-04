let work_items = document.querySelectorAll(".work_item");

work_items.forEach(elem => {
    elem.addEventListener("click", () => {
        setTimeout(() => {
            alert("3s was down")
        }, 3000)
    })
})