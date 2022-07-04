<script setup>
import { ref } from "vue";
import SendIcon from "@/components/svg/Send.vue";
import { useCsRoomStore } from "@/stores/csRoom";
const CsRoom = useCsRoomStore();

let inputValue = ref("");

const inputSend = async () => {
  CsRoom.chatSectionDom.scrollTop = await CsRoom.chatSectionDom.scrollHeight;
};
</script>

<template>
  <div
    class="send_section w-full h-16 flex items-center px-7 py-0 shadow-layer3Re"
  >
    <input
      v-model="inputValue"
      type="text"
      class="w-full h-10 send_input box-border px-2 py-0 m-2.5"
    />
    <SendIcon
      @click="
        CsRoom.handleMsgSend(inputValue);
        inputValue = '';
        inputSend();
      "
      class="cursor-pointer text-orange-Default hover:text-orange-b90 m-2.5"
    />
  </div>
</template>

<style scoped></style>
