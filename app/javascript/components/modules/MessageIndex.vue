<template>
  <div  id="app">
    <div id="message_area">
      <div>
        <div class="message p-3" v-for="m in messages" :key="m.id">
          <span style="font-weight:700;">{{ m.user.name }}</span>
          <span style="color:#888; font-size:80%;">{{ m.created_at }}</span><br />
          <span style="white-space:pre-wrap; word-wrap:break-word;">{{ m.content }}</span> 
        </div>
      </div>
    </div>

    <div class="message_form p-3">
      <b-form @submit.prevent="createMessage">
        <b-form-group>
          <b-form-textarea
            id="textarea"
            v-model="message.content"
            placeholder="メッセージを入力"
            rows="2"
            max-rows="4"
          ></b-form-textarea>
        </b-form-group>
        <b-button type="submit" variant="primary">送信</b-button>
      </b-form>
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
      },
      messageChannel: null
    }
  },
  mounted () {
    this.getMessages()
    this.messageChannel = this.$cable.subscriptions.create( "MessageChannel",{
      received: (data) => {
        this.messages.push(data)
      },
    })
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
  #message_area {
    margin:76px 0 148px;
    height:100vh;
    overflow-y: auto;
  }
  .message_form {
    position: fixed;
    bottom: 0;
    width: 75%;
    background-color: #fff;
  }
</style>