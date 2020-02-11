interface ChatData {
  totalConversationCount: number,
  totalUserMessageCount: number,
  totalVisitorMessageCount: number,
  byDate: {
    conversationCount: number,
    missedChatCount: number,
    visitorsWithConversationCount: number
  }
}

interface ChatFetchParameters {
  startDate: Date,
  endDate: Date,
  token: string
}
