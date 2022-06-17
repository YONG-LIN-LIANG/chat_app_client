<script setup>
import CSLogo from "@/components/svg/Logo.vue";
import { useSocketStore } from "@/stores/socket";
import { useCsStore } from "@/stores/cs";
import { reactive, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const socketStore = useSocketStore();
const csStore = useCsStore();
const { socket } = socketStore;
onBeforeMount(() => {
  socket.on("resLogin", (data) => {
    const { identity, status } = data;
    if (identity !== 1) return;
    else {
      if (status === 201) {
        // 登入成功
        console.log("loginData", data);
        csStore.setCs({
          uuid: data.uuid,
          socketId: data.socketId,
          name: data.name,
        });
        csStore.setRoomList(data.roomList);
        router.push({ name: "csRoom" });
      } else {
        // 帳號密碼錯誤
        console.log("loginFail", data);
      }
    }
  });
  socket.on("resLogout", (data) => {
    const { identity } = data;
    if (identity === 1) {
      console.log("this is..", identity);
      // 推回登入頁
      router.push({ name: "login" });
      // 把客服人員個人資料清空
      csStore.setCs({});
    }
  });
});
const form = reactive({
  account: "",
  password: "",
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
    <div class="w-60 mt-6 mb-10 flex flex-col">
      <div class="w-full flex flex-col items-start mb-2.5">
        <label for="" class="text-sm text-gray-2 m-1.5"> 帳號 </label>
        <input v-model="form.account" type="text" class="w-full" />
      </div>
      <div class="flex flex-col items-start mb-2.5">
        <label for="" class="text-sm text-gray-2 m-1.5"> 密碼 </label>
        <input v-model="form.password" type="text" class="w-full" />
      </div>
    </div>
    <div>{{ form.errorMessage }}</div>
    <div @click="handleLogin" class="btn_primary--green">登入</div>
  </div>
</template>

<style></style>
