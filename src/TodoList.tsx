import React, { ChangeEvent, useState, KeyboardEvent } from 'react'
import {} from 'uuid';
import {TaskType, FilterValuesType} from './App'

export type PropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (title: string) => void
    removeTask: (id: string) => void
    changeFilter: (valueTypes: FilterValuesType) => void
    changeStatus: (taskId: string, isDone: boolean) => void
}



export function TodoList(props: PropsType) {

    const [title, setTitle ] = useState('');
    const [error, setError] = useState<string | null>(null);

    const newTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.charCode === 13) {
            addTask()  
        }
    }

    const addTask = () => {
        if(title.trim() !== '') {
            props.addTask(title.trim())
            setTitle('')
        } else {
            setError('Title is required!')
        }
    }

    const onAllClickHandler = () => {props.changeFilter('all')}
    const onActiveClickHandler = () => {props.changeFilter('active')}
    const onCompletedClickHandler = () => {props.changeFilter('completed')}
    
    const tasks = props.tasks.map(t => {
        const removeTask = () => props.removeTask(t.id)
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(t.id, e.currentTarget.checked )
        }

        
        return (
            <li  key={t.id} className={t.isDone ? 'is-done' : ''}>
                <input type="checkbox" onChange={onChangeHandler}/>
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
                        value={title} 
                        onChange={newTitleHandler}
                        onKeyPress={onKeyPressHandler}
                        className={error ? 'error' : ''}
                    />
                    <button onClick={addTask}> + </button>
                    {error && <div className='error-message'>{error}</div>}
                </div>
                <ul>
                    {tasks}
                </ul>
                <div >
                    <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}> All </button>
                    <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler}> Active </button>
                    <button className={props.filter === 'completed' ? 'active-filter' : ''} onClick={onCompletedClickHandler}> Completed </button>
                </div>
            </div>
        </div>
  )

}

export default TodoList;