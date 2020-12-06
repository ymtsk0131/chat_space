<template>
  <div  id="app" class="group_detail border-bottom p-2">
    <div class="raw">
      <div class="group_name">
        #{{ group.name }}
      </div>
      <div class="group_info">
        メンバー： {{ group.users.length }}
      </div>
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
    this.getGroupDetail()
  },
  watch: {
    '$route' (to, from) {
      this.getGroupDetail()
    }
  },
  methods: {
    getGroupDetail: function() {
      axios
        .get(`/api/groups/${this.$route.params.id}.json`)
        .then(response => (this.group = response.data))
    }
  }
}
</script>

<style scoped>
  .group_detail {
    position: fixed;
    top: 0;
    width: 100%;
    background-color: #fff; 
  }
  .group_name {
    font-weight:600;
  }
  .group_info {
    font-size: 80%;
    color: #888;
  }
</style>