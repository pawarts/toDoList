
/*const context_menu_main = document.querySelector(".context_menu-wrapper");*/


//If you want to allow context menu you must to uncommented line 6;

//context_menu.style.display = "none";

function openContextMenu (context_menu_name, event){

    const context_menu = context_menu_name;

    if(context_menu.style.display === "none" || context_menu.style.display === "") {
        context_menu.style.display = "block";

        console.log(`Display: ${context_menu.style}`)
        console.log(context_menu_name.style)
    }

    context_menu.style.top = `${event.clientY}px`;
    context_menu.style.left= `${event.clientX}px`;

    console.log(`Top: ${context_menu.style.top}`)
    console.log(`Left: ${context_menu.style.left}`)

    return 0
}

function closerContextMenu (context_menu_name, event) {

    const target = event.target;

    console.log(context_menu_name.style.display)

    if((target !== ".context_menu-wrapper" || target !== ".context_menu") && context_menu_name.style.display === "block") {
        context_menu_name.style.display = "none";
    }
}

document.body.addEventListener("contextmenu", (event) => {
    event.preventDefault();

    console.log(`Y:${event.clientY}, X:${event.clientX}`);
    console.log(`${event.target.classList.contains("group_link")}`);

    if(event.target.classList.contains("group_link")){
        openContextMenu(document.querySelector(".context_menu"), event);
        return 0;
    }

    openContextMenu(document.querySelector(".context_menu-wrapper"), event);
})


document.body.addEventListener("click", (e) => {

    const main_context_menu_display_style = document.querySelector(".context_menu-wrapper").style.display;

    if(!e.target.classList.contains("group_link") && main_context_menu_display_style === "none"){
        closerContextMenu(document.querySelector(".context_menu"), e);
    }

    closerContextMenu(document.querySelector(".context_menu-wrapper"), e);
    return 0;
})



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
