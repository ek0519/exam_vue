<script setup>
import {USER} from '@/api'
import {onMounted, reactive, ref} from "vue"
import {useRouter, useRoute} from "vue-router"
import { useToast } from "vue-toastification"
import { useUserStore } from "@/stores/UserStore.js"

const toast = useToast()
const router = useRouter()
const route = useRoute()
const store = useUserStore()
const tab = ref('info')

const form =reactive({
  old_password:null,
  new_password: null,
  new_password_confirmation: null
})

const userForm = reactive({
  name: null,
})

const errors = reactive({
  old_password: null,
  new_password: null,
  new_password_confirmation: null
})

async function initErrors(){
  errors.old_password = null
  errors.new_password = null
  errors.new_password_confirmation = null
}

async function initResetPasswordForm(){
  form.old_password = null
  form.new_password = null
  form.new_password_confirmation = null
}

function changeTab(item){
  tab.value = item
}

function currentTabClass(item){
  return tab.value === item ? ['border-2','px-4' ,'py-2' ,'rounded-t'] : ['bg-gray-700', 'text-white' ,'px-4' ,'py-2' ,'rounded-t']
}

async function checkUser(){
  if(userForm.name === store.user.name){
    toast.info('Your name was not changed')
    return
  }
  const data = await USER.updateUserName(userForm)
  toast.success("Name was changed!")
  store.setUser(data)
  await initResetPasswordForm()
}

async function checkForm() {
  const regex = new RegExp('^.*(?=.{8,})(?=.*[a-z])(?=.*\\d)(?=.*[A-Z])(?=.*[@#$%^&+=]).*$')
  await initErrors()
  if (form.old_password.length < 8) {
    errors.old_password = 'Password must be at least 8 characters'
    return false
  }
  if (!regex.test(form.old_password)){
    errors.old_password = 'Password must be at least 8 characters, contain at least one lowercase letter, one uppercase letter, one number and one special character'
    return false
  }
  if (form.new_password.length < 8) {
    errors.new_password = 'New password must be at least 8 characters'
    return false
  }
  if (!regex.test(form.new_password)){
    errors.new_password = 'Password must be at least 8 characters, contain at least one lowercase letter, one uppercase letter, one number and one special character'
    return false
  }
  if (form.new_password !== form.new_password_confirmation){
    errors.new_password_confirmation = 'new Password confirmation does not match'
    return false
  }

  if (!errors.length){
    console.log(form)
    const data = await USER.resetPassword(form)
    store.setUser(data)
    toast.success("successfully reset password")
    await initResetPasswordForm()
  }
}

onMounted(() => {
  userForm.name = store.user.name
})

</script>

<template>
  <div class=" flex flex-col justify-center  sm:mx-auto px-4  max-w-[800px]">
    <tab class="grid grid-cols-2 gap-0 justify-center mt-4">
      <div class="text-center border-b-0"
           :class="currentTabClass('info')"
      >
        <button class="text-lg sm:text-3xl" @click="changeTab('info')">Information</button>
      </div>
      <div class="text-center border-b-0"
           :class="currentTabClass('reset')"
      >
        <button class="text-lg sm:text-3xl"  @click="changeTab('reset')">Reset password</button>
      </div>
    </tab>
    <div class="border-2 border-t-0" v-if="tab === 'info'">
      <form class="px-2 py-2 rounded-2xl" @submit.prevent="checkUser">
        <div class="flex flex-col">
          <label class="font-bold text-lg py-2">Email</label>
          <div class="text-4xl px-4 py-2 border border-gray-400 rounded-xl " >{{ store.user.email }}</div>
        </div>
        <div class="flex flex-col mt-2">
          <label for="name" class="font-bold text-lg py-2">Name</label>
          <input  v-model="userForm.name" required id="name" class="text-4xl px-4 py-2 border border-gray-400 rounded-xl " type="text" placeholder="ex: ekman hsieh">
        </div>
        <div class="flex justify-center mt-4">
          <input
              :disabled="store.user.name === userForm.name"
              type="submit"
              :class="store.user.name === userForm.name ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-700'"
              class="text-4xl bg-gray-400 w-full rounded-xl px-4 py-4 text-white cursor-pointer"
              value="update">
        </div>
      </form>
    </div>
    <div class="border-2 border-t-0"  v-else id="reset-password" >
      <form class="px-2 py-2 rounded-2xl" @submit.prevent="checkForm">
        <div class="flex flex-col">
          <label for="old_password" class="font-bold text-lg py-2">Old password</label>
          <input v-model="form.old_password" required id="old_password" class="text-4xl px-4 py-2 border border-gray-400 rounded-xl " type="password" placeholder="current password">
          <div v-if="!errors.old_password" class="text-sm text-gray-400 my-2">at last 1 lowercase, 1 uppercase, 1 digit, and 1 special characters, length more than 8</div>
          <div v-else class="text-sm text-red-700 text-gray-400 my-2">{{ errors.old_password }}</div>
        </div>
        <div class="flex flex-col mt-2">
          <label for="new_password" class="font-bold text-lg py-2">New password</label>
          <input v-model="form.new_password" required id="new_password" class="text-4xl px-4 py-2 border border-gray-400 rounded-xl " type="password" placeholder="new password">
          <div v-if="!errors.new_password" class="text-sm text-gray-400 my-2">at last 1 lowercase, 1 uppercase, 1 digit, and 1 special characters, length more than 8</div>
          <div v-else class="text-sm text-red-700 text-gray-400 my-2">{{ errors.new_password }}</div>
        </div>
        <div class="flex flex-col mt-2">
          <label for="new_password_confirmation" class="font-bold text-lg py-2">Re-enter new password</label>
          <input v-model="form.new_password_confirmation" required id="new_password_confirmation" class="text-4xl px-4 py-2 border border-gray-400 rounded-xl " type="password" placeholder="confirm password">
          <div v-if="errors.new_password_confirmation" class="text-sm text-red-700 text-gray-400 my-2">{{ errors.new_password_confirmation }}</div>
        </div>
        <div class="flex justify-center mt-4">
          <input type="submit" class="text-4xl bg-gray-400 hover:bg-gray-700 w-full rounded-xl px-4 py-4 text-white cursor-pointer" value="update">
        </div>
      </form>

    </div>
  </div>
</template>