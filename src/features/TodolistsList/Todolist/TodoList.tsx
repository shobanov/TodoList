import React, { useCallback, useEffect } from 'react'
import AddItemForm from '../../../components/AddItemForm'
import EditableSpan from '../../../components/EditableSpan'
import { Button, IconButton } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import Task from './Task/Task'
import { TaskStatuses, TaskType } from '../../../api/todolist-api'
import { FilterValuesType, TodolistDomainType } from '../todolists-reducer'
import { useDispatch } from 'react-redux'
import { fetchTasksTC } from '../tasks-reducer'


export type PropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
    addTask: (title: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    removeTodoList: (id: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
    demo?: boolean
}

export const TodoList = React.memo (function({demo = false, ...props}: PropsType) {

    const dispatch = useDispatch()

    useEffect(() => {
        if (demo) {
            dispatch(fetchTasksTC(props.todolist.id))
        } else {
            return
        }
    }, [dispatch, props.todolist.id, demo])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todolist.id)
    }, [props])
    
    const removeTodoList = () => {
        props.removeTodoList(props.todolist.id)
    }

    const changeTodoListTitle = useCallback((newTitle: string) => {
        props.changeTodoListTitle(props.todolist.id, newTitle)
    }, [props])

    const onAllClickHandler = useCallback( () => props.changeFilter('all', props.todolist.id), [props])
    const onActiveClickHandler = useCallback( () => props.changeFilter('active', props.todolist.id), [props])
    const onCompletedClickHandler = useCallback( () => props.changeFilter('completed', props.todolist.id), [props])

    let tasksForTodoList = props.tasks

    if (props.todolist.filter === "active") {
        tasksForTodoList = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.todolist.filter === "completed") {
        tasksForTodoList = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.todolist.title} onChange={changeTodoListTitle} />
                <IconButton onClick={removeTodoList} disabled={props.todolist.entityStatus === 'loading'}>
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'}/>
            <div>
                { 
                    tasksForTodoList.map(t =>
                        <Task
                            key={t.id}
                            task={t}
                            todolistId={props.todolist.id}
                            removeTask={props.removeTask}
                            changeTaskStatus={props.changeTaskStatus}
                            changeTaskTitle={props.changeTaskTitle}
                        />)
                }
            </div>
            <div>
                <Button
                    variant={props.todolist.filter === 'all' ? 'contained' : 'text'}
                    onClick={onAllClickHandler}
                    size={'small'}
                >
                    All
                </Button>
                <Button
                    variant={props.todolist.filter === 'active' ? 'contained' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}
                    size={'small'}
                >
                    Active
                </Button>
                <Button
                    variant={props.todolist.filter === 'completed' ? 'contained' : 'text'}
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