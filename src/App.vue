<script setup>
import { RouterView } from "vue-router";
// import { useSocketStore } from '@/stores/socket'
// import { useCsStore } from "@/stores/cs";
// import { useRouter, useRoute } from "vue-router";
// const router = useRouter();
// const route = useRoute();
// import { io } from 'socket.io-client'
// const endPoint = 'http://172.18.48.177:3001'
// const socket = io(endPoint)
// const socketStore = useSocketStore()
// const csStore = useCsStore()
// socketStore.setSocket(socket)

// 重整時呼叫socket檢查userInfo是否存在，有的話把socketId更新，並返回新的object，
// socket.emit('reqCsUser')
// socket.on("resCsUser", (data) => {
//   if (data === null) return;
//   console.log("new user data", data);
//   const { status, userInfo } = data;
//   if (status === 200) {
//     csStore.setCs(userInfo);
//     if (route.name === "login") {
//       router.push({ name: "csRoom" });
//     }
//   } else {
//     router.push({ name: "login" });
//   }
// });
</script>
<template>
  <RouterView />
</template>
