<template>
  <div class="d-inline">
    <b-button variant="outline-light" size="sm" class="ml-2" @click="modalShow = !modalShow">＋</b-button>

    <b-modal id="create_group_modal" v-model="modalShow" hide-footer title="チャンネルを作成する" @show="resetModal" @hidden="resetModal">
      <b-form @submit.prevent="onSubmit">
        <b-form-group id="input-group-1" label="名前" label-for="input-1">
          <b-form-input id="input-1" v-model="group.name" required placeholder="グループ名を入力"></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="招待の送信先" label-for="input-2">
          <ul class="list-inline">
            <li class="list-inline-item mb-1" v-for="user in new_users" :key="user.id">
              <b-button variant="light" size="sm">
                <span class="mr-2">{{ user.name }}</span>
                <span @click="removeUser(user)">×</span>
              </b-button>
            </li>
          </ul>

          <b-form-input v-model="input" placeholder="名前で検索する" @input="searchUsers"></b-form-input>
          
          <b-list-group>
            <b-list-group-item button v-for="user in match_users" :key="user.id" @click="addUser(user)">
              {{user.name}}
            </b-list-group-item>
          </b-list-group>
        </b-form-group>

        <b-button type="submit" variant="primary">作成</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        modalShow: false,
        group: {
          name: '',
          user_ids: []
        },
        input: '',
        new_users: [],
        match_users: []
      }
    },
    methods: {
      onSubmit: function() {
        axios
          .post('/api/groups', {
            group: this.group,
          })
          .then(response => {
            this.$bvModal.hide('create_group_modal')
            this.$router.push({path: `/groups/${response.data.id}/messages`})
          })
          .catch(error => {
            console.error(error);
            if (error.response.data && error.response.data.errors) {
              this.errors = error.response.data.errors;
            }
          });
      },
      searchUsers: function() {
        axios
          .get('api/search_users', {
            params: {
              keyword: this.input,
              user_ids: this.group.user_ids
            }
          })
          .then(response => (this.match_users = response.data))
      },
      addUser: function(user) {
        this.group.user_ids.push(user.id)
        this.new_users.push(user)
        this.input = ''
        this.match_users = []
      },
      removeUser: function(removeUser) {
        this.group.user_ids = this.group.user_ids.filter(function(user_id) {
          return user_id !== removeUser.id
        })

        this.new_users = this.new_users.filter(function(user) {
          return user !== removeUser
        })
      },
      resetModal: function() {
        this.group = {
          name: '',
          user_ids: []
        }
        this.input = '',
        this.new_users = [],
        this.match_users = []
      }
    }
  }
</script>