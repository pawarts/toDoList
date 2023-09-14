function DOMElementConnect (name, selector = "other"){
    this.selector = selector;
    this.name = name;

    return this
}

DOMElementConnect.prototype.ElementEvent = function (elem, event, callback){
    elem.addEventListener(event, callback)
}

DOMElementConnect.prototype.getElement = function () {
    if(this.selector === "id"){
        return document.getElementById(this.name)
    } else{
        return document.querySelectorAll(this.name)
    }
}

const sub_btn = new DOMElementConnect(".sub_btn", "").getElement();

const forget_password_email_send = new DOMElementConnect("forget_password_email_send", "id").getElement();
const change_password = new DOMElementConnect("change_password", "id").getElement()

const screen_forget = new DOMElementConnect("screen_forget", "id").getElement()
screen_forget.style.marginLeft = '0';

const check_email = new DOMElementConnect("check_email", "id");

let verification_number = 0;

const verification_code = new DOMElementConnect("verification_code", "id");

const fail_wrapper = new DOMElementConnect("fail_wrapper", "id").getElement();
const fail_error = new DOMElementConnect("fail_error", "id").getElement();

forget_password_email_send.addEventListener("submit", (event) => {

    event.preventDefault()


    const formData = new FormData(forget_password_email_send);
    const data_object = Object.fromEntries(formData)

    if(data_object.email.length !== 0){
        fetch('http://localhost:8800/forget_password_email', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data_object),
        })
            .then(response => response.text())
            .then(data => {

                if(data !== "error"){
                    console.log(data)
                    screen_forget.style.marginLeft = '-100vw'
                    fail_wrapper.style.transform = 'translateY(0)'
                } else {

                    console.error(data)
                    fail_wrapper.style.transform = 'translateY(75px)'
                    fail_error.innerText = 'Такої пошти не існує,\nспробуйти ще'
                    setTimeout(() => {
                        fail_wrapper.style.transform = 'translateY(0)'
                    }, 5000)
                }

                verification_number = data
            })
            .catch(error => console.error('Помилка:', error))
    }

})




check_email.getElement().addEventListener("click", (event) => {
    event.preventDefault()

    screen_forget.style.marginLeft = '0vw'

    console.log(screen_forget.style.marginLeft)
})

verification_code.getElement().addEventListener("submit", (event) => {

    event.preventDefault();

    const reset_inputs = new DOMElementConnect(".reset_inputs", "").getElement();

    let verification_number = ``

    reset_inputs.forEach(element => {
        verification_number += `${element.value}`
    })

    fetch('http://localhost:8800/verification_code', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({number: verification_number}),
    })
        .then(response => response.text())
        .then(data => {
            if(data !== verification_number){
                console.log("Неправильний код")
            } else {
                screen_forget.style.marginLeft = '-200vw'
            }
        })
        .catch(err => console.log(err))
})

change_password.addEventListener("submit", (event) => {

    event.preventDefault();

    const formData = new FormData(change_password);
    const data_object = Object.fromEntries(formData);

    const change_password_input = new DOMElementConnect(".change_password", "").getElement();

    console.log('Перше поле: ' + change_password_input[0].value + '\nДруге поле: ' + change_password_input[1].value)

    if(change_password_input[0].value === change_password_input[1].value){
        fetch('/change_password', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data_object),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .then( () => {
                window.location.replace('/log')
            })
            .catch(error => console.log(error));
    } else console.log("Паролі не сходяться")

})
