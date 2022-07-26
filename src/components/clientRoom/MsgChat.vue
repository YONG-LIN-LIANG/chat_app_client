<template>
  <div class="flex items-center flex-col px-5 pt-5 box-border">
    <div class="w-full flex items-center flex-col">
      <!-- messageInfo.chatList[0].created_time -->
      <div
        v-show="props.messageInfo.beginTime"
        class="chat_date w-16 relative text-xs font-light text-center text-gray-3 mx-0 my-5"
      >
        {{ formatDate(props.messageInfo.chatList[0].createdTime) }}
      </div>
      <div
        v-show="props.messageInfo.chatList.length"
        class="text-sm font-medium text-green text-center mx-0 my-1.5"
      >
        開始聊天
      </div>
      <!-- v-for="(item, idx) in messageInfo.chatList" :key="idx" -->

      <div
        v-for="(item, idx) in props.messageInfo.chatList"
        :key="idx"
        class="w-full"
      >
        <div
          v-if="item.status === 0 && item.questionId === 1"
          class="mx-0 my-2.5"
        >
          <div class="text-xs text-gray-2 text-center mx-0 my-2.5">
            {{ item.question }}
          </div>
          <div class="chat_tags_opts_wrap flex justify-center">
            <div
              v-for="(option, idx2) in item.questionContent"
              :key="idx2"
              :class="[
                'chat_tags_opts text-sm text-gray-2 rounded-20 m-1 border border-solid border-green px-3.5 py-1.5 cursor-pointer',
                !item.answer
                  ? 'hover:bg-green-w50'
                  : item.answer === option
                  ? 'bg-green-w50'
                  : '',
              ]"
              @click="handleSendMessage(0, item.questionId, option)"
            >
              {{ option }}
            </div>
          </div>
        </div>

        <div
          v-if="item.status === 0 && item.question_id === 2"
          class="mx-0 my-2.5"
        >
          <div class="text-xs text-gray-2 text-center mx-0 my-2.5">
            請選擇服務的客服人員
          </div>
          <div class="chat_tags_opts_wrap flex justify-center">
            <div
              v-for="(option, idx2) in item.questionContent"
              :key="idx2"
              :class="[
                'chat_tags_opts text-sm text-gray-2 rounded-20 m-1 border border-solid border-green px-3.5 py-1.5',
                item.answer === option ? 'bg-green-w50' : '',
              ]"
            >
              {{ option }}
            </div>
          </div>
        </div>

        <!-- 人員聊天跑回圈 -->
        <div
          v-if="item.status === 1 || item.status === 2"
          class="w-full mx-0 my-2.5"
        >
          <div
            v-if="item.status === 2"
            class="message w-full flex items-end mr-7"
          >
            <span
              class="text-md text-gray-1 bg-gray-6 tracking-wide rounded-md px-4 py-2"
              >{{ item.msg }}</span
            >
            <span
              class="text-xs font-light text-gray-3 tracking-wide mx-2 my-0.5"
              >{{ formatTime(item.created_time) }}</span
            >
          </div>
          <div
            v-if="item.status === 1"
            class="message w-full flex items-end justify-end mr-7"
          >
            <span
              class="text-xs font-light text-gray-3 tracking-wide mx-2 my-0.5"
              >{{ formatTime(item.created_time) }}</span
            >
            <span
              class="text-md text-gray-1 bg-green-w50 tracking-wide rounded-md px-4 py-2"
              >{{ item.msg }}</span
            >
          </div>
        </div>
      </div>
      <div v-show="props.csInfo.typing" class="chat_action flex items-center">
        <span class="text-xs text-gray-3 mx-1.5 my-0">林三良 正在輸入訊息</span>
        <DoingIcon />
      </div>

      <div v-show="props.messageInfo.endTime" class="mb-5">
        <div
          class="text-sm font-medium text-green text-center mx-0 my-1.5"
        >
          結束聊天
        </div>
        <div class="text-gray-3">
          <span class="text-xs">客服人員 : </span>
          <span class="text-xs">{{ props.messageInfo.csName }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import DoingIcon from "@/components/svg/Doing.vue";
import { defineProps, defineEmits } from "vue";
const props = defineProps({
  messageInfo: {
    type: Object,
    default: () => {},
  },
  csInfo: {
    type: Object,
    default: () => {},
  },
  roomInfo: {
    type: Object,
    default: () => {},
  },
});
console.log("messageInfo", props.messageInfo);
const emit = defineEmits(["onSendMessage"]);
const formatDate = (time) => {
  console.log("timee", time);
  const today = new Date();
  const timeDate = new Date(time.split(" ")[0]);
  if (today.toDateString() === timeDate.toDateString()) {
    return "今天";
  }
  const formatTimeDate = time.replace(/-/g, "/").split(" ")[0];
  return formatTimeDate;
};

const handleSendMessage = (status, questionId, content) => {
  // 檢查房間有無結束，已結束的房間return
  if (props.messageInfo.endTime) return;
  emit("onSendMessage", { status, questionId, content });
};
console.log(props);
</script>

<style scoped>
/* .chat_section {
    @apply h-[calc(100vh-168px)] max-h-[calc(100vh-168px)];
  } */
.message + .message {
  @apply mt-7;
}
.chat_date::before {
  content: "";
  @apply w-10 h-px absolute bg-gray-5 top-2 right-20;
}
.chat_date::after {
  content: "";
  @apply w-10 h-px absolute bg-gray-5 top-2 left-20;
}

.chat_start .chat_source {
  @apply rounded-tl-20 rounded-br-20 rounded-tr-3 rounded-bl-3;
}

.chat_tags_opts.selected {
  @apply bg-green-w50;
}
</style>
