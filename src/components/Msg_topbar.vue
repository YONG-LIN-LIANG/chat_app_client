<script>
import SearchIcon from '@/components/svg/Search.vue'
import UpIcon from '@/components/svg/Up.vue'
import DownIcon from '@/components/svg/Down.vue'

export default {
	props: {
		handle_chatEnd_closed: {
			type: Function,
		},
	},
	components: {
		SearchIcon,
		UpIcon,
		DownIcon,
	},
}
</script>

<template>
	<div class="section_msg_topbar w-full">
		<div class="msg_topbar h-16 px-14 lg:px-7 py-0 flex justify-between items-center box-border shadow-layer3">
			<div class="msg_name whitespace-nowrap text-lg font-medium text-gray-1">林三良</div>
			<div class="msg_funcgroup flex items-center justify-center">
				<div
					class="btn_search w-9 h-9 flex items-center justify-center cursor-pointer text-gray-2 bg-gray-6 hover:bg-green-w20 rounded-md mx-4 my-0 ease-in duration-300"
				>
					<SearchIcon class="search_icon" />
				</div>
				<div class="btn_primary--orange btn_endChat" @click="handle_chatEnd_closed()">結束對話</div>
			</div>
		</div>
		<div class="msg_search text-center px-0 py-5 shadow-layer3 hidden">
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
					class="btn_search w-10 h-10 flex items-center justify-center cursor-pointer text-white bg-green-Default hover:bg-green-w50 rounded-r ease-in duration-300"
				>
					<SearchIcon />
				</div>
			</div>
			<div class="search_date"></div>
			<div
				class="search_results flex items-center justify-center box-border text-xs text-gray-3 text-center border-0 mt-5"
			>
				<span>第</span>
				<input class="border-none w-10 h-10 mx-2.5 my-0 shadow-input" type="text" value="1" />
				<span>/</span>
				<span class="mx-2.5 my-0">4</span>
				<span>筆對話</span>
				<div class="btn_wrap flex mx-2.5 my-0">
					<div
						class="btn_UpDown w-9 h-6 flex items-center justify-center cursor-pointer bg-green-w50 text-gray-6 rounded-md mx-1 my-0"
						><UpIcon
					/></div>
					<div
						class="btn_UpDown w-9 h-6 flex items-center justify-center cursor-pointer bg-green-w50 text-gray-3 rounded-md mx-1 my-0"
						><DownIcon
					/></div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.search_tag.active {
	@apply bg-green-w50;
}

.input_search:focus {
	@apply border border-solid border-green-Default;
}
</style>
