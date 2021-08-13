import { Dispatch } from "redux"
import { TaskStatuses, TaskType, todolistsAPI, TodolistType, TodoTaskPriorities, UpdateTaskModelType } from "../api/todolist-api"
import { TasksStateType } from "../AppWithRedux"
import { AppRootStateType } from "./store"
import { AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from "./todolists-reducer"

export type ActionsType = RemoveTaskActionType
  | AddTaskActionType
  | UpdateTaskActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodolistsActionType
  | SetTasksActionType


export type RemoveTaskActionType = { 
  type: 'REMOVE-TASK'
  todolistId: string
  taskId: string
}

export type AddTaskActionType = { 
  type: 'ADD-TASK'
  task: TaskType
}

export type UpdateTaskActionType = {
  type: 'UPDATE-TASK'
  todolistId: string
  taskId: string
  model: UpdateDomainTaskModelType
}

export type ChangeTaskTitleActionType = {
  type: 'CHANGE-TASK-TITLE'
  todolistId: string
  taskId: string
  title: string
}

export type SetTasksActionType = { 
  type: 'SET-TASKS'
  tasks: Array<TaskType>
  todolistId: string
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
        const newTask = action.task
        const tasks = stateCopy[newTask.todoListId]
        const newTasks = [newTask, ...tasks]
        stateCopy[newTask.todoListId] = newTasks
        return stateCopy
      }
      case 'UPDATE-TASK': {
        let todolistTasks = state[action.todolistId]
        state[action.todolistId] = todolistTasks
          .map(t => t.id === action.taskId
            ? {...t, ...action.model}
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
          [action.todolist.id]: []
        }
      }
      case 'REMOVE-TODOLIST': {
        const stateCopy = {...state}
        delete stateCopy[action.id]
        return stateCopy
      }
      case 'SET-TODOLISTS': {
        const copyState = {...state}
        action.todolists.forEach(tl => {
          copyState[tl.id] = []
        })
        return copyState
      }
      case 'SET-TASKS': {
        const copyState = {...state}
        copyState[action.todolistId] = action.tasks
        return copyState
      }
      default:
          return state
  }
}


export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
  return { type: 'REMOVE-TASK', todolistId, taskId }
}

export const addTaskAC = (task: TaskType): AddTaskActionType => {
  return { type: 'ADD-TASK', task }
}

export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string): UpdateTaskActionType => {
  return { type: 'UPDATE-TASK', taskId, model, todolistId }
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
  return { type: 'CHANGE-TASK-TITLE', taskId, todolistId, title }
}

export const addTodolistAC = (todolist: TodolistType): AddTodolistActionType => {
  return { type: 'ADD-TODOLIST', todolist }
}

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => {
  return { type: 'SET-TASKS', tasks, todolistId }
}

export const fetchTasksTC = (todolistId: string) => {
  return (dispatch: Dispatch) => {
    todolistsAPI.getTasks(todolistId)
      .then((res) => {
        const tasks = res.data.items
        const action = setTasksAC(tasks, todolistId)
        dispatch(action)
      })
  }
}

export const removeTaskTC = (taskId: string, todolistId: string) => {
  return (dispatch: Dispatch) => {
    todolistsAPI.deleteTask(todolistId, taskId)
      .then(res => {
        const action = removeTaskAC(taskId, todolistId)
        dispatch(action)
      })
  }
}

export const addTaskTC = (title: string, todolistId: string) => {
  return (dispatch: Dispatch) => {
    todolistsAPI.createTask(todolistId, title)
      .then(res => {
        const task = res.data.data.item
        const action = addTaskAC(task)
        dispatch(action)
      })
  }
}


export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TodoTaskPriorities
  startDate?: string
  deadline?: string
}

export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) => {
  return (dispatch: Dispatch, getState: () => AppRootStateType) => {

    const state = getState()
    const task =  state.tasks[todolistId].find(t => t.id === taskId)

    if (!task) {
      console.warn("task not find in the state")
      return
    }

    const apiModel: UpdateTaskModelType = {
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      ...domainModel
    }
    todolistsAPI.updateTask(todolistId, taskId, apiModel)
      .then(res => {
        const action = updateTaskAC(taskId, domainModel, todolistId)
        dispatch(action)
      })
  }
}