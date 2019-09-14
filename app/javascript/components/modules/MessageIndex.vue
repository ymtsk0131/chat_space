<template>
  <div  id="app">
    <div id="message_area" class="p-2" style="height:100vh; overflow-y: auto;">
      <ul>
        <li v-for="m in messages" :key="m.id">
          <span style="font-weight:700;">{{ m.user.name }}</span>
          <span style="color:#888; font-size:80%;">{{ m.created_at }}</span><br />
          <span style="white-space:pre-wrap; word-wrap:break-word;">{{ m.content }}</span> 
        </li>
      </ul>
    </div>

    <div class="message_form p-2">
      <form class="form-inline" @submit.prevent="createMessage">
        <div class="form-group mr-2">
          <textarea v-model="message.content" class="form-control" placeholder="メッセージを入力" rows="1"></textarea>
        </div>
        <button class="btn btn-primary" type="submit">送信</button>
      </form>
    </div>
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
    this.getMessages()
  },
  watch: {
    messages: function(newValue) {
        this.scrollToEnd()
    },
    '$route' (to, from) {
      this.getMessages()
    }
  },
  methods: {
    getMessages: function() {
      axios
        .get(`/api/groups/${this.$route.params.id}/messages.json`)
        .then(response => (this.messages = response.data))
    },
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
    },
    scrollToEnd: function() {
      this.$nextTick(() => {
        var container = this.$el.querySelector("#message_area");
        container.scrollTop = container.scrollHeight;
      })
    }
  }
}
</script>

<style scoped>
  li {
    margin-bottom: 5px;
  }
  #message_area {
    margin:87px 0 54px;
  }
  .message_form {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #fff;
  }
</style>