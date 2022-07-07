export const errorModal = document.querySelector('.error-modal');

const errorModalCloseBtn = document.querySelector("#error-modal-close-btn");
errorModalCloseBtn.addEventListener('click', () => {
    errorModal.style.display = 'none';
});

export function showErrorModal(errorType) {
    const errorTypes = {
        name: 'name',
        email: 'email',
        tel: 'Phone number',
        birth_day: 'birth day',
    }
    const errorMessages = {
        name: 'Name must contain more than one character',
        email: 'You can use only redberry email',
        tel: 'Phone number must be contain 9 numbers',
        birth_day: 'Please enter valid date',
    }
    errorModal.style.display = 'flex';
    document.querySelector('#error-type').innerHTML = `Invalid ${errorTypes[errorType]}`;
    document.querySelector('#error-message').innerHTML = errorMessages[errorType];
}