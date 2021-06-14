import React, { ChangeEvent } from 'react'
import { FilterValuesType } from './AppWithRedux'
import AddItemForm from './AddItemForm'
import EditableSpan from './EditableSpan'
import { Button, Checkbox, IconButton } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from './state/tasks-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootState } from './state/store'


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type PropsType = {
    id: string
    title: string
    filter: FilterValuesType
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    removeTodoList: (id: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
}

export function TodoList(props: PropsType) {
    
    const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.id])
    const dispatch = useDispatch()

    function removeTask(taskId: string, todoListId: string) {
        dispatch(removeTaskAC(taskId, todoListId))
    }
    
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }

    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle)
    }

    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)

    let allTodolistTasks = tasks
    let tasksForTodoList = allTodolistTasks

    if (props.filter === "active") {
        tasksForTodoList = allTodolistTasks.filter(t => t.isDone === false)
    }
    if (props.filter === "completed") {
        tasksForTodoList = allTodolistTasks.filter(t => t.isDone === true)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodoListTitle} />
                <IconButton onClick={removeTodoList}><Delete /></IconButton>
            </h3>
            <AddItemForm addItem={(title) => {
                dispatch(addTaskAC(title, props.id))
            }} />
            <div>
                {
                    tasksForTodoList.map(t => {
                        const onClickHandler = () => dispatch(removeTaskAC(t.id, props.id))
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked
                            dispatch(changeTaskStatusAC(t.id, newIsDoneValue, props.id))
                        }
                        const onTitleChangeHanler = (newValue: string) => {
                            dispatch(changeTaskTitleAC(t.id, newValue, props.id))
                        }

                        return (
                            <div key={t.id} className={t.isDone ? 'is-done' : ''}>
                                <Checkbox
                                    checked={t.isDone}
                                    color="primary"
                                    onChange={onChangeHandler}
                                />
                                
                                <EditableSpan title={t.title} onChange={onTitleChangeHanler} />
                                <IconButton onClick={onClickHandler}><Delete /></IconButton>
                            </div>
                        )
                    })
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
}

export default TodoList