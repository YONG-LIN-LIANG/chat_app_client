<script setup>
import { reactive, onMounted, watch } from "vue";
// defineProps,
import ChatIcon from "@/components/svg/Chat.vue";
import SearchIcon from "@/components/svg/Search.vue";
import ListIcon from "@/components/svg/List.vue";
import MemberIcon from "@/components/svg/Member.vue";
import ReturnIcon from "@/components/svg/Return.vue";
import CrossIcon from "@/components/svg/Cross.vue";
import TriangleIcon from "@/components/svg/Triangle.vue";
import TabBtn from "@/components/csRoom/TabBtn.vue";
import slideUpDown from "vue3-slide-up-down";
import { useSocketStore } from "@/stores/socket";
import { usecsRoomStore } from "@/stores/csRoom";

const socket = useSocketStore().socket;
const csRoom = usecsRoomStore();

const emit = defineEmits(["toggleTab"]);

const props = defineProps({
  tabList: {
    type: Object,
  },
});
onMounted(() => {
  // socket.emit('reqLogin', { identity: 1, cs_id: csRoom.cs.memberId })
  // socket.on('resLogin', (data) => {
  //   // console.log('resLogin',data)
  //   if(data){
  //     Object.assign(csRoom.userList, data)
  //     // csRoom.formatChatListTime()
  //     console.log("csRoom.userList", csRoom.userList);
  //   }
  // })

  csRoom.userList.forEach((i) => {
    i["timeFormat"] = i.created_time.split(" ")[1].substring(0, 5);
  });

  socket.on("resReadMessage", (data) => {
    Object.assign(csRoom.userChatList, data.roomList);
    // console.log('resReadMessage',data)
    // 更新userList find userList.member_id = userActive.member_id 的 unread = 0
    let findUserClick = csRoom.userList.find(
      (i) => i.member_id === csRoom.userActive.member_id
    );
    // console.log('findUserClick',findUserClick)
    findUserClick.unread = data.unread;
    // console.log('csRoom.userList',csRoom.userList)
  });
  // 客戶重整 更新socket_id
  socket.on("resUpdateSocketId", (data) => {
    console.log("resUpdateSocketId", data);
    let findUser = csRoom.userList.find((i) => data.memberId === i.member_id);
    if (findUser !== undefined) {
      findUser.socket_id = data.socketId;
      csRoom.userActive.socket_id = data.socketId;
    }
  });

  // 訊息送出/收到新訊息 後更新userList
  socket.on("resSendMessage", async (data) => {
    console.log("data", data);
    // identity = 1 :客服訊息 ; 2 : 客戶訊息
    const { identity, messageCreatedTime, message, messageId } = data;

    // 送出訊息
    if (identity === 1) {
      // 更新userChatList 最後一個room的最後一則訊息的created_time
      let findUserMessage = csRoom.userChatList[
        csRoom.userChatList.length - 1
      ].chatList.find((i) => i.message_id === messageId);
      if (findUserMessage) {
        findUserMessage.created_time = messageCreatedTime;
      }
      // 更新userActive.message_id
      csRoom.userActive.message_id = messageId;
      // 更新 userList.member_id = userActive.member_id 的 message.message_id
      let findUser = csRoom.userList.find(
        (i) => i.member_id === csRoom.userActive.member_id
      );
      findUser.message = message;
      findUser.message_id = messageId;
      findUser.created_time = messageCreatedTime;
      findUser.message_status = 1;
      // 接收訊息
    } else if (identity === 2) {
      // 更新對應的 userList
      // csRoom.userChatList[userChatList.length - 1].chatList.push(message);
      let findUserGet = csRoom.userList.find(
        (i) => i.member_id === message.memberId
      );
      // console.log('findUserGet',findUserGet)
      findUserGet.message = message.message;
      findUserGet.message_id = message.messageId;
      findUserGet.created_time = message.createdTime;
      findUserGet.message_status = 2;
      // 若非目前所在的聊天室，userList.unread更新
      if (message.memberId !== csRoom.userActive?.member_id) {
        findUserGet.unread = data.unread;
      }

      // 更新 userActive
      if (findUserGet.member_id === csRoom.userActive.member_id) {
        csRoom.userActive.message = message.message;
        csRoom.userActive.message = message.messageId;
        let findUserMessageGet = await csRoom.userChatList[
          csRoom.userChatList.length - 1
        ].chatList;
        // 更新聊天室內容
        let messageFormat = {
          created_time: message.createdTime,
          member_id: message.memberId,
          message: message.message,
          message_id: message.messageId,
          name: message.name,
          status: message.status,
        };
        findUserMessageGet.push(messageFormat);
        csRoom.chatSectionDom.scrollTop = await csRoom.chatSectionDom
          .scrollHeight;
        // console.log('findUserMessageGet',findUserMessageGet)
      }
    }

    // csRoom.chatSectionDom.scrollTop = await csRoom.chatSectionDom.scrollHeight;
  });

  // 接收聊天配對
  socket.on("resPair", (data) => {
    csRoom.userList.unshift(data);
  });
  //離開聊天室
  socket.on("resLeaveRoom", (data) => {
    console.log("resLeaveRoom", data);
    console.log(typeof csRoom.userList[0].room_id, typeof data);
    let findUserListDelete = csRoom.userList.find((i) => i.room_id === data);
    let indexOfChatListDelete = csRoom.userList.indexOf(findUserListDelete);

    // 顯示客戶離開聊天室 inform
    csRoom.leaveClient.unshift(findUserListDelete.name);

    console.log(csRoom.leaveClient);
    setTimeout(() => {
      csRoom.leaveClient.splice(
        csRoom.leaveClient.indexOf(findUserListDelete.name),
        1
      );
    }, 3000);

    // find userList.roomId = data 移除
    csRoom.userList.splice(indexOfChatListDelete, 1);

    // if userActive.roomId = data 清空userChatList
    if (csRoom.userActive.room_id === data) {
      csRoom.userActive = {};
      csRoom.userChatList = {};
      // Object.assign(csRoom.userActive,{})
      // Object.assign(csRoom.userChatList,{})
    }
  });
  // 打字中
  socket.on("resTyping", (data) => {
    console.log("typing", data);
    csRoom.isTyping = data;
  });
});

