interface ChatByDateData {
  date: Date,
  conversationCount: number,
  missedChatCount: number,
  visitorsWithConversationCount: number
}

interface ChatData {
  totalConversationCount: number,
  totalUserMessageCount: number,
  totalVisitorMessageCount: number,
  byDate: ChatByDateData[]
}

interface ChatFetchParameters {
  startDate: Date,
  endDate: Date,
  token: string
}
