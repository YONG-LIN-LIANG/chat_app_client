<script setup>
import { defineProps } from 'vue'
import StarIcon from '@/components/svg/Star.vue'
const props = defineProps({
	rateItem: {
		type: Object,
		default: () => {},
	},
	idx: {
		type: Object,
		default: () => {},
	},
})
</script>
<template>
	<div
		:class="[
			'ranking_info w-85 h-12 flex items-center px-5 rounded-3xl  border border-solid ease-in-out duration-300',
			{
				top_bg: idx < 3,
				'border-green-neon': !rateItem.showDetail && idx < 3,
				'border-transparent': !rateItem.showDetail && idx > 2,
				'border-orange-Default': rateItem.showDetail,
			},
		]"
		@mouseover="rateItem.showDetail = true"
		@mouseleave="rateItem.showDetail = false"
	>
		<div class="ranking_name w-20 font-semibold">{{ rateItem.name }}</div>
		<div class="ranking_star_wrap flex items-center mr-5">
			<div class="ranking_star flex text-green-Default mr-2.5">
				<StarIcon v-for="i in 5" :key="i" :class="['mr-1', { ' text-gray-5': i > rateItem.averageRating }]" />
			</div>
			<div class="ranking_average w-6 text-center text-green-Default mr-1">
				{{ rateItem.averageRating }}
			</div>
		</div>
		<div class="ranking_amount whitespace-nowrap text-sm text-gray-3"> {{ rateItem.totalRatingNum }} 則 </div>
	</div>

	<transition name="swipe">
		<div v-show="rateItem.showDetail" class="w-62 h-105 relative overflow-hidden">
			<div class="w-14 h-px absolute bg-orange-Default top-1/2 left-0"></div>

			<div
				class="ranking_personal w-48 flex flex-col items-center justify-center bg-gray-7 rounded-xl p-5 border border-solid border-orange-Default absolute top-[40%] left-14"
			>
				<div
					v-for="ratingPer in rateItem.ratingCal"
					:key="ratingPer.rating"
					class="ranking_perstar w-32 h-8 flex items-center bg-white rounded-2xl mb-2.5 px-5"
				>
					<div class="ranking_star_wrap flex items-center mr-5">
						<div class="ranking_average text-green-Default mr-1">
							{{ ratingPer.rating }}
						</div>
						<div class="ranking_perstar_star flex text-green-Default">
							<StarIcon />
						</div>
					</div>
					<div class="ranking_amount whitespace-nowrap text-sm text-gray-3"> {{ ratingPer.number }} 則 </div>
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
</style>
