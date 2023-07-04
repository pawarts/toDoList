const searchInput = document.getElementById("search_input");
const searchOutput = document.getElementById("search_output");
const searchOutputClassName = document.querySelectorAll(".search_output");

const close_search_block = document.getElementById("close_search_block");
const search_result = document.getElementById("search_result");

let search_output_element;
let search_output_element_array = [];

let db_simulate_array = ["fs", "ford", "BMW", "Audi"];
let founded_array = [];

function createElement (founded_array, n){
    search_output_element = document.createElement("p");

    search_output_element.classList.add("search_output");

    search_output_element_array.push(search_output_element);

    search_output_element.innerHTML = founded_array[n];

    searchOutput.after(search_output_element);
}

searchInput.addEventListener("input", () => {

    for(let i = 0; i < db_simulate_array.length; i++){

        if(db_simulate_array[i].includes(searchInput.value)){
            for(let n = 0; n < founded_array.length; n++){
                    for(let j = 0; j < founded_array.length - 1; j++){
                        if(founded_array[n] == founded_array[j]){
                            console.log(founded_array)
                            founded_array.splice(j);
                        }
                    }


                createElement(founded_array, n)
            }


            //searchOutput.innerHTML = db_simulate_array[i];
            founded_array.push(db_simulate_array[i]);

            for(let g = 0; g < search_output_element_array.length; g++){

                if(search_output_element_array[g].innerText == "undefined" || searchInput.value == ''){
                    search_output_element_array[g].remove();
                    console.log(search_output_element_array[g].innerText)
                }
            }
        }else if(searchInput.value == '' || searchInput.value == ' ' && db_simulate_array[i].includes(searchInput.value)){
            if(db_simulate_array[i].includes(searchInput.value) != undefined){
                for(let k = 0; k < search_output_element_array.length; k++){
                    search_output_element_array[k].remove();
                }

                search_output_element_array = [];
            }

            searchOutput.innerText = '';
            founded_array = [];
            console.log(founded_array);
        }
    }
})



searchInput.addEventListener("click", () => {
    close_search_block.classList.add("close_search_block-active");
    searchInput.classList.add("search_input-active");
    search_result.classList.add("search_result-show");
})

close_search_block.addEventListener("click", () => {
    close_search_block.classList.remove("close_search_block-active");
    searchInput.classList.remove("search_input-active");
    search_result.classList.remove("search_result-show");
})