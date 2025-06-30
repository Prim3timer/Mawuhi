import axios from 'axios'



export default axios.create({
    baseURL: process.env.REACT_APP_URL
    // baseURL: 'https://mawuhi-back.onrender.com'
})

