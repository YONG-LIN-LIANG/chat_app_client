<script setup>
import { ref, defineProps, computed, watch } from "vue";
import StarIcon from "@/components/svg/Star.vue";

const emit = defineEmits(["onRankingDetail"]);

const props = defineProps({
  rateItem: Object,
  idx: Number,
  ratingListHover: Number,
});

const starWidth = ref(null);
const averageRatingFloor = computed(() => {
  return Math.floor(props.rateItem.averageRating);
});
const averageRatingFloat = computed(() => {
  let last = props.rateItem.averageRating - averageRatingFloor.value;
  return Number(last.toFixed(1));
});
const starWidthCalc = computed(() => {
  let width = averageRatingFloor.value * 24;
  width += averageRatingFloat.value * 18;
  return `${width}px`;
});
// console.log('props',props.ratingListHover)
const ratingListHover = ref(0);
watch('() => {props.ratingListHover}',(a)=>{
console.log('a',a)
})
// const handleMouseOver = (num) => {
//   emit("onRankingDetail", num)
// };

</script>

<template>
  <div
    :class="[
      'ranking_info w-85 min-w-85 h-12 flex items-center px-5 rounded-3xl  border border-solid ease-in-out duration-300',
      {
        top_bg: props.idx < 3,
        'border-green-neon': !rateItem.showDetail && props.idx < 3,
        'border-transparent': !rateItem.showDetail && props.idx > 2,
        'border-orange': rateItem.showDetail,
      },
    ]"
    @mouseover="emit('onRankingDetail', props.idx)"
    @mouseleave="emit('onRankingDetail', null)"
  >
    <div class="ranking_name w-20 max-w-20 min-w-20 font-semibold whitespace-nowrap">{{ rateItem.name }}</div>
    <div class="ranking_star_wrap flex items-center mr-5">
      <div class="ranking_star flex text-green mr-2.5 w-32 min-w-32 relative">
        <!-- <StarIcon
          v-for="i in 5"
          :key="i"
          :class="['mr-1', { ' text-gray-5': i > rateItem.averageRating }]"
        /> -->
        <svg width="125" height="18" viewBox="0 0 125 18" fill="#bbdc75" xmlns="http://www.w3.org/2000/svg">;
            <defs>  
              <clipPath id="myClip">
                  <path d="M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885H6.97937L9 0Z" fill="red"/>;
              </clipPath>
            </defs>
            <defs>  
              <clipPath id="myClip">
                  <path d="M81 0L83.0206 6.21885H89.5595L84.2694 10.0623L86.2901 16.2812L81 12.4377L75.7099 16.2812L77.7306 10.0623L72.4405 6.21885H78.9794L81 0Z" fill=""/>;
                  <path d="M105 0L107.021 6.21885H113.56L108.269 10.0623L110.29 16.2812L105 12.4377L99.7099 16.2812L101.731 10.0623L96.4405 6.21885H102.979L105 0Z" fill=""/>;
              </clipPath>
            </defs>
        </svg>
        <div
          ref="starWidth"
          :style="{ width: starWidthCalc }"
          class="starColor bg-green h-6 absolute left-0 top-0"
        ></div>
      </div>
      <div class="ranking_average w-6 text-center text-green mr-1">
        {{ rateItem.averageRating }}
      </div>
    </div>
    <div class="ranking_amount whitespace-nowrap text-sm text-gray-3">
      {{ rateItem.totalRatingNum }} ???
    </div>
  </div>

  <transition name="swipe">
    <div
      v-show="props.ratingListHover === props.idx"
      class="w-62 h-105 relative overflow-hidden"
    >
      <div class="w-14 h-px absolute bg-orange top-1/2 left-0"></div>

      <div
        class="ranking_personal w-48 flex flex-col items-center justify-center bg-gray-7 rounded-xl p-5 border border-solid border-orange absolute top-[40%] left-14"
      >
        <div
          v-for="ratingPer in rateItem.ratingCal"
          :key="ratingPer.rating"
          class="ranking_perstar w-32 h-8 flex items-center bg-white rounded-2xl mb-2.5 px-5"
        >
          <div class="ranking_star_wrap flex items-center mr-5">
            <div class="ranking_average text-green mr-1">
              {{ ratingPer.rating }}
            </div>
            <div class="ranking_perstar_star flex text-green">
              <StarIcon />
            </div>
          </div>
          <div class="ranking_amount whitespace-nowrap text-sm text-gray-3">
            {{ ratingPer.number }} ???
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.ranking_info.top_bg {
  @apply border border-solid  bg-green-w20 shadow;
}

.swipe-enter-active {
  transition: 0.5s ease-in;
}
.swipe-enter-active {
  transition-delay: 100ms;
}
.swipe-enter-from,
.swipe-leave-to {
  opacity: 0;
  width: 0%;
}
.starColor {
  clip-path: url(#myClip);
}
</style>
