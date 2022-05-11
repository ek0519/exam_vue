<script>
export default {
  name: 'AdminBase',
  data() {
    return {
      //
    }
  },
  methods: {
    //
  },

}
</script>

<template>
  <main class="bg-gray-100 flex justify-center items-center h-screen  ">
    <div class="w-full sm:w-fit px-4 sm:px-0">
      <router-view/>
    </div>
  </main>
</template>