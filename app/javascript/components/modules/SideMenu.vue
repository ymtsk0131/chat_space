<template>
  <div id="sidebar" class="p-2">
    <h3>Chat Space</h3>
    <h5>チャンネル</h5>
    <ul class="group_list">
      <router-link v-for="g in groups" :key="g.id" :to="{ name: 'GroupMessages', params: { id: g.id } }">
        <li># {{ g.name }}</li>
      </router-link>
    </ul>
  </div>
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
  #sidebar {
    background-color: #3E0E40;
    color: #fff!important;
    height: 100vh;
    width: 250px;
    position: fixed;
    top: 0;
    left: 0;
  }
</style>