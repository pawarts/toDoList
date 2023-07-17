<<<<<<< HEAD
//open or close date work

//connect button
let button_date = document.getElementById("date_time");
let date_cancel_btn = document.getElementById("date_cancel_btn");
let set_calendar_block = document.getElementById("set_calendar_block");

//connect addEventListener to button_time

//open block by alarm button
button_date.addEventListener("click", () => {
    set_calendar_block.classList.remove("open_block");
})

//close block by button cancel
date_cancel_btn.addEventListener("click", () => {
    set_calendar_block.classList.add("open_block");
=======
//open or close date work

//connect button
let button_date = document.getElementById("date_time");
let date_cancel_btn = document.getElementById("date_cancel_btn");
let set_calendar_block = document.getElementById("set_calendar_block");

//connect addEventListener to button_time

//open block by alarm button
button_date.addEventListener("click", () => {
    set_calendar_block.classList.remove("open_block");
})

//close block by button cancel
date_cancel_btn.addEventListener("click", () => {
    set_calendar_block.classList.add("open_block");
>>>>>>> be1f08286f776017f636dcbb98159e70aaf72780
})