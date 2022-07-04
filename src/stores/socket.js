import { defineStore } from 'pinia'
export const useSocketStore = defineStore({
	id: 'socket',
	state: () => ({
		socket: {},
	}),
	actions: {
		setSocket(value) {
			this.socket = value
		},
	},
})
