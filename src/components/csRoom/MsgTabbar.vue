<script setup>
import { reactive, defineProps } from "vue";
import ChatIcon from "@/components/svg/Chat.vue";
import SearchIcon from "@/components/svg/Search.vue";
import ListIcon from "@/components/svg/List.vue";
import MemberIcon from "@/components/svg/Member.vue";
import ReturnIcon from "@/components/svg/Return.vue";
import TriangleIcon from "@/components/svg/Triangle.vue";
import TabBtn from "@/components/csRoom/TabBtn.vue";
import slideUpDown from "vue3-slide-up-down";

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
const props = defineProps({
  tabList: {
    type: Object,
  },
});
console.log(props);
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
        <div class="chat_list w-full rounded mx-0 my-5">
          <div
            v-for="item in chatList.list"
            :key="item.id"
            class="
              chat
              rounded
              px-3.5
              py-2.5
              shadow-underLine
              cursor-pointer
              hover:bg-green-w20
              ease-out
              duration-200
            "
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
                  class="min-w-3 text-green-Default mr-1.5"
                />
                <span
                  v-show="item.type === 'tag'"
                  class="
                    chat_tags_opts
                    selected
                    inline-block
                    text-sm text-gray-2
                    rounded-20
                    bg-green-w20
                    px-3.5
                    py-1.5
                    ml-1
                    border border-solid border-green-Default
                  "
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
            class="
              chat
              rounded
              px-3.5
              py-2.5
              shadow-underLine
              cursor-pointer
              hover:bg-green-w20
              ease-out
              duration-200
            "
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
                  class="min-w-3 text-green-Default mr-1.5"
                />
                <span
                  v-show="item.type === 'tag'"
                  class="
                    chat_tags_opts
                    selected
                    inline-block
                    text-sm text-gray-2
                    rounded-20
                    bg-green-w20
                    px-3.5
                    py-1.5
                    ml-1
                    border border-solid border-green-Default
                  "
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
                class="
                  group_title
                  flex
                  items-center
                  justify-between
                  mx-0
                  my-1
                  cursor-pointer
                "
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
            class="
              chat
              rounded
              px-3.5
              py-2.5
              shadow-underLine
              cursor-pointer
              hover:bg-green-w20
              ease-out
              duration-200
            "
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
                  class="min-w-3 text-green-Default mr-1.5"
                />
                <span
                  v-show="item.type === 'tag'"
                  class="
                    chat_tags_opts
                    selected
                    inline-block
                    text-sm text-gray-2
                    rounded-20
                    bg-green-w20
                    px-3.5
                    py-1.5
                    ml-1
                    border border-solid border-green-Default
                  "
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
    class="
      tabbar_section
      w-16
      min-w-16
      h-screen
      flex flex-col
      items-center
      bg-gray-7
      pt-5
      tabbar_section--xs
      fixed
      right-0
    "
  >
    <!-- xs:w-full xs:fixed xs:bottom-0 xs:left-0 xs:flex-row xs:justify-between xs:px-16 -->
    <TabBtn
      v-for="item in tabList.list"
      :key="item.id"
      :tabList="tabList"
      :info="item"
      @click="
        item.id === tabList.active
          ? (tabList.active = 0)
          : (tabList.active = item.id)
      "
    />
  </ul>
</template>

<style scoped>
.tabbar_func_open {
  @apply opacity-100 w-full max-w-66 transition-all duration-500 lg:max-w-full;
}
.tabbar_func_closed {
  @apply max-w-0;
}

.btn_tab:hover {
  @apply border border-solid border-green-Default;
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
</style>
