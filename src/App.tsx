import React, {useState} from 'react'
import './App.css'
import TodoList from './TodoList'
import AddItemForm from './AddItemForm'
import {v1} from "uuid"
import { AppBar, Button, Container, Grid, IconButton, Menu, Paper, Toolbar, Typography } from '@material-ui/core'

export type FilterValuesType = 'all'|'active'|'completed'

export type TaskType = { 
    id: string
    title: string
    isDone: boolean
}

export type TodolistType = {
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

    const removeTodoList = (todoListID: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
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
    
    const todoListID1 = v1()
    const todoListID2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodolistType>> ([
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

    function tasksForTodoList(todoList: TodolistType)  {
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
        let todoList: TodolistType = {
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
            
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                    </IconButton>
                    <Typography variant="h5">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={ { padding: "20px" } }>
                    <AddItemForm addItem={addTodoList} />
                </Grid>
                <Grid container spacing={3}>
                    {
                        todoLists.map(tl => {
                            return (
                                <Grid item>
                                    <Paper elevation={3} style={ { padding: "15px" } }>
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
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
            

        </div>
    )
}

export default App

//container spacing={5} direction="row" justify="center">