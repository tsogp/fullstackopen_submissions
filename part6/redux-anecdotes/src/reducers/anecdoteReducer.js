import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
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


export const { appendAnecdote, upVoteAnecdoteById, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const upVoteAnecdote = (anecdote) => {
  return async dispatch => {
    const upVotedAnecdote = await anecdoteService.upVote(anecdote)
    dispatch(upVoteAnecdoteById(anecdote.id))
  }
}

export default anecdoteSlice.reducer