import axios from 'axios'
// import dotenv from 'dotenv'  

// dotenv.config()

export default axios.create({
    baseURL: 'http://localhost:3500',
    // baseURL: 'https://mawuhi-back.onrender.com'
})

