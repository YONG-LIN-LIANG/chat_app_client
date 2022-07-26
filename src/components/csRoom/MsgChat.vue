<script setup>
import { ref, onMounted, onUpdated } from "vue";
import { usecsRoomStore } from "@/stores/csRoom";

const csRoom = usecsRoomStore();

const chatSection = ref(null);

onUpdated(() => {
  csRoom.chatSectionDom = chatSection.value;
    csRoom.chatSectionHeight = chatSection.value.scrollHeight;
    console.log('2',csRoom.chatSectionHeight)
    csRoom.chatSectionDom.scrollTop = csRoom.chatSectionHeight;
})


const formatDate = (time) => {
  const today = new Date();
  const timeDate = new Date(time.split(" ")[0]);
  if (today.toDateString() === timeDate.toDateString()) {
    return "今天";
  }
  const formatTimeDate = time.replace(/-/g, "/").split(" ")[0];
  return formatTimeDate;
};
</script>
<template>
  <div
    ref="chatSection"
    class="chat_section px-10 lg:px-7 py-7 flex items-center flex-col overflow-auto box-border"
  >
    <div
      v-for="item in csRoom.userChatList"
      :key="item.room_id"
      class="w-full flex items-center flex-col"
      data-part="0"
    >
      <div
        class="chat_date w-16 relative text-xs font-light text-center text-gray-3 mx-0 my-5"
      >
        {{ formatDate(item.begin_time) }}
      </div>
      <div class="chat_start">
        <div
          class="chat_status text-sm font-medium text-green text-center mx-0 my-1.5"
        >
          開始聊天
        </div>
        <div class="chat_source_wrap text-sm mx-0 my-5 text-center">
          <span class="text-sm text-gray-3 mr-1">來源 : </span>
          <span
            class="chat_source inline-block text-gray-2 bg-orange-w20 m-1 px-3.5 py-1"
            >{{ item.group }}</span
          >
          <span
            class="chat_source inline-block text-gray-2 bg-orange-w20 m-1 px-3.5 py-1"
            >{{ item.website }}</span
          >
        </div>
      </div>
      <div
        v-for="chatItem in item.chatList"
        :key="chatItem.created_time"
        class="w-full mx-0 my-3"
      >
      <!-- 系統訊息 -->
        <div v-if="chatItem.status === 0" class="chat_tags_wrap">
          <div
            class="chat_tags_ques text-xs text-gray-2 text-center mx-0 my-2.5"
          >
            {{ chatItem.question }}
          </div>
          <div class="chat_tags_opts_wrap flex justify-center">
            <div
              v-show="chatItem.question_id !== 2"
              v-for="questionItem in chatItem.question_content"
              :key="questionItem"
              :class="[
                { 'bg-green-w50': questionItem === chatItem.answer },
                'chat_tags_opts',
              ]"
            >
              {{ questionItem }}
            </div>
            <div
              v-show="chatItem.question_id === 2"
              v-for="questionItem in chatItem.question_content"
              :key="questionItem"
              :class="[
                { 'bg-green-w50': questionItem.name === chatItem.answer },
                'chat_tags_opts',
              ]"
            >
              {{ questionItem.name }}
            </div>
          </div>
        </div>
      <!-- 客戶訊息 -->
        <div v-if="chatItem.status === 2" class="msg_receive">
          <span class="msg_receive_text bg-gray-6">{{ chatItem.message }}</span>
          <span
            class="msg_time text-xs font-light text-gray-3 tracking-wide mx-2 my-0.5"
            >{{ csRoom.createdTimeClock(chatItem.created_time) }}
          </span>
        </div>
      <!-- 客服訊息 -->
        <div v-if="chatItem.status === 1" class="msg_send justify-end">
          <span
            class="msg_time text-xs font-light text-gray-3 tracking-wide mx-2 my-0.5"
            >{{ csRoom.createdTimeClock(chatItem.created_time) }}</span
          >
          <span class="msg_send_text bg-green-w50">{{ chatItem.message }}</span>
        </div>
      </div>

      <div v-if="item.end_time" class="chat_end">
        <div
          class="chat_status text-sm font-medium text-green text-center mx-0 my-1.5"
        >
          結束聊天
        </div>
        <div class="text-gray-3">
          <span class="text-xs">客服人員 : </span>
          <span class="text-xs">{{ item.cs_name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat_section {
  @apply h-[calc(100vh-168px)] max-h-[calc(100vh-168px)] sm:h-[calc(100vh-232px)];
}

.chat_date::before {
  content: "";
  @apply w-10 h-px absolute bg-gray-5 top-2 right-20;
}
.chat_date::after {
  content: "";
  @apply w-10 h-px absolute bg-gray-5 top-2 left-20;
}

.chat_tags_opts.selected {
  @apply bg-green-w50;
}
.msg_receive,
.msg_send {
  @apply flex items-end  ml-7;
}
.msg_receive_text,
.msg_send_text {
  @apply text-md text-gray-1 tracking-wide rounded-md px-4 py-2;
}
.msg_receive_text,
.msg_send_text {
  word-break: break-word;
}

.chat_tags_opts{
@apply text-sm text-gray-2 rounded-20 m-1 border border-solid border-green px-3.5 py-1.5 cursor-pointer
}
</style>
