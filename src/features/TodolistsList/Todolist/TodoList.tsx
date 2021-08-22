import React, { useCallback, useEffect } from 'react'
import AddItemForm from '../../../components/AddItemForm'
import EditableSpan from '../../../components/EditableSpan'
import { Button, IconButton } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import Task from './Task/Task'
import { TaskStatuses, TaskType } from '../../../api/todolist-api'
import { FilterValuesType } from '../todolists-reducer'
import { useDispatch } from 'react-redux'
import { fetchTasksTC } from '../tasks-reducer'


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
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
}

export const TodoList = React.memo (function(props: PropsType) {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTasksTC(props.id))
    }, [dispatch, props.id])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props])
    
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }

    const changeTodoListTitle = useCallback((newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle)
    }, [props])

    const onAllClickHandler = useCallback( () => props.changeFilter('all', props.id), [props])
    const onActiveClickHandler = useCallback( () => props.changeFilter('active', props.id), [props])
    const onCompletedClickHandler = useCallback( () => props.changeFilter('completed', props.id), [props])

    let tasksForTodoList = props.tasks

    if (props.filter === "active") {
        tasksForTodoList = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.filter === "completed") {
        tasksForTodoList = props.tasks.filter(t => t.status === TaskStatuses.Completed)
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
                    tasksForTodoList.map(t =>
                        <Task
                            key={t.id}
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
                    color="secondary"
                    size="small"
                >
                    Completed
                </Button>
            </div>
        </div>
    )
})

export default TodoList