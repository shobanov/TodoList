import React from 'react'
import {} from 'uuid';
import {TaskType, FilterValuesType} from './App'

export type PropsType = {
    title: string
    tasks: Array<TaskType>
    addTask: () => void
    removeTask: (id: string) => void
    changeFilter: (valueTypes: FilterValuesType) => void
}

function TodoList(props: PropsType) {

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
                    <input/>
                    <button onClick={props.addTask}> + </button>
                </div>
                <ul>
                    {tasks}
                </ul>
                <div>
                    <button onClick={() => {props.changeFilter('all')}}> All </button>
                    <button onClick={() => {props.changeFilter('active')}}> Active </button>
                    <button onClick={() => {props.changeFilter('completed')}}> Completed </button>
                </div>
            </div>
        </div>
  )

}

export default TodoList;