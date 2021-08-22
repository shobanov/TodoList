import React from 'react'
import './App.css'
import { AppBar, Button, Container, IconButton, Toolbar, Typography } from '@material-ui/core'
import TodolistList from '../features/TodolistsList/TodolistList'

function App() {

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
                <TodolistList />
            </Container>
        </div>
    )
}

export default App