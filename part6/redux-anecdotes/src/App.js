import NewAnecdote from './forms/NewAnecdote'
import Anecdotes from './components/Anecdotes'
import Filter from './components/Filter'

const App = () => {
  return (
    <>
      <Filter />
      <Anecdotes />
      <NewAnecdote />
    </>
  )
}

export default App