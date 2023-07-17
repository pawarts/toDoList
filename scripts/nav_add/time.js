<<<<<<< HEAD
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
=======
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
>>>>>>> be1f08286f776017f636dcbb98159e70aaf72780
})