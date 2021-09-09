import { setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType } from "../app/app-reducer"
import { ResponseType } from "../api/todolist-api"
import { Dispatch } from "react"

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType>) => {
  if (data.messages.length) {
    dispatch(setAppErrorAC(data.messages[0]))
  } else {
    dispatch(setAppErrorAC('some error occurred'))
  }
  dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: {message: string}, dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType>) => {
  dispatch(setAppErrorAC(error.message ? error.message : "Some error occurred"))
  dispatch(setAppStatusAC('failed'))
}
