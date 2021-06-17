import { TextField } from '@material-ui/core'
import React, { ChangeEvent, useMemo, useState } from 'react'

export type EditableSpanPropsType = {
  title: string
  onChange: (newValue: string) => void
}

const EditableSpan = React.memo( (props: EditableSpanPropsType) => {
  console.log('EditableSpan')
  
  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState("")

  const activateEditMode = () => {
    setEditMode(true)
    setTitle(props.title)
  }
  const activateViewMode = () => {
    setEditMode(false)
    props.onChange(title)
  }
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    return  editMode
      ? <TextField value={title} onChange={onChangeTitle} onBlur={activateViewMode} autoFocus/>
      : <span onDoubleClick={activateEditMode}>{props.title}</span>
})

export default EditableSpan