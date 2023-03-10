<template>
  <section
    :class="[
      'room-window-container fixed top-0 bottom-0',
      isInRoom ? 'room-window-container--active' : 'h-auto pt-0',
    ]"
  >
    <!-- 聊天室 -->
    <div
      :class="[
        'room-window flex flex-col relative w-full h-full bg-white rounded-md overflow-hidden shadow-layer2',
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
      <div ref="chatWindow" class="flex-grow pt-4 overflow-y-auto">
        <!-- :roomInfo="roomInfo" -->
        <div v-if="!isVisitor">
          <MsgChat
            v-for="(item, idx) in roomInfo.chat"
            :key="idx"
            :messageInfo="item"
            :csInfo="roomInfo.cs"
            @onSendMessage="handleSendMessage"
          />
          <!-- 對方打字中提示 -->
          <div v-show="isTyping" class="flex justify-center items-center mb-8">
            <span class="text-xs text-gray-3 mx-1.5 my-0"
              >客服人員 正在輸入訊息</span
            >
            <DoingIcon />
          </div>
        </div>

        <div v-else class="flex-center flex-col h-full">
          <h2>訪客聊天功能開發中</h2>
          <h3>請登入進行諮詢</h3>
        </div>
      </div>
      <div v-show="isInRoom" class="flex-none h-15">
        <MsgSend
          :csSocketId="roomInfo.cs.socketId"
          @onSendMessage="handleSendMessage"
        />
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
          'endDialog absolute left-0 top-12 right-0 bottom-0 w-full',
          dialog.name === 'end' && dialog.isOpen ? 'endDialog-active' : '',
        ]"
        :csName="csName"
        @onCloseDialog="handleCloseDialog"
      />
      <AfterCloseRating
        :class="[
          'endDialog absolute left-0 top-12 right-0 w-full',
          dialog.name === 'afterCloseRating' && dialog.isOpen
            ? 'endDialog-active'
            : '',
        ]"
        :csName="csName"
        @onRatingRoom="handleCloseRating"
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
      v-show="newMessageInfo.isNewMessageExist"
      class="w-auto max-w-55 shrink-0 flex items-center border-2 border-green rounded-10 shadow-layer2 bg-white overflow-hidden"
    >
      <div class="my-2.5 mx-5 overflow-hidden">
        {{ newMessage }}
      </div>
    </div>
    <div
      @click="handleToggleRoom"
      :class="[
        'flex-center w-15 h-15 mx-5 rounded-full bg-white shadow-layer2 cursor-pointer',
        newMessageInfo.isMessageShow ? 'border-3 border-green-neon' : '',
      ]"
    >
      <CsAvatar />
    </div>
  </section>
</template>
<script setup>
import DoingIcon from "@/components/svg/Doing.vue";
import SearchIcon from "@/components/svg/Search.vue";
import HideIcon from "@/components/svg/Hide.vue";
import CrossIcon from "@/components/svg/Cross.vue";
import MsgChat from "@/components/clientRoom/MsgChat.vue";
import MsgSend from "@/components/clientRoom/MsgSend.vue";
import CsAvatar from "@/components/svg/CsAvatar.vue";
import CloseRoomDialog from "@/components/clientRoom/CloseRoomDialog.vue";
import AfterCloseRating from "@/components/clientRoom/AfterCloseRatingDialog.vue";
import { reactive } from "@vue/reactivity";
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useClientStore } from "@/stores/client";
import { useSocketStore } from "@/stores/socket";
import { handleFormatRoomListData } from "@/function/index";
const clientStore = useClientStore();
const socket = useSocketStore().socket;
const chatWindow = ref(null);
let newMessageTimeout = ref(null);
const newMessage = ref("");
const roomInfo = reactive({
  user: {
    memberId: 0,
    roomId: 0,
    web_resource: 0,
    authorization: 1,
    name: "",
    uuid: "",
    socketId: "dada",
    group: "",
    website: "",
  },
  cs: {
    memberId: 0,
    socketId: "",
    name: "",
    typing: "",
  },
  chat: [],
  // 人員message物件
  // status 1為客服，2為客戶端
  // {status:1, messageId:1, csName:, message:, createdTime}
  // 送出時先推送訊息，推送成功時返回系統時間及messageId並塞回原本的訊息
});
const roomId = computed(() => roomInfo.user.roomId);
const ratingRoomId = ref(0);
const csSocketId = computed(() => roomInfo.cs.socketId);
let isTyping = ref(false);
const csName = computed(() => roomInfo.cs.name);
const dialog = reactive({
  name: "",
  isOpen: false,
});
const visitorNameForm = reactive({
  name: "",
  errorMessage: "",
});
let isRoomOpen = ref(false);
// let isNewMessageShow = ref(false);
let newMessageInfo = reactive({
  isMessageShow: false,
  isNewMessageExist: false,
});
const visitorStep = ref(1);
let isVisitor = computed(() => roomInfo.user.authorization === "2");
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

