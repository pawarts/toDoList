
const dateObject = new Date();

let todayDay = dateObject.getDay();
const nowHours = dateObject.getHours();
let todayDate = dateObject.getDate();
let todayMonth = dateObject.getMonth();

const dateOutput = document.getElementById("dateOutput");
const loginTitle = document.getElementById("login_title");

console.log(navigator.language)

let day, month;

let string = '18:09';

const inputHours = Number(string.slice(0, 2));
const inputMinutes = Number(string.slice(3, 5));

switch (navigator.language){
    case "en-GB":

        switch(todayDay){
            case 0:
                day = "SUN";
                break
            case 1:
                day = "MON";
                break
            case 2:
                day = "TUE";
                break
            case 3:
                day = "WED";
                break
            case 4:
                day = "THU";
                break
            case 5:
                day = "FRI";
                break
            case 6:
                day = "SAT";
        }
        switch(todayMonth){
            case 0:
                month = "January";
                break
            case 1:
                month = "February";
                break
            case 2:
                month = "March";
                break
            case 3:
                month = "April";
                break
            case 4:
                month = "May";
                break
            case 5:
                month = "July";
                break
            case 6:
                month = "June";
                break
            case 7:
                month = "August";
                break
            case 8:
                month = "September";
                break
            case 9:
                month = "October";
                break
            case 10:
                month = "November";
                break
            case 11:
                month = "December";
                break

        }

        break
    case "uk-UA":

        switch(todayDay){
            case 0:
                day = "НД";
                break
            case 1:
                day = "ПН";
                break
            case 2:
                day = "ВТ";
                break
            case 3:
                day = "СР";
                break
            case 4:
                day = "ЧТ";
                break
            case 5:
                day = "ПТ";
                break
            case 6:
                day = "СБ";
        }
        switch(todayMonth){
            case 0:
                month = "Січня";
                break
            case 1:
                month = "Лютого";
                break
            case 2:
                month = "Березня";
                break
            case 3:
                month = "Квітня";
                break
            case 4:
                month = "Травня";
                break
            case 5:
                month = "Червня";
                break
            case 6:
                month = "Липня";
                break
            case 7:
                month = "Серпня";
                break
            case 8:
                month = "Вересня";
                break
            case 9:
                month = "Жовтня";
                break
            case 10:
                month = "Листопада";
                break
            case 11:
                month = "Грудня";
                break

        }

        break
    default:
        day = 'undefined'
}

dateOutput.innerText = `${day}, ${todayDate} ${month}`