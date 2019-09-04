<template>
  <div id="app">
    <GroupDetail />
    <MessageIndex />
  </div>
</template>

<script>
import GroupDetail from "components/modules/GroupDetail.vue";
import MessageIndex from "components/modules/MessageIndex.vue";

export default {
  components: { GroupDetail, MessageIndex }
};
</script>

<style scoped>
</style>