import axios from 'axios'
import dotenv from 'dotenv'  

dotenv.config()

export default axios.create({
    baseURL: process.env.REACT_APP_URL
    // baseURL: 'https://mawuhi-back.onrender.com'
})

