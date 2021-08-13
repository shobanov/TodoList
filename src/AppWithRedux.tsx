import React, { useCallback, useEffect } from 'react'
import './App.css'
import TodoList from './TodoList'
import AddItemForm from './AddItemForm'
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@material-ui/core'
import { addTodolistTC, changeTodolistFilterAC, changeTodolistTitleTC, fetchTodolistsTC, FilterValuesType, removeTodolistTC, TodolistDomainType } from './state/todolists-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from './state/store'
import { addTaskTC, updateTaskTC, removeTaskTC, updateTaskAC } from './state/tasks-reducer'
import { TaskStatuses, TaskType} from './api/todolist-api'

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    useEffect(() => {
        const thunk = fetchTodolistsTC()
        dispatch(thunk)
    }, [dispatch])

    const removeTask = useCallback(function (taskId: string, todolistId: string) {
        const thunk = removeTaskTC(taskId, todolistId)
        dispatch(thunk)
    }, [dispatch])

    const addTask = useCallback(function (title: string, todolistId: string) {
        const thunk = addTaskTC(title, todolistId)
        dispatch(thunk)
    }, [dispatch])

    const changeStatus = useCallback(function (taskId: string, status: TaskStatuses, todolistId: string) {
        const thunk = updateTaskTC(taskId, {status}, todolistId)
        dispatch(thunk)
    }, [dispatch])

    const changeTaskTitle = useCallback(function (taskId: string, newTitle: string, todolistId: string) {
        const thunk = updateTaskTC(taskId, {title: newTitle}, todolistId)
        dispatch(thunk)
    }, [dispatch])

    const changeFilter = useCallback(function ( value: FilterValuesType, todolistId: string) {
        dispatch(changeTodolistFilterAC(value, todolistId))
    }, [dispatch])

    const removeTodoList = useCallback(function (id: string) {
        const thunk = removeTodolistTC(id)
        dispatch(thunk)
    }, [dispatch])

    const changeTodoListTitle = useCallback((todolistId: string, newTitle: string) => {
        const thunk = changeTodolistTitleTC(todolistId, newTitle)
        dispatch(thunk)
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        const thunk = addTodolistTC(title)
        dispatch(thunk)
    }, [dispatch])

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
                <Grid container style={{ padding: "20px" }}>
                    <AddItemForm addItem={addTodolist} />
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id]
                            let tasksForTodolist = allTodolistTasks
                            return (
                                <Grid item key={tl.id}>
                                    <Paper elevation={3} style={{ padding: "15px" }}>
                                        <TodoList
                                            id={tl.id}
                                            title={tl.title}
                                            tasks={tasksForTodolist}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeTaskStatus={changeStatus}
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

export default AppWithRedux