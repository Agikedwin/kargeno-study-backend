module.exports.validateCreateUser = (
    surname, other_names, phone_number, patient_identifier, email, dob,gender
) => {

    const errors = {};

    if (surname.trim() === '') {
        errors.username = 'Surname must not be empty';
    }
    if (other_names.trim() === '') {
        errors.other_names = 'Other names must not be empty';
    }
    if (email.trim() === '') {
        errors.email = 'Email must not be empty';
    }else  {
        const regex = '^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/';
        if (regex.match(regex)){
            errors.email = 'Email must a valid email address';
        }       
    }
    if(phone_number.trim() === '') {
        errors.phone_number = 'Phone number must not be empty';
    }

    if(gender.trim() === ''){
        errors.gender = 'Gender must not be empty';
    }
    if(dob.trim() === '') {
        errors.dob = 'Dob must not be empty';
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }

};

module.exports.validateLevel = (level_name) => {
    console.log('validateLevel', level_name);

    const errors = {};

    if(level_name.trim() === '') {
        errors.level = 'Level name must not be empty';
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

module.exports.validateDesignation = (desination_name, level_id) => {
    console.log(level_id, '  validateLevel  ', desination_name);

    const errors = {};
    if(desination_name.trim() === '') {
        errors.desination_name = 'Designation name must not be empty';

    }
    if(level_id.length === 0) {
        errors.level_id = 'Level Id not  provided ';
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

module.exports.validateLogin = (username, password) => {

    const errors ={};
    if(username.trim() === '') {
         errors.username = 'Username must not be empty';
    }
    if(password.trim() === '') {
        errors.password = 'Password must not be empty';

    }

    return { 
        errors, 
        valid: Object.keys(errors).length < 1}

}