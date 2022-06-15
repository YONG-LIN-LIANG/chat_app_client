<script>
import CSLogo from "@/components/svg/Logo.vue";
import { reactive } from "vue";
export default {
  components: {
    CSLogo,
  },
  setup() {
    const form = reactive({
      account: "",
      password: "",
    });

    function handleLogin() {
      console.log(form);
    }
    return { form, handleLogin };
  },
};
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
    <div @click="handleLogin" class="btn_primary--green">登入</div>
  </div>
</template>

<style></style>
