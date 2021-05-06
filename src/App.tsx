import React, {useState} from 'react'
import './App.css'
import TodoList from './TodoList'
import AddItemForm from './AddItemForm'
import {v1} from "uuid"

export type FilterValuesType = 'all'|'active'|'completed'

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

type TasksStateType = {
    [key: string]: Array<TaskType>
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
        setTodoLists(todoLists.map(t => t.id === todoListID ? {...t, filter: value} : t))
    }


    function changeTaskStatus(taskID: string, isDone: boolean, todoListID: string) {
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(t => t.id === taskID ? {...t, isDone: isDone} : t)
        })
    }

    function changeTaskTitle(taskID: string, todoListID: string, newTitle: string) {
        let todoListTasks = tasks[taskID]
        let task = todoListTasks.find(t => t.id === todoListID)
        if (task) {
            task.title = newTitle
            setTasks({...tasks})
        }
    }

    const todoListID1 = v1()
    const todoListID2 = v1()

    const removeTodoList = (todoListID: string) => {
        let filteredTodoList = todoLists.filter(tl => tl.id !== todoListID) 
        setTodoLists(filteredTodoList)
        delete tasks[todoListID]
        setTasks({...tasks})
    }

    function changeTodoListTitle (todoListID: string, newTitle: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.title = newTitle
            setTodoLists([...todoLists])
        }
    } 

    const [todoLists, setTodoLists] = useState<Array<TodoListType>> ([
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to read', filter: 'all'}
    ])
    
    const [tasks, setTasks] = useState<TasksStateType> ({
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

    function addTodoList(title: string) {
        let todoList: TodoListType = {
            id: v1(),
            filter: 'all',
            title: title
        }
        setTodoLists([todoList, ...todoLists])
        setTasks({
            ...tasks,
            [todoList.id]: []
        })
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
                changeTaskStatus={changeTaskStatus}
                filter={tl.filter}
                removeTodoList={removeTodoList}
                changeTaskTitle={changeTaskTitle}
                changeTodoListTitle={changeTodoListTitle}
            />
        )
    })

    return (
        <div className='App'>
             <AddItemForm addItem={addTodoList} />
            {todoListComponents}
        </div>
    );
}

export default App

