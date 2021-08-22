import { Dispatch } from "redux"
import { todolistsAPI, TodolistType } from "../../api/todolist-api"

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST': 
      return state.filter(tl => tl.id !== action.todolistId)
    case 'ADD-TODOLIST': 
      return [{...action.todolist, filter: 'all'}, ...state]
    case 'CHANGE-TODOLIST-TITLE':
      return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
    case 'CHANGE-TODOLIST-FILTER':
      return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
    case 'SET-TODOLISTS': 
      return action.todolists.map(tl => ({...tl, filter: 'all'}))
    default:
      return state
  }
}

//actions
export const removeTodolistAC = (todolistId: string) => ({ type: 'REMOVE-TODOLIST', todolistId } as const)
export const addTodolistAC = (todolist: TodolistType) => ({ type: 'ADD-TODOLIST', todolist } as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({ type: 'CHANGE-TODOLIST-TITLE', id, title } as const)
export const changeTodolistFilterAC = (value: FilterValuesType, todolistId: string) => ({ type: 'CHANGE-TODOLIST-FILTER', filter: value, id: todolistId } as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({ type: 'SET-TODOLISTS', todolists } as const)

//thunks
export const fetchTodolistsTC = () => async (dispatch: Dispatch<ActionsType>) => {
  const res = await todolistsAPI.getTodolists()
  dispatch(setTodolistsAC(res.data))
}


export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
  todolistsAPI.deleteTodolist(todolistId)
    .then((res) => {
      dispatch(removeTodolistAC(todolistId))
    })
}

export const addTodolistTC = (title: string) => (dispatch: Dispatch<ActionsType>) => {
  todolistsAPI.createTodolist(title)
    .then((res) => {
      dispatch(addTodolistAC(res.data.data.item))
    })
}

export const changeTodolistTitleTC = (id: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
  todolistsAPI.updateTodolist(id, title)
    .then((res) => {
      dispatch(changeTodolistTitleAC(id, title))
    })
}

//types
type ActionsType =
  | AddTodolistActionType
  | SetTodolistsActionType
  | RemoveTodolistActionType
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof changeTodolistFilterAC>

export type FilterValuesType = 'all' | 'active' | 'completed'
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
}