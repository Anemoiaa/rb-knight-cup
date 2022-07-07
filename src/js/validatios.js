import isEmail from "validator/lib/isEmail";
import isMobilePhone from "validator/lib/isMobilePhone";
import isDate from "validator/lib/isDate";


export function isValid(field, content) {
    if (field === 'name') return validate_name(content);
    else if (field === 'email') return validate_email(content);
    else if(field === 'tel') return validate_tel(content);
    else if (field === 'birth_day') return validate_date(content);
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
