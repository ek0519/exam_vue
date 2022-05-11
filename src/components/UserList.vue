<script setup>
import dayjs from 'dayjs'
const props = defineProps({
  users: {
    type: Array,
    required: true
  }
})

function dateFormat(date) {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
}


</script>

<template>
  <table class="w-full">
    <tr>
      <th>#</th>
      <th>Create time</th>
      <th>Name</th>
      <th>Email</th>
      <th>Verify</th>
      <th>Login times</th>
      <th>Last login</th>
    </tr>
    <template v-for="user in users">
      <tr class="text-center border border-t-gray-300 hover:bg-gray-600 hover:text-white">
        <td>{{ user.id }}</td>
        <td>{{ dateFormat(user.created_at) }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td> {{ user.is_verify ? '✅' : '❌' }}</td>
        <td>{{ user.login_time }}</td>
        <td>{{ dateFormat(user.last_login_at) }}</td>
      </tr>
    </template>
  </table>
</template>


<style lang="scss">
th,td {
  @apply py-2
}
</style>