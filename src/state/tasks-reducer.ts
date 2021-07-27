import { v1 } from "uuid"
import { TaskStatuses, TaskType, TodoTaskPriorities } from "../api/todolist-api"
import { TasksStateType } from "../AppWithRedux"
import { AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer"

export type ActionsType = RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType

export type RemoveTaskActionType = { 
  type: 'REMOVE-TASK'
  todolistId: string
  taskId: string
}

export type AddTaskActionType = { 
  type: 'ADD-TASK'
  title: string
  todolistId: string
}

export type ChangeTaskStatusActionType = {
  type: 'CHANGE-TASK-STATUS'
  todolistId: string
  taskId: string
  status: TaskStatuses
}

export type ChangeTaskTitleActionType = {
  type: 'CHANGE-TASK-TITLE'
  todolistId: string
  taskId: string
  title: string
}

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
  
  switch (action.type) {
      case 'REMOVE-TASK': {
        const stateCopy = {...state}
        const tasks = state[action.todolistId]
        const filteredTasks = tasks.filter(t => t.id !== action.taskId)
        stateCopy[action.todolistId] = filteredTasks
        return stateCopy
      }
      case 'ADD-TASK': {
        const stateCopy = {...state}
        const newTask: TaskType = {
          id: v1(),
          title: action.title,
          status: TaskStatuses.New,
          todolistId: action.todolistId,
          descripion: '',
          order: 0,
          priority: TodoTaskPriorities.Low,
          startDate: '',
          deadLine: '',
          addedDate: ''
        }
        const tasks = stateCopy[action.todolistId]
        const newTasks = [newTask, ...tasks]
        stateCopy[action.todolistId] = newTasks
        return stateCopy
      }
      case 'CHANGE-TASK-STATUS': {
        let todolistTasks = state[action.todolistId]
        state[action.todolistId] = todolistTasks
          .map(t => t.id === action.taskId
            ? {...t, status: action.status}
            : t)
        return ({...state})
      }
      case 'CHANGE-TASK-TITLE': {
        let todolistTasks = state[action.todolistId]
        state[action.todolistId] = todolistTasks
          .map(t => t.id === action.taskId
            ? {...t, title: action.title}
            : t)
        return ({...state})
      }
      case 'ADD-TODOLIST': {
        return {
          ...state,
          [action.todolistId]: []
        }
      }
      case 'REMOVE-TODOLIST': {
        const stateCopy = {...state}
        delete stateCopy[action.id]
        return stateCopy
      }
      default:
          return state
  }
}


export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
  return { type: 'REMOVE-TASK', todolistId, taskId }
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
  return { type: 'ADD-TASK', title, todolistId: todolistId}
}

export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
  return { type: 'CHANGE-TASK-STATUS', taskId, status, todolistId }
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
  return { type: 'CHANGE-TASK-TITLE', taskId, todolistId, title}
}

export const addTodolistAC = (title: string, todolistId: string): AddTodolistActionType => {
  return { type: 'ADD-TODOLIST', title, todolistId}
}