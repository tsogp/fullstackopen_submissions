import NewAnecdote from './forms/NewAnecdote'
import Anecdotes from './components/Anecdotes'
import Filter from './components/Filter'
import Notification from './components/Notification'

import { useDispatch } from 'react-redux'
import anecdoteService from './services/anecdotes'
import { useEffect } from 'react'
import { setAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    console.log("her")
    anecdoteService
      .getAll().then(notes => dispatch(setAnecdotes(notes)))
  }, [])

  return (
    <>
      <Filter />
      <Notification />
      <Anecdotes />
      <NewAnecdote />
    </>
  )
}

export default App