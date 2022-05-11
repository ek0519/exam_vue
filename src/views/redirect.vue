<script setup>
import {useRoute, useRouter} from "vue-router";
import {onMounted} from "vue";

const route = useRoute()
const router = useRouter()

onMounted(() => {
  console.log('route', route)

  if (route.query.redirect_url) {
    router.push({path: route.query.redirect_url})
  }
})
</script>


<template>
test
</template>