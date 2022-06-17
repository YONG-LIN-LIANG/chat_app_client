<script>
import Sidebar from '@/components/Sidebar.vue'
import Msg from '@/components/Msg.vue'
import Ranking from '@/components/Ranking.vue'
import Score from '@/components/Score.vue'
// import LeaveModule from '@/components/LeaveModule.vue'

export default {
	name: 'CsRoom',
	components: {
		Sidebar,
		Msg,
		Ranking,
		Score,
	},
}
</script>

<template>
	<Sidebar />
	<router-view></router-view>
	<!-- <Msg /> -->
	<!-- <Ranking /> -->
	<!-- <Score /> -->
</template>

<style scoped></style>
