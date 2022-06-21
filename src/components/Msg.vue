<script setup>
import { ref, reactive } from 'vue'
import Msg_topbar from '@/components/Msg_topbar.vue'
import Msg_chat from '@/components/Msg_chat.vue'
import Msg_send from '@/components/Msg_send.vue'
import Msg_tabbar from '@/components/Msg_tabbar.vue'
import LeaveModule from '@/components/LeaveModule.vue'

const chatEnd_closed = ref(true)
const handle_chatEnd_closed = () => {
	chatEnd_closed.value = !chatEnd_closed.value
}

const tabList = reactive({
	active: 0,
	list: [
		{ id: 1, name: '列表', icon: 'ChatIcon' },
		{ id: 2, name: '搜尋', icon: 'SearchIcon' },
		{ id: 3, name: '分類', icon: 'ListIcon' },
	],
})
</script>
<template>
	<div class="msg ml-48 lg:ml-36 sm:ml-0">
		<div class="title">訊息</div>
		<div class="flex mt-10 sm:mt-[6.5rem]">
			<div :class="['msg_chatBox w-full', tabList.active === 0 ? '' : 'lg:hidden']">
				<Msg_topbar @onToggle="handle_chatEnd_closed" />
				<Msg_chat />
				<Msg_send />
			</div>
			<Msg_tabbar :tabList="tabList" />
			<LeaveModule :chatEnd_closed="chatEnd_closed" @onToggle="handle_chatEnd_closed" />
		</div>
	</div>
</template>

<style></style>
