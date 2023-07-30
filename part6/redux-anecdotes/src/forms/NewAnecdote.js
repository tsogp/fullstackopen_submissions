import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"

const NewAnecdote = () => {
  const dispatch = useDispatch()

  const handleCreateAnecdote = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ""
    dispatch(createAnecdote(anecdote))
  }

  return (
    <form onSubmit={(event) => handleCreateAnecdote(event)}>
      <input name="anecdote"/>
      <button type="submit">submit anecdote</button>
    </form>
  )
}

export default NewAnecdote