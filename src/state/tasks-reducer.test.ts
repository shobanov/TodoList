import {addTaskAC, addTodolistAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks-reducer'
import {TasksStateType} from '../AppWithRedux'
import { removeTodolistAC } from './todolists-reducer'
import { v1 } from 'uuid'
import { TaskStatuses, TodoTaskPriorities } from '../api/todolist-api'

test('correct task should be deleted from correct array', () => {

  const startState: TasksStateType = {
    "todolistId1": [
      {
        id: "1",
        title: "CSS",
        status: TaskStatuses.New,
        todolistId: 'todolistId1',
        descripion: '',
        order: 0,
        priority: TodoTaskPriorities.Low,
        startDate: '',
        deadLine: '',
        addedDate: '',
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatuses.Completed,
        todolistId: 'todolistId1',
        descripion: '',
        order: 0,
        priority: TodoTaskPriorities.Low,
        startDate: '',
        deadLine: '',
        addedDate: '',
      },
      {
        id: "3",
        title: "React",
        status: TaskStatuses.New,
        todolistId: 'todolistId1',
        descripion: '',
        order: 0,
        priority: TodoTaskPriorities.Low,
        startDate: '',
        deadLine: '',
        addedDate: '',
      }
    ],
    "todolistId2": [
      { 
        id: "1",
        title: "Bread",
        status: TaskStatuses.New,
        todolistId: 'todolistId2',
        descripion: '',
        order: 0,
        priority: TodoTaskPriorities.Low,
        startDate: '',
        deadLine: '',
        addedDate: '',
      },
      {
        id: "2",
        title: "Milk",
        status: TaskStatuses.Completed,
        todolistId: 'todolistId2',
        descripion: '',
        order: 0,
        priority: TodoTaskPriorities.Low,
        startDate: '',
        deadLine: '',
        addedDate: '',
       },
      { 
        id: "3",
        title: "tea",
        status: TaskStatuses.New,
        todolistId: 'todolistId2',
        descripion: '',
        order: 0,
        priority: TodoTaskPriorities.Low,
        startDate: '',
        deadLine: '',
        addedDate: '',
      }
    ]
  }

  const action = removeTaskAC("2", "todolistId2")
  const endState = tasksReducer(startState, action)

  expect(endState["todolistId1"].length).toBe(3)
  expect(endState["todolistId2"].length).toBe(2)
  expect(endState["todolistId2"].every(t => t.id != "2")).toBeTruthy()
})


test('correct task should be added to correct array', () => {

  const startState: TasksStateType = {
    "todolistId1": [
      {
        id: "1",
        title: "CSS",
        status: TaskStatuses.New,
        todolistId: 'todolistId1',
        descripion: '',
        order: 0,
        priority: TodoTaskPriorities.Low,
        startDate: '',
        deadLine: '',
        addedDate: '',
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatuses.Completed,
        todolistId: 'todolistId1',
        descripion: '',
        order: 0,
        priority: TodoTaskPriorities.Low,
        startDate: '',
        deadLine: '',
        addedDate: '',
      },
      {
        id: "3",
        title: "React",
        status: TaskStatuses.New,
        todolistId: 'todolistId1',
        descripion: '',
        order: 0,
        priority: TodoTaskPriorities.Low,
        startDate: '',
        deadLine: '',
        addedDate: '',
      }
    ],
    "todolistId2": [
      { 
        id: "1",
        title: "Bread",
        status: TaskStatuses.New,
        todolistId: 'todolistId2',
        descripion: '',
        order: 0,
        priority: TodoTaskPriorities.Low,
        startDate: '',
        deadLine: '',
        addedDate: '',
      },
      {
        id: "2",
        title: "Milk",
        status: TaskStatuses.Completed,
        todolistId: 'todolistId2',
        descripion: '',
        order: 0,
        priority: TodoTaskPriorities.Low,
        startDate: '',
        deadLine: '',
        addedDate: '',
       },
      { 
        id: "3",
        title: "tea",
        status: TaskStatuses.New,
        todolistId: 'todolistId2',
        descripion: '',
        order: 0,
        priority: TodoTaskPriorities.Low,
        startDate: '',
        deadLine: '',
        addedDate: '',
      }
    ]
  }

  const action = addTaskAC("juce", "todolistId2")
  const endState = tasksReducer(startState, action)

  expect(endState["todolistId1"].length).toBe(3)
  expect(endState["todolistId2"].length).toBe(4)
  expect(endState["todolistId2"][0].id).toBeDefined()
  expect(endState["todolistId2"][0].title).toBe("juce")
  expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New)
})


