<template>
  <ul id="app">
    <li v-for="m in messages" :key="m.id">
      {{ m.name }}: {{ m.content }} {{ m.created_at }}
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