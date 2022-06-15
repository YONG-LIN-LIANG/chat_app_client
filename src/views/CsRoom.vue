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
		// LeaveModule,
	},
}
</script>

<template>
	<Sidebar />
	<Msg />
	<!-- <Ranking /> -->
	<!-- <Score /> -->
	<!-- <LeaveModule /> -->
</template>

<style scoped></style>
