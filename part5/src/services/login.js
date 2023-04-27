import axiosInstanse from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
    const response = await axiosInstanse.post(baseUrl, credentials)
    return response.data
}

export default {
    login
};