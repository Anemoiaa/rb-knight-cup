import { isValid } from './validatios';
import { errorModal, showErrorModal } from './error-modal';

document.addEventListener("DOMContentLoaded", () => {

    const validField = {
        name: false,
        email: false,
        tel: false,
        birth_day: false,
    };

    const personalInfoForm = document.querySelector('#info-form');
    const personalInfoFormFields = document.querySelectorAll('input');

    personalInfoFormFields.forEach(input => {
        input.value = localStorage.getItem(input.id);
        validField[input.id] = true;
        if(input.value.length > 0)
            input.nextElementSibling.classList.remove('hidden');
    });

    
    
    function formIsValid(element) {
        return element;
    }
    

    personalInfoFormFields.forEach(input => {
        input.addEventListener('focus', (e) => {
            if(input.classList.contains('invalid')) input.classList.remove('invalid');
        })
        input.addEventListener('blur', (e) => {
            if(isValid(input.id, input.value)) {
                validField[input.id] = true;
                input.nextElementSibling.classList.remove('hidden');
                input.classList.remove('invalid');
                localStorage.setItem(input.id, input.value);
            } else {
                validField[input.id] = false;
                input.nextElementSibling.classList.add('hidden');
                if(input.value.length > 0 ) {
                    input.classList.add('invalid');
                    showErrorModal(input.id);
                }
                else input.classList.remove('invalid');
                localStorage.removeItem(input.id);
            }
        });
    });


});


