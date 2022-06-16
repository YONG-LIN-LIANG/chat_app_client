<script>
import { ref, reactive, watch } from 'vue'
import StarIcon from '@/components/svg/Star.vue'
import SearchIcon from '@/components/svg/Search.vue'
import TriangleIcon from '@/components/svg/Triangle.vue'

export default {
	components: {
		StarIcon,
		SearchIcon,
		TriangleIcon,
	},
	setup() {
		const comments = reactive([
			{
				name: '肚臍橙',
				rating: 5,
				website: ' 大碩研究所官網',
				comment: '讚不絕口讚不絕口服服貼貼服服貼貼',
				created_time: '2022-01-05 14:10',
			},
			{
				name: '林昕柏辰',
				rating: 3,
				website: '洋碩官網',
				comment:
					'好像有一點哪裡怪怪的他好像有一點怪怪的好像有一點哪裡怪怪的他好像有一點怪怪的好像有一點哪裡怪怪的他好像有一點怪怪的',
				created_time: '2022-01-04 14:20',
			},
			{
				name: '林柏辰',
				rating: 3,
				website: '洋碩官網',
				comment: '普普',
				created_time: '2022-01-03 14:20',
			},
			{
				name: '林辰',
				rating: 3,
				website: '洋碩官網',
				comment: '喔',
				created_time: '2022-01-02 14:20',
			},
			{
				name: '余本',
				rating: 4,
				website: '洋碩官網',
				comment: 'ㄛㄛ好',
				created_time: '2022-01-01 14:30',
			},
			{
				name: '茶茶',
				rating: 5,
				website: '洋碩官網',
				comment: '感覺克服很霸氣><喜翻>///<',
				created_time: '2022-01-01 14:40',
			},
		])
		const commentsCount = comments.length

		// 評論排序
		// 評論排序預設為 1 最新
		const sort = ref('1')

		comments.forEach((i) => {
			i.timeCode = Math.floor(new Date(i.created_time) / 1000)
		})

		watch(sort, (newVal, oldVal) => {
			switch (newVal) {
				case '1':
					comments.sort((a, b) => b.timeCode - a.timeCode)
					break
				case '2':
					comments.sort((a, b) => b.rating - a.rating)
					break
				case '3':
					comments.sort((a, b) => a.rating - b.rating)
					break
			}
		})

		//轉換created_time
		comments.forEach((i) => {
			i.created_date = i.created_time.split(' ')[0].split('-').join('/')
		})

		// 計算星數評分數量
		let ratingCount = reactive([
			{ star: 5, count: 0 },
			{ star: 4, count: 0 },
			{ star: 3, count: 0 },
			{ star: 2, count: 0 },
			{ star: 1, count: 0 },
		])
		const ratingCountFilter = ref(5)
		const searchFilter = ref(true)

		const handleToggleSearch = () => {
			searchFilter.value = !searchFilter.value
		}

		comments.forEach((i) => {
			switch (i.rating) {
				case 1:
					ratingCount.find((i) => i.star === 1).count++
					break
				case 2:
					ratingCount.find((i) => i.star === 2).count++
					break
				case 3:
					ratingCount.find((i) => i.star === 3).count++
					break
				case 4:
					ratingCount.find((i) => i.star === 4).count++
					break
				case 5:
					ratingCount.find((i) => i.star === 5).count++
					break
			}
		})

		return { comments, commentsCount, ratingCount, ratingCountFilter, searchFilter, handleToggleSearch, sort }
	},
}
</script>
<template>
	<div class="msg mt-10 sm:mt-[104px] ml-48 lg:ml-36 sm:ml-0">
		<div class="title">個人評分</div>
		<div class="score_name flex items-center px-14 py-7 top_bg whitespace-nowrap xs:px-7">
			<div class="ranking_name w-20 font-semibold">盧立倫</div>
			<div class="ranking_star_wrap flex items-center mr-5">
				<div class="ranking_star flex text-green-Default mr-2.5">
					<StarIcon class="mr-1" />
					<StarIcon class="mr-1" />
					<StarIcon class="mr-1" />
					<StarIcon class="mr-1" />
					<StarIcon class="mr-1 flex items-center text-gray-6" />
				</div>
				<div class="ranking_average text-green-Default mr-1">5.0</div>
			</div>
			<div class="ranking_amount whitespace-nowrap text-sm text-gray-3"> {{ commentsCount }} 則 </div>
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
						<div class="ranking_star flex text-green-Default mr-2.5">
							<StarIcon v-for="i in 5" :key="i" :class="[{ 'text-gray-6': item.star < i }, 'mr-1']" />
						</div>
						<div class="ranking_average text-green-Default mr-5">
							{{ item.star }}
						</div>
						<div class="ranking_amount whitespace-nowrap text-sm text-gray-3"> {{ item.count }} 則 </div>
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
						<TriangleIcon :class="['transition duration-300', searchFilter ? '' : 'rotate-180']" />
					</div>
					<div
						:class="[
							'search_filter_toggle transition-all duration-300 ease-in-out overflow-hidden',
							searchFilter ? 'search_filter_open' : 'search_filter_close',
						]"
					>
						<div class="chat_tags_opts_wrap my-4 flex">
							<div
								class="chat_tags_opts text-sm text-gray-2 rounded-20 m-1 bg-white border border-solid border-green-Default px-3.5 py-1.5"
							>
								包含評論
							</div>
						</div>
						<form action="" class="mb-10">
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
						</form>
						<div class="btn_primary--green mx-auto">搜尋</div>
						<p class="text-green-b50 my-4 text-center cursor-pointer hover:text-orange-Default">
							清除所有篩選條件
						</p>
					</div>
				</div>
			</div>
			<div class="comment_container w-[calc(100%-20rem)] py-10 lg:w-full px-10 sm:px-0">
				<div class="flex items-center justify-between mb-3">
					<div class="comment_count text-gray-2 text-sm">
						<span>共</span>
						<span class="mx-1">{{ commentsCount }}</span>
						<span>筆評論</span>
					</div>
					<div class="flex items-center">
						<label for="" class="text-sm text-gray-2 mx-3 my-1.5 whitespace-nowrap"> 排序 </label>
						<select v-model="sort" class="w-full h-7" name="" id="">
							<option value="1">最新</option>
							<option value="2">由高至低</option>
							<option value="3">由低至高</option>
						</select>
					</div>
				</div>
				<div class="comment_list border border-green-neon rounded-xl p-4">
					<div v-for="(item, idx) in comments" :key="idx" class="comment p-3">
						<div class="flex items-center justify-between sm:block">
							<div class="flex items-center">
								<div class="comment_name w-16 text-gray-3 text-sm">
									{{ item.name }}
								</div>
								<span class="chat_source whitespace-nowrap">
									{{ item.website }}
								</span>
							</div>
							<div class="comment_date text-xs text-gray-3">
								{{ item.created_date }}
							</div>
						</div>
						<div class="flex items-center mt-2">
							<div class="comment_star flex items-center mr-3">
								<span class="text-gray-3 mr-1.5">{{ item.rating }}</span>
								<StarIcon class="flex items-center text-green-Default" />
							</div>
							<p class="comment_content text-gray-3">{{ item.comment }}</p>
						</div>
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
	@apply h-151;
}
.search_filter_close {
	@apply h-0;
}
</style>
