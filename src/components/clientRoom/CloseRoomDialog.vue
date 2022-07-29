<template>
  <section class="px-11 py-7.5 text-center bg-white shadow-layer1">
    <h4>要結束對話嗎?</h4>
    <h4>請為此客服評分</h4>
    <div class="mt-2.5 text-gray-2 text-xs">
      <h4>請為客服人員 劉傑明 本次的服務評分</h4>
      <h4>留下評論讓我們做得更好</h4>
    </div>
    <div class="flex justify-center my-5">
      <div
        v-for="(item, idx) in 5"
        :key="idx"
        class="star cursor-pointer"
        @click="handleScore(idx)"
        @mouseover="handleMouseIn(idx)"
        @mouseleave="handleMouseOut(idx)"
      >
        <StarIcon :class="idx <= score - 1 ? 'text-green' : 'text-gray-6'" />
      </div>
    </div>
    <textarea class="w-full h-16 resize-none outline-0"></textarea>
    <button class="w-35 mt-5 p-2.5 mx-auto text-gray-2 bg-orange rounded-full">
      結束對話
    </button>
    <button
      class="w-35 mt-5 p-2.5 mx-auto text-gray-2 border border-orange rounded-full"
      @click="$emit('onCloseDialog')"
    >
      返回對話
    </button>
  </section>
</template>

<script>
import StarIcon from "@/components/svg/BigStar.vue";
// import { reactive } from '@vue/reactivity'
import { ref } from "vue";
export default {
  setup() {
    const score = ref(0);
    // const rating = reactive({
    //   score
    // })
    return { score };
  },
  components: {
    StarIcon,
  },
  methods: {
    handleScore(idx) {
      this.clickScore = idx + 1;
    },
    handleMouseIn(idx) {
      this.score = idx + 1;
    },
    handleMouseOut() {
      this.score = this.clickScore;
    },
  },
};
</script>

<style scoped>
.star + .star {
  @apply ml-2.5;
}
</style>
