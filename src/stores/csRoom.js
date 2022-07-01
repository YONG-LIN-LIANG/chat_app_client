import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'

export const useCsRoomStore = defineStore('CsRoom', () => {
	const userActive = reactive({
		roomId: 0,
		group: '',
		website: '',
		name: '',
		socketId: '',
		memberId: 4,
		csMemberId: 11,
	})

	const userChatList = reactive([
		// room
		{
			roomId: 34,
			beginTime: '2022-05-21 12:21:33',
			endTime: '2022-05-24 12:20:33',
			group: '通路事業群',
			website: '大碩研究所官網',
			memberId: 4,
			csMemberId: 11,
			csName: '劉傑明',
			isReadId: 3,
			chatList: [
				{
					answer: '多益',
					createdTime: '2022-05-21 12:21:33',
					question: '請選擇想詢問的項目',
					questionContent: ['多益', '托福', '雅思'],
					questionId: 1,
					status: 0,
				},
				{
					answer: '由系統隨機指派',
					createdTime: '2022-05-21 13:21:33',
					question: '請選擇服務的客服人員',
					questionContent: ['劉傑明', '由系統隨機指派'],
					questionId: 2,
					status: 0,
				},
				// 人員文字訊息
				{
					createdTime: '2022-05-21 14:21:33',
					memberId: 4,
					csMemberId: 11,
					message: '請問課程',
					messageId: 3,
					status: 2,
				},
				{
					createdTime: '2022-05-21 15:21:33',
					memberId: 4,
					csMemberId: 11,
					message: '客服人員 盧立倫 在線為您服務',
					messageId: 3,
					status: 1,
				},
			],
		},
		{
			roomId: 0,
			beginTime: '2022-06-04 12:21:33',
			endTime: '',
			group: '通路事業群',
			website: '大碩研究所官網',
			memberId: 4,
			csMemberId: 11,
			csName: '劉傑明',
			isReadId: 3,
			chatList: [
				{
					answer: '托福',
					createdTime: '2022-05-21 12:21:33',
					question: '請選擇想詢問的項目',
					questionContent: ['多益', '托福', '雅思'],
					questionId: 1,
					status: 0,
				},
				{
					answer: '劉傑明',
					createdTime: '2022-05-21 13:21:33',
					question: '請選擇服務的客服人員',
					questionContent: ['劉傑明', '由系統隨機指派'],
					questionId: 2,
					status: 0,
				},
				// 人員文字訊息
				{
					createdTime: '2022-05-21 14:21:33',
					memberId: 4,
					csMemberId: 11,
					message: '請問課程',
					messageId: 3,
					status: 2,
				},
				{
					createdTime: '2022-05-21 15:21:33',
					memberId: 4,
					csMemberId: 11,
					message: '客服人員 盧立倫 在線為您服務',
					messageId: 3,
					status: 1,
				},
				{
					createdTime: '2022-05-21 15:23:33',
					memberId: 4,
					csMemberId: 11,
					message: '請問你有什麼問題',
					messageId: 3,
					status: 1,
				},
			],
		},
	])
	let userListActive = ref(1)
	const userList = reactive([
		// 第一個user
		{
			memberId: 1,
			name: '林三良',
			// 0:系統 1:客服 or 2:學生
			status: 1,
			answer: '托福',
			message: '請問課程',
			massageTime: '2022-06-21 12:21:33',
			unread: 6,
			roomId: 4,
			group: '通路事業群',
			website: '大碩研究所官網',
			socketId: 'dada',
		},
		{
			memberId: 2,
			name: '吳大揆',
			// 0:系統 1:客服 or 2:學生
			status: 0,
			answer: '托福',
			message: '',
			massageTime: '2022-06-20 12:21:33',
			unread: 5,
			roomId: 33,
			group: '美語事業群',
			website: '洋碩官網',
			socketId: 'dodo',
		},
		{
			memberId: 3,
			name: '伊藤馬林',
			// 0:系統 1:客服 or 2:學生
			status: 2,
			answer: '托福',
			message: '你好嗎',
			massageTime: '2022-06-19 12:21:33',
			unread: 1,
			roomId: 35,
			group: '美語事業群',
			website: '洋碩官網',
			socketId: 'dede',
		},
	])

	const formatChatListTime = () => {
		userChatList.forEach((i) => {
			i.chatList.forEach((j) => {
				j['createdTimeClock'] = j.createdTime.split(' ')[1].substring(0, 5)
			})
		})
	}
	formatChatListTime()

	const handleMsgSend = (inputValue) => {
		if (inputValue.trim()) {
			userChatList
				.find((i) => i.roomId === userActive.roomId)
				.chatList.push({
					createdTime: currentTimeFormat(),
					message: inputValue.trim(),
					status: 1,
					createdTimeClock: currentTimeFormat().split(' ')[1].substring(0, 5),
				})
		}
	}

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
		userActive,
		userChatList,
		userListActive,
		userList,
		handleMsgSend,
		currentTimeFormat,
		chatSectionDom,
	}
})
