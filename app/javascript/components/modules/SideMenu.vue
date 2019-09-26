<template>
  <div id="side_menu">
    <div class="hover_item p-2 mb-3">
      <form method="post" action="/users/sign_out" class="d-inline float-right">
        <input type="hidden" name="authenticity_token" v-model="token">
        <input type="hidden" name="_method" value="DELETE">
        <input type="submit" value="Sign out" class="btn btn-sm btn-sidemenu">
      </form>
      <div id="sidemenu_title" class="font-weight-bold text-white">Chat Space</div>
      <div>{{ user.name }}</div>
    </div>
    <div class="mb-3">
      <div class="font-weight-bold pl-2">
        チャンネル
        <CreateGroupModal />
      </div>
      <ul class>
        <router-link v-for="g in user.groups" :key="g.id" :to="{ name: 'GroupMessages', params: { id: g.id } }" class="text-reset">
          <li class="hover_item pl-2 py-1"># {{ g.name }}</li>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import CreateGroupModal from "components/modals/CreateGroupModal.vue";

import axios from 'axios';

const token = document.getElementsByName('csrf-token')[0].getAttribute('content')

export default {
  data: function () {
    return {
      user: [],
      token: token
    }
  },
  mounted () {
    axios
      .get('/api/users.json')
      .then(response => (this.user = response.data))
  },
  components: { CreateGroupModal }
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

  .btn-sidemenu {
    background-color: #3E0E40;
    color: rgb(207,195,207);
    border-color: rgb(207,195,207);
  }
  .btn-sidemenu:hover {
    color: #fff;
    border-color: #fff;
  }
</style>