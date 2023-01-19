import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    createNotification(state, action) {
        return action.payload
    },
    clearNotification() {
        return initialState
    }
  },
})

export const { createNotification, clearNotification } = notificationSlice.actions

var timeoutID
export const setNotification = (text, timeout) => {
    return async dispatch => {
        dispatch(createNotification(text))
        clearTimeout(timeoutID)
        timeoutID = setTimeout(() => {
            dispatch(clearNotification())
          }, timeout * 1000)
      }
   
}
export default notificationSlice.reducer