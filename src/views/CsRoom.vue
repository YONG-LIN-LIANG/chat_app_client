<script setup>
import Sidebar from "@/components/csRoom/Sidebar.vue";
import { onMounted } from 'vue'
import { usecsRoomStore } from "@/stores/csRoom"
const csRoom = usecsRoomStore()

onMounted(() => {
  window.addEventListener('resize', onWidthChange)
})

const onWidthChange = () => csRoom.windowWidth = window.innerWidth

</script>

<template>
  <Sidebar />
  <router-view></router-view>
</template>

<style scoped></style>
