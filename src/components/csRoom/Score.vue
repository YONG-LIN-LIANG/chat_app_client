<script setup>
import { ref, reactive, watch, computed } from "vue";
import StarIcon from "@/components/svg/Star.vue";
import SearchIcon from "@/components/svg/Search.vue";
import TriangleIcon from "@/components/svg/Triangle.vue";
import PageStart from "@/components/svg/PageStart.vue";
import PageEnd from "@/components/svg/PageEnd.vue";
import Prev from "@/components/svg/Prev.vue";
import Next from "@/components/svg/Next.vue";

const comments = reactive([
  {
    name: "肚臍橙",
    rating: 5,
    website: " 大碩研究所官網",
    comment: "讚不絕口讚不絕口服服貼貼服服貼貼",
    created_time: "2022-01-05 14:10",
  },
  {
    name: "林昕柏辰",
    rating: 3,
    website: "洋碩官網",
    comment:
      "好像有一點哪裡怪怪的他好像有一點怪怪的好像有一點哪裡怪怪的他好像有一點怪怪的好像有一點哪裡怪怪的他好像有一點怪怪的",
    created_time: "2022-01-04 14:20",
  },
  {
    name: "林柏辰",
    rating: 3,
    website: "洋碩官網",
    comment: "普普",
    created_time: "2022-01-03 14:20",
  },
  {
    name: "林辰",
    rating: 3,
    website: "洋碩官網",
    comment: "喔",
    created_time: "2022-01-02 14:20",
  },
  {
    name: "余本",
    rating: 4,
    website: "洋碩官網",
    comment: "ㄛㄛ好",
    created_time: "2022-01-01 14:30",
  },
  {
    name: "茶茶",
    rating: 5,
    website: "洋碩官網",
    comment: "感覺克服很霸氣><喜翻>///<",
    created_time: "2022-01-01 14:40",
  },
  {
    name: "茶茶",
    rating: 5,
    website: "洋碩官網",
    comment: "感覺克服很霸氣><喜翻>///<",
    created_time: "2022-01-01 14:40",
  },
  {
    name: "茶茶",
    rating: 5,
    website: "洋碩官網",
    comment: "感覺克服很霸氣><喜翻>///<",
    created_time: "2022-01-01 14:40",
  },
  {
    name: "茶茶",
    rating: 5,
    website: "洋碩官網",
    comment: "感覺克服很霸氣><喜翻>///<",
    created_time: "2022-01-01 14:40",
  },
  {
    name: "茶茶",
    rating: 5,
    website: "洋碩官網",
    comment: "感覺克服很霸氣><喜翻>///<",
    created_time: "2022-01-01 14:40",
  },
  {
    name: "茶茶",
    rating: 5,
    website: "洋碩官網",
    comment: "感覺克服很霸氣><喜翻>///<",
    created_time: "2022-01-01 14:40",
  },
  {
    name: "茶茶",
    rating: 5,
    website: "洋碩官網",
    comment: "感覺克服很霸氣><喜翻>///<",
    created_time: "2022-01-01 14:40",
  },
  {
    name: "茶茶",
    rating: 5,
    website: "洋碩官網",
    comment: "感覺克服很霸氣><喜翻>///<",
    created_time: "2022-01-01 14:40",
  },
  {
    name: "茶茶",
    rating: 5,
    website: "洋碩官網",
    comment: "感覺克服很霸氣><喜翻>///<",
    created_time: "2022-01-01 14:40",
  },
  {
    name: "茶茶",
    rating: 5,
    website: "洋碩官網",
    comment: "感覺克服很霸氣><喜翻>///<",
    created_time: "2022-01-01 14:40",
  },
  {
    name: "茶茶",
    rating: 5,
    website: "洋碩官網",
    comment: "感覺克服很霸氣><喜翻>///<",
    created_time: "2022-01-01 14:40",
  },
]);
comments.forEach((i) => {
  i.timeCode = Math.floor(new Date(i.created_time) / 1000);
});
const commentsCount = comments.length;

