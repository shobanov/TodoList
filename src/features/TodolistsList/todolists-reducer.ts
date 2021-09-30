import { Dispatch } from "redux"
import { todolistsAPI, TodolistType } from "../../api/todolist-api"
import { RequestStatusType, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType } from "../../app/app-reducer"
import { handleServerNetworkError } from "../../utils/error-utils"

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter(tl => tl.id !== action.todolistId)
    case 'ADD-TODOLIST':
      return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
    case 'CHANGE-TODOLIST-TITLE':
      return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
    case 'CHANGE-TODOLIST-FILTER':
      return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
    case 'CHANGE-TODOLIST-ENTITY-STATUS':
      return state.map(tl => tl.id === action.id ? {...tl, status: action.status} : tl)
    case 'SET-TODOLISTS':
      return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
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
export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType) => ({ type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, status } as const)

//thunks
export const fetchTodolistsTC = () => {
  return (dispatch: Dispatch<ThunkDispatch>) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.getTodolists()
      .then((res) => {
        dispatch(setAppStatusAC('succeeded'))
        dispatch(setTodolistsAC(res.data))
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }
}

export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch<ThunkDispatch>) => {
  dispatch(setAppStatusAC('loading'))
  dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
  todolistsAPI.deleteTodolist(todolistId)
  .then((res) => {
    dispatch(removeTodolistAC(todolistId))
    dispatch(setAppStatusAC('succeeded'))
  })
}

export const addTodolistTC = (title: string) => (dispatch: Dispatch<ThunkDispatch>) => {
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
  | ReturnType<typeof changeTodolistEntityStatusAC>

type ThunkDispatch = ActionsType | SetAppStatusActionType | SetAppErrorActionType

export type FilterValuesType = 'all' | 'active' | 'completed'
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}