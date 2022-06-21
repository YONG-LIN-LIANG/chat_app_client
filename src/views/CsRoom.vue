<script>
import Sidebar from '@/components/csRoom/Sidebar.vue'

export default {
	name: 'CsRoom',
	components: {
		Sidebar,
	},
}
</script>

<template>
	<Sidebar />
	<router-view></router-view>
</template>

<style scoped></style>
