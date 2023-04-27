import axios from 'axios'
const baseUrl = '/api/blogs'

let token = ''

const setToken = newToken => {
	token = `Bearer ${newToken}`;
}

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async (newObject) => {
    console.log(token)
    const config = { headers: { authorization: token }}
    
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, create }