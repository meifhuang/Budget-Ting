const passwordValidator = require('password-validator');

//Password schema
let schema = new passwordValidator();
schema.is().min(6)
      .is().max(15)
      .has().uppercase()
      .has().lowercase()
      .has().not().spaces()


const validPassword = (password: string): {valid: boolean, errors: string[]} => {
    let errorsList = schema.validate(password, {list: true});
    return { valid: errorsList.length === 0 , errors: errorsList}
}

//Email validator
const validEmail = (email: string): boolean  => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

export { validEmail, validPassword }