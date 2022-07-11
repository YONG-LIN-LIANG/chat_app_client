export const handleFormatRoomListData = (roomList) => {
  const newRoomList = roomList.map((i) => {
    const newChatList = i.chatList.map((msg) => {
      if (msg.status === 0) {
        return {
          answer: msg.answer,
          createdTime: msg.created_time,
          question: msg.question,
          questionContent: msg.question_content,
          questionId: msg.question_id,
          status: msg.status,
        };
      } else if (msg.status === 1 || msg.status === 2) {
        return {
          status: msg.status,
          messageId: msg.message_id,
          memberId: msg.member_id,
          name: msg.name,
          message: msg.message,
          createdTime: msg.created_time,
        };
      }
    });
    const newRoomObject = {
      beginTime: i.begin_time,
      csName: i.cs_name,
      csMemberId: i.cs_member_id,
      endTime: i.end_time,
      group: i.group,
      isReadId: i.is_read_id,
      roomId: i.room_id,
      website: i.website,
      chatList: newChatList,
    };
    return newRoomObject;
  });
  return newRoomList;
};
