const send_feedback_button = document.getElementById("send_feedback-button");
const send_feedback_form = document.getElementById("send_feedback-form");
const send_feedback_textarea = document.getElementById("send_feedback-textarea");

const feedback_section = document.getElementById("feedback_section");


send_feedback_form.addEventListener("submit", (event) => {

    event.preventDefault();

    const formData = new FormData(send_feedback_form);
    const data_object = Object.fromEntries(formData)

    fetch('/user/send_feedback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data_object)
    })
        .then(response => response.text())
        .then(data => {
            /* data === 'Letter was send' */
            if(data === 'Letter was send'){
                feedback_section.style.marginLeft = '-100vw';
            }
        })
        .catch(error => console.error(error))

})