// 找到roomId = csRoom.leaveClient

const chatList = reactive({
  active: 0,
  list: [
    {
      id: 1,
      customer: "伊藤馬林",
      unread: 4,
      time: "12:21",
      type: "text",
      lastTag: "",
      lastMsg: {
        msg: "聽說你們補習班很厲害",
        from: "customer",
      },
    },
    {
      id: 2,
      customer: "吳大揆",
      unread: 11,
      time: "12:10",
      type: "tag",
      lastTag: "托福",
      lastMsg: {
        msg: "",
        from: "",
      },
    },
    {
      id: 3,
      customer: "林三良",
      unread: 2,
      time: "11:59",
      type: "text",
      lastTag: "托福",
      lastMsg: {
        msg: "安安你好請問",
        from: "service",
      },
    },
  ],
});
const category = reactive({
  groupActive: [0],
  webActive: 1,
  group: [
    {
      id: 1,
      open: false,
      name: "通路事業群",
      list: [
        {
          webId: 1,
          webName: "數位學堂官網",
          unread: "5",
        },
        {
          webId: 2,
          webName: "大碩研究所官網",
          unread: "5",
        },
        {
          webId: 3,
          webName: "龍門轉學考官網",
          unread: "",
        },
        {
          webId: 4,
          webName: "百官官網",
          unread: "5",
        },
      ],
    },
    {
      id: 2,
      open: false,
      name: "美語事業群",
      list: [
        {
          webId: 5,
          webName: "洋碩官網",
          unread: "4",
        },
        {
          webId: 6,
          webName: "放洋留遊學官網 ",
          unread: "12",
        },
        {
          webId: 7,
          webName: "約課系統",
          unread: "5",
        },
        {
          webId: 8,
          webName: "線上購課與學習系統",
          unread: "",
        },
      ],
    },
    {
      id: 3,
      open: false,
      name: "學習顧問事業群",
      list: [
        {
          webId: 9,
          webName: "甄戰官網",
          unread: "",
        },
        {
          webId: 10,
          webName: "落點分析平台 ",
          unread: "1",
        },
        {
          webId: 11,
          webName: "18學群",
          unread: "2",
        },
        {
          webId: 12,
          webName: "素養命題線上測驗",
          unread: "",
        },
        {
          webId: 13,
          webName: "學習歷程",
          unread: "3",
        },
        {
          webId: 14,
          webName: "線上家教",
          unread: "",
        },
      ],
    },
  ],
});
const handleGroup = function (item) {
  if (!category.groupActive.includes(item.id)) {
    category.groupActive.push(item.id);
    item.open = true;
  } else {
    category.groupActive.splice(category.groupActive.indexOf(item.id), 1);
    item.open = false;
  }
};