test('status of specified task should be changed', () => {

  const startState: TasksStateType = {
      "todolistId1": [
          {
            id: "1",
            title: "CSS",
            status: TaskStatuses.New,
            todolistId: 'todolistId1',
            descripion: '',
            order: 0,
            priority: TodoTaskPriorities.Low,
            startDate: '',
            deadLine: '',
            addedDate: '',
          },
          {
            id: "2",
            title: "JS",
            status: TaskStatuses.Completed,
            todolistId: 'todolistId1',
            descripion: '',
            order: 0,
            priority: TodoTaskPriorities.Low,
            startDate: '',
            deadLine: '',
            addedDate: '',
          },
          {
            id: "3",
            title: "React",
            status: TaskStatuses.New,
            todolistId: 'todolistId1',
            descripion: '',
            order: 0,
            priority: TodoTaskPriorities.Low,
            startDate: '',
            deadLine: '',
            addedDate: '',
          }
      ],
      "todolistId2": [
        { 
          id: "1",
          title: "Bread",
          status: TaskStatuses.New,
          todolistId: 'todolistId2',
          descripion: '',
          order: 0,
          priority: TodoTaskPriorities.Low,
          startDate: '',
          deadLine: '',
          addedDate: '',
        },
        {
          id: "2",
          title: "Milk",
          status: TaskStatuses.Completed,
          todolistId: 'todolistId2',
          descripion: '',
          order: 0,
          priority: TodoTaskPriorities.Low,
          startDate: '',
          deadLine: '',
          addedDate: '',
         },
        { 
          id: "3",
          title: "tea",
          status: TaskStatuses.New,
          todolistId: 'todolistId2',
          descripion: '',
          order: 0,
          priority: TodoTaskPriorities.Low,
          startDate: '',
          deadLine: '',
          addedDate: '',
        }
      ]
  }
  
  const action = changeTaskStatusAC("2", TaskStatuses.New, "todolistId2")
  const endState = tasksReducer(startState, action)


  expect(endState["todolistId2"][1].status).toBe(TaskStatuses.Completed)
  expect(endState["todolistId1"][1].status).toBe(TaskStatuses.New)
})


test('title of specified task should be changed', () => {

  const startState: TasksStateType = {
    "todolistId1": [
      {
        id: "1",
        title: "CSS",
        status: TaskStatuses.New,
        todolistId: 'todolistId1',
        descripion: '',
        order: 0,
        priority: TodoTaskPriorities.Low,
        startDate: '',
        deadLine: '',
        addedDate: '',
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatuses.Completed,
        todolistId: 'todolistId1',
        descripion: '',
        order: 0,
        priority: TodoTaskPriorities.Low,
        startDate: '',
        deadLine: '',
        addedDate: '',
      },
      {
        id: "3",
        title: "React",
        status: TaskStatuses.New,
        todolistId: 'todolistId1',
        descripion: '',
        order: 0,
        priority: TodoTaskPriorities.Low,
        startDate: '',
        deadLine: '',
        addedDate: '',
      }
    ],
    "todolistId2": [
      { 
        id: "1",
        title: "Bread",
        status: TaskStatuses.New,
        todolistId: 'todolistId2',
        descripion: '',
        order: 0,
        priority: TodoTaskPriorities.Low,
        startDate: '',
        deadLine: '',
        addedDate: '',
      },
      {
        id: "2",
        title: "Milk",
        status: TaskStatuses.Completed,
        todolistId: 'todolistId2',
        descripion: '',
        order: 0,
        priority: TodoTaskPriorities.Low,
        startDate: '',
        deadLine: '',
        addedDate: '',
       },
      { 
        id: "3",
        title: "tea",
        status: TaskStatuses.New,
        todolistId: 'todolistId2',
        descripion: '',
        order: 0,
        priority: TodoTaskPriorities.Low,
        startDate: '',
        deadLine: '',
        addedDate: '',
      }
    ]
  }

  const action = changeTaskTitleAC("2", "Milkyway", "todolistId2")
  const endState = tasksReducer(startState, action)

  expect(endState["todolistId2"][1].title).toBe("Milkyway")
  expect(endState["todolistId1"][1].title).toBe("JS")
})


