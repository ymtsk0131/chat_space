<template>
  <div  id="app">
    <h2>#{{ group.name }}</h2>
    メンバー： {{ group.users.length }}
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data: function () {
    return {
      group: {},
    }
  },
  mounted () {
    axios
      .get(`/api/groups/${this.$route.params.id}.json`)
      .then(response => (this.group = response.data))
  }
}
</script>

<style scoped>
  li {
    margin-bottom: 5px;
  }
</style>