<script setup>
import {AUTH} from '@/api'
import {reactive} from "vue";
import {useRouter} from "vue-router";
import { useToast } from "vue-toastification"

const toast = useToast()
const router = useRouter()
const form =reactive({
  name: null,
  email:null,
  password: null,
  password_confirmation: null

})

const errors = reactive({
  name: null,
  email:null,
  password: null,
  password_confirmation: null
})

async function initErrors(){
  errors.name = null
  errors.email = null
  errors.password = null
  errors.password_confirmation = null
}

async function checkForm() {
  await initErrors()
  if (form.name.length <3) {
    errors.name = 'Name must be at least 3 characters'
  }
  if (form.password.length < 8) {
    errors.password = 'Password must be at least 8 characters'
    return false
  }
  if (form.password !== form.password_confirmation){
    errors.password_confirmation = 'Password confirmation does not match'
    return false
  }
  const regex = new RegExp('^.*(?=.{8,})(?=.*[a-z])(?=.*\\d)(?=.*[A-Z])(?=.*[@#$%^&+=]).*$')
  if (!regex.test(form.password)){
    errors.password = 'Password must be at least 8 characters, contain at least one lowercase letter, one uppercase letter, one number and one special character'
    return false
  }
  // document.cookie
  const data = await AUTH.signup(form)
  toast.success("You have successfully registered, please check your email activation link")
  await router.push({name: 'login'})
}
</script>

<template>
  <div class="grid grid-cols-1">
    <div id="email" >
      <form @submit.prevent="checkForm">
        <div class="flex flex-col">
          <label for="name" class="font-bold text-lg py-2">Full name</label>
          <input v-model="form.name" required id="name" class="text-4xl px-4 py-2 border border-gray-400 rounded-xl " type="text" placeholder="ex: Ekman Hsieh">
          <div v-if="errors.name" class="text-sm text-red-700 text-gray-400 my-2">{{ errors.name }}</div>
        </div>
        <div class="flex flex-col">
          <label for="email" class="font-bold text-lg py-2">Email</label>
          <input v-model="form.email" required id="email" class="text-4xl px-4 py-2 border border-gray-400 rounded-xl " type="email" placeholder="ex: user@example.com">
        </div>
        <div class="flex flex-col mt-2">
          <label for="password" class="font-bold text-lg py-2">Password</label>
          <input v-model="form.password" required id="password" class="text-4xl px-4 py-2 border border-gray-400 rounded-xl " type="password" placeholder="your password">
          <div v-if="!errors.password" class="text-sm text-gray-400 my-2">at last 1 lowercase, 1 uppercase, 1 digit, and 1 special characters, length more than 8</div>
          <div v-else class="text-sm text-red-700 text-gray-400 my-2">{{ errors.password }}</div>
        </div>
        <div class="flex flex-col mt-2">
          <label for="password_confirmation" class="font-bold text-lg py-2">Re-enter password</label>
          <input v-model="form.password_confirmation" required id="password_confirmation" class="text-4xl px-4 py-2 border border-gray-400 rounded-xl " type="password" placeholder="confirm password">
          <div v-if="errors.password_confirmation" class="text-sm text-red-700 text-gray-400 my-2">{{ errors.password_confirmation }}</div>
        </div>
        <div class="flex justify-center mt-4">
          <input type="submit" class="text-4xl bg-gray-400 hover:bg-gray-700 w-full rounded-xl px-4 py-4 text-white cursor-pointer" value="signup">
        </div>
      </form>
    </div>
    <div class="flex justify-center mt-2">
      <router-link class="text-lg" :to="{name: 'login'}">
        login
      </router-link>
    </div>
  </div>
</template>