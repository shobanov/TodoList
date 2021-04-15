import React, { ChangeEvent, useState, KeyboardEvent } from 'react'
import {} from 'uuid';
import {TaskType, FilterValuesType} from './App'

export type PropsType = {
    title: string
    tasks: Array<TaskType>
    addTask: (title: string) => void
    removeTask: (id: string) => void
    changeFilter: (valueTypes: FilterValuesType) => void
}



export function TodoList(props: PropsType) {

    const [newTaskTitle, setNewTaskTitle ] = useState('');

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.charCode === 13) {
            props.addTask(newTaskTitle)
            setNewTaskTitle('')
        }
    }

    const addTask = () => {
        props.addTask(newTaskTitle)
        setNewTaskTitle('')
    }

    const onAllClickHandler = () => {props.changeFilter('all')}
    const onActiveClickHandler = () => {props.changeFilter('active')}
    const onCompletedClickHandler = () => {props.changeFilter('completed')}
    
    const tasks = props.tasks.map(t => {

        const removeTask = () => props.removeTask(t.id)
        
        return (
            <li>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={removeTask}> Del </button>
            </li>
        )
    } )

  return (
    <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input
                        value={newTaskTitle} 
                        onChange={onNewTitleChangeHandler}
                        onKeyPress={onKeyPressHandler}
                    />
                    <button onClick={addTask}> + </button>
                        
                </div>
                <ul>
                    {tasks}
                </ul>
                <div>
                    <button onClick={onAllClickHandler}> All </button>
                    <button onClick={onActiveClickHandler}> Active </button>
                    <button onClick={onCompletedClickHandler}> Completed </button>
                </div>
            </div>
        </div>
  )

}

export default TodoList;