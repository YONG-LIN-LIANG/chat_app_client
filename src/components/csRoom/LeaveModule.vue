<script setup>
import { defineEmits } from "vue";
import { useSocketStore } from "@/stores/socket";
import { usecsRoomStore } from "@/stores/csRoom";
const socket = useSocketStore().socket;
const csRoom = usecsRoomStore();

const emit = defineEmits(["onToggle"]);

defineProps({
  chatEnd_closed: {
    type: Boolean,
  },
});

// 結束對話
const handleEndChat = () => {
  emit("on-toggle");
  let endObject = {
    room_id: csRoom.userActive.room_id,
    socket_id: csRoom.userActive.socket_id,
    resource_id: 1,
    leave_room_info: {
      identity: 1,
      is_room_already_close: false,
    },
  };
  console.log("endObject", endObject);
  socket.emit("reqLeaveRoom", endObject);
};
</script>

<template>
  <div
    :class="[
      'module_section w-full h-full fixed top-0 left-0 transition ease-in-out duration-300',
      chatEnd_closed
        ? 'opacity-0 pointer-events-none'
        : 'opacity-100 pointer-events-auto',
    ]"
  >
    <div
      class="bg_black bg-gray-2 w-full h-full opacity-20"
      @click="emit('onToggle')"
    ></div>

    <div class="module_window">
      <div>要結束對話嗎?</div>
      <div class="py-3 text-xs text-gray-4 text-center">
        <p>對話結束後聊天室將被關閉，</p>
        <p>直到同個使用者再度傳送客服訊息。</p>
      </div>
      <div class="btn_wrap flex justify-center sm:flex-col">
        <div class="btn_secondary-orange m-2" @click="emit('onToggle')">
          返回對話
        </div>
        <div class="btn_primary--orange m-2" @click="handleEndChat()">
          結束對話
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.module_window {
  @apply w-100 flex flex-col items-center px-10 py-7 bg-white absolute top-1/2 left-1/2 translate-y-1/2Re translate-x-[-35%] sm:translate-x-1/2Re rounded-md;
}
</style>
