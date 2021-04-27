import React, {useState} from 'react'
import './App.css'
import TodoList from './TodoList'
import {v1} from "uuid"

export type FilterValuesType = 'all'|'active'|'completed'

// type TaskStateType = {
//     [key: string]: Array<TaskStateType>
// }

export type TaskType = { 
    id: string
    title: string
    isDone: boolean
}

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    function removeTask(taskID: string, todoListID: string) {
        tasks[todoListID] = tasks[todoListID].filter(t => t.id !== taskID) 
        setTasks({...tasks})
    }
    
    function addTask(title: string, todoListID: string) {
        let newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
    }
    
    function changeFilter(value: FilterValuesType, todoListID: string) {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter: value} : tl))
    }


    function changeStatus(taskID: string, isDone: boolean, todoListID: string) {
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(t => t.id === taskID ? {...t, isDone: isDone} : t)
        })
    }

    const todoListID1 = v1()
    const todoListID2 = v1()

    const removeTodoList = (todoListID: string) => {
        let filteredTodoList = todoLists.filter(tl => tl.id !== todoListID) 
        setTodoLists(filteredTodoList)
        delete tasks[todoListID]
        setTasks({...tasks})
    }

    const [todoLists, setTodoLists] = useState<Array<TodoListType>> ([
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to read', filter: 'all'}
    ])
    
    const [tasks, setTasks] = useState ({
        [todoListID1]: [ 
            {id: v1(), title: 'HTML', isDone: false},
            {id: v1(), title: 'CSS', isDone: false},
            {id: v1(), title: 'React', isDone: false}
        ],
        [todoListID2]: [
            {id: v1(), title: 'Tolstoy', isDone: false},
            {id: v1(), title: 'Pushkin', isDone: false},
            {id: v1(), title: 'Agata-Kristi', isDone: false}
        ]
    })

    function tasksForTodoList(todoList: TodoListType)  {
        switch (todoList.filter) {
            case "active":
                return tasks[todoList.id].filter(t => !t.isDone)
            case "completed":
                return tasks[todoList.id].filter(t => t.isDone)
            default:
                return tasks[todoList.id]
        }
    }

    const todoListComponents = todoLists.map(tl => {
        return ( 
            <TodoList
                key={tl.id}
                id={tl.id}
                title={tl.title} 
                tasks={tasksForTodoList(tl)}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeStatus={changeStatus}
                filter={tl.filter}
                removeTodoList={removeTodoList}
            />
        )
    })

    return (
        <div className='App'>
            {todoListComponents}
        </div>
    );
}

export default App

