export const fetchChatData = async (startDate: Date, endDate: Date, token: string): Promise<ChatData> => {
  const option = {
    method: 'get',
    headers: {
      Authorization: `Token ${token}`
    }
  }
  const start = startDate.toISOString().split('T')[0]
  const end = endDate.toISOString().split('T')[0]

  const res = await fetch(
    `https://api.giosg.com/api/reporting/v1/rooms/84e0fefa-5675-11e7-a349-00163efdd8db/chat-stats/daily/?start_date=${start}&end_date=${end}`,
    option
  )
  const json = await res.json()

  const chatData = {
    totalConversationCount: json.total_conversation_count,
    totalUserMessageCount: json.total_user_message_count,
    totalVisitorMessageCount: json.total_visitor_message_count,
    byDate: json.by_date.map((date: any) => ({
      date: new Date(date.date),
      conversationCount: date.conversation_count,
      missedChatCount: date.missed_chat_count,
      visitorsWithConversationCount: date.visitors_with_conversation_count
    }))
  }

  return chatData
}
