import { createSlice } from "@reduxjs/toolkit"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    upVoteAnecdoteById(state, action) {
      const toUpVote = state.find(a => a.id === action.payload)
      const upVoted = {...toUpVote, votes: toUpVote.votes + 1}
      return state.map(a => 
        a.id !== action.payload ? a : upVoted
      )
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})


export const { createAnecdote, upVoteAnecdoteById, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer