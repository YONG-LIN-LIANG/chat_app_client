<script setup>
import { RouterView } from "vue-router";
import { useSocketStore } from "@/stores/socket";
import { useClientStore } from "@/stores/client";

const clientStore = useClientStore();
import { io } from "socket.io-client";
const endPoint = "http://172.18.48.177:3001";
const socket = io(endPoint);
const socketStore = useSocketStore();
socketStore.setSocket(socket);

// 重整時呼叫socket檢查userInfo是否存在，有的話把socketId更新，並返回新的object，
// 用網站路徑來判斷目前是Cs還是client進行操作

// if (route.name.includes("Cs")) {
console.log("client data2", clientStore.client);

// 要再修
// socket.emit("reqCsUser");
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
// }
</script>
<template>
  <RouterView />
</template>
