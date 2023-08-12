import { useMutation, useQuery, useQueryClient } from 'react-query'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateAnecdote } from './components/api'
import { NotificationContextProvider, useNotificationDispatch } from './components/NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const voteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const handleVote = (anecdote) => {
    voteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  const query = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false
  })

  if (query.status === 'loading') {
    return <span>Loading...</span>
  }

  if (query.status === 'error') {
    return <span>Error: {query.error.message}</span>
  }

  console.log(query)
  const anecdotes = query.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification type/>
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
