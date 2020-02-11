import { AppEvents } from "./events"
import { Actions } from "./actions"
import { fetchChatData } from "../api/chats-api"

interface State {
  data: ChatData | Promise<ChatData>
}

const initState: State = {
  data: {
    totalConversationCount: 0,
    totalUserMessageCount: 0,
    totalVisitorMessageCount: 0,
    byDate: {
      conversationCount: 0,
      missedChatCount: 0,
      visitorsWithConversationCount: 0
    }
  }
}

export const reducer = (state: State = initState, action: Actions) => {
  switch (action.type) {

    case AppEvents.FETCH_DATA:
      const {startDate, endDate, token} = action.payload
      const data = fetchChatData(startDate, endDate, token)
      return {...state, data, isFetchingChatData: true}

    case AppEvents.RECEIVE_DATA:
      return {...state, data: action.payload}
  
    default:
      return state
  }
}
