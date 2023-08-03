import { useDispatch, useSelector } from "react-redux";
import { upVoteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch()
  
  const handleUpVoteAnecdoteById = (anecdote) => {
    dispatch(upVoteAnecdote(anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
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