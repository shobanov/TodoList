import React, { useCallback, useEffect } from 'react'
import '../../app/App.css'
import { Grid, Paper } from '@material-ui/core'
import { addTodolistTC, changeTodolistFilterAC, changeTodolistTitleTC, fetchTodolistsTC, FilterValuesType, removeTodolistTC, TodolistDomainType } from '../TodolistsList/todolists-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { addTaskTC, updateTaskTC, removeTaskTC, TasksStateType } from '../TodolistsList/tasks-reducer'
import { AppRootStateType } from '../../app/store'
import { TaskStatuses } from '../../api/todolist-api'
import TodoList from './Todolist/TodoList'
import AddItemForm from '../../components/AddItemForm'
import { Redirect } from 'react-router'

export type PropsType = {
    demo?: boolean
}

const TodolistList: React.FC<PropsType> = ({demo = false}) => {
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    const dispatch = useDispatch()

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
        const thunk = fetchTodolistsTC()
        dispatch(thunk)
    }, [dispatch, demo, isLoggedIn])

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

    if(!isLoggedIn) {
        return <Redirect to={"/login"} />
    }

    return(
        <>
            <Grid container style={{ padding: "20px" }}>
                <AddItemForm addItem={addTodolist} />
            </Grid>
            <Grid container spacing={3}>
                {
                    todolists.map(tl => {
                        let allTodolistTasks = tasks[tl.id]
                        return (
                            <Grid item key={tl.id}>
                                <Paper elevation={3} style={{ padding: "15px" }}>
                                    <TodoList
                                        todolist={tl}
                                        tasks={allTodolistTasks}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        removeTodoList={removeTodoList}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodoListTitle={changeTodoListTitle}
                                        demo={demo}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </>
    )
}

export default TodolistList