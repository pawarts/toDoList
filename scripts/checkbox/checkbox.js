const input_check = document.getElementsByClassName("input_checkbox");
const styled_check = document.getElementsByClassName("checkbox_uncheck"); //sub_work_title
const subWorkTitle = document.getElementsByClassName("sub_work_title");
const work_item = document.querySelectorAll(".work_item");
const subWorkItems = document.getElementsByClassName("sub_work_items");
const subWorkItem = document.getElementsByClassName("sub_work_item");

console.log(work_item)

document.addEventListener("load", () => {
    location.reload()
})

if(subWorkItems[0] !== undefined && !work_item[0].classList.contains('work_item--empty_subworks')){
    //Open or close work description
    subWorkItems[0].className = "sub_work_items opened"
}

let open_count = 0;


//setTimeout(() => {console.clear()}, 1000)

const openSubWork = (elementWorkItem, elementSubWorkItems) => {

    elementWorkItem.addEventListener("click", () => {

        if(open_count == 0 || elementSubWorkItems.classList.contains("opened")){

            if (elementSubWorkItems.classList.contains("opened") && !subWorkItems[0].classList.contains("opened")) {
                open_count -= 1
                elementSubWorkItems.classList.remove("opened")
            } else {
                open_count += 1
                elementSubWorkItems.classList.add("opened")
            }
        }

    })
}

//If all task done close this tab

const closeSubWork = (taskGroupCount, subWorksGroupCount) => {

    let index = 0;

    for(let i = 0; i < subWorkItems.length; i++){
        if(subWorkItems[i].className == "sub_work_items opened"){

            for(let j = 0; j < subWorkItems[i].children.length; j++){
                if(subWorkItems[i].children[j].className == "sub_work_item checked"){

                    console.log(subWorkItems[i].children[j].className);

                    index += 1;

                    if(subWorkItems[i].children.length == index){
                        console.log(subWorkItems[i].children.length + '; ' + j)
                        if(subWorkItems[i + 1] != undefined){
                            subWorkItems[i].classList.remove("opened");
                            subWorkItems[i + 1].classList.add("opened");
                        }
                        break
                    }
                }
            }

        }
    }
}

//Style for check
const checker = (elementInput, elementChecked, elementText, elementSubWorkItem, work_item, taskGroupCount, subWorksGroupCount) => {

    elementInput.addEventListener("click", () => {

        if(!work_item[0].classList.contains('work_item--empty_subworks')){
            console.log(elementInput.checked)

            elementChecked.classList.toggle("checkbox_check")
            //elementInput.checked = !elementInput.checked
            elementText.classList.toggle("checkbox_check_text")
            elementSubWorkItem.classList.toggle("checked")


        } else {

            console.log(elementInput.value)

            fetch('/delete_task', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({work_checker: elementInput.value}),
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .then(() => location.reload())
                .catch(error => console.log(error))
            return 0
        }

        closeSubWork(taskGroupCount, subWorksGroupCount);
    })
}


const loops = () => {

    let elementInput, elementChecked, elementText, elementWorkItem, elementSubWorkItems, elementSubWorkItem, subWorksGroupCount = 0;
    let taskGroupCount = 0;

    for(let i = 0; i < work_item.length; i++){

        elementWorkItem = work_item[i];
        elementSubWorkItems = subWorkItems[i];


        if(i > 0 && elementSubWorkItems !== undefined){

            console.log(elementSubWorkItems)
            elementSubWorkItems.classList.remove("opened");
            open_count = 1;
        }

        subWorksGroupCount++

        openSubWork(elementWorkItem, elementSubWorkItems);
    }

    for (let i = 0; i < input_check.length; i++){
        elementInput = input_check[i];
        elementChecked = styled_check[i];
        elementText = subWorkTitle[i];
        elementSubWorkItem = subWorkItem[i];

        taskGroupCount += 1;

        checker(elementInput, elementChecked, elementText, elementSubWorkItem, work_item, taskGroupCount, subWorksGroupCount);
    }
}

loops();

