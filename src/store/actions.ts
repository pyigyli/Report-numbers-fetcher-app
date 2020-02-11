import { AppEvents } from './events'

// High order function to simplify the creation of new actions
const makeAction = <T extends AppEvents, P>(type: T) => (payload: P) => {
  return {
    type,
    payload
  }
}

export const fetchChatData = makeAction<AppEvents.FETCH_DATA, ChatFetchParameters>(AppEvents.FETCH_DATA)
export const receiveChatData = makeAction<AppEvents.RECEIVE_DATA, ChatData>(AppEvents.RECEIVE_DATA)

// Provides convinience and type safety by letting the compiler keep track of every type our actions have
interface ActionMap<T> {
  [key: string]: T
}
type AnyFunction = (...args: any[]) => any
type ActionUnion<A extends ActionMap<AnyFunction>> = ReturnType<A[keyof A]>

const actions = {
  fetchChatData,
  receiveChatData
}

export type Actions = ActionUnion<typeof actions>
