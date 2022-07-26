<template>
  <section
    :class="[
      'room-window-container fixed right-0 bottom-0',
      isInRoom ? 'h-full max-h-141 pt-16' : 'h-auto pt-0',
    ]"
  >
    <!-- 聊天室 -->
    <div
      :class="[
        'room-window flex flex-col relative w-85 h-full bg-white rounded-md overflow-hidden shadow-layer2',
        isRoomOpen ? 'room-window--active' : '',
      ]"
    >
      <div
        class="flex-none flex justify-between items-center px-5 py-2.5 bg-green-w20"
      >
        <h4>即時客服</h4>
        <div class="flex items-center">
          <button class="header-icon">
            <SearchIcon class="text-gray-3" />
          </button>
          <button @click="handleToggleRoom" class="header-icon">
            <HideIcon />
          </button>
          <button @click="handleOpenDialog('end')" class="header-icon">
            <CrossIcon />
          </button>
        </div>
      </div>
      <div v-show="isInRoom" class="flex-grow overflow-y-auto">
        <!-- :roomInfo="roomInfo" -->
        <MsgChat
          v-for="(item, idx) in roomInfo.chat"
          :key="idx"
          :messageInfo="item"
          :csInfo="roomInfo.cs"
          @onSendMessage="handleSendMessage"
        />
      </div>
      <div v-show="isInRoom" class="flex-none h-15">
        <MsgSend />
      </div>
      <!-- 未登入提醒 -->
      <div v-show="isLoginReminderDisplay" class="text-center py-7.5">
        <div class="text-xs mb-7.5">
          <h5>請登入開始聊天</h5>
          <h5>訊息將會保存在會員中心</h5>
        </div>
        <button class="w-35 h-9 bg-green rounded-full">登入</button>
        <button
          @click="visitorStep = 2"
          class="block mt-7.5 px-2.5 py-1.5 mx-auto bg-gray-6 rounded-md"
        >
          跳過登入
        </button>
      </div>
      <!-- 未登入輸入姓名 -->
      <div
        v-show="isFillClientNameDisplay"
        class="flex flex-col p-7.5 px-11 text-center"
      >
        <h5 class="text-xs">請輸入姓名</h5>
        <div class="relative mt-5">
          <input
            v-model="visitorNameForm.name"
            type="text"
            :class="['w-full', isVisitorNameFilled ? 'border-red' : '']"
          />
          <span
            v-show="!visitorNameForm.name && visitorNameForm.errorMessage"
            class="absolute left-0 -bottom-5 text-xs text-red"
            >{{ visitorNameForm.errorMessage }}</span
          >
        </div>

        <button
          @click="handleVisitorJoinRoom"
          class="w-35 h-9 mx-auto mt-10 bg-green rounded-full"
        >
          下一步
        </button>
      </div>
      <!-- 結束聊天燈箱 -->
      <CloseRoomDialog
        :class="[
          'endDialog absolute left-0 top-12 right-0 w-full',
          dialog.name === 'end' && dialog.isOpen ? 'endDialog-active' : '',
        ]"
        @onCloseDialog="handleCloseDialog"
      />
    </div>
  </section>
  <!-- 球+新訊息提醒 -->
  <section
    :class="[
      'chat-ball flex justify-end items-center fixed right-0 bottom-6',
      isRoomOpen ? 'chat-ball--active' : '',
    ]"
  >
    <div
      class="shrink-0 flex items-center py-2.5 px-5 border border-green rounded-10 shadow-layer2 bg-white"
    >
      客服人員 {{}} 在線為您服務
    </div>
    <div
      @click="handleToggleRoom"
      class="ml-5 p-3 border-2 border-green-neon rounded-full bg-white shadow-layer2 cursor-pointer"
    >
      <CsAvatar />
    </div>
  </section>
</template>
<script setup>
import SearchIcon from "@/components/svg/Search.vue";
import HideIcon from "@/components/svg/Hide.vue";
import CrossIcon from "@/components/svg/Cross.vue";
import MsgChat from "@/components/clientRoom/MsgChat.vue";
import MsgSend from "@/components/clientRoom/MsgSend.vue";
import CsAvatar from "@/components/svg/CsAvatar.vue";
// import CloseRoomDialog from "@/components/clientRoom/CloseRoomDialog";
import { reactive } from "@vue/reactivity";
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useClientStore } from "@/stores/client";
import { useSocketStore } from "@/stores/socket";
const clientStore = useClientStore();
const socket = useSocketStore().socket;

const roomInfo = reactive({
  user: {
    memberId: 0,
    roomId: 0,
    web_resource: 0,
    authorization: 1,
    name: "陳大倫",
    uuid: "212131",
    socketId: "dada",
    group: "",
    website: "",
  },
  cs: {
    socketId: "",
    name: "",
    typing: "",
  },
  chat: [],
});
const dialog = reactive({
  name: "",
  isOpen: false,
});
const visitorNameForm = reactive({
  name: "",
  errorMessage: "",
});
let isRoomOpen = ref(false);
const visitorStep = ref(1);
const isVisitor = roomInfo.user.authorization === 1;
const clientName = roomInfo.user.name;
const isInRoom = roomInfo.user.socketId;

