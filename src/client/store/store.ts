import { createStore, combineReducers } from 'redux'
import { reducer as appReducer } from './reducer'

const reducers = combineReducers({
  app: appReducer
})

export type AppState = ReturnType<typeof reducers>
export const store = createStore(reducers)
