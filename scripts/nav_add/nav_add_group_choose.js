const categoryChooseItem = document.querySelectorAll(".category_choose-item");
const category_titles = document.querySelectorAll(".category_title");



for(let i = 0; i < categoryChooseItem.length; i++){

    let element = categoryChooseItem[i];

    element.addEventListener("click", () => {
        for(let k = 0; k < category_titles.length; k++){
            let item = category_titles[k];

            item.innerText = element.innerText;

            console.log(item.attributes)
        }
    })

    console.log(element.innerText)

}