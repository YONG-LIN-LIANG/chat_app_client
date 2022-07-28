import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { Socket } from 'socket.io-client'




export const usecsRoomStore = defineStore('csRoom', () => {


	const cs = reactive({})
	let userActive = reactive({})
	let userChatList = reactive([])
	const userList = reactive([])

	
	const formatChatListTime = () => {
		userChatList.forEach((i) => {
			i.chatList.forEach((j) => {
				j['createdTimeClock'] = j.createdTime.split(' ')[1].substring(0, 5)
			})
		})
	}
	formatChatListTime()

	const createdTimeClock = (created_time) => {
		return created_time.split(' ')[1].substring(0, 5)
	}


	const currentTimeFormat = () => {
		let currentDate = new Date().toISOString().split('T')[0]
		let currentTime = new Date().toString('HH:mm:ss').split(' ')[4]
		let currentDateTime = `${currentDate} ${currentTime}`
		return currentDateTime
	}
	currentTimeFormat()

	const chatSectionDom = ref(null)
	const chatSectionHeight = ref(null)

	//客戶端離開聊天室 提示
	let leaveClient = reactive([])
	// 打字中
	let isTyping = ref(false)
	// 視窗寬度
	let windowWidth = ref(window.innerWidth)


	
	return {
		cs,
		userActive,
		userChatList,
		userList,
		currentTimeFormat,
		chatSectionDom,
		chatSectionHeight,
		createdTimeClock,
		leaveClient,
		isTyping,
		windowWidth,
	}
})
