<script setup>
import SendIcon from "@/components/svg/Send.vue";
import { ref, defineEmits } from "vue";
const message = ref("");
const emit = defineEmits(["onSendMessage"]);

const handleSendMessage = () => {
  if (!message.value) return;
  emit("onSendMessage", { status: 2, content: message.value });
  message.value = "";
};
</script>

<template>
  <div class="send_section w-full h-16 px-6 flex items-center shadow-layer3Re">
    <input
      v-on:keyup.enter="handleSendMessage()"
      type="text"
      v-model="message"
      class="w-full h-10 send_input box-border px-2 py-0 my-2.5"
    />
    <SendIcon
      @click="handleSendMessage"
      class="ml-5 cursor-pointer text-orange-Default hover:text-orange-b90"
    />
  </div>
</template>

<style scoped></style>
