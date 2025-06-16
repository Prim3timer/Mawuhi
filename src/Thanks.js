import useAuth from "./hooks/useAuth"
import { Link } from "react-router-dom"
import axios from "./app/api/axios"
import { useEffect, useState } from "react"

const Thanks = () =>{
    const [alert, setAlert] = useState('')
const {auth} = useAuth()
console.log(auth)
// const getRecipt = async ()=> {
//     const response = await axios.get('/thanks')
//     setAlert(response.data)
//     console.log(response.data)
// }

// useEffect(()=> {
//     getRecipt()
//     console.log(alert)
// }, [])
    return (
        <div className="thanks">
            <h3>{alert}</h3>
            <h2>Thank you for your order</h2>
            <Link to={'/shop'}><button>Shopping</button></Link>
        </div>
    )
}

export default Thanks