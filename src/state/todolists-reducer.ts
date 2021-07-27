import { v1 } from "uuid"
import { TodolistType } from "../api/todolist-api"

export type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

export type FilterValuesType = 'all'|'active'|'completed'

export type RemoveTodolistActionType = { 
  type: 'REMOVE-TODOLIST'
  id: string
}

export type AddTodolistActionType = { 
  type: 'ADD-TODOLIST'
  title: string
  todolistId: string
}

export type ChangeTodolistTitleActionType = { 
  type: 'CHANGE-TODOLIST-TITLE'
  id: string
  title: string
}

export type ChangeTodolistFilterActionType = { 
  type: 'CHANGE-TODOLIST-FILTER'
  filter: FilterValuesType
  id: string
}

export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
  status: boolean
}

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
  
  switch (action.type) {
      case 'REMOVE-TODOLIST': {
        return state.filter(tl => tl.id !== action.id)
      }
      case 'ADD-TODOLIST': {
        return [{
          id: action.todolistId,
          title: action.title,
          filter: 'all',
          addedDate: '',
          order: 0,
          status: false
        }, ...state]
      }
      case 'CHANGE-TODOLIST-TITLE': {
        const todolist = state.find(tl => tl.id === action.id)
        if(todolist) {
          todolist.title = action.title
        }
        return [...state]
      }
      case 'CHANGE-TODOLIST-FILTER': {
        const todolist = state.find(tl => tl.id === action.id)
        if(todolist) {
          todolist.filter = action.filter
        }
        return [...state]
      }
      default:
          return state
  }
}


export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
  return { type: 'REMOVE-TODOLIST', id: todolistId}
}

export const addTodolistAC = (title: string): AddTodolistActionType => {
  return { type: 'ADD-TODOLIST', title, todolistId: v1()}
}

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
  return { type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}

export const changeTodolistFilterAC = (value: FilterValuesType, todolistId: string): ChangeTodolistFilterActionType => {
  return { type: 'CHANGE-TODOLIST-FILTER', filter: value, id: todolistId}
}