// 送出訊息第一則訊息
const handleSendFirstSmessage = (question) => {
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
};
const handleSendSecondSmessage = (secondSmessage) => {
  roomInfo.chat[roomInfo.chat.length - 1].chatList.push({
    ...secondSmessage,
    answer: "",
    createdTime: "",
  });
};
const shouldFirstMsgSend = computed(
  () =>
    !roomInfo.chat.length ||
    !roomInfo.chat[roomInfo.chat.length - 1].chatList.length ||
    roomInfo.chat[roomInfo.chat.length - 1].endTime
);
const shouldSecondMsgSend = computed(
  () =>
    roomInfo.chat.length &&
    roomInfo.chat[roomInfo.chat.length - 1].chatList[0].answer &&
    roomInfo.chat[roomInfo.chat.length - 1].chatList.length === 1
);
onMounted(async () => {
  // 把localstorage聊天室狀態塞回data
  handleInitializeRoomSetting();
  // 初始化socket on接收事件
  handleInitializeSocketOnEvent();
  window.addEventListener("message", handleMessage);
});
onBeforeUnmount(() => {
  window.removeEventListener("message", handleMessage);
});
const handleMessage = (message) => {
  console.log("messageee", message);
  const data = message.data;
  if (!data) return;
  console.log("checkkk", data);
  clientStore.setClient(data);
  console.log("client data", clientStore.client);
  roomInfo.user = {
    ...roomInfo.user,
    ...data,
  };
  socket.emit("reqLogin", { ...data, identity: 2 });
};

