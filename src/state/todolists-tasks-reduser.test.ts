import { v1 } from "uuid"
import { TasksStateType } from "../AppWithRedux"
import { addTodolistAC, tasksReducer } from "./tasks-reducer"
import { TodolistDomainType, todolistsReducer } from "./todolists-reducer"


test('ids should be equals', () => {
  
  const startTasksState: TasksStateType = {}
  const startTodolistsState: Array<TodolistDomainType> = []

  const action = addTodolistAC('new todolist', v1())
  
  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.todolistId)
  expect(idFromTodolists).toBe(action.todolistId)
})
