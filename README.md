# simple form validations
Its simple lightweight validations form support all js framework (React,vue, angular..) or native javascript, checking your fields that you create by your frame with rules that your create.

## get started

```npm i simple-form-validations```

## Usage

you should create rules of validations form, for example :

```
const validationsRules = {
    firstName: {
        required: 'First name is required.',
    },
    lastName: {
        required: 'Last name is required.',
    },
    email: {
        required: 'Email is required.',
        email: 'Invalid email address.',
    },
    password: {
        required: 'Password is required.',
        minLength: {
        value: 6,
        message: 'Password must be at least 6 characters.',
        },
    },
    url: {
        required: 'Shop url is required.',
    },
    phone: {
        required: 'Phone number is required.',
        minLength: {
        value: 10,
        message: 'Phone number must be at least 10 characters.',
        },
    }
}

const form = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    url: '',
    phone: '',
},

const { isValid , errors } = checkForm(form, validationsRules)


```
