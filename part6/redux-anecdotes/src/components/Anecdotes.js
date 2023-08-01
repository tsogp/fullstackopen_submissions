import { useDispatch, useSelector } from "react-redux";
import { upVoteAnecdoteById } from "../reducers/anecdoteReducer";
import { upVoteNotification, clearNotification } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch()
  
  const handleUpVoteAnecdoteById = (anecdote) => {
    dispatch(upVoteAnecdoteById(anecdote.id))
    dispatch(upVoteNotification(anecdote.content))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleUpVoteAnecdoteById(anecdote)}>vote</button>
      </div>
    </div>
  )
}

const Anecdotes = () => {
  const anecdotes = useSelector(state => 
    state.anecdotes.filter(a =>
      a.content.toLowerCase().includes(state.filter.toLowerCase())
    )
  )

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort((a1, a2) => a2.votes - a1.votes).map(anecdote => 
        <Anecdote key={anecdote.id} anecdote={anecdote} /> 
      )}
    </div>
  )
}

export default Anecdotes;