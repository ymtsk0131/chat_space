<template>
  <div id="app">
    <SideMenu />
    <div id="content">
      <GroupDetail />
      <MessageIndex />
    </div>
  </div>
</template>

<script>
import SideMenu from 'components/modules/SideMenu.vue'
import GroupDetail from "components/modules/GroupDetail.vue";
import MessageIndex from "components/modules/MessageIndex.vue";

export default {
  components: { SideMenu, GroupDetail, MessageIndex }
};
</script>

<style scoped>
#content {
  margin-left: 250px;
  width: calc(100vw - 250px);
  min-height: 100vh;
}
</style>