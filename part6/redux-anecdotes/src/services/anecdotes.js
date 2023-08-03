import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0}
  const response = await axios.post(baseUrl, object)
  return response.data
}

const upVote = async (user) => {
  const response = await axios.put(baseUrl + `/${user.id}`, { 
    content: user.content,
    votes: user.votes + 1
  })
  return response.data
}

export default {
  getAll,
  createNew,
  upVote
}