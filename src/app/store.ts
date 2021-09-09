import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import { authReducer } from '../features/Login/auth-reducer'
import { tasksReducer } from '../features/TodolistsList/tasks-reducer'
import { todolistsReducer } from '../features/TodolistsList/todolists-reducer'
import { appReducer } from './app-reducer'

// creating the structure of the state object
const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer,
  auth: authReducer
})

// define the type of the entire state object
export type AppRootStateType = ReturnType<typeof rootReducer>

// create store
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

// to access the state through the browser console
// @ts-ignore
window.store = store