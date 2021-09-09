import { addTodolistAC, changeTodolistEntityStatusAC, changeTodolistFilterAC, changeTodolistTitleAC, FilterValuesType, removeTodolistAC, setTodolistsAC, TodolistDomainType, todolistsReducer } from './todolists-reducer'
import { v1 } from 'uuid'
import { TodolistType } from '../../api/todolist-api'
import { RequestStatusType } from '../../app/app-reducer'


let todolistId1 = v1()
let todolistId2 = v1()
let startState: Array<TodolistDomainType> = []

beforeEach(() => {
   let todolistId1 = v1()
   let todolistId2 = v1()
   startState = [
      { id: todolistId1, title: "What to learn", filter: 'all', entityStatus: 'idle', addedDate: '', order: 0 },
      { id: todolistId2, title: "What to buy", filter: 'all', entityStatus: 'idle', addedDate: '', order: 0 }
   ]
})


test('correct todolist should be removed', () => {

   const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

   expect(endState.length).toBe(1)
   expect(endState[0].id).toBe(todolistId2)
})


test('correct todolist should be added', () => {

   let todolist: TodolistType = {
      title: 'New Todolist',
      id: 'any id',
      addedDate: '',
      order: 0
   }

   const endState = todolistsReducer(startState, addTodolistAC(todolist))

   expect(endState.length).toBe(3)
   expect(endState[0].title).toBe(todolist.title)
   expect(endState[0].filter).toBe("all")
})


test('correct todolist should change its name', () => {

   let newTodolistTitle = "New Todolist"

   const action = changeTodolistTitleAC(todolistId2, newTodolistTitle)

   const endState = todolistsReducer(startState, action)

   expect(endState[0].title).toBe("What to learn")
   expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {

   let newFilter: FilterValuesType = "completed"

   const action = changeTodolistFilterAC(newFilter, todolistId2)

   const endState = todolistsReducer(startState, action);

   expect(endState[0].filter).toBe('all')
   expect(endState[1].filter).toBe(newFilter)
})


test('Todolists should be set to the state', () => {

   const action = setTodolistsAC(startState)

   const endState = todolistsReducer([], action);

   expect(endState.length).toBe(2)
})

test('correct entity status of todolist should be changed', () => {

   let newStatus: RequestStatusType = "loading"

   const action = changeTodolistEntityStatusAC(todolistId2, newStatus)

   const endState = todolistsReducer(startState, action);

   expect(endState[0].entityStatus).toBe('idle')
   expect(endState[1].entityStatus).toBe('newStatus')
})