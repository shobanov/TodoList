import axios from 'axios'

const settings = {
  withCredentials: true,
  headers: {
    'API-KEY': 'fdb08a17-9e00-497a-9ef1-efaa046e77dc'
  }
}

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  ...settings
})

// api
export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<ResponseType<{userId?: number}>>('auth/login', data)
  },
  me() {
    const promise = instance.get<ResponseType<{id: number, email: string, login: string}>>('auth/me')
    return promise
  },
  logout() {
    const promise = instance.delete<ResponseType<{userId?: number}>>('auth/login')
    return promise
  }
}

export const todolistsAPI = {
  getTodolists() {
    return instance.get<Array<TodolistType>>('todo-lists')
  },
  createTodolist(title: string) {
    return instance.post<ResponseType<{item: TodolistType}>>('todo-lists', {title: title})
  },
  deleteTodolist(id: string) {
    return instance.delete<ResponseType>(`todo-lists/${id}`)
  },
  updateTodolist(id: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${id}`, {title: title})
  },
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete(`todo-lists/${todolistId}/tasks/${taskId}`)
  },
  createTask(todolistId: string, taskTitle: string) {
    return instance.post<ResponseType<{item:TaskType}>>(`todo-lists/${todolistId}/tasks`, {title: taskTitle})
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
  }
}

// types
export type TodolistType = {
  id: string
  title: string
  addedDate: string
  order: number
}
export type ResponseType<D = {}> = {
  resultCode: number
  messages: Array<string>
  data: D
}
export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3
}
export enum TodoTaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}
export type TaskType = {
  title: string
  todoListId: string
  id: string
  description: string
  status: TaskStatuses
  order: number
  priority: TodoTaskPriorities
  startDate: string
  deadline: string
  addedDate: string
}
export type UpdateTaskType = {
  description: string
  title: string
  status: boolean
  priority: number
  startDate: string
  deadline: string
}
type GetTasksResponse = {
  error: string | null
  totalCount: number
  items: TaskType[]
}
export type UpdateTaskModelType = {
  title: string
  description: string
  status: TaskStatuses
  priority: TodoTaskPriorities
  startDate: string
  deadline: string
}

// paramsType
export type LoginParamsType = {
  email: string
  password: string
  rememberMe: boolean
  captcha?: string
}