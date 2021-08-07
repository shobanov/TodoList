import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import { tasksReducer } from './tasks-reducer'
import { todolistsReducer } from './todolists-reducer'

// creating the structure of the state object
const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer
})

// define the type of the entire state object
export type AppRootStateType = ReturnType<typeof rootReducer>

// create store
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

// to access the state through the browser console
// @ts-ignore
window.store = store