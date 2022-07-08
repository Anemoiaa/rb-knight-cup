import isEmail from "validator/lib/isEmail";
import isMobilePhone from "validator/lib/isMobilePhone";
import isDate from "validator/lib/isDate";


export function isValid(field, content) {
    if (field === 'name') return validate_name(content);
    else if (field === 'email') return validate_email(content);
    else if(field === 'tel') return validate_tel(content);
    else if (field === 'birth_day') return validate_date(content);
    else if (field === 'level') return validate_level(content);
    else if (field == 'character') return validate_character(content);
    else if (field == 'participated') return validate_participated(content);
}


function validate_name(name) {
    return name.length >= 2;
}

function validate_email(email) {
    if(isEmail(email) && email.slice(-11) === 'redberry.ge') return true;
    return false;
}

function validate_tel(mob_number) {
    return isMobilePhone(mob_number) && mob_number.length === 9;
}

function validate_date(date) {
    return isDate(date);
}

function validate_level(level) {
    if(level && level.length > 1) return true;
    return false;
}

function validate_character(character) {
    if(character) 
        return true;
    return false;
}

function validate_participated(participated) {
    if(participated.length > 0 && participated.length < 2)
        return true;
    return false;
    
}