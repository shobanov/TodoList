import React, { ChangeEvent, useState } from 'react'

export type EditableSpanPropsType = {
  title: string
  onChange: (newValue: string) => void
}

function EditableSpan(props: EditableSpanPropsType) {
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
    ? <input value={title} onChange={onChangeTitle} onBlur={activateViewMode} autoFocus/>
    : <span onDoubleClick={activateEditMode}>{props.title}</span>
}

export default EditableSpan