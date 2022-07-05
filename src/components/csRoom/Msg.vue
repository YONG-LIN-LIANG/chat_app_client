<script setup>
import { ref, reactive } from "vue";
import MsgTopbar from "@/components/csRoom/MsgTopbar.vue";
import MsgChat from "@/components/csRoom/MsgChat.vue";
import MsgSend from "@/components/csRoom/MsgSend.vue";
import MsgTabbar from "@/components/csRoom/MsgTabbar.vue";
import LeaveModule from "@/components/csRoom/LeaveModule.vue";

import { useCsRoomStore } from "@/stores/csRoom";
const CsRoom = useCsRoomStore()

const chatEnd_closed = ref(true);
const handle_chatEnd_closed = () => {
  chatEnd_closed.value = !chatEnd_closed.value;
};

const tabList = reactive({
  active: 0,
  list: [
    { id: 1, name: "列表", icon: "ChatIcon" },
    { id: 2, name: "搜尋", icon: "SearchIcon" },
    { id: 3, name: "分類", icon: "ListIcon" },
  ],
});
const handletoggleTab = (activeNum)=>{
  tabList.active = activeNum
}
</script>
<template>
  <div class="msg ml-48 lg:ml-36 sm:ml-0">
    <div class="title">訊息</div>
    <div class="flex mt-10 sm:mt-[6.5rem]">
      <div
        :class="['msg_chatBox w-full', tabList.active === 0 ? '' : 'lg:hidden']"
      >
        <MsgTopbar v-if="CsRoom.userActive" @onToggle="handle_chatEnd_closed" />
        <MsgChat />
        <MsgSend v-if="CsRoom.userActive"/>
      </div>
      <MsgTabbar :tabList="tabList" @toggleTab="handletoggleTab" />
      <LeaveModule
        :chatEnd_closed="chatEnd_closed"
        @onToggle="handle_chatEnd_closed"
      />
    </div>
  </div>
</template>

<style></style>
