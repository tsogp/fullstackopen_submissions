import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const NewAnecdote = () => {
  const dispatch = useDispatch()

  const handleCreateAnecdote = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ""
    dispatch(createAnecdote(anecdote))
    dispatch(setNotification(`you created '${anecdote}'`, 5))
  }

  return (
    <form onSubmit={(event) => handleCreateAnecdote(event)}>
      <input name="anecdote"/>
      <button type="submit">submit anecdote</button>
    </form>
  )
}

export default NewAnecdote