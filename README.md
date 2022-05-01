# simple form validations
Its simple lightweight validations form support all js framework (React,vue, angular..) or native javascript, checking your fields that you create by your frame with rules that your create.

## Get started

```
npm i simple-form-validations

```

OR

```
yarn add simple-form-validations

```

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
    firstName: 'Jhon',
    lastName: 'doe',
    email: '',
    password: '',
    url: '',
    phone: '',
},


/**
 * @var { Object } errors - returned object of errors depended on validations rules 
 * @var { Boolean } isValid - returned your form is valid or not 
 * @params { Object } form - Object data form field  
 * @params { Object } validationsRules - validation rules of form 
 */ 

const { isValid , errors } = checkForm(form, validationsRules)

/**
 * the errors object contain propreties for each form variables 
 * example of email proprety: email will returned array of error messages, because may we have multiple rules like required and email validate 
 */ 

```

## Vue Example
![image](https://user-images.githubusercontent.com/41121758/166168754-e3f40679-6dc5-47f3-ac8b-0079c1ab9305.png)

```
<template>
  <section class="mx-auto max-w-500 w-full p-4 bg-white-100 shadow rounded-xl mb-20 self-center">
    <div class="w-full">
      <h1 class="mb-4 text-lg font-semibold text-left text-gray-900">Login to your account</h1>
      <form class="mb-5 space-y-4" method="post" @submit.prevent="onSubmit">
        <!-- ================================================================ -->
        <!-- @field email -->
        <label class="block">
          <span class="block mb-1 text-xs font-medium text-gray-700">Email</span>
          <input
            v-model="form.email"
            class="form-control text-lg"
            :class="{ 'border-red-500 bg-red-50': errors.form.email }"
            type="email"
            placeholder="Email"
            autofocusplaceholder="Ex. james@bond.com"
          />
          <ErrorMessage v-if="errors.form.email" :errors="errors.form.email" />
        </label>
        <label class="block">
          <!-- @input password -->
          <div class="relative">
            <input
              v-model="form.password"
              class="form-control text-lg"
              :class="{ 'border-red-500 bg-red-50': errors.form.password }"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="current-password"
              placeholder="Your password"
            />
            <ErrorMessage v-if="errors.form.password" :errors="errors.form.password" />
          </div>
        </label>
        <!-- ================================================================ -->
        <!-- @submit button -->
        <div class="form-group space-y-4">
        <!-- you can also add custom errors to errors variable as global or something else -->
          <ErrorMessage v-if="errors.global" :errors="errors.global" />
          <button type="submit" class="primary-button">Login</button>
        </div>
      </form>
    </div>
  </section>
</template>
<script lang="ts">
import { checkForm } from "simple-form-validations";
export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      errors: {
          form: {}
          global: []
      },
      submited: false
    }
  },
  watch:{
    // after submited will watch every actions on your form and render form validation this will show the errors message
    form: {
      handler() {
        this.submited && (this.errors.form = this.checkForm.errors)
      },
      deep: true
    }
  },

  computed: {
    validations() {
      return {
        email: {
          required: 'Email is required.',
          email: 'Invalid email address.',
        },
        password: {
          required: 'Password is required.',
        },
      }
    },
    checkForm () {
      return checkForm(this.form, this.validations);
    }
  },

  methods: {
    onSubmit() {
        // @set all inital data and validations
        this.submited = true;
        const { isValid , errors } = this.checkForm
        this.errors.form = errors
        if (!isValid){
            return;
        }
        const payload = {
                email: this.form.email,
                password: this.form.password
        }
        // @Start login
        axios.post('/login', payload)
            .then(({ data }) => {
                // your instruction here
            })
            .catch((err) => {
                // @handle errors
            })
    }
  }
}
</script>
``` 
