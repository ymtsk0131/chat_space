<template>
  <div  id="app">
    <ul>
      <li v-for="m in messages" :key="m.id">
        {{ m.user.name }} {{ m.created_at }}<br />
        <span style="white-space:pre-wrap; word-wrap:break-word;">{{ m.content }}</span> 
      </li>
    </ul>

    <form @submit.prevent="createMessage">
      <textarea v-model="message.content" placeholder="メッセージを入力"></textarea>
      <button type="submit">送信</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

const token = document.getElementsByName('csrf-token')[0].getAttribute('content')
axios.defaults.headers.common['X-CSRF-Token'] = token

export default {
  data: function () {
    return {
      messages: {},
      message: {
        content: '',
      }
    }
  },
  mounted () {
    axios
      .get(`/api/groups/${this.$route.params.id}/messages.json`)
      .then(response => (this.messages = response.data))
  },
  methods: {
    createMessage: function() {
      axios
        .post(`/api/groups/${this.$route.params.id}/messages`, this.message)
        .then(response => {
          let message = response.data;
          this.messages.push(message)
          this.message.content = ''
        })
        .catch(error => {
          console.error(error);
          if (error.response.data && error.response.data.errors) {
            this.errors = error.response.data.errors;
          }
        });
    }
  }
}
</script>

<style scoped>
  li {
    margin-bottom: 5px;
  }
</style>