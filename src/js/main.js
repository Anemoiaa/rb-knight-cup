import { isValid } from './validatios';



const validField = {
    name: false,
    email: false,
    tel: false,
    birth_day: false,
}


function formIsValid(element) {
    return element;
}


const personalInfoForm = document.querySelector('#info-form');
const personalInfoFormField = document.querySelectorAll('input');
personalInfoFormField.forEach(input => {
    input.addEventListener('blur', (e) => {
        if(isValid(input.id, input.value)) {
            validField[input.id] = true;
            input.nextElementSibling.classList.remove('hidden');
            input.classList.remove('invalid');
        } else {
            validField[input.id] = false;
            input.nextElementSibling.classList.add('hidden');
            if(input.value.length > 0 ) input.classList.add('invalid');
            else input.classList.remove('invalid');
            
        }
    });
});
