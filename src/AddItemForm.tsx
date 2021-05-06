import React, { ChangeEvent, useState, KeyboardEvent } from 'react'

    type AddItemFormPropsType = {
        addItem: (title: string) => void
    }

    function AddItemForm(props: AddItemFormPropsType) {

        const [title, setTitle ] = useState('')
        const [error, setError] = useState<string | null>(null)

        const addTask = () => {
            if(title.trim() !== '') {
                props.addItem(title.trim())
                setTitle('')
            } else {
                setError('Title is required!')
            }
        }

        const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setTitle(e.currentTarget.value)
            setError(null)
        }

        const onPressEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
            if(e.charCode === 13) {
                addTask()
            }
        }

        return (
            <div>
                <input
                    value={title}
                    onChange={onChangeTitleHandler}
                    onKeyPress={onPressEnterHandler}
                    className={error ? 'error' : ''}
                />
                <button onClick={addTask}> + </button>
                {error && <div className='error-message'>{error}</div>}
            </div>
        )
    }

    export default AddItemForm