const addTaskBtn = document.getElementById("add_task_btn");
const emptyTaskBtn = document.getElementById("add_task_page");
const addBlock = document.getElementById("add_block");
const add_img = document.querySelectorAll(".nav_list-add_img");

const navListLink = document.querySelectorAll(".nav_list-link");
const navListImg = document.querySelectorAll(".nav_list-img");

const categoryChooseItems = document.getElementById("category_choose-items");
const categoryBtnAdd = document.getElementById("category_btn_add");

let index_count = 0;

//Add task button and popup window

const toggleAddBlock = () =>{
    addTaskBtn.classList.toggle("add_active")
    addBlock.classList.toggle("show_add_block")

    add_img[index_count].classList.remove("show_cross");

    index_count === 0 ? index_count++ : index_count--;
    console.log(add_img[index_count])

    add_img[index_count].classList.add("show_cross");

    return 1
}

if(emptyTaskBtn !== null){
    //If group hasn't work
    emptyTaskBtn.addEventListener("click", toggleAddBlock)
}

//Navigation block
addTaskBtn.addEventListener("click" , toggleAddBlock)

//Navigation button icon change

for(let i = 0; i < navListLink.length; i++){

    let count_index = 0

    switch(i){
        case 0:
            count_index = 0
            break
        case 1:
            count_index = 2
            break
        case 2:
            count_index = 4
            break
        case 3:
            count_index = 6
            break
        default:
            count_index = 0
    }

    if(window.location.pathname === navListLink[i].attributes[0].nodeValue){
        navListImg[count_index + 1].classList.remove("no_active_icon");
        navListImg[count_index].classList.add("no_active_icon");
    }

    if(window.location.pathname.slice(1, 7).includes("search")){
        navListImg[3].classList.remove("no_active_icon");
        navListImg[2].classList.add("no_active_icon");
    }

    if(!location.pathname.slice(1).includes("/")){
        navListImg[1].classList.remove("no_active_icon");
        navListImg[0].classList.add("no_active_icon");
    }
}


console.log(location.pathname.slice(1).includes("/"))

//open or close time work

//connect button
let button_time = document.getElementById("button_time");
let button_cancel = document.getElementById("button_cancel");
let set_time_block = document.getElementById("set_time_block");

//connect addEventListener to button_time

//open block by alarm button
button_time.addEventListener("click", () => {
    set_time_block.classList.remove("open_block");
})

//close block by button cancel
button_cancel.addEventListener("click", () => {
    set_time_block.classList.add("open_block");
})



