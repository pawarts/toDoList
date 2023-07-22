
/*const context_menu_main = document.querySelector(".context_menu-wrapper");*/


//If you want to allow context menu you must to uncommented line 6;

//context_menu.style.display = "none";

function openContextMenu (context_menu_name, other_context_menu, event){

    const context_menu = context_menu_name;
    console.log((context_menu.style.display === "none" || context_menu.style.display === "")  && (other_context_menu.style.display === "none" || other_context_menu.style.display === ""))

    if((context_menu.style.display === "none" || context_menu.style.display === "") && (other_context_menu.style.display === "none" || other_context_menu.style.display === "")) {
        context_menu.style.display = "block";
        console.log(context_menu.style.display)
    }


    context_menu.style.top = `${event.clientY}px`;
    context_menu.style.left= `${event.clientX}px`;

    if(event.target.classList.contains("group_link")){
        console.log("I found group link")
        console.log(context_menu)
        context_menu.style.top = `${event.clientY + 20}px`;
        context_menu.style.left= `${event.clientX + 20}px`;
    }

    console.log(`Top: ${context_menu.style.top}`)
    console.log(`Left: ${context_menu.style.left}`)

    return 0
}

function closerContextMenu (context_menu_name, event) {

    const target = event.target;

    console.log("I'm try to close this context menu")
    console.log(context_menu_name.style.display)

    if((target !== ".context_menu-wrapper" || target !== ".context_menu") && context_menu_name.style.display === "block" || context_menu_name.style.display === "") {
        console.log("I wanna close context menu")
        context_menu_name.style.display = "none";
    }
}

document.body.addEventListener("contextmenu", (event) => {
    event.preventDefault();

    //console.log(`Y:${event.clientY}, X:${event.clientX}`);

    if(event.target.classList.contains("group_link")){

        document.getElementById("groups_id").attributes["value"].value = event.target.getAttribute("data-group-id");
        console.log(document.getElementById("groups_id").getAttribute("value"))

        openContextMenu(document.querySelector(".context_menu"), document.querySelector(".context_menu-wrapper"), event);
        return 0;
    }

    console.log("I'm after group delete")

    openContextMenu(document.querySelector(".context_menu-wrapper"), document.querySelector(".context_menu"), event);
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

/*document.body.addEventListener("contextmenu", (event) => {
    event.preventDefault();

    console.log(`X:${event.clientX}, Y:${event.clientY}`);
    console.log(context_menu.style.display)

    if(context_menu.style.display === "none") {
        context_menu.style.display = "block";
    }

    context_menu.style.top = `${event.clientY}px`;
    context_menu.style.left= `${event.clientX}px`;
})*/

document.body.addEventListener("click", (e) => {
    if(e.target != ".context_menu-wrapper" && context_menu.style.display === "block") {
        context_menu.style.display = "none";
    }
})


function loop (element){

}
