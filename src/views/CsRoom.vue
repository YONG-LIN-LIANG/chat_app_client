<script>
import Sidebar from "@/components/csRoom/Sidebar.vue";

export default {
  name: "csRoom",
  components: {
    Sidebar,
  },
};
</script>

<template>
  <Sidebar />
  <router-view></router-view>
</template>

<style scoped></style>
