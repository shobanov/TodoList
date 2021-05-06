import { type } from 'node:os'
import React, { ChangeEvent, useState, KeyboardEvent } from 'react'
import {TaskType, FilterValuesType} from './App'
import AddItemForm from './AddItemForm'
import EditableSpan from './EditableSpan'

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
            <li  key={t.id} className={t.isDone ? 'is-done' : ''}>
                <input type="checkbox" checked={t.isDone} onChange={(e) => onChangeStatusHandler(t.id, e)}/>
                <EditableSpan title={t.title} onChange={onChangeTitleHandler} />
                <button onClick={removeTask}>Del</button>
            </li>
        )
    })

  return (
        <div>
            <div>
                <h3> <EditableSpan title={props.title} onChange={changeTodoListTitle}/><button onClick={removeTodoList}>x</button></h3>
                <AddItemForm addItem={addTask} />
                <ul>
                    {tasksRender}
                </ul>
                <div >
                    <button
                        className={props.filter === 'all' ? 'active-filter' : ''}
                        onClick={onAllClickHandler}>
                        All
                </button>
                    <button
                        className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>
                        Active
                </button>
                    <button
                        className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>
                        Completed
                </button>
                </div>
            </div>
        </div>
    )
}

export default TodoList;