const handleInitializeSocketOnEvent = () => {
  socket.on("resLogin", (data) => {
    console.log("dataa", data);
    const { chat, cs, user, question, secondSmessage } = data;
    roomInfo.user = {
      ...roomInfo.user,
      group: user.group_name,
      website: user.website_name,
      memberId: user.member_id,
      roomId: user.room_id,
      socketId: user.socket_id,
    };
    ratingRoomId.value = user.room_id;
    roomInfo.chat = handleFormatRoomListData(chat);
    roomInfo.cs = {
      ...roomInfo.cs,
      ...cs,
    };
    // 判斷如果roomId為0且，送出第一則系統訊息
    if (user.room_id === 0) {
      // 確定是否滿足送出第一則系統訊息條件
      console.log("shouldFirstMsgSend", shouldFirstMsgSend.value);
      if (shouldFirstMsgSend.value) {
        handleSendFirstSmessage(question);
        // 確定是否滿足送出第二則系統訊息條件
      } else if (shouldSecondMsgSend.value) {
        handleSendSecondSmessage(secondSmessage);
      }
    }
    console.log("roomInfoo", roomInfo);
  });
  socket.on("resSendMessage", async (data) => {
    const { identity, messageCreatedTime } = data;
    if (identity === 0) {
      const { questionId } = data;
      if (messageCreatedTime) {
        roomInfo.chat[roomInfo.chat.length - 1].chatList.find(
          (i) => i.questionId === questionId
        ).createdTime = messageCreatedTime;
        // 送第二則系統訊息，在handleSendSecondSmessage裡寫死
        if (questionId === 1) {
          const { secondSmessage } = data;
          handleSendSecondSmessage(secondSmessage);
        } else if (questionId === 2) {
          // 把系統訊息2及配對拆開
          const { roomId, csInfo, firstMessage } = data;
          roomInfo.cs = {
            ...roomInfo.cs,
            ...csInfo,
          };
          roomInfo.user.roomId = roomId;
          console.log("sec roominfo", roomInfo);
          const currentRoom = roomInfo.chat[roomInfo.chat.length - 1];
          currentRoom.chatList.push(firstMessage);
          currentRoom.roomId = roomId;
          ratingRoomId.value = roomId;
          currentRoom.beginTime = messageCreatedTime;
        }
        console.log("roomInfo", roomInfo);
      } else {
        // 提示系統異常
      }
    } else if (identity === 2) {
      const { messageId } = data;
      // 用messageId找到那則訊息
      roomInfo.chat[roomInfo.chat.length - 1].chatList.find(
        (i) => i.messageId === messageId
      ).createdTime = messageCreatedTime;
    } else if (identity === 1) {
      const { message } = data;
      console.log("check");
      roomInfo.chat[roomInfo.chat.length - 1].chatList.push(message);
      console.log("test", roomInfo.chat[roomInfo.chat.length - 1].chatList);
      newMessage.value = message.message;
      await handleScrollToBottom();
      // 圓圈、訊息都顯示，然後啟動3秒timer
      newMessageInfo.isMessageShow = true;
      newMessageInfo.isNewMessageExist = true;
      console.log("check", newMessageInfo);
      handlePostMessageToParent();
      handleNewMessageCountdown();
    }
  });
  socket.on("resReadMessage", (data) => {
    console.log("readId", data);
  });
  socket.on("resUpdateSocketId", (data) => {
    console.log("new cs socket id", data);
    roomInfo.cs.socketId = data;
    console.log("update roomInfo", roomInfo);
  });
  socket.on("resLeaveRoom", async (data) => {
    const { identity, end_time, first_question, is_room_already_close } = data;
    console.log("this is data", data);
    if (identity === 1 && !is_room_already_close) {
      // 先補上聊天室結束時間再冒出填寫評分燈箱
      console.log("empty so far");
      const currentRoom = roomInfo.chat.find((i) => i.roomId === roomId.value);
      currentRoom.endTime = end_time;
      handleSendFirstSmessage(first_question);
      handleOpenDialog("afterCloseRating");
    } else if (identity === 2 && is_room_already_close) {
      console.log("successful rating");
      handleToggleRoom();
      // 客服人員已結束聊天，客戶端補評分的回應，關閉評分燈箱
      ratingRoomId.value = 0;
      dialog.name = "";
      dialog.isOpen = false;
    } else if (identity === 2 && !is_room_already_close) {
      console.log("go heree");
      handleToggleRoom();
      // 成功退出房間，幫最後一間房間填上end_time
      const currentRoom = roomInfo.chat.find((i) => i.roomId === roomId.value);
      console.log("jjj", currentRoom, roomInfo, roomId.value);
      currentRoom.endTime = end_time;
      currentRoom.csName = roomInfo.cs.name;
      handleSendFirstSmessage(first_question);
      dialog.name = "";
      dialog.isOpen = false;
    }
    // 退出聊天室後重置roomId為0
    roomInfo.user.roomId = 0;
    await handleScrollToBottom();
  });
  socket.on("resTyping", async (data) => {
    console.log("typing", data);
    isTyping.value = data;
    await handleScrollToBottom();
  });
};
const handleInitializeRoomSetting = () => {
  const chatRoomObj = localStorage.getItem("chatRoom")
    ? JSON.parse(localStorage.getItem("chatRoom"))
    : { isMessageShow: false, isRoomOpen: false };
  isRoomOpen.value = chatRoomObj.isRoomOpen;
  newMessageInfo.isMessageShow = chatRoomObj.isMessageShow;
  handlePostMessageToParent();
  setTimeout(async () => {
    await handleScrollToBottom();
  }, 500);
};
const handlePostMessageToParent = () => {
  const chatRoomObj = {
    isRoomOpen: isRoomOpen.value,
    isMessageShow: newMessageInfo.isMessageShow,
  };
  localStorage.setItem("chatRoom", JSON.stringify(chatRoomObj));
  window.parent.postMessage(
    {
      isRoomOpen: isRoomOpen.value,
      isNewMessageShow: newMessageInfo.isNewMessageExist,
    },
    "*"
  );
};
const handleScrollToBottom = async () => {
  console.log("check scroll down", chatWindow.value.scrollHeight);
  chatWindow.value.scrollTop = await chatWindow.value.scrollHeight;
};
const handleToggleRoom = async () => {
  await handleScrollToBottom();
  isRoomOpen.value = !isRoomOpen.value;
  console.log("aaa", isRoomOpen.value);
  // 強制移除圈圈及新訊息
  newMessageInfo.isMessageShow = false;
  newMessageInfo.isNewMessageExist = false;
  handlePostMessageToParent();
};

const handleVisitorJoinRoom = () => {
  if (!visitorNameForm.name) {
    visitorNameForm.errorMessage = "欄位必填";
    return;
  }
};
const handleOpenDialog = (name) => {
  console.log("click");
  if (name === "end" && roomId.value === 0) return;
  dialog.name = name;
  dialog.isOpen = true;
  console.log("dialog", dialog);
};

