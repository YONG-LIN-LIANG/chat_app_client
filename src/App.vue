<script setup>
import { RouterView } from "vue-router";
import { useSocketStore } from "@/stores/socket";
const socketIp = import.meta.env.VITE_SOCKET_URL;

const endPoint = socketIp;
import { io } from "socket.io-client";
const socket = io(endPoint);
const socketStore = useSocketStore();
socketStore.setSocket(socket);
console.log("data2", socket);
</script>
<template>
  <RouterView />
</template>
