<script>
import CSLogo from '@/components/svg/Logo.vue'
import StarIcon from '@/components/svg/Star.vue'
import Hamburger from '@/components/svg/Hamburger.vue'
import { ref, reactive } from 'vue'
export default {
	setup() {
		const menu = reactive({
			active: 0,
			list: [
				{
					id: 0,
					name: '訊息',
				},
				{
					id: 1,
					name: '排行榜',
				},
				{
					id: 2,
					name: '登出',
				},
			],
		})
		// 預設頁面為訊息頁
		const menuList_active = ref('訊息')

		return {
			menu,
			// menuList,
			menuList_active,
		}
	},
	components: {
		CSLogo,
		StarIcon,
		Hamburger,
	},
}
</script>

<template>
	<!-- desktop -->
	<div
		class="sidebar_section w-48 lg:w-36 sm:w-full h-full sm:h-fit bg-green-w20 fixed z-30 top-0 sm:top-16 left-0 shadow-layer1 border-b border-solid"
	>
		<div class="sidebar_info box-border px-8 lg:px-3.5 py-6 border-b border-solid border-white sm:hidden">
			<div class="flex items-center justify-between xxs:hidden">
				<div class="sidebar_logo w-9 flex">
					<CSLogo />
				</div>
				<div class="sidebar_title whitespace-nowrap text-lg font-medium text-purple">客服平台</div>
			</div>
			<div class="flex mt-4 sm:mt-0 justify-between sm:justify-center sm:hidden xxs:flex">
				<span class="sidabar_user_name text-sm text-gray-2">盧立倫</span>
				<div
					class="sidabar_user_score px-2 mx-4 lg:mx-2 flex items-center cursor-pointer text-sm bg-white text-green-b50 hover:bg-green-w50 rounded-xl ease-out duration-200"
				>
					<StarIcon class="w-4 text-green-Default" />
					<span>4.9</span>
				</div>
			</div>
		</div>
		<ul class="sidebar_menu sm:hidden">
			<!-- <li
				v-for="item in menuList"
				@click="menuList_active = item"
				:class="['cursor-pointer font-normal', { active: item === menuList_active }]"
				:key="item"
				>{{ item }}</li
			> -->

			<li
				v-for="item in menu.list"
				@click="menu.active = item.id"
				:class="[
					'sm:h-11 cursor-pointer font-normal text-gray-1 leading-7 px-8 lg:px-3.5 py-1.5 sm:text-center ',
					menu.active === item.id ? 'bg-green-w50 ' : 'bg-transparent',
				]"
				:key="item.id"
				>{{ item.name }}</li
			>
		</ul>
	</div>
	<!-- mobile -->
	<div
		class="sidebar_section--mobile h-16 px-7 w-full hidden sm:flex items-center justify-between bg-green-w20 fixed top-0 left-0 z-50"
	>
		<div class="flex items-center">
			<div class="flex items-center justify-between">
				<div class="sidebar_logo w-9 mr-2 flex">
					<CSLogo />
				</div>
				<div class="sidebar_title whitespace-nowrap text-lg font-medium text-purple">客服平台</div>
			</div>
			<div class="mx-5 flex items-center justify-between xxs:hidden">
				<span class="sidabar_user_name text-sm text-gray-2 whitespace-nowrap">盧立倫</span>
				<div
					class="sidabar_user_score px-2 mx-4 lg:mx-2 flex items-center cursor-pointer text-sm bg-white text-green-b50 hover:bg-green-w50 rounded-xl ease-out duration-200"
				>
					<StarIcon class="w-4 text-green-Default" />
					<span>4.9</span>
				</div>
			</div>
		</div>
		<Hamburger />
	</div>
</template>

<style scoped>
.sidebar_menu li.active {
	@apply bg-green-w50;
}
</style>
