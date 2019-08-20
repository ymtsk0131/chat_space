<template>
  <ul id="app">
    <li v-for="m in messages" :key="m.id">
        {{ m.user.name }} {{ m.created_at }}<br />
        {{ m.content }} 
    </li>
  </ul>
</template>

<script>
import axios from 'axios';

export default {
  data: function () {
    return {
      messages: {}
    }
  },
  mounted () {
    axios
      .get(`/api/groups/${this.$route.params.id}/messages.json`)
      .then(response => (this.messages = response.data))
  }
}
</script>

<style scoped>
</style>