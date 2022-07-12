import { defineStore } from 'pinia'
import { ref, reactive, computed, watch } from 'vue'
import { useSocketStore } from '@/stores/socket'


export const usecsRoomStore = defineStore('csRoom', () => {
	const cs = reactive({
		memberId: 1,
	})
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

	// const socket = useSocketStore().socket

	// const handleMsgSend = (inputValue) => {
	// 	console.log('userChatList',csRoom.userChatList)
	// 	console.log('csRoom.userActive',csRoom.userActive)
	// 	if (inputValue.trim()) {
	// 		let findRoom = userChatList.find((i) => i.room_id === 92)
	// 		console.log('findRoom',findRoom)
	// 		findRoom.chatList.push({
	// 			createdTime: currentTimeFormat(),
	// 			message: inputValue.trim(),
	// 			status: 1,
	// 			createdTimeClock: currentTimeFormat().split(' ')[1].substring(0, 5),
	// 		})
	// 		console.log('findRoom.chatList.length',findRoom.chatList.length)
		
	// 		socket.emit('reqSendMessage',{
	// 			name: userActive.name,
	// 			messageId: userList.message_id,
	// 			message: userList.message,
	// 			memberId: userActive.member_id,
	// 			identity: 2,
	// 			sockedId: userActive.socketId,
	// 			roomId: userActive.room_id,
	// 		})
	// 	}
	// }




	const currentTimeFormat = () => {
		let currentDate = new Date().toISOString().split('T')[0]
		let currentTime = new Date().toString('HH:mm:ss').split(' ')[4]
		let currentDateTime = `${currentDate} ${currentTime}`
		return currentDateTime
	}
	currentTimeFormat()
	// 把created_time轉換成時間代碼 並依照陣列中物件的created_time排序
	// userChatList.forEach(function (i) {
	// 	i.chatList.forEach((j) => {
	// 		j['timeCode'] = Math.floor(new Date(j.createdTime) / 1000)
	// 	})
	// 	i.chatList.sort((a, b) => a.timeCode - b.timeCode)
	// })
	// const divRef = ref(null)
	// const testSend = () => {
	// 	divRef.value.scrollTop = divRef.value.scrollHeight
	// }

	const chatSectionDom = ref()

	return {
		cs,
		userActive,
		userChatList,
		userList,
		currentTimeFormat,
		chatSectionDom,
		createdTimeClock,
	}
})
