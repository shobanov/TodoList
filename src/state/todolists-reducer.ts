import { Dispatch } from "redux"
import { todolistsAPI, TodolistType } from "../api/todolist-api"

export type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType | SetTodolistsActionType

export type FilterValuesType = 'all'|'active'|'completed'

export type RemoveTodolistActionType = { 
  type: 'REMOVE-TODOLIST'
  id: string
}

export type AddTodolistActionType = { 
  type: 'ADD-TODOLIST'
  todolist: TodolistType
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

export type SetTodolistsActionType = { 
  type: 'SET-TODOLISTS'
  todolists: Array<TodolistType>
}

export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
}

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
  
  switch (action.type) {
      case 'REMOVE-TODOLIST': {
        return state.filter(tl => tl.id !== action.id)
      }
      case 'ADD-TODOLIST': {
        const newTodolist: TodolistDomainType = {...action.todolist, filter: 'all'}
        return [newTodolist, ...state]
      }
      case 'CHANGE-TODOLIST-TITLE': {
        const todolist = state.find(tl => tl.id === action.id)
        if (todolist) {
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
      case 'SET-TODOLISTS': {
        return action.todolists.map(tl => {
          return {
            ...tl,
            filter: 'all'
          }
        })
      }
      default:
          return state
  }
}


export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
  return { type: 'REMOVE-TODOLIST', id: todolistId }
}

export const addTodolistAC = (todolist: TodolistType): AddTodolistActionType => {
  return { type: 'ADD-TODOLIST', todolist }
}

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
  return { type: 'CHANGE-TODOLIST-TITLE', id: id, title: title }
}

export const changeTodolistFilterAC = (value: FilterValuesType, todolistId: string): ChangeTodolistFilterActionType => {
  return { type: 'CHANGE-TODOLIST-FILTER', filter: value, id: todolistId }
}

export const setTodolistAC = (todolists: Array<TodolistType>): SetTodolistsActionType => {
  return { type: 'SET-TODOLISTS', todolists: todolists }
}


export const fetchTodolistsTC = () => {
  return async (dispatch: Dispatch) => {
    const res = await todolistsAPI.getTodolists()

    dispatch(setTodolistAC(res.data))
  }
}

export const removeTodolistTC = (todolistId: string) => {
  return (dispatch: Dispatch) => {
    todolistsAPI.deleteTodolist(todolistId)
      .then((res) => {
        dispatch(removeTodolistAC(todolistId))
      })
  }
}

export const addTodolistTC = (title: string) => {
  return (dispatch: Dispatch) => {
    todolistsAPI.createTodolist(title)
      .then((res) => {
        dispatch(addTodolistAC(res.data.data.item))
      })
  }
}

export const changeTodolistTitleTC = (id: string, title: string) => {
  return (dispatch: Dispatch) => {
    todolistsAPI.updateTodolist(id, title)
      .then((res) => {
        dispatch(changeTodolistTitleAC(id, title))
      })
  }
}