const isLoginReminderDisplay = computed(
  () => isVisitor && visitorStep.value === 1 && !isInRoom
);
const isFillClientNameDisplay = computed(
  () => isVisitor && !clientName && visitorStep.value === 2 && !isInRoom
);
const isVisitorNameFilled = computed(
  () => !visitorNameForm.name && visitorNameForm.errorMessage
);
onMounted(() => {
  socket.on("resLogin", (data) => {
    console.log("dataa", data);
    const { chat, cs, user, question } = data;
    roomInfo.user = {
      ...roomInfo.user,
      group: user.group_name,
      website: user.website_name,
      memberId: user.member_id,
      roomId: user.room_id,
      socketId: user.socket_id,
    };
    roomInfo.chat = chat;
    roomInfo.cs = {
      ...roomInfo.cs,
      ...cs,
    };
    // 判斷如果roomId為0，送出第一則系統訊息
    if (user.room_id === 0) {
      const firstMessage = {
        roomId: 0,
        group: roomInfo.user.group,
        website: roomInfo.user.website,
        csName: "",
        csUuid: "",
        isReadId: 0,
        beginTime: "",
        endTime: "",
        chatList: [
          {
            status: 0,
            questionId: question.question_id,
            question: question.question_name,
            questionContent: question.question_content,
            answer: "",
            createdTime: "",
          },
        ],
      };
      roomInfo.chat.push(firstMessage);
      console.log("roomInfo", roomInfo);
    }
  });
  window.addEventListener("message", handleMessage);
});
onBeforeUnmount(() => {
  window.removeEventListener("message", handleMessage);
});
// const handleConnect = (data) => {
//   const endPoint = "http://172.18.48.177:3001/";
//   socket = io(endPoint);
//   // 處理是會員就建立會員
//   this.socket.on("connect", () => {
//     this.roomInfo.user = {
//       ...data,
//       socketId: this.socket.id,
//     };
//     console.log("check user", this.roomInfo.user);
//     // 呼叫socket加入房間
//     this.socket.emit("reqLogin", { ...this.roomInfo.user, identity: 2 });
//   });
// };
const handleMessage = (message) => {
  console.log("messageee", message);
  const data = message.data;
  if (!data) return;
  console.log("checkkk", data);
  clientStore.setClient(data);
  console.log("client data", clientStore.client);
  socket.emit("reqLogin", { ...data, identity: 2 });
  // setTimeout(() => {
  //   if (data.authentication === "1") {
  //     console.log("here2");
  //     handleConnect(data);
  //   }
  // }, 1);
};

const handleToggleRoom = () => {
  isRoomOpen.value = !isRoomOpen.value;
  window.parent.postMessage(
    {
      isRoomOpen: isRoomOpen.value,
    },
    "*"
  );
};

// const handleFormatTimestamp = (time) => {
//   return Math.floor(new Date(time) / 1000);
// };

const handleVisitorJoinRoom = () => {
  if (!visitorNameForm.name) {
    visitorNameForm.errorMessage = "欄位必填";
    return;
  }
  // socket.emit('clientJoinRoom', {authorization, name, uuid})
};
const handleOpenDialog = (name) => {
  dialog.name = name;
  dialog.isOpen = true;
};

const handleCloseDialog = () => {
  dialog.name = "";
  dialog.isOpen = false;
};

const handleSendMessage = (data) => {
  console.log("sendData", data);
  // 先將data的answer塞值，再打socket發api
  const { status, questionId, content } = data;
  if (status === 0) {
    const findSmessage = roomInfo.chat[roomInfo.chat.length - 1].chatList.find(
      (i) => i.status === status && i.questionId === questionId
    );
    console.log("findMessage", findSmessage);
    if (findSmessage !== undefined) {
      findSmessage.answer = content;
      // 由於還沒建立房間，先把系統訊息傳送到redis的 message-clientMemberId-0的陣列裡，利用夾帶clientMemberId就不會跟別人重複
      // smessage data結構: { identity, roomId, clientMemberId, questionId, question, questionContent, answer}
      const data = {
        identity: 0,
        roomId: 0,
        memberId: roomInfo.user.memberId,
        questionId,
        question: findSmessage.question,
        questionContent: findSmessage.questionContent.toString(),
        answer: findSmessage.answer,
      };
      console.log("before send", data);
      socket.emit("reqSendMessage", data);
    }
  }
};
</script>
<style scoped>
@media (max-height: 564px) {
  .room-window_container {
    @apply top-0;
  }
}
.room-window {
  @apply -z-9999 select-none opacity-0 transition-all duration-300 ease-in-out delay-0;
}
.room-window--active {
  @apply select-auto -translate-y-8 delay-200 z-9999 opacity-100;
}
.chat-ball {
  @apply z-9999 transition-all duration-300 ease-in-out delay-200 opacity-100;
}
.chat-ball--active {
  @apply translate-y-8 delay-0 -z-9999 opacity-0;
}
.header-icon {
  @apply flex justify-center items-center w-7.5 h-7.5 cursor-pointer hover:bg-white rounded-full transition-all duration-300 ease-in-out;
}
.header-icon + .header-icon {
  @apply ml-2;
}
.endDialog {
  @apply -z-9999 select-none opacity-0 transition-all duration-300 ease-in-out delay-0;
}
.endDialog-active {
  @apply select-auto delay-200  z-9999 opacity-100;
}
</style>
