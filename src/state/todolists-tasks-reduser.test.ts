import { v1 } from "uuid"
import { TasksStateType, TodolistType } from "../App"
import { addTodolistAC, tasksReducer } from "./tasks-reducer"
import { todolistsReducer } from "./todolists-reducer"


test('ids should be equals', () => {
  
  const startTasksState: TasksStateType = {}
  const startTodolistsState: Array<TodolistType> = []

  const action = addTodolistAC('new todolist', v1())
  
  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.todoListId)
  expect(idFromTodolists).toBe(action.todoListId)
})
