<script setup>
import { ref, defineEmits } from "vue";

import SearchIcon from "@/components/svg/Search.vue";
import UpIcon from "@/components/svg/Up.vue";
import DownIcon from "@/components/svg/Down.vue";

import { usecsRoomStore } from "@/stores/csRoom";
const csRoom = usecsRoomStore()

const searchOpen = ref(false);
const toggle_searchOpen = () => {
  searchOpen.value = !searchOpen.value;
};

const emit = defineEmits(["onToggle"]);
const handleToggleDialog = () => {
  emit("on-toggle");
};

</script>

<template>
  <div class="section_msg_topbar w-full">
    <div
      class="msg_topbar h-16 px-14 lg:px-7 py-0 flex justify-between items-center box-border shadow-layer3"
    >
      <div  class="msg_name line-clamp-1 text-clip text-ellipsis text-lg font-medium text-gray-1">
        {{csRoom.userActive.name}}
      </div>
     
      <div class="msg_funcgroup flex items-center justify-center">
        <div
          class="btn_search w-9 h-9 flex items-center justify-center cursor-pointer text-gray-2 bg-gray-6 hover:bg-green-w20 rounded-md mx-4 my-0 ease-in duration-300"
          @click="toggle_searchOpen()"
        >
          <SearchIcon class="search_icon" />
        </div>
        <div
          class="btn_primary--orange btn_endChat"
          @click="handleToggleDialog();csRoom.handleEndChat"
        >
          結束對話
        </div>
      </div>
    </div>
    <div :class="searchOpen ? 'msg_search_open' : 'msg_search_closed'">
      <div
        v-show="searchOpen"
        :class="[
          'msg_search text-center px-0 py-5 shadow-layer3 transition-all delay-100',
        ]"
      >
        <div class="tracking-wide">搜尋對話</div>
        <div class="flex justify-center m-5">
          <div class="search_tag active">關鍵字</div>
          <div class="search_tag">日期</div>
        </div>
        <div class="flex justify-center items-center">
          <input
            type="text"
            class="input_search w-64 h-10 box-border tracking-wider rounded-r-none px-2.5 py-0"
          />
          <div
            class="btn_search w-10 h-10 flex items-center justify-center cursor-pointer text-white bg-green hover:bg-green-w50 rounded-r ease-in duration-300"
          >
            <SearchIcon />
          </div>
        </div>
        <div class="search_date"></div>
        <div
          class="search_results flex items-center justify-center box-border text-xs text-gray-3 text-center border-0 mt-5"
        >
          <span>第</span>
          <input
            class="border-none w-10 h-10 mx-2.5 my-0 shadow-input"
            type="text"
            value="1"
          />
          <span>/</span>
          <span class="mx-2.5 my-0">4</span>
          <span>筆對話</span>
          <div class="btn_wrap flex mx-2.5 my-0">
            <div
              class="btn_UpDown w-9 h-6 flex items-center justify-center cursor-pointer bg-green-w50 text-gray-6 rounded-md mx-1 my-0"
            >
              <UpIcon />
            </div>
            <div
              class="btn_UpDown w-9 h-6 flex items-center justify-center cursor-pointer bg-green-w50 text-gray-3 rounded-md mx-1 my-0"
            >
              <DownIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.msg_search_open {
  @apply h-60 transition-all duration-500;
}
.msg_search_closed {
  @apply h-0;
}
.search_tag.active {
  @apply bg-green-w50;
}

.input_search:focus {
  @apply border border-solid border-green;
}
.msg_name{
  overflow-wrap: anywhere;
}
</style>
