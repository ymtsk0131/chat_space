<template>
  <ul id="app">
    <li v-for="g in groups" :key="g.id">
      {{ g.name }}
    </li>
  </ul>
</template>

<script>
import axios from 'axios';

export default {
  data: function () {
    return {
      groups: []
    }
  },
  mounted () {
    axios
      .get('/api/groups.json')
      .then(response => (this.groups = response.data))
  }
}
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>