import { IconButton, TextField } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import React, { ChangeEvent, useState, KeyboardEvent } from 'react'

    type AddItemFormPropsType = {
        addItem: (title: string) => void
        disabled?: boolean
    }

    const AddItemForm = React.memo(({addItem, disabled = false}: AddItemFormPropsType) => {

        const [title, setTitle ] = useState('')
        const [errorMessage, setErrorMessage] = useState<string | null>(null)

        const addItemHandler = () => {
            if(title.trim() !== '') {
                addItem(title.trim())
                setTitle('')
            } else {
                setErrorMessage('Title is required!')
            }
        }

        const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
            if (errorMessage !== null) {
                setErrorMessage(null)
            }
            setTitle(e.currentTarget.value)
        }

        const onPressEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
            if(e.charCode === 13) {
                addItemHandler()
            }
        }

        return (
            <div>
                <TextField
                    disabled={disabled}
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
                    disabled={disabled}
                    onClick={addItemHandler}
                    color={'primary'}
                >
                    <Add fontSize={'large'} />
                </IconButton>
                
            </div>
        )
    })

    export default AddItemForm