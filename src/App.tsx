import React, {useState} from 'react';
import './App.css';
import TodoList from './TodoList';
import {v1} from "uuid"


export type TaskType = { 
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all'|'active'|'completed'

function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>( [
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'React', isDone: false}
    ])

    const [filter, setFilter] = useState<FilterValuesType>('all')

    function removeTask(taskID: string) {
       const filteredTasks = tasks.filter(t => t.id !== taskID)
        setTasks(filteredTasks)
    }

    function addTask(title: string) {
        let task: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        let newTasks = [task, ...tasks]
        setTasks(newTasks)
    }

    function changeFilter(valueTypes: FilterValuesType) {
        return setFilter(valueTypes)
    }

    function getTasksFiltered() {
        switch (filter) {
            case 'active':
                return tasks.filter(t => !t.isDone)
            case 'completed':
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }

    return (
        <div className='App'>
            <TodoList
                title={'What to learn'} 
                tasks={getTasksFiltered()}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </div>
    );
}

export default App;

