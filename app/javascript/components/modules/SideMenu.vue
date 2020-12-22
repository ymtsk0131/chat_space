<template>
  <div id="side_menu" class="p-3">
    <div class="hover_item mb-3">
      <b-nav-item-dropdown>
        <template #button-content>
          <span class="font-weight-bold text-white">Chat Space</span>
        </template>
        <b-dropdown-item href="#" @click="modalShow = !modalShow">チャンネルを作成する</b-dropdown-item>
        <b-dropdown-item href="#" @click="signOut">サインアウト</b-dropdown-item>
      </b-nav-item-dropdown>
    </div>
    <div class="mb-3">
      <div class="font-weight-bold">
        チャンネル
        <span class="ml-2" @click="modalShow = !modalShow">＋</span>
      </div>
      <div>
        <router-link v-for="g in user.groups" :key="g.id" :to="{ name: 'GroupMessages', params: { id: g.id } }" class="text-reset">
          <div class="hover_item pl-2 py-1">#　{{ g.name }}</div>
        </router-link>
      </div>
    </div>
    <b-modal id="create_group_modal" v-model="modalShow" hide-footer title="チャンネルを作成する" @show="resetModal" @hidden="resetModal">
      <CreateGroupForm />
    </b-modal>
  </div>
</template>

<script>
import CreateGroupForm from "components/modules/CreateGroupForm.vue";

import axios from 'axios';

const token = document.getElementsByName('csrf-token')[0].getAttribute('content')

export default {
  data: function () {
    return {
      user: [],
      token: token,
      modalShow: false
    }
  },
  methods: {
    resetModal: function() {
      this.group = {
        name: '',
        user_ids: []
      }
      this.input = '',
      this.new_users = [],
      this.match_users = []
    },
    signOut: function() {
      console.log('signout!')
      axios
        .delete('/users/sign_out', {authenticity_token: token, _mehod: 'delete'})
        .then(response => {
          window.location.href = '/'
        })
        .catch(error => {
          window.location.href = '/'
        });
    }
  },
  mounted () {
    axios
      .get('/api/users.json')
      .then(response => (this.user = response.data))
  },
  components: { CreateGroupForm }
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