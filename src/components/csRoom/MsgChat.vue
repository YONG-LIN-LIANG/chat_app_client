<script setup>
import { reactive } from "@vue/reactivity";
import { useCsRoomStore } from "@/stores/csRoom";

const CsRoom = useCsRoomStore();
console.log("ddd", CsRoom.userChatList[0].chatList[0].createdTimeClock);

// const SourceList = reactive({
//   client: {
//     roomId: 0,
//     group: "",
//     website: "",
//     name: "",
//     uuid: "",
//     socketId: "",
//   },
//   data: [
//     {
//       roomId: "1",
//       group: "通路事業群",
//       website: "大碩研究所官網",
//       csName: "強尼逮",
//       systemChatList: [
//         // 用created_time判斷在message前或後
//         {
//           // 如果之後客服可以發送問題給客戶端，可用question_id來做一些判斷
//           status: 0,
//           question_id: 1,
//           question: "請選擇想詢問的問題",
//           optionList: ["雅思", "多益", "托福"],
//           answer: "雅思",
//           created_time: "2022-05-03 10:02",
//         },
//         {
//           status: 0,
//           question_id: 2,
//           question: "請選擇服務的客服人員",
//           // 有的話幫我塞名子，沒有的話空陣列
//           optionList: ["強尼逮", "由系統隨機指派"],
//           // answer如果為人名則選擇了某客服，如為空表示選擇了系統隨機指派
//           answer: "強尼逮",
//           created_time: "2022-05-03 14:02",
//         },
//       ],
//       chatList: [
//         {
//           status: 1,
//           name: "陳大倫",
//           msg: "安尼阿誰優",
//           isRead: false,
//           created_time: "2022-05-03 14:03",
//         },
//         {
//           status: 1,
//           name: "陳大倫",
//           msg: "有啥問題",
//           isRead: true,
//           created_time: "2022-05-03 14:04",
//         },
//         {
//           status: 2,
//           name: "Molly",
//           msg: "您好想請問您貴姓",
//           isRead: false,
//           created_time: "2022-05-03 14:10",
//         },
//         {
//           status: 1,
//           name: "陳大倫",
//           msg: "敝姓張",
//           isRead: false,
//           created_time: "2022-05-03 14:40",
//         },
//       ],
//     },
//     {
//       roomId: "2",
//       group: "美語事業群",
//       website: "洋碩官網",
//       csName: "尹思",

//       systemChatList: [
//         {
//           status: 0,
//           question_id: 1,
//           question: "請選擇想詢問的問題",
//           optionList: ["雅思", "多益", "托福"],
//           answer: "雅思",
//           created_time: "2022-05-04 14:10",
//         },
//         {
//           status: 0,
//           question_id: 2,
//           question: "請選擇服務的客服人員",
//           optionList: ["強尼逮", "由系統隨機指派"],
//           answer: "由系統隨機指派",
//           created_time: "2022-05-04 18:02",
//         },
//       ],

//       chatList: [
//         {
//           status: 1,
//           name: "尹思",
//           msg: "安安",
//           isRead: false,
//           created_time: "2022-05-04 14:00",
//         },
//         {
//           status: 2,
//           name: "Molly",
//           msg: "您好想請問您貴姓",
//           isRead: false,
//           created_time: "2022-05-04 14:10",
//         },
//         {
//           status: 1,
//           name: "尹思",
//           msg: "敝姓張",
//           isRead: false,
//           created_time: "2022-05-04 14:20",
//         },
//       ],
//     },
//   ],
// });

// // 把created_time轉換成時間代碼
// SourceList.data.forEach(function (i) {
//   // 把系統訊息跟聊天訊息合併，塞回原本data
//   const chatListAll = i.systemChatList.concat(i.chatList);
//   i["chatListAll"] = chatListAll;
//   // 依照陣列中物件的created_time排序
//   i.chatListAll.forEach((j) => {
//     j["timeCode"] = Math.floor(new Date(j.created_time) / 1000);
//   });
//   i.chatListAll.sort((a, b) => a.timeCode - b.timeCode);
//   //開始時間為 SourceList.data.chatListAll一時間排序後第一筆
//   i["startDate"] = i.chatListAll[0].created_time
//     .split(" ")[0]
//     .split("-")
//     .join("/");
// });
</script>
<template>
  <div
    class="
      chat_section
      px-10
      lg:px-7
      py-7
      flex
      items-center
      flex-col
      overflow-auto
      box-border
    "
  >
    <!-- v-for="item in SourceList.data" -->
    <div
      v-for="item in CsRoom.userChatList"
      :key="item.roomId"
      class="w-full flex items-center flex-col"
      data-part="0"
    >
      <div
        class="
          chat_date
          w-16
          relative
          text-xs
          font-light
          text-center text-gray-3
          mx-0
          my-5
        "
      >
        {{ item.beginTime.split(" ")[0].split("-").join("/") }}
      </div>
      <div class="chat_start">
        <div
          class="
            chat_status
            text-sm
            font-medium
            text-green-Default text-center
            mx-0
            my-1.5
          "
        >
          開始聊天
        </div>
        <div class="chat_source_wrap text-sm mx-0 my-5 text-center">
          <span class="text-sm text-gray-3 mr-1">來源 : </span>
          <span
            class="
              chat_source
              inline-block
              text-gray-2
              bg-orange-w20
              m-1
              px-3.5
              py-1
            "
            >{{ item.group }}</span
          >
          <span
            class="
              chat_source
              inline-block
              text-gray-2
              bg-orange-w20
              m-1
              px-3.5
              py-1
            "
            >{{ item.website }}</span
          >
        </div>
      </div>
      <div
        v-for="chatItem in item.chatList"
        :key="chatItem.createdTime"
        class="w-full mx-0 my-3"
      >
        <div v-if="chatItem.status === 0" class="chat_tags_wrap">
          <div
            class="chat_tags_ques text-xs text-gray-2 text-center mx-0 my-2.5"
          >
            {{ chatItem.question }}
          </div>
          <div class="chat_tags_opts_wrap flex justify-center">
            <div
              v-for="questionItem in chatItem.questionContent"
              :key="questionItem"
              :class="[
                { 'bg-green-w50': questionItem === chatItem.answer },
                'chat_tags_opts text-sm text-gray-2 rounded-20 m-1 border border-solid border-green-Default px-3.5 py-1.5 cursor-pointer',
              ]"
            >
              {{ questionItem }}
            </div>
          </div>
        </div>
        <div v-if="chatItem.status === 2" class="msg_receive">
          <span class="msg_receive_text bg-gray-6">{{ chatItem.message }}</span>
          <span
            class="
              msg_time
              text-xs
              font-light
              text-gray-3
              tracking-wide
              mx-2
              my-0.5
            "
            >{{ chatItem.createdTimeClock }}</span
          >
        </div>
        <div v-if="chatItem.status === 1" class="msg_send justify-end">
          <span
            class="
              msg_time
              text-xs
              font-light
              text-gray-3
              tracking-wide
              mx-2
              my-0.5
            "
            >{{ chatItem.createdTimeClock }}</span
          >
          <span class="msg_send_text bg-green-w50">{{ chatItem.message }}</span>
        </div>
      </div>

      <div v-if="item.endTime" class="chat_end">
        <div
          class="
            chat_status
            text-sm
            font-medium
            text-green-Default text-center
            mx-0
            my-1.5
          "
        >
          結束聊天
        </div>
        <div class="text-gray-3">
          <span class="text-xs">客服人員 : </span>
          <span class="text-xs">{{ item.csName }}</span>
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
</style>
