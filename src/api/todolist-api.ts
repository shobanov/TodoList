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

export type TodolistType = {
  id: string
  title: string
  addedDate: string
  order: number
}

type ResponseType<D = {}> = {
  resultCode: number
  messages: Array<string> // or string[]
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
  todolistId: string
  id: string
  descripion: string
  status: TaskStatuses
  order: number
  priority: TodoTaskPriorities
  startDate: string
  deadLine: string
  addedDate: string
}

export type UpdateTaskType = {
  descripion: string
  title: string
  status: boolean
  priority: number
  startDate: string
  deadLine: string
}

type GetTasksResponse = {
  error: string | null
  totalCount: number
  items: TaskType[]
}

type UpdateTasModelType = {
  title: string
  descripion: string
  status: number
  priority: number
  startDate: string
  deadLine: string
}


export const todolistsAPI = {
  getTodolists() {
    return instance.get<Array<TodolistType>>('todo-lists')
  },

  createTodolist(title: string) {
    return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title: title})
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
    return instance.post<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks`, {title: taskTitle})
  },

  updateTask(todolistId: string, taskId: string, model: UpdateTasModelType) {
    
  }
}