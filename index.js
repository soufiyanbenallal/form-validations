export const validateEmail = (email) => {
    const regex = /^[\w-.+]+@([\w-]+\.)+[\w-]{2,4}$/
    return regex.test(email)
};
export const hasChanges = (oldArray = [], newArray = []) => {
    return !(JSON.stringify(oldArray) === JSON.stringify(newArray))
}
// ===========================================
// @Check if url is valid
export const isUrlValid = (userInput) => {
    const res = userInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g);
    return (res !== null)
}

/**
 * check if form is valid and return true or false with errors message for each field
 * @param {Object} form - form object to be validated 
 * @param {Object} validations - validations object own rules of the form
 * @returns {errors , isValid}
 */
export const checkForm = (form = {}, validations = {}) => {
    const errors = {} // errors object to store all errors
    let isValid = true; // isValid to check if form is valid or not

    for (const key in validations) {
        // @required validate
        if (Object.prototype.hasOwnProperty.call(validations[key], 'required') && form[key] === '') {
            !errors[key] && (errors[key] = [])
            errors[key].push(validations[key].required)
            isValid = false
        }
        // @email validate
        if (Object.prototype.hasOwnProperty.call(validations[key], 'email')) {
            if (form[key] && !this.validateEmail(form[key])) {
                !errors[key] && (errors[key] = [])
                errors[key].push(validations[key].email)
                isValid = false
            }
        }
        // @url validate
        if (Object.prototype.hasOwnProperty.call(validations[key], 'url')) {
            if (form[key] && !this.isUrlValid(form[key])) {
                !errors[key] && (errors[key] = [])
                errors[key].push(validations[key].url)
                isValid = false
            }
        }
        // @min validate
        if (Object.prototype.hasOwnProperty.call(validations[key], 'min')) {

            if (form[key] && form[key].length < validations[key].min.value) {
                !errors[key] && (errors[key] = [])
                errors[key].push(validations[key].min.message)
                isValid = false
            }
        }
        // @matched with another declared input name validate
        if (Object.prototype.hasOwnProperty.call(validations[key], 'matched')) {
            if (form[validations[key].matched.field] !== form[key]) {
                !errors[key] && (errors[key] = [])
                errors[key].push(validations[key].matched.message)
                isValid = false
            }
        }
        // @check if the input have some declared string
        if (Object.prototype.hasOwnProperty.call(validations[key], 'include')) {
            if (form[key] && !form[key].includes(validations[key].include.value)) {
                !errors[key] && (errors[key] = [])
                errors[key].push(validations[key].include.message)
                isValid = false
            }
        }
    }
    // @return errors and isValid
    return {
        errors,
        isValid
    }
}