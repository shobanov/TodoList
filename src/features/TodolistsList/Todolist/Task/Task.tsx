import React, { ChangeEvent, useCallback } from 'react'
import EditableSpan from '../../../../components/EditableSpan'
import { Checkbox, IconButton } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { TaskStatuses, TaskType } from '../../../../api/todolist-api'


type TaskPropsType = {
    task: TaskType
    todolistId: string
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
}

export const Task = React.memo( (props: TaskPropsType) => {
    const onClickHandler = () => props.removeTask(props.task.id, props.todolistId)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newstatusValue = e.currentTarget.checked
        props.changeTaskStatus(props.task.id, newstatusValue ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId)
    }
    const onTitleChangeHanler = useCallback( (newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId)
    }, [props])

    return (
        <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
            <Checkbox
                checked={props.task.status === TaskStatuses.Completed}
                color="primary"
                onChange={onChangeHandler}
            />
            
            <EditableSpan title={props.task.title} onChange={onTitleChangeHanler} />
            <IconButton onClick={onClickHandler}><Delete /></IconButton>
        </div>
    )
})

export default Task