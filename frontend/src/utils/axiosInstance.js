import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://updates-backend-6soa.onrender.com/api',
    withCredentials: true,
})

export default axiosInstance
