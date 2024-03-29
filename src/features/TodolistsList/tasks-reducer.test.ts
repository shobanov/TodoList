import { TaskStatuses, TodoTaskPriorities } from '../../api/todolist-api'
import { setTasksAC, tasksReducer, TasksStateType, updateTaskAC } from './tasks-reducer'
import { addTodolistAC, setTodolistsAC } from './todolists-reducer'


let startState: TasksStateType = {}
beforeEach(() => {
  startState = {
    "todolistId1": [
      {id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
    startDate: '', deadline: '', addedDate: '', order: 0, priority: TodoTaskPriorities.Low},
      {id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
    startDate: '', deadline: '', addedDate: '', order: 0, priority: TodoTaskPriorities.Low},
      {id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
    startDate: '', deadline: '', addedDate: '', order: 0, priority: TodoTaskPriorities.Low}
    ],
    "todolistId2": [
      {id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
    startDate: '', deadline: '', addedDate: '', order: 0, priority: TodoTaskPriorities.Low},
      {id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
    startDate: '', deadline: '', addedDate: '', order: 0, priority: TodoTaskPriorities.Low},
      {id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
    startDate: '', deadline: '', addedDate: '', order: 0, priority: TodoTaskPriorities.Low}
    ]
  }
})

test ('empty arrays should be added when we set todolists', () => {

  const action = setTodolistsAC([
    {id: '1', title: 'title 1', order: 0, addedDate: ''},
    {id: '2', title: 'title 2', order: 0, addedDate: ''}
  ])

  const endState = tasksReducer({}, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(2)
  expect(endState['1']).toStrictEqual([])
  expect(endState['2']).toStrictEqual([])
})

test ('task should be added for todolist', () => {

  const action = setTasksAC(startState["todolistId1"], "todolistId1")

  const endState = tasksReducer({"todolistId2": [], "todolistId1": []}, action)

  const keys = Object.keys(endState)

  expect(endState["todolistId1"].length).toBe(3)
  expect(endState["todolistId2"].length).toBe(0)
})

test ('new array should be added when new todolist is added', () => {

  const action = addTodolistAC({
    id: "blabla",
    title: "newTodolist",
    order: 0,
    addedDate: ''
  })

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)
  const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2")

  if (!newKey) {
    throw Error("new key should be added")
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test ('status of specified task should be changed', () => {

  const action = updateTaskAC("2", {status: TaskStatuses.New}, "todolistId2")

  const endState = tasksReducer(startState, action)

  expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed)
  expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New)
})

test ('title of specified task should be changed', () => {

  const action = updateTaskAC("2", {title: "yogurt"}, "todolistId2")

  const endState = tasksReducer(startState, action)

  expect(endState["todolistId1"][1].title).toBe("JS")
  expect(endState["todolistId2"][1].title).toBe("yogurt")
  expect(endState["todolistId2"][0].title).toBe("bread")
})

