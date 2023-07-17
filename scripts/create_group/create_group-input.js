<<<<<<< HEAD
const group_input = document.getElementById("create_group_form");


if(group_input !== null){
    const group_input_btn = document.getElementById("group_input-btn");

    const create_group_input = document.getElementById("create_group_input")

    group_input.style.display = "none";

//This listener listen input, and in input code change the width. So I think it must it
    group_input.addEventListener("input", () => {

        let group_input_new_length = 0;

        let width = 30;

        if(group_input.length > 3){
            if(group_input_new_length > group_input.length){
                group_input.style.width += `${width + 7}px`;
            } else {
                group_input.style.width -= `${width + 7}px`;
            }

            group_input_new_length = group_input.length;
        }

    })


//Group input btn, it is button for open the input

    window.addEventListener("click", (event) => {
        if(event.target !== group_input_btn && event.target !== create_group_input){
            group_input.style.display = "none";
            group_input_btn.style.display = "inline-flex";
        }
    })

    group_input_btn.addEventListener("click", () => {
        group_input.style.display = "inline-flex";
        group_input_btn.style.display = "none";
    })

}
=======
const group_input = document.getElementById("group_input");


if(group_input !== null){
    const group_input_btn = document.getElementById("group_input-btn");

    const create_group_input = document.getElementById("create_group_input")

    group_input.style.display = "none";

//This listener listen input, and in input code change the width. So I think it must it
    group_input.addEventListener("input", () => {

        let group_input_new_length = 0;

        let width = 30;

        console.log(group_input.length)

        if(group_input.length > 3){
            if(group_input_new_length > group_input.length){
                group_input.style.width += `${width + 7}px`;
            } else {
                group_input.style.width -= `${width + 7}px`;
            }

            group_input_new_length = group_input.length;
        }

    })


//Group input btn, it is button for open the input

    window.addEventListener("click", (event) => {
        if(event.target !== group_input_btn && event.target !== create_group_input){
            group_input.style.display = "none";
            group_input_btn.style.display = "inline-flex";
        }
    })

    group_input_btn.addEventListener("click", () => {
        group_input.style.display = "inline-flex";
        group_input_btn.style.display = "none";
    })

}
>>>>>>> be1f08286f776017f636dcbb98159e70aaf72780