test('new property with new array should be added when new todolist is added', () => {

  const startState: TasksStateType = {
    "todolistId1": [
      {
        id: "1",
        title: "CSS",
        status: TaskStatuses.New,
        todolistId: 'todolistId1',
        descripion: '',
        order: 0,
        priority: TodoTaskPriorities.Low,
        startDate: '',
        deadLine: '',
        addedDate: '',
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatuses.Completed,
        todolistId: 'todolistId1',
        descripion: '',
        order: 0,
        priority: TodoTaskPriorities.Low,
        startDate: '',
        deadLine: '',
        addedDate: '',
      },
      {
        id: "3",
        title: "React",
        status: TaskStatuses.New,
        todolistId: 'todolistId1',
        descripion: '',
        order: 0,
        priority: TodoTaskPriorities.Low,
        startDate: '',
        deadLine: '',
        addedDate: '',
      }
    ],
    "todolistId2": [
      { 
        id: "1",
        title: "Bread",
        status: TaskStatuses.New,
        todolistId: 'todolistId2',
        descripion: '',
        order: 0,
        priority: TodoTaskPriorities.Low,
        startDate: '',
        deadLine: '',
        addedDate: '',
      },
      {
        id: "2",
        title: "Milk",
        status: TaskStatuses.Completed,
        todolistId: 'todolistId2',
        descripion: '',
        order: 0,
        priority: TodoTaskPriorities.Low,
        startDate: '',
        deadLine: '',
        addedDate: '',
       },
      { 
        id: "3",
        title: "tea",
        status: TaskStatuses.New,
        todolistId: 'todolistId2',
        descripion: '',
        order: 0,
        priority: TodoTaskPriorities.Low,
        startDate: '',
        deadLine: '',
        addedDate: '',
      }
    ]
  }

  const action = addTodolistAC("title no metter", v1())
  const endState = tasksReducer(startState, action)


  const keys = Object.keys(endState)
  const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2")
  if (!newKey) {
      throw Error("new key should be added")
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([])
})


test('property with todolistId should be deleted', () => {

  const startState: TasksStateType = {
    "todolistId1": [
      {
        id: "1",
        title: "CSS",
        status: TaskStatuses.New,
        todolistId: 'todolistId1',
        descripion: '',
        order: 0,
        priority: TodoTaskPriorities.Low,
        startDate: '',
        deadLine: '',
        addedDate: '',
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatuses.Completed,
        todolistId: 'todolistId1',
        descripion: '',
        order: 0,
        priority: TodoTaskPriorities.Low,
        startDate: '',
        deadLine: '',
        addedDate: '',
      },
      {
        id: "3",
        title: "React",
        status: TaskStatuses.New,
        todolistId: 'todolistId1',
        descripion: '',
        order: 0,
        priority: TodoTaskPriorities.Low,
        startDate: '',
        deadLine: '',
        addedDate: '',
      }
    ],
    "todolistId2": [
      { 
        id: "1",
        title: "Bread",
        status: TaskStatuses.New,
        todolistId: 'todolistId2',
        descripion: '',
        order: 0,
        priority: TodoTaskPriorities.Low,
        startDate: '',
        deadLine: '',
        addedDate: '',
      },
      {
        id: "2",
        title: "Milk",
        status: TaskStatuses.Completed,
        todolistId: 'todolistId2',
        descripion: '',
        order: 0,
        priority: TodoTaskPriorities.Low,
        startDate: '',
        deadLine: '',
        addedDate: '',
       },
      { 
        id: "3",
        title: "Tea",
        status: TaskStatuses.New,
        todolistId: 'todolistId2',
        descripion: '',
        order: 0,
        priority: TodoTaskPriorities.Low,
        startDate: '',
        deadLine: '',
        addedDate: '',
      }
    ]
  }

  const action = removeTodolistAC("todolistId2")

  const endState = tasksReducer(startState, action)


  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState["todolistId2"]).toBeUndefined()
})

