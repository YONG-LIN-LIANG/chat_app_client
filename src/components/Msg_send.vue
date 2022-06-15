<script>
import SendIcon from "@/components/svg/Send.vue";

export default {
  components: {
    SendIcon,
  },
};
</script>

<template>
  <div
    class="send_section w-full h-16 flex items-center px-7 py-0 shadow-layer3Re"
  >
    <input
      type="text"
      class="w-full h-10 send_input box-border px-2 py-0 m-2.5"
    />
    <SendIcon
      class="cursor-pointer text-orange-Default hover:text-orange-b90 m-2.5"
    />
  </div>
</template>

<style scoped></style>
