 let addSubTaskInput = document.getElementById("add_sub_task_input");

//Button in navigation bar
let subWorkAddBtn = document.getElementById("sub_work_add_btn");
let subTaskWrapper = document.getElementById("sub_task_wrapper");

let subTaskItem = document.querySelectorAll(".sub_task_item");
let deleteTask = document.querySelectorAll(".delete_task");

subWorkAddBtn.addEventListener("click", () => {

    if(!subTaskWrapper.classList.contains("sub_open")){
        subTaskWrapper.classList.add("sub_open");
    } else {

        let createElementWrapper = document.createElement("div")
        subTaskWrapper.prepend(createElementWrapper)
        createElementWrapper.classList.add("sub_task_item")

        let createElementInput = document.createElement("input");
        createElementWrapper.prepend(createElementInput);
        createElementInput.classList.add("add_sub_task_input");
        createElementInput.setAttribute("placeholder", "Введіть підзадачу");
        createElementInput.setAttribute("maxlength", "20");
        createElementInput.setAttribute("name", "sub_task_element");

        let createElementClose = document.createElement("p")
        createElementClose.classList.add("delete_task");
        createElementClose.innerText = "X";
        createElementInput.after(createElementClose);

        subTaskItem = document.querySelectorAll(".sub_task_item");
        deleteTask = document.querySelectorAll(".delete_task");

    }

    console.log(deleteTask)

    deleteTask.forEach((element, index) => {

        element.addEventListener("click", () => {
            let key = -(deleteTask.length - (index - 1));
            console.log(key)
            if(index !== 0){
                console.log(subTaskItem[index])
                subTaskItem[index].remove();
                deleteTask[index].remove()
            } else if(index === 0){
                subTaskWrapper.classList.remove("sub_open");
            }
        })
    })
})



