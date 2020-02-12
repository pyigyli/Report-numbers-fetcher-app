import { AppEvents } from "./events"
import { Actions } from "./actions"
import { fetchChatData } from "../api/chat-api"

interface State {
  data: ChatData | Promise<ChatData> | null // Three different types to indicate 'data', 'loading data' and 'no data'
}

const initState: State = {
  data: null
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
