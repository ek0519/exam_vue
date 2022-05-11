<script setup>
import Statistics from '@c/Statistics.vue'
import UserList from '@c/UserList.vue'
import {onMounted, ref} from "vue";
import {USER, AUTH} from '@/api'
import {useUserStore} from '@/stores/UserStore'
import {useToast} from "vue-toastification"

const users = ref([])
const toast = useToast()
const store = useUserStore()
const countDown = ref(0)
const timer = ref(null)

async function getUsers() {
  const data = await USER.getUsers()
  users.value = data
}

async function startTimer(duration) {
  countDown.value = duration
  timer.value = setInterval(() => {
    countDown.value--
    if (countDown.value === 0) {
      clearTimer()
    }
  }, 1000)
}

async function clearTimer() {
  clearInterval(timer.value)
}

async function verifyMail() {
  await AUTH.verify()
  toast.success('Verification email sent')
  await startTimer(30)
}

onMounted(async () => {
  if (store.user.is_verify) {
    await getUsers()
  }
})
</script>

<template>
  <div v-if="store.user.is_verify">
    <div class="mt-4">
      <iframe src="https://ek0519.retool.com/embedded/public/a18ff4bb-8716-4eb1-994d-9d41b185b6ba" width="100%" height="800px"></iframe>
    </div>
    <!--        <UserList-->
    <!--        v-if="store.user.is_verify"-->
    <!--        :users="users"-->
    <!--    />-->
  </div>
  <div v-else>
    <div class="flex flex-col text-gray-700 text-4xl justify-center items-center mt-40 px-1">
      Please verify your email address.
      <button
          class="hover:bg-black text-white text-3xl px-4 py-2 rounded-xl mt-4"
          :class="{ 'cursor-not-allowed': countDown> 0, 'bg-gray-700': countDown === 0, 'bg-gray-400': countDown > 0 }"
          @click="verifyMail"
          :disabled="countDown> 0"
      >{{ countDown > 0 ? `check your mail (${countDown})` : 'Verify Email' }}
      </button>
    </div>
  </div>
</template>