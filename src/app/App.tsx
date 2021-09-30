import React, { useCallback, useEffect } from 'react'
import './App.css'
import { AppBar, Button, CircularProgress, Container, IconButton, LinearProgress, Toolbar, Typography } from '@material-ui/core'
import TodolistList from '../features/TodolistsList/TodolistList'
import { ErrorSnackbar } from '../components/ErrorSnackbar'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from './store'
import { initializeAppTC, RequestStatusType } from './app-reducer'
import { BrowserRouter, Route } from 'react-router-dom'
import { Login } from '../features/Login/Login'
import { logoutTC } from '../features/Login/auth-reducer'

export type PropsType = {
    demo?: boolean
}

function App({ demo = false }: PropsType) {
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [])

    if (!isInitialized) {
        return <div
            style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}
        ><CircularProgress />
        </div>
    }

    return (
        <BrowserRouter>
            <div className="App">
                <ErrorSnackbar />
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                        </IconButton>
                        <Typography variant="h5">
                            Todolist
                        </Typography>
                        {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
                    </Toolbar>
                    {status === 'loading' && <LinearProgress />}
                </AppBar>
                <Container fixed>
                    <Route path={"/"} render={() => <Login />} />
                    <Route exact path={"/"} render={() => <TodolistList demo={demo} />} />
                </Container>
            </div>
        </BrowserRouter>
    )
}

export default App