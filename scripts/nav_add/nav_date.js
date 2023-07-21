
//open or close date work

//connect button
let button_date = document.getElementById("date_time");
let date_cancel_btn = document.getElementById("date_cancel_btn");
let date_submit_date = document.getElementById("date_submit_btn")
let set_calendar_block = document.getElementById("set_calendar_block");

//connect addEventListener to button_time

//open block by alarm button
button_date.addEventListener("click", () => {
    set_calendar_block.classList.remove("open_block");
})

//close block by button set
date_submit_date.addEventListener("click", () => {
    set_calendar_block.classList.add("open_block");
});

//close block by button cancel
date_cancel_btn.addEventListener("click", () => {
    const my_date_time_input = document.getElementById("myDateTimeInput")
    my_date_time_input.value = '';
    set_calendar_block.classList.add("open_block");
});

