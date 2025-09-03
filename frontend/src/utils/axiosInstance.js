import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://updates-backend-dw0m.onrender.com/api',
    withCredentials: true,
})

export default axiosInstance