const toggleTab = (item) => {
  item.id === props.tabList.active
    ? emit("toggleTab", 0)
    : emit("toggleTab", item.id);
};

// 點擊 chatList 取得 userchatList
const handleUserChatList = async (item) => {
  console.log("csRoom.userList", csRoom.userList);

  let setUserActive = {
    member_id: item.member_id,
    room_id: item.room_id,
    socket_id: item.socket_id,
    name: item.name,
    message: item.message,
    message_id: item.message_id,
  };
  Object.assign(csRoom.userActive, setUserActive);

  socket.emit("reqReadMessage", {
    getRoomMessage: true,
    identity: 1,
    clientId: item.member_id,
    roomId: item.room_id,
    socketId: item.socket_id,
  });
  // csRoom.chatSectionDom.scrollTop = csRoom.chatSectionHeight;

  // await csRoom.scrollBottom()
  // console.log('csRoom.userActive',csRoom.userActive)
  // if(csRoom.userActive.member_id){
  // csRoom.chatSectionDom.scrollTop = await csRoom.chatSectionDom.scrollHeight;
  // csRoom.chatSectionDom.scrollTop = await csRoom.chatSectionDom.value.scrollHeight;
  // }
};
watch(
  csRoom.chatSectionDom,
  (state) => {
    console.log("state", state);
  },
  { deep: true }
);

