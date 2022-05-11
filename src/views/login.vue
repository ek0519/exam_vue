<script setup>
import {AUTH} from '@/api'
import {reactive} from "vue";
import {useRouter} from "vue-router";
import {initFacebook} from "@/plugins/fb.js"
import {useUserStore} from "@/stores/UserStore";


const store = useUserStore()

const BASE_URL = import.meta.env.VITE_APP_BASE_API

initFacebook()

const router = useRouter()
const form = reactive({
  email: null,
  password: null,
})


const errors = reactive({
  email: null,
  password: null
})

async function initErrors() {
  errors.email = null
  errors.password = null
}


async function checkForm() {
  await initErrors()
  if (form.password.length < 8) {
    errors.password = 'Password must be at least 8 characters'
    return false
  }
  const regex = new RegExp('^.*(?=.{8,})(?=.*[a-z])(?=.*\\d)(?=.*[A-Z])(?=.*[@#$%^&+=]).*$')
  if (!regex.test(form.password)) {
    errors.password = 'Password must be at least 8 characters, contain at least one lowercase letter, one uppercase letter, one number and one special character'
    return false
  }
  const formData = new FormData()
  formData.append('username', form.email)
  formData.append('password', form.password)
  try {
    await store.login(formData)
    await router.push({name: 'home'})
  } catch (e) {
    console.log(e)
  }
}


async function googleLogin(response) {
  console.log(response)

}

async function fbLogin() {
  FB.getLoginStatus(response => {
    FB.login(response => {
      console.log(response)
      AUTH.facebook(response.authResponse.accessToken)
          .then(data => {
            store.setUser(data)
            router.push({name: 'home'})
          })
    }, {scope: 'public_profile,email'});
  });
}


let external = document.createElement('script')
external.setAttribute('src', 'https://accounts.google.com/gsi/client')
document.head.appendChild(external)


</script>

<template>
  <div class="grid grid-cols-1">
    <div id="facebook">
      <button @click="fbLogin" class="text-4xl bg-blue-400 hover:bg-blue-700 rounded-xl px-4 py-4 text-gray-50 w-full">
        continue with facebook
      </button>
    </div>
    <div class="mt-4">
      <div id="g_id_onload"
           data-client_id="799493047656-ilpc61jsjllm3ssotj5vpie1hq9kudqa.apps.googleusercontent.com"
           :data-login_uri="`${BASE_URL}/api/auth/google`"
           data-auto_prompt="false">
      </div>
      <button
          class="g_id_signin text-4xl bg-orange-400 hover:bg-orange-700 rounded-xl px-4 py-4 text-gray-50 w-full">
        continue with
        google
      </button>
    </div>
    <div class="my-4">
      <div class="text-center text-3xl">OR</div>
    </div>
    <div id="email">
      <form
          @submit.prevent="checkForm">
        <div class="flex flex-col">
          <label for="email" class="font-bold text-lg py-2">Email</label>
          <input v-model="form.email" required id="email" class="text-4xl px-4 py-2 border border-gray-400 rounded-xl "
                 type="email" placeholder="ex: user@example.com">
        </div>
        <div class="flex flex-col mt-2">
          <label for="password" class="font-bold text-lg py-2">Password</label>
          <input v-model="form.password" required id="password"
                 class="text-4xl px-4 py-2 border border-gray-400 rounded-xl " type="password"
                 placeholder="your password">
          <div v-if="!errors.password" class="text-sm text-gray-400 my-2">at last 1 lowercase, 1 uppercase, 1 digit, and
            1 special characters, length more than 8
          </div>
          <div v-else class="text-sm text-red-700 text-gray-400 my-2">{{ errors.password }}</div>
        </div>
        <div class="flex justify-center mt-4">
          <input type="submit"
                 class="text-4xl bg-gray-400 hover:bg-gray-700 w-full rounded-xl px-4 py-4 text-white cursor-pointer"
                 value="login">
        </div>
      </form>
    </div>
    <div class="flex justify-between mt-2">
      <div class="text-lg">forgot password</div>
      <router-link class="text-lg" :to="{name: 'signup'}">
        sign up
      </router-link>
    </div>
  </div>
</template>