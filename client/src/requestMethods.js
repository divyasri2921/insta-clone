import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api"
})
export const publicFolder = "http://localhost:5000/images/"