const handleCloseDialog = (data) => {
  const { action, ratingInfo } = data;
  console.log("111");
  // action為0時結束聊天，1時返回聊天
  if (!action) {
    console.log("222");
    socket.emit("reqLeaveRoom", {
      room_id: roomId.value,
      socket_id: csSocketId.value,
      resource_id: roomInfo.user.web_resource,
      leave_room_info: {
        ...ratingInfo,
        identity: 2,
        is_room_already_close: false,
      },
    });
  } else {
    dialog.name = "";
    dialog.isOpen = false;
  }
};
const handleCloseRating = (data) => {
  console.log("check close", ratingRoomId.value);
  socket.emit("reqLeaveRoom", {
    room_id: ratingRoomId.value,
    leave_room_info: {
      ...data,
      identity: 2,
      is_room_already_close: true,
    },
  });
};

const handleStartTimer = () => {
  newMessageTimeout.value = setTimeout(() => {
    clearTimeout(newMessageTimeout.value);
    newMessageInfo.isNewMessageExist = false;
    handlePostMessageToParent();
  }, 3000);
};
const handleNewMessageCountdown = () => {
  clearTimeout(newMessageTimeout.value);
  handleStartTimer();
};
const handleSendMessage = async (data) => {
  console.log("sendData", data);
  // 先將data的answer塞值，再打socket發api
  const { status, questionId, content } = data;
  if (status === 0) {
    const findSmessage = roomInfo.chat[roomInfo.chat.length - 1].chatList.find(
      (i) => i.status === status && i.questionId === questionId
    );
    console.log("findMessage", findSmessage);
    if (findSmessage !== undefined) {
      if (questionId === 1) {
        findSmessage.answer = content;
      } else if (questionId === 2) {
        findSmessage.answer = content.name;
      }

      // 由於還沒建立房間，先把系統訊息傳送到redis的 message-clientMemberId-0的陣列裡，利用夾帶clientMemberId就不會跟別人重複
      // smessage data結構: { identity, roomId, clientMemberId, questionId, question, questionContent, answer}
      console.log("555", findSmessage.questionContent);
      const data = {
        identity: 0,
        roomId: 0,
        memberId: roomInfo.user.memberId,
        questionId,
        question: findSmessage.question,
        questionContent: findSmessage.questionContent,
        answer: findSmessage.answer,
      };
      console.log("before send", data);
      socket.emit("reqSendMessage", {
        ...data,
        resourceId: roomInfo.user.web_resource,
      });
    }
  } else if (status === 2) {
    console.log("send");
    const { roomId, memberId, name } = roomInfo.user;
    const { socketId } = roomInfo.cs;
    const lastRoom = roomInfo.chat[roomInfo.chat.length - 1];
    const memberMessageList = lastRoom.chatList.filter(
      (i) => i.status === 2 || i.status === 1
    );
    console.log("clientMessageList", memberMessageList);
    let currentMessageId = !memberMessageList.length
      ? 1
      : memberMessageList[memberMessageList.length - 1].messageId;
    const newMessageId = currentMessageId + 1;
    const message = {
      name,
      messageId: newMessageId,
      message: content,
      memberId,
    };
    const data = {
      ...message,
      identity: status,
      socketId,
      roomId,
    };
    console.log("hii", roomInfo.chat[roomInfo.chat.length - 1].chatList);
    console.log("height1", chatWindow.value.scrollHeight);
    roomInfo.chat[roomInfo.chat.length - 1].chatList.push({
      ...message,
      status,
      createdTime: "",
    });
    socket.emit("reqSendMessage", data);
  }
  await handleScrollToBottom();
};
</script>
<style scoped>
@media (max-height: 564px) {
  .room-window_container {
    @apply top-0;
  }
}
.room-window-container--active {
  position: fixed;
  left: 0;
  right: 0;
  margin: auto;
  width: calc(100% - 40px);
  height: calc(100% - 40px);
}
.room-window {
  @apply -z-9999 select-none opacity-0 transition-all duration-300 ease-in-out delay-0;
}
.room-window--active {
  @apply select-auto delay-200 z-9999 opacity-100;
}
.chat-ball {
  @apply z-9999 transition-all duration-300 ease-in-out delay-500 opacity-100;
}
.chat-ball--active {
  @apply translate-y-8 delay-0 -z-9999 opacity-0;
}
.header-icon {
  @apply flex justify-center items-center w-7.5 h-7.5 cursor-pointer hover:bg-white-w50 rounded-full transition-all duration-300 ease-in-out;
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
