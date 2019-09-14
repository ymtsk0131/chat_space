<template>
  <div id="side_menu">
    <div class="hover_item p-2 mb-3">
      <div id="sidemenu_title" class="font-weight-bold text-white">Chat Space</div>
      <div>test taro</div>
    </div>
    <div class="mb-3">
      <div class="font-weight-bold pl-2">チャンネル</div>
      <ul class>
        <router-link v-for="g in groups" :key="g.id" :to="{ name: 'GroupMessages', params: { id: g.id } }" class="text-reset">
          <li class="hover_item pl-2 py-1"># {{ g.name }}</li>
        </router-link>
      </ul>
    </div>
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
  #side_menu {
    background-color: #3E0E40;
    color: rgb(207,195,207);
    height: 100vh;
    width: 250px;
    position: fixed;
    top: 0;
    left: 0;
  }

  #sidemenu_title {
    font-size: 18px;
  }

  .hover_item:hover {
    background-color: #340b36;
    color: #fff;
  }
</style>