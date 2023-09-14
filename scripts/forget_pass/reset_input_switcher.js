const reset_inputs = document.querySelectorAll(".reset_inputs");

const deleteValueFromInput = (input, index) => {

    console.log(index + ' ' + reset_inputs.length)

    if(index < 0) {
        index = reset_inputs.length - 1;
    } else if (index > reset_inputs.length - 1){
        index = 0
    }

    console.log(index)

    input[index].focus();
    input[index].selectionStart = 1;
}

reset_inputs.forEach((element, index) => {
    element.addEventListener("input", () => {

        const length = element.value.length;

        if(!isNaN(element.value)){
            if( length > 0 && reset_inputs[index + 1] !== undefined){
                reset_inputs[index + 1].focus()
            } else if( length < 1 && reset_inputs[index - 1] !== undefined){
                //deleteValueFromInput(reset_inputs, index - 1)
            }
        } else {
            element.value = '';
        }
    })
    element.addEventListener("keydown", (event) => {

        switch(event.key){
            case "Delete":

                if (index + 1 === reset_inputs.length){
                    index = -1
                }

                reset_inputs[index + 1].focus();
                reset_inputs[index + 1].selectionStart = 0;
                return 0
            case "ArrowRight":
                deleteValueFromInput(reset_inputs, index + 1)
                return 0
            case "Backspace":
                if(reset_inputs[index].value === ''){
                    deleteValueFromInput(reset_inputs, index - 1)
                }
                return 0
            case "ArrowLeft":
                deleteValueFromInput(reset_inputs, index - 1)
                return 0
            default:
                return 0
        }
    })
})