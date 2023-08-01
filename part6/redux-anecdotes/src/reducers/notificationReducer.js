import { createSlice } from "@reduxjs/toolkit";

const initialState = ""

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    clearNotification(state, action) {
      return ""
    },
    newAnecdoteNotification(state, action) {
      return `you created '${action.payload}'`       
    },
    upVoteNotification(state, action) {
      return `you voted '${action.payload}'`
    }
  }
})

export const { clearNotification, newAnecdoteNotification, upVoteNotification } = notificationSlice.actions
export default notificationSlice.reducer