<script setup>
import { ref } from "vue";
import SendIcon from "@/components/svg/Send.vue";
import { useSocketStore } from '@/stores/socket'
import { usecsRoomStore } from "@/stores/csRoom";

const csRoom = usecsRoomStore();
const socket = useSocketStore().socket

let inputValue = ref("");

const inputSend = async () => {
  csRoom.chatSectionDom.scrollTop = await csRoom.chatSectionDom.scrollHeight;
};

const handleMsgSend = (inputValue) => {
		// console.log('csRoom.userChatList',csRoom.userChatList)
		// console.log('csRoom.userActive',csRoom.userActive)
		if (inputValue.trim()) {
			let findRoom = csRoom.userChatList.find((i) => i.room_id === csRoom.userActive.room_id)
			findRoom.chatList.push({
				created_time: csRoom.currentTimeFormat(),
				message: inputValue.trim(),
				status: 1,
				createdTimeClock: csRoom.currentTimeFormat().split(' ')[1].substring(0, 5),
			})
		
      socket.emit('reqSendMessage',{
          name: csRoom.userActive.name,
          messageId: csRoom.userList.message_id,
          message: csRoom.userList.message,
          memberId: csRoom.userActive.member_id,
          identity: 2,
          sockedId: csRoom.userActive.socketId,
          roomId: csRoom.userActive.room_id,
      })
		}
	};

</script>

<template>
  <div
    class="send_section w-full h-16 flex items-center px-7 py-0 shadow-layer3Re"
  >
    <input
      v-model="inputValue"
      @keyup.enter="handleMsgSend(inputValue) ;inputValue = '';
        inputSend();"
      type="text"
      class="w-full h-10 send_input box-border px-2 py-0 m-2.5"
    />
    <SendIcon
      @click="
        handleMsgSend(inputValue);
        inputValue = '';
        inputSend();
      "
      class="cursor-pointer text-orange-Default hover:text-orange-b90 m-2.5"
    />
  </div>
</template>

<style scoped></style>
