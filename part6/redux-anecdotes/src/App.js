import NewAnecdote from './forms/NewAnecdote'
import Anecdotes from './components/Anecdotes'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
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