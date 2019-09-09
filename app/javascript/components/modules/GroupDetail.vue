<template>
  <div  id="app" class="group_detail border-bottom p-2">
    <h3>#{{ group.name }}</h3>
    <div class="group_info">
      メンバー： {{ group.users.length }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data: function () {
    return {
      group: {
        users: {}
      },
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
  .group_detail {
    position: fixed;
    top: 0;
    width: 100vw;
    background-color: #fff; 
  }
  .group_info {
    font-size: 80%;
    color: #888;
  }
</style>