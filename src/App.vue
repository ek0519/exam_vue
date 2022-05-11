<template>
  <component :is="authRoutes.includes($route.name) ? 'AuthBase' : 'AdminBase'" />
</template>


<script>
import AdminBase from "./views/Base/AdminBase.vue"
import AuthBase from "./views/Base/AuthBase.vue"
import {ref} from "vue";

const authRoutes = ref(['login', 'signup'])
export default {
  name: 'App',
  setup() {
    return {
      authRoutes
    }
  },
  components: {
    AdminBase,
    AuthBase
  }
}
</script>
<style>

</style>
