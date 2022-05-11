<template>
  <main class="bg-gray-100 flex justify-center h-screen ">
    <div class="w-full container ">
      <div class="mt-8">
        <Navigator/>
      </div>
      <router-view/>
    </div>
  </main>
</template>


<script>
import Navigator from '@c/Navigator.vue'

export default {
  name: 'AdminBase',
  components: {
    Navigator
  },
  data () {
    return {
      //
    }
  },
  methods: {
    //
  }
}
</script>