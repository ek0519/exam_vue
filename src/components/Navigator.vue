<script setup>
import {useUserStore} from "@/stores/UserStore";
import { useRouter, useRoute } from "vue-router"
import {computed} from "vue";

const store = useUserStore()
const router = useRouter()
const route = useRoute()

const showPrevious = computed(() => {
  return route.name !== "home"
  })

async function logout() {
  await store.logout()
  window.location.href = "/login"
}

</script>

<template>
  <nav class="flex w-full justify-between items-center px-4 md:px-0">
    <div>
      <router-link v-show="showPrevious" :to="{name:'home'}" class="bg-green-400 hover:bg-green-700 text-white text-3xl rounded-xl px-4 py-2">Back</router-link>
    </div>
    <div class="grid grid-cols-2 gap-2">
      <router-link
          :to="{name:'profile'}"
          class="hover:bg-gray-700 text-white text-3xl rounded-xl px-4 py-2"
          :class="{'bg-gray-400': route.name !== 'profile', 'bg-gray-700': route.name === 'profile'}"
      >Profile
      </router-link>
      <button @click="logout" class="bg-rose-400 hover:bg-rose-700 text-white text-3xl rounded-xl px-4 py-2">logout</button>

    </div>
  </nav>
</template>