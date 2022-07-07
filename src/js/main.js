import { isValid } from './validatios';
import { errorModal, showErrorModal } from './error-modal';


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
    input.addEventListener('focus', (e) => {
        if(input.classList.contains('invalid')) input.classList.remove('invalid');
    })
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
            showErrorModal(input.id);
        }
    });
});
