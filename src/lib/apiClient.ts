import axios from 'axios'

export const apiClient = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
    timeout: 30000,
})

apiClient.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        alert(error.response.data)
        return Promise.reject(error.response)
    }
)
