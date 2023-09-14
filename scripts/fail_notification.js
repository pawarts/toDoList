const fail_button = document.querySelectorAll(".fail_button");
const fail_wrapper = document.getElementById("fail_wrapper");

function stringTransformToBoolean(string){
    if(string === "true"){
        return true;
    } else if(string === "false") {
        return false;
    }
    return 0;
}

fail_button.forEach(element => {
    console.log(element)
    if(stringTransformToBoolean(element.getAttribute("value"))){
        fail_wrapper.classList.add("fail_wrapper_open")
        setTimeout(() => {
            fail_wrapper.classList.remove("fail_wrapper_open")
        }, 4000)
    }
})



