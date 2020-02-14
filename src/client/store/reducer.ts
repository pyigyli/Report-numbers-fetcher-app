import { AppEvents } from "./events"
import { Actions } from "./actions"
import { fetchChatData } from "../api/chatApi"

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
      return {...state, data}

    case AppEvents.RECEIVE_DATA:
      return {...state, data: action.payload}
  
    case AppEvents.FETCH_ERROR:
      return {...state, data: null}
    default:
      return state
  }
}
