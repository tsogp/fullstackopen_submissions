import axios from 'axios'
const baseUrl = '/api/blogs'

let token = ''

const setToken = newToken => {
	token = newToken
}

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken }