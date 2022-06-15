<script>
import { ref } from 'vue'
import Msg_topbar from '@/components/Msg_topbar.vue'
import Msg_chat from '@/components/Msg_chat.vue'
import Msg_send from '@/components/Msg_send.vue'
import Msg_tabbar from '@/components/Msg_tabbar.vue'
import LeaveModule from '@/components/LeaveModule.vue'
export default {
	setup() {
		const chatEnd_closed = ref(true)
		const handle_chatEnd_closed = () => {
			chatEnd_closed.value = !chatEnd_closed.value
		}
		return { chatEnd_closed, handle_chatEnd_closed }
	},
	components: {
		Msg_topbar,
		Msg_chat,
		Msg_send,
		Msg_tabbar,
		LeaveModule,
	},
}
</script>
<template>
	<div class="msg ml-48 lg:ml-36 sm:ml-0">
		<div class="title">訊息</div>
		<div class="flex mt-10 sm:mt-[6.5rem]">
			<div class="msg_chatBox w-full lg:hidden">
				<Msg_topbar :handle_chatEnd_closed="handle_chatEnd_closed" />
				<Msg_chat />
				<Msg_send />
			</div>
			<Msg_tabbar />
			<LeaveModule :chatEnd_closed="chatEnd_closed" :handle_chatEnd_closed="handle_chatEnd_closed" />
		</div>
	</div>
</template>

<style></style>
