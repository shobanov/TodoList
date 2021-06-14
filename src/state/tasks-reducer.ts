import { v1 } from "uuid"
import { TasksStateType } from "../AppWithRedux"
import { AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer"

export type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusAC | ChangeTaskTitleAC | AddTodolistActionType | RemoveTodolistActionType

export type RemoveTaskActionType = { 
  type: 'REMOVE-TASK'
  todoListId: string
  taskId: string
}

export type AddTaskActionType = { 
  type: 'ADD-TASK'
  title: string
  todoListId: string
}

export type ChangeTaskStatusAC = {
  type: 'CHANGE-TASK-STATUS'
  todoListId: string
  taskId: string
  isDone: boolean
}

export type ChangeTaskTitleAC = {
  type: 'CHANGE-TASK-TITLE'
  todoListId: string
  taskId: string
  title: string
}

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
  
  switch (action.type) {
      case 'REMOVE-TASK': {
        const stateCopy = {...state}
        const tasks = state[action.todoListId]
        const filteredTasks = tasks.filter(t => t.id !== action.taskId)
        stateCopy[action.todoListId] = filteredTasks
        return stateCopy
      }
      case 'ADD-TASK': {
        const stateCopy = {...state}
        const tasks = stateCopy[action.todoListId]
        const newTask = {
          id: v1(),
          title: action.title,
          isDone: false
        }
        const newTasks = [newTask, ...tasks]
        stateCopy[action.todoListId] = newTasks
        return stateCopy
      }
      case 'CHANGE-TASK-STATUS': {
        const stateCopy = {...state}

        let tasks = stateCopy[action.todoListId]
        stateCopy[action.todoListId] = tasks.map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t)

        return stateCopy
      }
      case 'CHANGE-TASK-TITLE': {
        const stateCopy = {...state}
        const tasks = stateCopy[action.todoListId]
        let task = tasks.find(t => t.id === action.taskId)
        if (task) {
          task.title = action.title
        }
        return stateCopy
      }
      case 'ADD-TODOLIST': {
        const stateCopy = {...state}
        stateCopy[action.todoListId] = []
        return stateCopy
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


export const removeTaskAC = (taskId: string, todoListId: string): RemoveTaskActionType => {
  return { type: 'REMOVE-TASK', todoListId, taskId }
}

export const addTaskAC = (title: string, todoListId: string): AddTaskActionType => {
  return { type: 'ADD-TASK', title, todoListId}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListId: string): ChangeTaskStatusAC => {
  return { type: 'CHANGE-TASK-STATUS', taskId, isDone, todoListId }
}

export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string): ChangeTaskTitleAC => {
  return { type: 'CHANGE-TASK-TITLE', taskId, todoListId, title}
}

export const addTodolistAC = (title: string, todoListId: string): AddTodolistActionType => {
  return { type: 'ADD-TODOLIST', title, todoListId}
}