// 評論一頁顯示的數量
const pageAmount = ref(10);
// 評論共有幾頁
const pageCount = computed(() => Math.ceil(commentsCount / pageAmount.value));

let pageActive = ref(3);

let commentsPage = reactive([]);
// 把所有評論分頁
// const handleCommentsPage = (comments, pageAmount, pageCount) => {
//   return Array.from({ length: pageCount }, () =>
//     comments.splice(0, pageAmount)
//   );
// };

// commentsPage = hamdleCommentsPage(comments, pageAmount, pageCount);
// hamdleCommentsPage(comments, pageAmount, pageCount);
// let commentsPage = computed(() => {
//   return Array.from({ length: pageCount.value }, () =>
//     comments.splice(0, pageAmount.value)
//   );
// });

// comments資料複製出來操作
let commentsCopy = JSON.parse(JSON.stringify(comments));

const handleCommentsPage = (comments, pageAmount, pageCount) => {
  commentsCopy = JSON.parse(JSON.stringify(comments));
  let newcommentsPage = Array.from({ length: pageCount.value }, () =>
    commentsCopy.splice(0, pageAmount.value)
  );
  Object.assign(commentsPage, newcommentsPage);
};
handleCommentsPage(commentsCopy, pageAmount, pageCount);

// 評論排序
// 評論排序預設為 1 最新
const pageSortSelect = ref("1");

watch(pageSortSelect, (newVal) => {
  switch (newVal) {
    case "1":
      comments.sort((a, b) => b.timeCode - a.timeCode);
      handleCommentsPage(comments, pageAmount, pageCount);

      break;
    case "2":
      comments.sort((a, b) => b.rating - a.rating);
      handleCommentsPage(comments, pageAmount, pageCount);

      break;
    case "3":
      comments.sort((a, b) => a.rating - b.rating);
      handleCommentsPage(comments, pageAmount, pageCount);

      break;
  }
});

//轉換created_time
comments.forEach((i) => {
  i.created_date = i.created_time.split(" ")[0].split("-").join("/");
});

// 計算星數評分數量
let ratingCount = reactive([
  { star: 5, count: 0 },
  { star: 4, count: 0 },
  { star: 3, count: 0 },
  { star: 2, count: 0 },
  { star: 1, count: 0 },
]);
const ratingCountFilter = ref(null);
const searchFilter = ref(true);

const handleToggleSearch = () => {
  searchFilter.value = !searchFilter.value;
};

comments.forEach((i) => {
  switch (i.rating) {
    case 1:
      ratingCount.find((i) => i.star === 1).count++;
      break;
    case 2:
      ratingCount.find((i) => i.star === 2).count++;
      break;
    case 3:
      ratingCount.find((i) => i.star === 3).count++;
      break;
    case 4:
      ratingCount.find((i) => i.star === 4).count++;
      break;
    case 5:
      ratingCount.find((i) => i.star === 5).count++;
      break;
  }
});
// 計算個人評分平均
let rateTotal = ref(0)
let rateAmount = ref(0)

const calRateAverage = () => {
  ratingCount.forEach((i) => {
      rateTotal.value += i.star * i.count
      rateAmount.value += i.count
  })
  rateAverage.value = rateTotal.value / rateAmount.value
}
calRateAverage()
const rateAverageFormat = ref(rateAverage.value.toFixed(1))
const rateAverageFloor = ref(Math.floor(rateAverage.value))


// pagination
let pageneighbor = reactive([]);
let newpageneighbor = [];
let j;
const pageLast = ref(10);
const handlePageShow = (pageActive)=>{
  if(pageActive < 3){
  Object.assign(pageneighbor, [2,3])
  pageneighbor.length = 2
  }
  else if(pageActive > pageLast.value - 2){
    Object.assign(pageneighbor, [pageActive.value-2, pageActive.value-1])
    pageneighbor.length = 2
  }
  else{
    j = 0
    for( let i = - 1 ; i < 2 ; i++){
      newpageneighbor[j] = pageActive + i
      j++
      // pageneighbor.push(pageActive + i)
    };
  }
  Object.assign(pageneighbor, newpageneighbor)
  // console.log(pageneighbor)
};
handlePageShow(pageActive.value);

