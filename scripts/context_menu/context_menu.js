const context_menu = document.querySelector(".context_menu-wrapper");


//If you want to allow context menu you must to uncommented line 6;

//context_menu.style.display = "none";

document.body.addEventListener("contextmenu", (event) => {
    event.preventDefault();

    console.log(`X:${event.clientX}, Y:${event.clientY}`);
    console.log(context_menu.style.display)

    if(context_menu.style.display === "none") {
        context_menu.style.display = "block";
    }

    context_menu.style.top = `${event.clientY}px`;
    context_menu.style.left= `${event.clientX}px`;
})

document.body.addEventListener("click", (e) => {
    if(e.target != ".context_menu-wrapper" && context_menu.style.display === "block") {
        context_menu.style.display = "none";
    }
})

