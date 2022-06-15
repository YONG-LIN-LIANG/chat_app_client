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
        <MsgChat
          v-for="(item, idx) in formatChatList"
          :key="idx"
          :messageInfo="item"
          :roomInfo="roomInfo"
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
        <button class="w-35 h-9 bg-green-Default rounded-full">登入</button>
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
          class="w-35 h-9 mx-auto mt-10 bg-green-Default rounded-full"
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
      class="shrink-0 flex items-center py-2.5 px-5 border border-green-Default rounded-10 shadow-layer2 bg-white"
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
<script>
import SearchIcon from "@/components/svg/Search.vue";
import HideIcon from "@/components/svg/Hide.vue";
import CrossIcon from "@/components/svg/Cross.vue";
import MsgChat from "@/components/clientRoom/MsgChat.vue";
import MsgSend from "@/components/clientRoom/MsgSend.vue";
import CsAvatar from "@/components/svg/CsAvatar.vue";
// import CloseRoomDialog from "@/components/clientRoom/CloseRoomDialog";
import { reactive } from "@vue/reactivity";
import { ref } from "vue";
import io from "socket.io-client";
export default {
  components: {
    SearchIcon,
    HideIcon,
    CrossIcon,
    MsgChat,
    MsgSend,
    CsAvatar,
    // CloseRoomDialog,
  },
  setup() {
    const roomInfo = reactive({
      user: {
        memberId: 0,
        roomId: 0,
        web_resource: 0,
        authorization: 1,
        name: "陳大倫",
        uuid: "212131",
        socketId: "dada",
      },
      cs: {
        csSocketId: "",
        csName: "",
        csTyping: "",
      },
      chat: [
        {
          roomId: "1",
          group: "通路事業群",
          website: "大碩研究所官網",
          csName: "強尼逮",
          systemChatList: [
            // 用created_time判斷在message前或後
            {
              // 如果之後客服可以發送問題給客戶端，可用question_id來做一些判斷
              status: 0,
              question_id: 1,
              question: "請選擇想詢問的問題",
              optionList: ["雅思", "多益", "托福"],
              answer: "雅思",
              created_time: "2022-06-05 05:02",
            },
            {
              status: 0,
              question_id: 2,
              question: "請選擇服務的客服人員",
              // 有的話幫我塞名子，沒有的話空陣列
              optionList: ["強尼逮", "由系統隨機指派"],
              // answer如果為人名則選擇了某客服，如為空表示選擇了系統隨機指派
              answer: "強尼逮",
              created_time: "2022-06-05 08:02",
            },
          ],
          chatList: [
            {
              status: 1,
              name: "陳大倫",
              msg: "安尼阿誰優",
              isRead: false,
              created_time: "2022-06-05 14:02",
            },
            {
              status: 1,
              name: "陳大倫",
              msg: "有啥問題",
              isRead: true,
              created_time: "2022-06-05 14:02",
            },
            {
              status: 2,
              name: "Molly",
              msg: "您好想請問您貴姓",
              isRead: false,
              created_time: "2022-06-05 14:03",
            },
            {
              status: 1,
              name: "陳大倫",
              msg: "敝姓張",
              isRead: false,
              created_time: "2022-06-05 14:04",
            },
          ],
        },
        {
          roomId: "2",
          group: "通路事業群",
          website: "大碩研究所官網",
          csName: "強尼逮",
          systemChatList: [
            // 用created_time判斷在message前或後
            {
              // 如果之後客服可以發送問題給客戶端，可用question_id來做一些判斷
              status: 0,
              question_id: 1,
              question: "請選擇想詢問的問題",
              optionList: ["雅思", "多益", "托福"],
              answer: "雅思",
              created_time: "2022-06-06 05:02",
            },
            {
              status: 0,
              question_id: 2,
              question: "請選擇服務的客服人員",
              // 有的話幫我塞名子，沒有的話空陣列
              optionList: ["強尼逮", "由系統隨機指派"],
              // answer如果為人名則選擇了某客服，如為空表示選擇了系統隨機指派
              answer: "強尼逮",
              created_time: "2022-06-06 08:02",
            },
          ],
          chatList: [
            {
              status: 1,
              name: "陳大倫",
              msg: "安尼阿誰優",
              isRead: false,
              created_time: "2022-06-06 14:02",
            },
            {
              status: 1,
              name: "陳大倫",
              msg: "有啥問題",
              isRead: true,
              created_time: "2022-06-06 14:02",
            },
            {
              status: 2,
              name: "Molly",
              msg: "您好想請問您貴姓",
              isRead: false,
              created_time: "2022-06-06 14:03",
            },
            {
              status: 1,
              name: "陳大倫",
              msg: "敝姓張",
              isRead: false,
              created_time: "2022-06-06 14:04",
            },
          ],
        },
      ],
    });
    const dialog = reactive({
      name: "",
      isOpen: false,
    });
    const visitorNameForm = reactive({
      name: "",
      errorMessage: "",
    });
    const isRoomOpen = ref(false);
    const visitorStep = ref(1);
    const isVisitor = roomInfo.user.authorization === 1;
    const clientName = roomInfo.user.name;
    const isInRoom = roomInfo.user.socketId;
    let socket = reactive({});

    // onBeforeMounted(() => {
    //   window.addEventListener('message', handleMessage);
    //   const endPoint = 'http://172.18.48.177:3001/'
    //   socket = io(endPoint)
    // })
    // onUnmounted(() => {
    //   window.removeEventListener('message', handleMessage);
    // })
    return {
      socket,
      isRoomOpen,
      roomInfo,
      isVisitor,
      clientName,
      isInRoom,
      visitorStep,
      visitorNameForm,
      dialog,
    };
  },
  computed: {
    isLoginReminderDisplay() {
      const { isVisitor, visitorStep, isInRoom } = this;
      return isVisitor && visitorStep === 1 && !isInRoom;
    },
    isFillClientNameDisplay() {
      const { isVisitor, clientName, visitorStep, isInRoom } = this;
      return isVisitor && !clientName && visitorStep === 2 && !isInRoom;
    },
    isVisitorNameFilled() {
      const { visitorNameForm } = this;
      return !visitorNameForm.name && visitorNameForm.errorMessage;
    },
    formatChatList() {
      const { chat } = this.roomInfo;
      const chatList = chat.map((i) => {
        let newChatList = i.chatList.concat(i.systemChatList).map((j) => ({
          ...j,
          timeStampDate: this.handleFormatTimestamp(j.created_time),
        }));
        newChatList = newChatList.sort(
          (a, b) => a.timeStampDate - b.timeStampDate
        );
        const { roomId, group, website, csName } = i;
        const newObj = {
          roomId,
          group,
          website,
          csName,
          chatList: newChatList,
        };
        return newObj;
      });
      return chatList;
    },
  },
  mounted() {
    window.addEventListener("message", this.handleMessage);

    console.log(this.socket);
  },
  beforeUnmount() {
    window.removeEventListener("message", this.handleMessage);
  },
  methods: {
    handleConnect(data) {
      const endPoint = "http://172.18.48.177:3001/";
      this.socket = io(endPoint);
      // 處理是會員就建立會員
      this.socket.on("connect", () => {
        this.roomInfo.user = {
          ...data,
          socketId: this.socket.id,
        };
        console.log("check user", this.roomInfo.user);
        // 呼叫socket加入房間
        this.socket.emit("reqLogin", { ...this.roomInfo.user, identity: 2 });
      });
    },
    handleMessage(message) {
      console.log("messageee", message);
      const data = message.data;
      if (!data) return;
      console.log("checkkk");
      // 先檢查身分
      // if(data !== undefined || socketId !== undefined){
      // console.log('dataaaaa', data)
      // console.log('da222', data)

      setTimeout(() => {
        if (data.authentication === "1") {
          console.log("here2");
          this.handleConnect(data);
        }
      }, 1);
    },
    handleToggleRoom() {
      this.isRoomOpen = !this.isRoomOpen;
      window.parent.postMessage(
        {
          isRoomOpen: this.isRoomOpen,
        },
        "*"
      );
    },
    handleFormatTimestamp(time) {
      return Math.floor(new Date(time) / 1000);
    },
    handleVisitorJoinRoom() {
      // 檢查姓名有無填寫
      const { visitorNameForm } = this;
      // const {authorization, name, uuid} = this.roomInfo.user
      if (!visitorNameForm.name) {
        this.visitorNameForm.errorMessage = "欄位必填";
        return;
      }
      // socket.emit('clientJoinRoom', {authorization, name, uuid})
    },
    handleOpenDialog(name) {
      this.dialog.name = name;
      this.dialog.isOpen = true;
    },
    handleCloseDialog() {
      this.dialog.name = "";
      this.dialog.isOpen = false;
    },
  },
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
