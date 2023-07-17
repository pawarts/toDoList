
const resized_input = document.getElementById("create_group_input");


resized_input.addEventListener("input", () => {

    let width = resized_input.value.length !== 0 ? resized_input.value.length: resized_input.clientWidth;

    resized_input.style.width = `${resized_input.value.length + 1}ch`;

    if(resized_input.value.length === 15){
        console.log(resized_input.clientWidth)
        console.log(resized_input.value.length)
    }
});