const handleCloseInform = (leaveItem) => {
  let closeIndex = csRoom.leaveClient.indexOf(leaveItem);
  if (closeIndex !== -1) {
    csRoom.leaveClient.splice(closeIndex, 1);
  }
  console.log("csRoom.leaveClient", csRoom.leaveClient);
};
</script>
<template>
  <div
    :class="[
      'mr-16 xs:mr-0',
      tabList.active ? 'tabbar_func_open' : 'tabbar_func_closed',
    ]"
  >
    <!-- 列表 -->
    <div
      v-show="tabList.active === 1"
      :class="[
        'tabbar_func delay-200',
        tabList.active === 1 ? ' opacity-100' : 'opacity-0',
      ]"
    >
      <div class="tabbar_func_content">
        <div class="tabbar_title_wrap w-full flex items-center">
          <ChatIcon class="text-green-b50" />
          <span class="tabbar_title text-green-b70 mx-2.5 my-0">聊天列表</span>
        </div>
        <div
          v-if="!csRoom.userList.length"
          class="chat_list_empty text-gray-3 py-7 text-sm"
        >
          目前尚無聊天室
        </div>
        <div
          v-if="csRoom.userList.length"
          class="chat_list w-full rounded mx-0 my-5"
        >
          <div
            v-for="item in csRoom.userList"
            :key="item.member_id"
            class="chat rounded px-3.5 py-2.5 shadow-underLine cursor-pointer hover:bg-green-w20 ease-out duration-200"
            @click="handleUserChatList(item)"
            :class="[
              item.member_id === csRoom.userActive?.member_id ? 'active' : '',
            ]"
          >
            <div class="chat_info flex justify-between items-center mb-1.5">
              <div class="chat_name">{{ item.name }}</div>
              <div v-if="item.unread" class="unread text-xs font-light">
                {{ item.unread }}
              </div>
            </div>
            <div class="chat_msg flex items-center justify-between">
              <div class="chat_tag w-3/4 flex items-center">
                <ReturnIcon
                  v-show="item.message_status === 1"
                  class="min-w-3 text-green mr-1.5"
                />
                <span
                  v-show="item.message_status === 0"
                  class="chat_tags_opts selected inline-block text-sm text-gray-2 rounded-20 bg-green-w20 px-3.5 py-1.5 ml-1 border border-solid border-green"
                  >{{ item.answer }}</span
                >
                <div
                  v-show="item.message_status !== 0"
                  class="chat_list_msg text-ellipsis overflow-hidden line-clamp-1"
                >
                  {{ item.message }}
                </div>
              </div>
              <div class="chat_time text-xs flex items-end h-full text-gray-3">
                {{ csRoom.createdTimeClock(item.created_time) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 搜尋 -->

    <div v-show="tabList.active === 2" class="tabbar_func">
      <div class="tabbar_func_content">
        <div class="tabbar_title_wrap w-full flex items-center">
          <SearchIcon class="text-green-b50" />
          <span class="tabbar_title text-green-b70 mx-2.5 my-0">訊息搜尋</span>
        </div>
        <div class="search_filter_wrap w-full mx-0 my-5">
          <div class="search_filter flex flex-col items-start mb-2.5">
            <label for="" class="text-sm text-gray-2 m-1.5">
              <span class="required opacity-0">*</span>
              <span>事業群</span>
            </label>
            <select class="w-full" name="" id="">
              <option value="">請選擇事業群</option>
              <option value="">美語業群</option>
              <option value="">通路事業群</option>
              <option value="">學習顧問事業群</option>
              <option value="">千碩教育事業群</option>
              <option value="">大碩教育</option>
            </select>
          </div>
          <div class="search_filter flex flex-col items-start mb-2.5">
            <label for="" class="text-sm text-gray-2 m-1.5">
              <span class="required opacity-0">*</span>
              <span>網站</span>
            </label>
            <select class="w-full" name="" id="">
              <option value="">請選擇網站</option>
              <option value="">美語業群</option>
              <option value="">通路事業群</option>
              <option value="">學習顧問事業群</option>
              <option value="">千碩教育事業群</option>
              <option value="">大碩教育</option>
            </select>
          </div>
          <div class="search_filter flex flex-col items-start mb-2.5">
            <label for="" class="text-sm text-gray-2 m-1.5">
              <span class="required">*</span>
              <span>關鍵字</span>
            </label>
            <input class="w-full" type="text" />
          </div>
        </div>
        <div class="btn_primary--green">搜尋</div>
      </div>
      <div class="px-10 lg:px-40 md:px-20 sm:px-10 py-7">
        <div class="text-sm text-gray-2 mb-5">
          <span>搜尋結果 共 </span>
          <span class="search_result_countNum">4</span>
          <span> 個聊天室</span>
        </div>
        <div class="tabbar_title_wrap w-full flex items-center">
          <MemberIcon class="text-green-b50" />
          <span class="tabbar_title text-green-b70 mx-2.5 my-0">學員</span>
        </div>
        <div class="chat_list mx-0 my-5">
          <div
            v-for="item in chatList.list"
            :key="item.id"
            class="chat rounded px-3.5 py-2.5 shadow-underLine cursor-pointer hover:bg-green-w20 ease-out duration-200"
            @click="chatList.active = item.id"
            :class="{ active: item.id === chatList.active }"
          >
            <div class="chat_info flex justify-between items-center mb-1.5">
              <div class="chat_name text-gray-2">{{ item.customer }}</div>
              <div class="unread text-xs font-light">{{ item.unread }}</div>
            </div>
            <div class="chat_msg flex items-center justify-between">
              <div class="chat_tag flex items-center">
                <ReturnIcon
                  v-show="item.lastMsg.from === 'service'"
                  class="min-w-3 text-green mr-1.5"
                />
                <span
                  v-show="item.type === 'tag'"
                  class="chat_tags_opts selected inline-block text-sm text-gray-2 rounded-20 bg-green-w20 px-3.5 py-1.5 ml-1 border border-solid border-green"
                  >{{ item.lastTag }}</span
                >
                <span v-show="item.type === 'text'" class="text-gray-2">{{
                  item.lastMsg.msg
                }}</span>
              </div>
              <div class="chat_time text-xs flex items-end h-full text-gray-3">
                {{ item.time }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 分類 -->
    <div v-show="tabList.active === 3" class="tabbar_func">
      <div class="tabbar_func_content">
        <div class="tabbar_title_wrap w-full flex items-center">
          <ListIcon class="text-green-b50" />
          <span class="tabbar_title text-green-b70 mx-2.5 my-0">分類</span>
        </div>
        <div class="cate_group_wrap w-full mx-0 my-5">
          <div>
            <div
              v-for="item in category.group"
              :key="item.id"
              class="cate_group mb-3.5"
            >
              <div
                @click="handleGroup(item)"
                class="group_title flex items-center justify-between mx-0 my-1 cursor-pointer"
              >
                <span class="text-sm text-gray-2">{{ item.name }}</span>
                <TriangleIcon class="rotate-180 text-gray-4" />
              </div>
              <!-- v-show="item.open" -->
              <slideUpDown
                v-model="item.open"
                :duration="300"
                class="cate_website_wrap mx-0 my-2.5 overflow-hidden"
              >
                <div
                  v-for="webItem in item.list"
                  :key="webItem.webId"
                  :class="[
                    { active: webItem.webId === category.webActive },
                    'cate_website flex items-center px-4 py-2 cursor-pointer',
                  ]"
                  @click="category.webActive = webItem.webId"
                >
                  <div
                    :class="[
                      { 'opacity-0': !webItem.unread },
                      'unread text-xs font-light',
                    ]"
                  >
                    {{ webItem.unread }}
                  </div>
                  <span class="text-gray-1 ml-2.5">{{ webItem.webName }}</span>
                </div>
              </slideUpDown>
            </div>
          </div>
        </div>
        <div class="btn_primary--green">搜尋</div>
      </div>
      <div class="px-10 lg:px-40 md:px-20 xs:px-10 py-7">
        <div class="text-sm text-gray-2 mb-5">
          <span class="search_result_category">龍門轉學考官網</span>
        </div>
        <div class="tabbar_title_wrap w-full flex items-center">
          <MemberIcon class="text-green-b50" />
          <span class="tabbar_title text-green-b70 mx-2.5 my-0">學員</span>
        </div>
        <div class="chat_list mx-0 my-5">
          <div
            v-for="item in chatList.list"
            :key="item.id"
            class="chat rounded px-3.5 py-2.5 shadow-underLine cursor-pointer hover:bg-green-w20 ease-out duration-200"
            @click="chatList.active = item.id"
            :class="{ active: item.id === chatList.active }"
          >
            <div class="chat_info flex justify-between items-center mb-1.5">
              <div class="chat_name text-gray-2">{{ item.customer }}</div>
              <div class="unread text-xs font-light">{{ item.unread }}</div>
            </div>
            <div class="chat_msg flex items-center justify-between">
              <div class="chat_tag flex items-center">
                <ReturnIcon
                  v-show="item.lastMsg.from === 'service'"
                  class="min-w-3 text-green mr-1.5"
                />
                <span
                  v-show="item.type === 'tag'"
                  class="chat_tags_opts selected inline-block text-sm text-gray-2 rounded-20 bg-green-w20 px-3.5 py-1.5 ml-1 border border-solid border-green"
                  >{{ item.lastTag }}</span
                >
                <span v-show="item.type === 'text'" class="text-gray-2">{{
                  item.lastMsg.msg
                }}</span>
              </div>
              <div class="chat_time text-xs flex items-end h-full text-gray-3">
                {{ item.time }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <ul
    class="tabbar_section w-16 min-w-16 h-screen flex flex-col items-center bg-gray-7 pt-5 tabbar_section--xs fixed right-0"
  >
    <!-- xs:w-full xs:fixed xs:bottom-0 xs:left-0 xs:flex-row xs:justify-between xs:px-16 -->
    <!-- @click="
        item.id === tabList.active
          ? (tabList.active = 0)
          : (tabList.active = item.id)" -->
    <TabBtn
      v-for="item in tabList.list"
      :key="item.id"
      :tabList="tabList"
      :info="item"
      @click="toggleTab(item)"
    />
  </ul>

  <!-- 客戶端離開聊天室 提示 -->
  <div
    v-show="csRoom.leaveClient !== []"
    class="inform_section fixed top-11 right-16"
  >
    <transition-group name="informList">
      <div
        v-for="leaveItem in csRoom.leaveClient"
        :key="leaveItem"
        class="inform_window w-66 h-8 px-4 py-3 mb-0.5 flex justify-between items-center bg-green-w50 opacity-90 shadow-layer1 rounded transition ease-in-out duration-300"
      >
        <div class="text-sm text-gray-2 flex items-center">
          <span
            class="client_name max-w-29 mr-1 overflow-hidden whitespace-nowrap"
            >{{ leaveItem }}</span
          >
          <span class="text-gray-3"> 已離開聊天室</span>
        </div>
        <CrossIcon
          @click="handleCloseInform(leaveItem)"
          class="cursor-pointer"
        />
      </div>
    </transition-group>
  </div>
</template>

<style scoped>
.informList-leave-active,
.informList-enter-active {
  transition: 0.3s;
}
.informList-enter-from,
.informList-leave-to {
  opacity: 0;
}

.tabbar_func_open {
  @apply opacity-100 w-full max-w-66 xs:max-w-full transition-all duration-300 lg:max-w-[calc(100%-64px)];
}
.tabbar_func_closed {
  @apply max-w-0;
}

.btn_tab:hover {
  @apply border border-solid border-green;
}
/* min-w-66 */
.tabbar_func {
  @apply h-[calc(100vh-40px)] sm:h-[calc(100vh-104px)] lg:w-full overflow-x-hidden overflow-y-auto shadow-layer3;
}
.tabbar_func_content {
  @apply min-w-66 px-10 lg:px-40 md:px-20 sm:px-10 py-7 flex flex-col items-center shadow-underLine;
}
/* 分類 */
.cate_website.active {
  @apply bg-green-w50 rounded-[5rem];
}
.chat.active {
  @apply bg-green-w20;
}

.chat_tags_opts.selected {
  @apply bg-green-w50;
}
.tabbar_section--xs {
  @apply xs:w-full xs:h-14 xs:fixed xs:bottom-0 xs:left-0 xs:flex-row xs:justify-between xs:px-12;
}
.chat_name {
  @apply w-3/4 text-gray-2 overflow-hidden whitespace-normal text-ellipsis;
}
.chat_list_msg {
  @apply w-3/4 text-lg text-gray-2 overflow-hidden whitespace-normal text-ellipsis;
}
</style>
