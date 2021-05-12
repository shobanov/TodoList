import { IconButton, TextField } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import React, { ChangeEvent, useState, KeyboardEvent } from 'react'

    type AddItemFormPropsType = {
        addItem: (title: string) => void
    }

    function AddItemForm(props: AddItemFormPropsType) {

        const [title, setTitle ] = useState('')
        const [errorMessage, setErrorMessage] = useState<string | null>(null)

        const addTask = () => {
            if(title.trim() !== '') {
                props.addItem(title.trim())
                setTitle('')
            } else {
                setErrorMessage('Title is required!')
            }
        }

        const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setTitle(e.currentTarget.value)
            setErrorMessage(null)
        }

        const onPressEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
            if(e.charCode === 13) {
                addTask()
            }
        }

        return (
            <div>
                <TextField
                    value={title}
                    id={'outlined-error-helper-text'}
                    variant={'outlined'}
                    label={'Type text'}
                    error={!!errorMessage}
                    onChange={onChangeTitleHandler}
                    onKeyPress={onPressEnterHandler}
                    className={errorMessage ? 'error' : ''}
                    helperText={errorMessage}
                    size={'small'}
                />
                <IconButton
                    onClick={addTask}
                    color={'primary'}
                >
                    <Add fontSize={'large'}/>
                </IconButton>
                
            </div>
        )
    }

    export default AddItemForm

    //className={errorMessage ? 'error' : ''}