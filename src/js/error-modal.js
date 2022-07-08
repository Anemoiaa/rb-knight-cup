const errorModal = document.querySelector('.error-modal');
const errorModalCloseBtn = document.querySelector("#error-modal-close-btn");
errorModalCloseBtn.addEventListener('click', closeErrorModal);

export function showErrorModal(errorType) {
    const errorTypes = {
        name: 'name',
        email: 'email',
        tel: 'phone number',
        birth_day: 'birth day',
        level: 'level',
        character: 'character',
        participated: '',
        Api: 'Api',
    }
    const errorMessages = {
        name: 'Please enter valid name',
        email: 'You can use only redberry email',
        tel: 'Phone number must be contain 9 numbers',
        birth_day: 'Please enter valid date',
        level: 'Please choose your level',
        character: 'Please choose your character',
        participated: 'Choose only one answer',
        Api: 'Something went wrong try again'
    }
    errorModal.style.display = 'flex';
    document.querySelector('#error-type').innerHTML = `Invalid ${errorTypes[errorType]}`;
    document.querySelector('#error-message').innerHTML = errorMessages[errorType];
}

export function closeErrorModal() {
    errorModal.style.display = 'none';
}