const handleChangePage = (number) => {
  if (number < pageLast.value) {
    pageActive.value = number;
    handlePageShow(pageActive.value);
  }
};
const handleFirstPage = () => {
  pageActive.value = 1;
  newpageneighbor = [2, 3];
  Object.assign(pageneighbor, newpageneighbor);
  pageneighbor.length = 2;
};
const handleLastPage = () => {
  pageActive.value = pageLast.value;
  newpageneighbor = [pageLast.value - 2, pageLast.value - 1];
  Object.assign(pageneighbor, newpageneighbor);
  pageneighbor.length = 2;
};

const handlePrevPage = () => {
  if (pageActive.value === 2) {
    handleFirstPage();
  } else if (pageActive.value !== 1) {
    handleChangePage(pageActive.value - 1);
  }
};
const handleNextPage = () => {
  if (pageActive.value === pageLast.value - 1) {
    handleLastPage();
  } else if (pageActive.value !== pageLast.value) {
    handleChangePage(pageActive.value + 1);
  }
};
</script>
<template>
  <div class="msg mt-10 sm:mt-[104px] ml-48 lg:ml-36 sm:ml-0">
    <div class="title">個人評分</div>
    <div
      class="score_name flex items-center px-14 py-7 top_bg whitespace-nowrap xs:px-7"
    >
      <div class="ranking_name w-20 font-semibold">盧立倫</div>
      <div class="ranking_star_wrap flex items-center mr-5">
        <!-- <div class="ranking_star flex text-green mr-2.5">
          <StarIcon v-for="i in 5" :key="i" :class="['mr-1', i > rateAverageFloor ? 'flex items-center text-gray-6' : '']" />
        </div> -->
        <div class="ranking_star flex text-green mr- w-32 min-w-32 relative">
        <!-- <StarIcon
          v-for="i in 5"
          :key="i"
          :class="['mr-1', { ' text-gray-5': i > rateItem.averageRating }]"
        /> -->
        <svg width="125" height="18" viewBox="0 0 125 18" fill="#bbdc75" xmlns="http://www.w3.org/2000/svg">;
            <defs>  
              <clipPath id="scoreClip">
                  <path d="M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885H6.97937L9 0Z" fill="red"/>;
                  <path d="M33 0L35.0206 6.21885H41.5595L36.2694 10.0623L38.2901 16.2812L33 12.4377L27.7099 16.2812L29.7306 10.0623L24.4405 6.21885H30.9794L33 0Z" fill=""/>;
                  <path d="M57 0L59.0206 6.21885H65.5595L60.2694 10.0623L62.2901 16.2812L57 12.4377L51.7099 16.2812L53.7306 10.0623L48.4405 6.21885H54.9794L57 0Z" fill=""/>;
                  <path d="M81 0L83.0206 6.21885H89.5595L84.2694 10.0623L86.2901 16.2812L81 12.4377L75.7099 16.2812L77.7306 10.0623L72.4405 6.21885H78.9794L81 0Z" fill=""/>;
                  <path d="M105 0L107.021 6.21885H113.56L108.269 10.0623L110.29 16.2812L105 12.4377L99.7099 16.2812L101.731 10.0623L96.4405 6.21885H102.979L105 0Z" fill=""/>;
              </clipPath>
            </defs>
        </svg>
        <div ref="starWidth" :style="{'width': csStarWidthCalc}" class="starColor bg-green h-6 absolute left-0 top-0"></div>
      </div>
        <div class="ranking_average text-green mr-1">{{rateAverageFormat}}</div>
      </div>
      <div class="ranking_amount whitespace-nowrap text-sm text-gray-3">
        {{ commentsCount }} 則
      </div>
    </div>
    <div class="w-full px-6 flex lg:flex-col lg:items-center">
      <div class="score_container w-80">
        <div class="score_filter_section flex flex-col items-center px-10 py-3">
          <div
            v-for="item in ratingCount"
            :key="item.star"
            :class="[
              ratingCountFilter === item.star ? 'bg-green-w20' : '',
              'ranking_star_wrap w-56 flex items-center mr-5 px-4 py-2 rounded-20 cursor-pointer',
            ]"
            @click="ratingCountFilter = item.star"
          >
            <div class="ranking_star flex text-green mr-2.5">
              <StarIcon
                v-for="i in 5"
                :key="i"
                :class="[{ 'text-gray-6': item.star < i }, 'mr-1']"
              />
            </div>
            <div class="ranking_average text-green mr-5">
              {{ item.star }}
            </div>
            <div class="ranking_amount whitespace-nowrap text-sm text-gray-3">
              {{ item.count }} 則
            </div>
          </div>
        </div>
        <div class="search_filter_section px-10 py-3">
          <div
            class="search_filter_title h-10 flex items-center justify-between cursor-pointer"
            @click="handleToggleSearch()"
          >
            <div class="flex items-center">
              <SearchIcon class="text-gray-2 mr-2" />
              <span>搜尋評論</span>
            </div>
            <TriangleIcon
              :class="[
                'transition duration-300',
                searchFilter ? '' : 'rotate-180',
              ]"
            />
          </div>
          <form
            action=""
            :class="[
              'search_filter_toggle transition-all duration-300 ease-in-out overflow-hidden',
              searchFilter ? 'search_filter_open' : 'search_filter_close',
            ]"
          >
            <div class="chat_tags_opts_wrap my-4 flex">
              <input class="hidden" type="checkbox" id="tag_containComment" />
              <label
                for="tag_containComment"
                class="chat_tags_opts text-sm text-gray-2 rounded-20 m-1 border border-solid border-green px-3.5 py-1.5 cursor-pointer"
                checked
              >
                包含評論
              </label>
            </div>
            <!-- <form action="" class="mb-8"> -->
            <div class="flex flex-col items-start mb-2.5">
              <label for="" class="text-sm text-gray-2 m-1.5">
                <span class="required opacity-0">*</span>
                <span>關鍵字</span>
              </label>
              <input type="text" class="w-full" />
            </div>
            <div class="flex flex-col items-start mb-2.5">
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
            <div class="flex flex-col items-start mb-2.5">
              <label for="" class="text-sm text-gray-2 m-1.5">
                <span class="required opacity-0">*</span>
                <span>日期</span>
              </label>
              <div class="w-full flex flex-col items-center">
                <input type="date" class="w-full" />
                <p class="my-2">至</p>
                <input type="date" class="w-full border-red" />
              </div>
            </div>

            <div class="h-6 my-8 text-red text-center">請輸入完整日期區間</div>
            <div class="btn_primary--green mx-auto">搜尋</div>
            <p
              class="text-green-b50 my-4 text-center cursor-pointer hover:text-orange"
            >
              清除所有篩選條件
            </p>
          </form>
          <!-- </div> -->
        </div>
      </div>
      <div
        class="comment_container w-[calc(100%-20rem)] pb-10 lg:w-full px-10 sm:px-0"
      >
        <div class="flex items-center justify-between mb-3">
          <div class="comment_count text-gray-2 text-sm flex items-center">
            <span>共</span>
            <span class="mx-1">{{ commentsCount }}</span>
            <span>筆</span>
            <div class="flex items-center ml-4">
              <label
                for=""
                class="text-sm text-gray-2 mx-3 my-1.5 whitespace-nowrap"
              >
                一頁顯示
              </label>
              <select
                v-model="pageAmount"
                class="w-full h-7"
                name="pageAmount"
                id=""
              >
                <option value="5">5筆</option>
                <option value="10" selected>10筆</option>
                <option value="15">15筆</option>
              </select>
            </div>
          </div>
          <div class="flex items-center">
            <label
              for=""
              class="text-sm text-gray-2 mx-3 my-1.5 whitespace-nowrap"
            >
              排序
            </label>
            <select
              v-model="pageSortSelect"
              class="w-full h-7"
              name="pageSortSelect"
              id=""
            >
              <option value="1">最新</option>
              <option value="2">由高至低</option>
              <option value="3">由低至高</option>
            </select>
          </div>
        </div>
        <div
          v-for="(item, idx) in commentsPage"
          v-show="pageActive - 1 === idx"
          :key="idx"
          class="comment_list border border-green-neon rounded-xl p-4"
        >
          <!-- <div v-for="(item, idx) in comments" :key="idx" class="comment p-3"> -->
          <div v-for="comment in item" :key="comment.name" class="comment p-3">
            <div class="flex items-center justify-between sm:block">
              <div class="flex items-center">
                <div class="comment_name w-16 text-gray-3 text-sm">
                  {{ comment.name }}
                </div>
                <span class="chat_source whitespace-nowrap">
                  {{ comment.website }}
                </span>
              </div>
              <div class="comment_date text-xs text-gray-3">
                {{ comment.created_date }}
              </div>
            </div>
            <div class="flex items-center mt-2">
              <div class="comment_star flex items-center mr-3">
                <span class="text-gray-3 mr-1.5">{{ comment.rating }}</span>
                <StarIcon class="flex items-center text-green" />
              </div>
              <p class="comment_content text-gray-3">
                {{ comment.comment }}
              </p>
            </div>
          </div>
        </div>
        <div class="pagination_wrap my-10 flex justify-center">
          <div
            @click="handleFirstPage"
            :class="[
              'pagination',
              pageActive === 1 ? 'bg-gray-5 hover:bg-gray-5' : '',
            ]"
          >
            <PageStart class="text-white" />
          </div>
          <div
            @click="handlePrevPage"
            :class="[
              'pagination',
              pageActive === 1 ? 'bg-gray-5 hover:bg-gray-5' : '',
            ]"
          >
            <Prev class="text-white" />
          </div>

          <div
            :class="['pagination', pageActive === 1 ? 'bg-green' : '']"
            @click="handleFirstPage"
          >
            1
          </div>
          <div v-if="pageActive > 3" class="ellipsis">...</div>
          <div
            v-for="number in pageneighbor"
            :key="number"
            :class="['pagination', number === pageActive ? 'bg-green' : '']"
            @click="handleChangePage(number)"
          >
            {{ number }}
          </div>
          <div v-if="pageActive < pageLast - 2" class="ellipsis">...</div>
          <div
            :class="['pagination', pageActive === pageLast ? 'bg-green' : '']"
            @click="handleLastPage"
          >
            {{ pageLast }}
          </div>

          <div
            @click="handleNextPage"
            :class="[
              'pagination',
              pageActive === pageLast ? 'bg-gray-5 hover:bg-gray-5' : '',
            ]"
          >
            <Next class="text-white" />
          </div>
          <div
            @click="handleLastPage"
            :class="[
              'pagination',
              pageActive === pageLast ? 'bg-gray-5 hover:bg-gray-5' : '',
            ]"
          >
            <PageEnd class="text-white" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.comment + .comment {
  @apply border-t border-gray-6;
}

.search_filter_open {
  @apply h-165;
}
.search_filter_close {
  @apply h-0;
}
#tag_containComment:checked + .chat_tags_opts {
  @apply bg-green-w50;
}
.pagination {
  @apply w-7 h-9 mx-1 text-gray-2 text-sm bg-green-w50 flex items-center justify-center rounded-lg hover:bg-green cursor-pointer;
}
.ellipsis{
  @apply w-7 h-9 mx-1 text-gray-2 text-sm flex items-center justify-center ;
}
</style>
