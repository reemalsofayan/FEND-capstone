
import { handleSubmit } from "./js/application.js"

document.querySelector('.submit').addEventListener('click', () => {
    
    event.preventDefault();

    const date = document.querySelector('#start-date').value;
    const city = document.querySelector('#Destenation').value;

    const todayDate = new Date().toJSON().slice(0, 10);

    if(city == '' || date == '') {
       
        alert('please enter a city and date');
    
    }
    
    if(date < todayDate) {


        alert('invalid travel day');

    }else {

        handleSubmit(city);

    }
});


import './styles/base.scss'
import './styles/main.scss'
import './styles/footer.scss'
import './styles/header.scss'
import './styles/results.scss'



export { handleSubmit }