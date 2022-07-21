<script setup>
import CSLogo from "@/components/svg/Logo.vue";
import { useSocketStore } from "@/stores/socket";
import { usecsRoomStore } from '@/stores/csRoom';
import { reactive, onBeforeMount } from "vue";
import { useRouter } from "vue-router";

const socketStore = useSocketStore();
const csRoom = usecsRoomStore();
const router = useRouter();

const { socket } = socketStore;
onBeforeMount(() => {
  socket.on("resLogin", (data) => {
    const { status } = data;
    if (status === 200) {
      // 導頁到csRome
      alert("登入成功");
      // console.log("login successfully", data);
      Object.assign(csRoom.cs, data.cs_info)
      Object.assign(csRoom.userList, data.user_list)
      // 切換到登入後訊息路由 csRoom/msg
      router.push('/csRoom/msg')
    } else {
      // 顯示登入失敗訊息
      alert("帳號密碼有誤");
    }
  });
});

const form = reactive({
  account: "aa12345",
  password: "aa12345",
  errorMessage: "",
});
function handleLogin() {
  if (!form.account || !form.password) {
    form.errorMessage = "欄位不能為空";
    return;
  }
  form.errorMessage = "";
  const socketData = {
    identity: 1,
    account: form.account,
    password: form.password,
  };
  // console.log("ttt", socketData);
  socket.emit("reqLogin", socketData);
 
}
</script>

<template>
  <div
    class="login_section min-h-screen pb-40 pt-10 flex flex-col items-center justify-center bg-green-w20"
  >
    <div class="login_title flex flex-col items-center">
      <CSLogo />
      <span class="mt-3 text-green-b50 text-lg">客服平台 登入</span>
    </div>
    <div class="w-60 mt-6 mb-8 flex flex-col">
      <div class="w-full flex flex-col items-start mb-2.5">
        <label for="" class="text-sm text-gray-2 m-1.5"> 帳號 </label>
        <input v-model="form.account" type="text" class="w-full" />
      </div>
      <div class="flex flex-col items-start mb-2.5">
        <label for="" class="text-sm text-gray-2 m-1.5"> 密碼 </label>
        <input v-model="form.password" type="text" class="w-full" />
      </div>
    </div>
    <div class="h-6 mb-6 text-red">{{ form.errorMessage }}</div>
    <div @click="handleLogin" class="btn_primary--green">登入</div>
  </div>
</template>

<style></style>
