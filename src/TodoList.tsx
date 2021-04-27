import React, { ChangeEvent, useState, KeyboardEvent } from 'react'
import {TaskType, FilterValuesType} from './App'

export type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (title: string, todoListId: string) => void
    removeTask: (id: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    removeTodoList: (todoListID: string) => void
}

export function TodoList(props: PropsType) {
    
    const [title, setTitle ] = useState('')
    const [error, setError] = useState<string | null>(null)
    
    const addTask = () => {
        if(title.trim() !== '') {
            props.addTask(title.trim(), props.id)
            setTitle('')
        } else {
            setError('Title is required!')
        }
    }

    const onChangeHandler = (taskId: string, e: ChangeEvent<HTMLInputElement>) => {
        props.changeStatus(taskId, e.target.checked, props.id)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.charCode === 13) {
            addTask()
        }
    }

    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)

    const newTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }

    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }
    
    const tasksRender = props.tasks.map(t => {
        const removeTask = () => props.removeTask(t.id, props.id)
        
        return (
            <li  key={t.id} className={t.isDone ? 'is-done' : ''}>
                <input type="checkbox" checked={t.isDone} onChange={(e) => onChangeHandler(t.id, e)}/>
                <span>{t.title}</span>
                <button onClick={removeTask}>Del</button>
            </li>
        )
    })

  return (
    <div>
        <div>
            
            <h3>{props.title}<button onClick={removeTodoList}>x</button></h3>
            
            <div>
                <input
                    value={title} 
                    onChange={newTitleHandler}
                    onKeyPress={onKeyPressHandler}
                    className={error ? 'error' : ''}
                />
                <button onClick={addTask}> + </button>
                {error && <div className='error-message'>{error}</div>}
            </div>
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