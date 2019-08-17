<template>
  <div>aaa</div>
</template>

<script>
import axios from 'axios';

export default {
  data: function () {
    return {
      messages: {}
    }
  },
  mounted () {
    axios
      .get(`/api/groups/${this.$route.params.id}/messages.json`)
      .then(response => (this.messages = response.data))
  }
}
</script>

<style scoped>
</style>