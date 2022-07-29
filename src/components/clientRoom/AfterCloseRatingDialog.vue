<template>
  <section class="px-11 py-7.5 text-center bg-white shadow-layer1">
    <h4>對話已結束</h4>
    <h4>請為此客服評分</h4>
    <div class="mt-2.5 text-gray-2 text-xs">
      <h4>請為客服人員 {{ csName }} 本次的服務評分</h4>
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
    <textarea
      v-model="comment"
      class="w-full h-16 py-2 resize-none outline-0"
    ></textarea>
    <button
      class="w-35 mt-5 p-2.5 mx-auto text-gray-2 bg-orange rounded-full"
      @click="handleRatingRoom"
    >
      送出評分
    </button>
  </section>
</template>

<script setup>
import StarIcon from "@/components/svg/BigStar.vue";
// import { reactive } from '@vue/reactivity'
import { ref } from "vue";
const emit = defineEmits(["onRatingRoom"]);
defineProps({
  csName: {
    type: String,
    default: "",
  },
});
const score = ref(0);
const clickScore = ref(0);
const comment = ref("");
// const rating = reactive({
//   score
// })
const handleScore = (idx) => {
  clickScore.value = idx + 1;
};
const handleMouseIn = (idx) => {
  score.value = idx + 1;
};
const handleMouseOut = () => {
  score.value = clickScore.value;
};

const handleRatingRoom = () => {
  console.log("dataaa", { rating: score.value, comment: comment.value });
  emit("onRatingRoom", {
    rating: score.value,
    comment: comment.value,
  });
};
</script>

<style scoped>
.star + .star {
  @apply ml-2.5;
}
</style>
