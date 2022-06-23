<script setup>
import { defineProps } from "vue";
import ChatIcon from "@/components/svg/Chat.vue";
import SearchIcon from "@/components/svg/Search.vue";
import ListIcon from "@/components/svg/List.vue";

const props = defineProps({
  info: Object,
  tabList: Object,
});
</script>
<template>
  <li
    :class="[
      'btn_tab w-11 h-14 flex flex-col items-center justify-center cursor-pointer text-sm text-green-b50 rounded-md border border-solid border-green-w50 mb-4 pt-0.5 btn_tab--xs',
      info.id === tabList.active ? 'bg-green-w20' : 'bg-white',
    ]"
  >
    <ChatIcon v-if="info.icon === 'ChatIcon'" class="mb-1 w-4" />
    <SearchIcon v-if="info.icon === 'SearchIcon'" class="mb-1 w-4" />
    <ListIcon v-if="info.icon === 'ListIcon'" class="mb-1 w-4" />
    <span class="select-none xs:hidden">{{ info.name }}</span>
  </li>
</template>

<style>
.btn_tab--xs {
  @apply xs:w-16 xs:h-9 xs:mx-4;
}
</style>
