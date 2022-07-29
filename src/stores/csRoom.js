import { defineStore } from "pinia";
import { ref, reactive } from "vue";

export const usecsRoomStore = defineStore("csRoom", () => {
  const cs = reactive({});
  let userActive = reactive({});
  let userChatList = reactive([]);
  const userList = reactive([]);

  const formatChatListTime = () => {
    userChatList.forEach((i) => {
      i.chatList.forEach((j) => {
        j["createdTimeClock"] = j.createdTime.split(" ")[1].substring(0, 5);
      });
    });
  };
  formatChatListTime();

  const createdTimeClock = (created_time) => {
    return created_time.split(" ")[1].substring(0, 5);
  };

  const currentTimeFormat = () => {
    let currentDate = new Date().toISOString().split("T")[0];
    let currentTime = new Date().toString("HH:mm:ss").split(" ")[4];
    let currentDateTime = `${currentDate} ${currentTime}`;
    return currentDateTime;
  };
  currentTimeFormat();

  const chatSectionDom = ref(null);
  const chatSectionHeight = ref(null);

  // const scrollBottom = async () => {
  // 	console.log('chatSectionDom', chatSectionDom.value, chatSectionDom.value?.scrollHeight, chatSectionDom.value?.scrollTop)
  // 	console.log("ccc", chatSectionHeight.value)
  // 	if(chatSectionDom.value !== undefined && chatSectionDom.value !== null){
  // 		console.log("inn")
  // 		chatSectionDom.value.scrollTop = chatSectionHeight;
  // 		console.log("current height", chatSectionDom.value, chatSectionDom.value.scrollTop)
  // 	}

  // }

  //客戶端離開聊天室 提示
  let leaveClient = reactive([]);

  let isTyping = ref(false);

  return {
    cs,
    userActive,
    userChatList,
    userList,
    currentTimeFormat,
    chatSectionDom,
    chatSectionHeight,
    createdTimeClock,
    leaveClient,
    isTyping,
  };
});
