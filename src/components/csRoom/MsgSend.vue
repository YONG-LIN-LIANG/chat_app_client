<script setup>
import { ref } from "vue";
import SendIcon from "@/components/svg/Send.vue";
import { useSocketStore } from '@/stores/socket'
import { usecsRoomStore } from "@/stores/csRoom";

const csRoom = usecsRoomStore();
const socket = useSocketStore().socket

let inputValue = ref("");

// const inputSend = async () => {
//   csRoom.chatSectionDom.scrollTop = await csRoom.chatSectionDom.scrollHeight;
// };

const handleMsgSend = async (value) => {
		console.log('csRoom.userList',csRoom.userList)
		// console.log('csRoom.userActive',csRoom.userActive)
		if (value.trim()) {
			let findRoom = csRoom.userChatList.find((i) => i.room_id === csRoom.userActive.room_id)
			findRoom.chatList.push({
				created_time: csRoom.currentTimeFormat(),
				message: value.trim(),
        message_id: csRoom.userActive.message_id + 1,
				status: 1,
				createdTimeClock: csRoom.currentTimeFormat().split(' ')[1].substring(0, 5),
			})

      let messageData = {
        message: value,
        name: csRoom.userActive.name,
        memberId: 1,
        identity: 1,
        socketId: csRoom.userActive.socket_id,
        roomId: csRoom.userActive.room_id,
      }
      console.log('csRoom.userActive',csRoom.userActive)
      socket.emit('reqSendMessage', messageData)

      csRoom.chatSectionDom.scrollTop = await csRoom.chatSectionDom.scrollHeight;

      inputValue.value = ''
    }
	};

</script>

<template>
  <div
    class="send_section w-full h-16 flex items-center px-7 py-0 shadow-layer3Re"
  >
    <input
      v-model="inputValue"
      @keyup.enter="handleMsgSend(inputValue);"
      type="text"
      class="w-full h-10 send_input box-border px-2 py-0 m-2.5"
    />
        <!-- inputSend(); -->
        <!-- inputValue = ''; -->
    <SendIcon
      @click="
        handleMsgSend(inputValue);"
      class="cursor-pointer text-orange hover:text-orange-b90 m-2.5"
    />
        <!-- inputSend(); -->
  </div>
</template>

<style scoped></style>
