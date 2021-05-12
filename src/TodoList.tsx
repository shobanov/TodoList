import { type } from 'node:os'
import React, { ChangeEvent, useState, KeyboardEvent } from 'react'
import {TaskType, FilterValuesType} from './App'
import AddItemForm from './AddItemForm'
import EditableSpan from './EditableSpan'
import { Button, Checkbox, IconButton } from '@material-ui/core'
import { Delete } from '@material-ui/icons'

export type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (title: string, todoListId: string) => void
    removeTask: (id: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    removeTodoList: (todoListID: string) => void
    changeTodoListTitle: (todoListID: string, newTitle: string) => void
    changeTaskTitle: (id: string, newTitle: string, todoListID: string) => void
}

export function TodoList(props: PropsType) {
    
    const onChangeStatusHandler = (taskId: string, e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(taskId, e.target.checked, props.id)
    }

    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)

    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }

    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    
    const tasksRender = props.tasks.map(t => {

        const removeTask = () => props.removeTask(t.id, props.id)

        const onChangeTitleHandler = (newValue: string) => { 
            props.changeTaskTitle(props.id, t.id, newValue)
        }
        
        return (
            <div className={t.isDone ? 'is-done' : ''}>
                <Checkbox
                    checked={t.isDone}
                    onChange={(e) => onChangeStatusHandler(t.id, e)}
                />
                <EditableSpan title={t.title} onChange={onChangeTitleHandler} />
                <IconButton onClick={removeTask}><Delete /></IconButton>
            </div>
        )
    })

  return (
        <div>
            <div>
                <h3>
                    <EditableSpan title={props.title} onChange={changeTodoListTitle} />
                    <IconButton onClick={removeTodoList}><Delete /></IconButton>
                </h3>
                <AddItemForm addItem={addTask} />
                <ul>
                    {tasksRender}
                </ul>
                <div >
                    <Button
                        variant={props.filter === 'all' ? 'contained' : 'text'}
                        onClick={onAllClickHandler}
                        size={'small'}
                    >
                        All
                    </Button>
                    <Button
                        variant={props.filter === 'active' ? 'contained' : 'text'}
                        onClick={onActiveClickHandler}
                        color={'primary'}
                        size={'small'}
                    >
                        Active
                    </Button>
                    <Button
                        variant={props.filter === 'completed' ? 'contained' : 'text'}
                        onClick={onCompletedClickHandler}
                        color={'secondary'}
                        size={'small'}
                    >
                        Completed
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default TodoList;