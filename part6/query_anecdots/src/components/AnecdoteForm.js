import { useMutation, useQueryClient } from "react-query"
import { createAnecdote } from "./api"
import { useNotificationDispatch } from "./NotificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const createAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
      setTimeout(() => dispatch("showNotification"), 5000)
    },
    onError: () => {
      dispatch({ type: 'showNotification', payload: 'too short anecdote, must have length 5 or more!' })
      setTimeout(() => {
        dispatch({ type: 'hideNotification' })
      }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    createAnecdoteMutation.mutate({ content: content, votes: 0 })

    dispatch({ type: 'showNotification', payload: `new anecdote: ${content}` })
    setTimeout(() => {
      dispatch({ type: 'hideNotification' })
    }, 5000)  
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
