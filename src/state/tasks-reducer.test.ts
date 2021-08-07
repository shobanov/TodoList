import { setTasksAC, tasksReducer } from './tasks-reducer'
import { setTodolistAC } from './todolists-reducer'



test ('empty arrays should be added when we set todolists', () => {

  const action = setTodolistAC([
    {id: '1', title: 'title 1', order: 0, addedDate: ''},
    {id: '2', title: 'title 2', order: 0, addedDate: ''}
  ])

  const endState = tasksReducer({}, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(2)
  expect(endState['1']).toStrictEqual([])
  expect(endState['2']).toStrictEqual([])
})

test ('task should be aded for todolist', () => {

  const action = setTasksAC(startState["todolistId1"], "todolistId1")

  const endState = tasksReducer({ "todolistId2": [], "todolistId1": [] }, action)

  const keys = Object.keys(endState)

  expect(endState["todolistId1"].length).toBe(3)
  expect(endState["todolistId2"].length).toBe(0)
})