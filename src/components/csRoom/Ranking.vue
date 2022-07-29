<script setup>
import { reactive } from "vue";
import RankingInfo from "@/components/csRoom/RankingInfo.vue";
import SunIcon from "@/components/svg/Sun.vue";

const ratingList = reactive([
  {
    name: "林三良",
    averageRating: 5.0,
    totalRatingNum: 656,
    showDetail: false,
    ratingCal: [
      {
        rating: 5,
        number: 11,
      },
      {
        rating: 4,
        number: 20,
      },
      {
        rating: 3,
        number: 3,
      },
      {
        rating: 2,
        number: 5,
      },
      {
        rating: 1,
        number: 0,
      },
    ],
  },
  {
    name: "陳寶珠",
    averageRating: 4.8,
    totalRatingNum: 456,
    showDetail: false,
    ratingCal: [
      {
        rating: 5,
        number: 44,
      },
      {
        rating: 4,
        number: 23,
      },
      {
        rating: 3,
        number: 24,
      },
      {
        rating: 2,
        number: 35,
      },
      {
        rating: 1,
        number: 20,
      },
    ],
  },
  {
    name: "伊藤馬林",
    averageRating: 4.9,
    totalRatingNum: 373,
    showDetail: false,
    ratingCal: [
      {
        rating: 5,
        number: 2,
      },
      {
        rating: 4,
        number: 2022,
      },
      {
        rating: 3,
        number: 20,
      },
      {
        rating: 2,
        number: 20,
      },
      {
        rating: 1,
        number: 20,
      },
    ],
  },
  {
    name: "阿成",
    averageRating: 4.1,
    totalRatingNum: 373,
    showDetail: false,
    ratingCal: [
      {
        rating: 5,
        number: 20,
      },
      {
        rating: 4,
        number: 20,
      },
      {
        rating: 3,
        number: 20,
      },
      {
        rating: 2,
        number: 20,
      },
      {
        rating: 1,
        number: 20,
      },
    ],
  },
  {
    name: "阿成",
    averageRating: 3.7,
    totalRatingNum: 33,
    showDetail: false,
    ratingCal: [
      {
        rating: 5,
        number: 20,
      },
      {
        rating: 4,
        number: 20,
      },
      {
        rating: 3,
        number: 20,
      },
      {
        rating: 2,
        number: 20,
      },
      {
        rating: 1,
        number: 20,
      },
    ],
  },
  {
    name: "阿成",
    averageRating: 3.2,
    totalRatingNum: 33,
    showDetail: false,
    ratingCal: [
      {
        rating: 5,
        number: 20,
      },
      {
        rating: 4,
        number: 20,
      },
      {
        rating: 3,
        number: 20,
      },
      {
        rating: 2,
        number: 20,
      },
      {
        rating: 1,
        number: 20,
      },
    ],
  },
  {
    name: "阿成",
    averageRating: 2.5,
    totalRatingNum: 33,
    showDetail: false,
    ratingCal: [
      {
        rating: 5,
        number: 20,
      },
      {
        rating: 4,
        number: 20,
      },
      {
        rating: 3,
        number: 20,
      },
      {
        rating: 2,
        number: 20,
      },
      {
        rating: 1,
        number: 20,
      },
    ],
  },
]);
</script>

<template>
  <div class="ranking_section mt-10 ml-48 lg:ml-36 sm:ml-0 sm:mt-[104px]">
    <div class="title">客服排行榜</div>
    <div
      class="ranking_container min-h-screen p-7 sm:flex sm:flex-col sm:items-center"
    >
      <div class="ranking_wrap_top mb-6">
        <div
          v-for="(rateItem, idx) in ratingList"
          :key="rateItem.name"
          :class="[
            'h-14 flex items-center mb-1',
            { 'mb-3.5': idx < 2, 'mb-6': idx === 2 },
          ]"
        >
          <div
            class="ranking_rank w-14 min-w-14 h-14 flex items-center justify-center relative text-gray-2 mr-2"
          >
            <SunIcon v-if="idx < 3" />
            <span
              class="absolute top-1/2 left-1/2 translate-x-1/2Re translate-y-1/2Re leading-12"
              >{{ idx + 1 }}</span
            >
          </div>
          <RankingInfo :rateItem="rateItem" :idx="idx" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
