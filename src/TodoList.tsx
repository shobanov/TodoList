import React, { useCallback } from 'react'
import { FilterValuesType } from './AppWithRedux'
import AddItemForm from './AddItemForm'
import EditableSpan from './EditableSpan'
import { Button, IconButton } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import Task from './Task'


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type PropsType = {
    id: string
    tasks: Array<TaskType>
    title: string
    filter: FilterValuesType
    addTask: (title: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    removeTodoList: (id: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
}

export const TodoList = React.memo (function (props: PropsType) {

    console.log("TodoList is called")
    
    const addTask = useCallback( (title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])
    
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }

    const changeTodoListTitle = useCallback( (newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle)
    }, [props.changeTodoListTitle, props.id])

    const onAllClickHandler = useCallback( () => props.changeFilter('all', props.id), [props.changeFilter, props.id])
    const onActiveClickHandler = useCallback( () => props.changeFilter('active', props.id), [props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback( () => props.changeFilter('completed', props.id), [props.changeFilter, props.id])

    let tasksForTodoList = props.tasks

    if (props.filter === "active") {
        tasksForTodoList = props.tasks.filter(t => t.isDone === false)
    }
    if (props.filter === "completed") {
        tasksForTodoList = props.tasks.filter(t => t.isDone === true)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodoListTitle} />
                <IconButton onClick={removeTodoList}><Delete /></IconButton>
            </h3>
            <AddItemForm addItem={addTask} />
            <div>
                { 
                    props.tasks.map(t => <Task
                        key={props.id}
                        task={t}
                        todolistId={props.id}
                        removeTask={props.removeTask}
                        changeTaskStatus={props.changeTaskStatus}
                        changeTaskTitle={props.changeTaskTitle}
                    />)
                }
            </div>
            <div>
                <Button
                    variant={props.filter === 'all' ? 'contained' : 'text'}
                    onClick={onAllClickHandler}
                    size={'small'}
                >All
                </Button>
                <Button
                    variant={props.filter === 'active' ? 'contained' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}
                    size={'small'}
                >Active
                </Button>
                <Button
                    variant={props.filter === 'completed' ? 'contained' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}
                    size={'small'}
                >Completed
                </Button>
            </div>
        </div>
    )
})

export default TodoList