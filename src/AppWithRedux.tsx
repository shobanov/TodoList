import React from 'react'
import './App.css'
import TodoList, { TaskType } from './TodoList'
import AddItemForm from './AddItemForm'
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@material-ui/core'
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC } from './state/todolists-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootState } from './state/store'

export type FilterValuesType = 'all'|'active'|'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    
    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists)

    function changeFilter(value: FilterValuesType, todoListId: string) {
        dispatch(changeTodolistFilterAC(value, todoListId))
    }
    
    function addTodoList(title: string) {
        dispatch(addTodolistAC(title))
    }
                
    const removeTodoList = (todoListId: string) => {
        dispatch(removeTodolistAC(todoListId))
        dispatch(removeTodolistAC(todoListId))
    }
    
    function changeTodoListTitle(todoListId: string, newTitle: string) {
        dispatch(changeTodolistTitleAC(todoListId, newTitle))
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
                <Grid container style={{ padding: "20px" }}>
                    <AddItemForm addItem={addTodoList} />
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            return (
                                <Grid item>
                                    <Paper elevation={3} style={{ padding: "15px" }}>
                                        <TodoList
                                            key={tl.id}
                                            id={tl.id}
                                            title={tl.title}
                                            changeFilter={changeFilter}
                                            filter={tl.filter}
                                            removeTodoList={removeTodoList}
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