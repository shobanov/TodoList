import { TodolistType } from "../../api/todolist-api"
import { addTodolistAC, tasksReducer, TasksStateType } from "./tasks-reducer"
import { TodolistDomainType, todolistsReducer } from "./todolists-reducer"


test('ids should be equals', () => {
  
  const startTasksState: TasksStateType = {}
  const startTodolistsState: Array<TodolistDomainType> = []

  let todolist: TodolistType = {
    title: 'new todolist',
    id: 'any id',
    addedDate: '',
    order: 0
 }

  const action = addTodolistAC(todolist)
  
  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.todolist.id)
  expect(idFromTodolists).toBe(action.todolist.id)
})
