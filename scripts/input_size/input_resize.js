
const resized_input = document.getElementById("create_group_input");


resized_input.addEventListener("input", () => {
    resized_input.style.width = `${resized_input.value.length + 1}ch`;
});