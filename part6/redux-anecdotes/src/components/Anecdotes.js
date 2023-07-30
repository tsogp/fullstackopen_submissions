import { useDispatch, useSelector } from "react-redux";
import { upVoteAnecdoteById } from "../reducers/anecdoteReducer";

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch()
  
  const handleUpVoteAnecdoteById = (id) => {
    dispatch(upVoteAnecdoteById(id));
  }

  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleUpVoteAnecdoteById(anecdote.id)}>vote</button>
      </div>
    </div>
  )
}

const Anecdotes = () => {
  const anecdotes = useSelector(state => state)
  
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort((a1, a2) => a2.votes - a1.votes).map(anecdote => 
        <Anecdote anecdote={anecdote} /> 
      )}
    </div>
  )
}

export default Anecdotes;