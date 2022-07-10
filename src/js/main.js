import { isValid } from './validatios';
import { showErrorModal, closeErrorModal } from './error-modal';

document.addEventListener("DOMContentLoaded", () => {

    const personalInfoForm = document.querySelector('#info-form');
    const personalInfoFormFields = document.querySelectorAll('#info-form input');
    const expInfoForm = document.querySelector('#exp-form');
    const levelCards = expInfoForm.querySelectorAll('.level-card');
    const toStepOne = document.getElementById('to-step-one');

    let currentStep = localStorage.getItem('currstep') 
                    ? localStorage.getItem('currstep')
                    : 'info-form';
    if (currentStep === 'info-form')
        showInfoPage();
    else
        showExpPage();

    fetchCharacters();


    const validField = {
        name: false,
        email: false,
        tel: false,
        birth_day: false,
    };

    

    // fill personal info fields from localstorage

    personalInfoFormFields.forEach(input => {
        input.value = localStorage.getItem(input.id);
        if(input.value)
            validField[input.id] = true;
        if(input.value.length > 0)
            input.nextElementSibling.classList.remove('hidden');
    });

    // fill exp info field from localstorage
    if(localStorage.getItem('level')) {
        const level = JSON.parse(localStorage.getItem('level'));
        document.querySelector('#select-level span').innerHTML = level.title;
        document.querySelector('#select-level span').setAttribute('data-level', level.dataset);
    }
    if(localStorage.getItem('character')) {
        const character = JSON.parse(localStorage.getItem('character'));
        document.querySelector('#select-character span').innerHTML = character.name;
        document.querySelector('#select-character span').setAttribute('data-character_id', character.id);
    }



    

    // Event Listeners 

    toStepOne.addEventListener('click', showInfoPage);
    personalInfoForm.addEventListener('submit', submitFirstStep);
    expInfoForm.addEventListener('submit', submitSecondStep);
    

    // Live Validation
    personalInfoFormFields.forEach(input => {
        input.addEventListener('focus', (e) => {
            if(input.classList.contains('invalid')) 
                input.classList.remove('invalid');
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


    // Dropdown
    document.querySelectorAll('.dropdown-icon')
    .forEach(drop => {
        drop.addEventListener('click', (e) => {
            const dropdown = e.target.parentNode;
            const content = dropdown.querySelector('.dropdown-content');
            const icon = dropdown.querySelector('img');
            content.classList.toggle('flex');
            icon.classList.toggle('dropdown-icon-rotate');
        })
    })

    // Level card
    levelCards.forEach(card => {
        card.addEventListener('click' ,() => {
            const cardTitle = card.innerHTML;
            document.querySelector('#select-level span').innerHTML = cardTitle;
            document.querySelector('#select-level span').setAttribute('data-level', card.dataset.level);
            localStorage.setItem('level', JSON.stringify({title: cardTitle, dataset: card.dataset.level}));

            // Close dropdown
            const dropdown =  document.querySelector('#select-level .dropdown-content');
            const icon = document.querySelector('#select-level img');
            
            dropdown.classList.remove('flex');
            dropdown.classList.add('hidden');
            
            icon.classList.remove('dropdown-icon-rotate');

            
        })
    })


    function showInfoPage() {

        expInfoForm.classList.add('hidden');
        localStorage.setItem('currstep', 'info-form');

        const formTitle = document.querySelector('.form-block__title div');
        formTitle.innerHTML = 'Personal information';

        const leftside= document.querySelector('.leftside');
        leftside.classList.remove('exp-bg');
        leftside.classList.add('registration-bg');

        personalInfoForm.classList.remove('hidden');
    
    }

    function showExpPage() {
        personalInfoForm.classList.add('hidden');

        localStorage.setItem('currstep', 'exp-form');
        
        const formTitle = document.querySelector('.form-block__title div');
        formTitle.innerHTML = 'Chess experience';

        const leftside= document.querySelector('.leftside');
        leftside.classList.remove('registration-bg');
        leftside.classList.add('exp-bg');
        
        expInfoForm.classList.remove('hidden');
        setCompleteIcons();
        
    }


    function submitFirstStep(e) {
        e.preventDefault();
        if (Object.values(validField).every(value => value)) {
            closeErrorModal();
            showExpPage();

        } else {
            const asArray = Object.entries(validField);
            const invalidFields = Object.fromEntries(asArray.filter(([key, value]) =>  !value)); 
            
            const first = Object.keys(invalidFields)[0];
            showErrorModal(first);

            for(let field in invalidFields) {
                document.querySelector(`#${field}`).classList.add('invalid');
            }
        }
    }

    function submitSecondStep(e) {
        e.preventDefault();
        const level = document.querySelector('#select-level span').dataset.level;
        const character = document.querySelector('#select-character span').dataset.character_id;
        const participated = document.querySelectorAll('.checkbox-block__buttons input:checked');
        const validateFields = {
            level: isValid('level', level), 
            character: isValid('character', character), 
            participated: isValid('participated', participated),
        };

        if (Object.values(validateFields).every(value => value)) {
            const user = {
                name: localStorage.getItem('name'),
                email: localStorage.getItem('email'),
                phone: localStorage.getItem('tel'),
                date_of_birth: localStorage.getItem('birth_day'),
                experience_level: JSON.parse(localStorage.getItem('level')).dataset,
                already_participated: (participated[0].value) === 'true' 
                                    ? true
                                    : false,
                character_id: JSON.parse(localStorage.getItem('character')).id,
            };
            registerUser(user);
            
          
        } else {
            const asArray = Object.entries(validateFields);
            const invalidFields = Object.fromEntries(asArray.filter(([key, value]) =>  !value)); 
            const first = Object.keys(invalidFields)[0];
            showErrorModal(first);
        }

        
    }


    async function registerUser(user) { 
        await fetch('https://chess-tournament-api.devtest.ge/api/register', {
            method: 'POST',
            headers: {
              Accept: 'application.json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            if(response.status == 201) {
                goToFinalPage();
                localStorage.clear();
            } 
            else throw new Error();
        })
        .catch(err => {
            showErrorModal('Api');
        })
    }

    async function fetchCharacters() {
        await fetch('https://chess-tournament-api.devtest.ge/api/grandmasters')
        .then(res=>res.json())
        .then(json => {
            json.forEach(character => {
                setCharacter(character);            
            })
        });
    }

    function setCharacter(character) {
        const dropdownContent = document.getElementById('select-character')
        .querySelector('.dropdown-content');
        
        const newCharacter = document.createElement('div')
        newCharacter.classList.add('character-card');
        newCharacter.setAttribute(
            'data-character_id',
            character.id
            );

        const characterName = document.createElement('span');
        characterName.innerHTML = character.name;

        const characterPicture = document.createElement('img');
        characterPicture.setAttribute(
        'src',
        `https://chess-tournament-api.devtest.ge/${character.image}`
        );

        newCharacter.append(characterName);
        newCharacter.append(characterPicture);

        dropdownContent.append(newCharacter);

        newCharacter.addEventListener('click', () => {
            document.querySelector('#select-character span').innerHTML = character.name;
            document.querySelector('#select-character span').setAttribute('data-character_id', character.id);
            localStorage.setItem('character', JSON.stringify({id: character.id, name: character.name }));
            // close dropdown

            const dropdown =  document.querySelector('#select-character .dropdown-content');
            const icon = document.querySelector('#select-character img');
            
            dropdown.classList.remove('flex');
            dropdown.classList.add('hidden');
            
            icon.classList.remove('dropdown-icon-rotate');
        
        });
    }

    function setCompleteIcons() {
        const icon = document.createElement('img');
        icon.setAttribute(
        'src',
        '../assets/icons/check-all.svg'
        );

        const firstStepRect = document.querySelector('.step-one').querySelector('.step-rect')
        firstStepRect.innerHTML = "";
        firstStepRect.classList.add('complete-step');
        firstStepRect.appendChild(icon);

        const secondStepRect = document.querySelector('.step-two').querySelector('.step-rect');
        secondStepRect.classList.remove('next-step');
        secondStepRect.classList.add('active-step');
    }

    function goToFinalPage() {
        window.location.replace('final.html');
    }

});