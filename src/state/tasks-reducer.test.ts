import {addTaskAC, addTodolistAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks-reducer'
import {TasksStateType} from '../App'
import { removeTodolistAC } from './todolists-reducer'
import { v1 } from 'uuid'

test('correct task should be deleted from correct array', () => {

  const startState: TasksStateType = {
    "todoListId1": [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false }
    ],
    "todoListId2": [
      { id: "1", title: "bread", isDone: false },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "tea", isDone: false }
    ]
  }

  const action = removeTaskAC("2", "todoListId2")
  const endState = tasksReducer(startState, action)

  expect(endState["todoListId1"].length).toBe(3)
  expect(endState["todoListId2"].length).toBe(2)
  expect(endState["todoListId2"].every(t => t.id != "2")).toBeTruthy()
})


test('correct task should be added to correct array', () => {

  const startState: TasksStateType = {
      "todoListId1": [
          { id: "1", title: "CSS", isDone: false },
          { id: "2", title: "JS", isDone: true },
          { id: "3", title: "React", isDone: false }
      ],
      "todoListId2": [
          { id: "1", title: "bread", isDone: false },
          { id: "2", title: "milk", isDone: true },
          { id: "3", title: "tea", isDone: false }
      ]
  }

  const action = addTaskAC("juce", "todoListId2")
  const endState = tasksReducer(startState, action)

  expect(endState["todoListId1"].length).toBe(3)
  expect(endState["todoListId2"].length).toBe(4)
  expect(endState["todoListId2"][0].id).toBeDefined()
  expect(endState["todoListId2"][0].title).toBe("juce")
  expect(endState["todoListId2"][0].isDone).toBe(false)
})


test('status of specified task should be changed', () => {

  const startState: TasksStateType = {
      "todoListId1": [
          { id: "1", title: "CSS", isDone: false },
          { id: "2", title: "JS", isDone: true },
          { id: "3", title: "React", isDone: false }
      ],
      "todoListId2": [
          { id: "1", title: "bread", isDone: false },
          { id: "2", title: "milk", isDone: true },
          { id: "3", title: "tea", isDone: false }
      ]
  }

  const action = changeTaskStatusAC("2", false, "todoListId2")
  const endState = tasksReducer(startState, action)

  expect(endState["todoListId2"][1].isDone).toBeFalsy()
  expect(endState["todoListId1"][1].isDone).toBeTruthy()
})


test('title of specified task should be changed', () => {

  const startState: TasksStateType = {
      "todoListId1": [
          { id: "1", title: "CSS", isDone: false },
          { id: "2", title: "JS", isDone: true },
          { id: "3", title: "React", isDone: false }
      ],
      "todoListId2": [
          { id: "1", title: "bread", isDone: false },
          { id: "2", title: "milk", isDone: true },
          { id: "3", title: "tea", isDone: false }
      ]
  }

  const action = changeTaskTitleAC("2", "Milkyway", "todoListId2")
  const endState = tasksReducer(startState, action)

  expect(endState["todoListId2"][1].title).toBe("Milkyway")
  expect(endState["todoListId1"][1].title).toBe("JS")
})


test('new property with new array should be added when new todolist is added', () => {

  const startState: TasksStateType = {
      "todoListId1": [
          { id: "1", title: "CSS", isDone: false },
          { id: "2", title: "JS", isDone: true },
          { id: "3", title: "React", isDone: false }
      ],
      "todoListId2": [
          { id: "1", title: "bread", isDone: false },
          { id: "2", title: "milk", isDone: true },
          { id: "3", title: "tea", isDone: false }
      ]
  }

  const action = addTodolistAC("title no metter", v1())
  const endState = tasksReducer(startState, action)


  const keys = Object.keys(endState)
  const newKey = keys.find(k => k != "todoListId1" && k != "todoListId2")
  if (!newKey) {
      throw Error("new key should be added")
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([])
})


test('property with todoListId should be deleted', () => {
  const startState: TasksStateType = {
      "todoListId1": [
          { id: "1", title: "CSS", isDone: false },
          { id: "2", title: "JS", isDone: true },
          { id: "3", title: "React", isDone: false }
      ],
      "todoListId2": [
          { id: "1", title: "bread", isDone: false },
          { id: "2", title: "milk", isDone: true },
          { id: "3", title: "tea", isDone: false }
      ]
  };

  const action = removeTodolistAC("todoListId2")

  const endState = tasksReducer(startState, action)


  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState["todoListId2"]).toBeUndefined()
})

