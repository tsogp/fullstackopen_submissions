import { createSlice } from "@reduxjs/toolkit";

const initialState = ""

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    assignNotification(state, action) {
      return action.payload
    }
  }
})

export const { assignNotification } = notificationSlice.actions

export const setNotification = (content, seconds) => {
  return dispatch => {
    dispatch(assignNotification(content))
    setTimeout(() => {
      dispatch(assignNotification(""))
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer