import { Dispatch } from "redux"
import { TaskStatuses, TaskType, todolistsAPI, TodolistType, TodoTaskPriorities, UpdateTaskModelType } from "../../api/todolist-api"
import { AppRootStateType } from "../../app/store"
import { AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from "./todolists-reducer"
  
const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
  
  switch (action.type) {
      case 'REMOVE-TASK':
        return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
      case 'ADD-TASK':
        return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
      case 'UPDATE-TASK':
        return {...state, [action.todolistId]: state[action.todolistId]
          .map(t => t.id === action.taskId ? {...t, ...action.model} : t)}
      case 'ADD-TODOLIST':
        return {...state, [action.todolist.id]: []}
      case 'REMOVE-TODOLIST':
        return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.todolistId)}
      case 'SET-TODOLISTS': {
        const copyState = {...state}
        action.todolists.forEach(tl => {copyState[tl.id] = []})
        return copyState
      }
      case 'SET-TASKS':
        return {...state, [action.todolistId]: action.tasks}
      default:
        return state
  }
}



// actions
export const removeTaskAC = (taskId: string, todolistId: string) => ({type: 'REMOVE-TASK', todolistId, taskId} as const)
export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) => ({type: 'UPDATE-TASK', taskId, model, todolistId} as const)
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => ({type: 'CHANGE-TASK-TITLE', taskId, todolistId, title} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => ({type: 'SET-TASKS', tasks, todolistId} as const)

// thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
  todolistsAPI.getTasks(todolistId)
    .then((res) => {
      const tasks = res.data.items
      const action = setTasksAC(tasks, todolistId)
      dispatch(action)
    })
}

export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
  todolistsAPI.deleteTask(todolistId, taskId)
    .then(res => {
      const action = removeTaskAC(taskId, todolistId)
      dispatch(action)
    })
}

export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
  todolistsAPI.createTask(todolistId, title)
    .then(res => {
      const task = res.data.data.item
      const action = addTaskAC(task)
      dispatch(action)
    })
}

export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
  (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
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
  
// types
export type ActionsType = 
| ReturnType<typeof removeTaskAC>
| ReturnType<typeof addTaskAC>
| ReturnType<typeof updateTaskAC>
| ReturnType<typeof setTasksAC>
| AddTodolistActionType
| RemoveTodolistActionType
| SetTodolistsActionType

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TodoTaskPriorities
  startDate?: string
  deadline?: string
}