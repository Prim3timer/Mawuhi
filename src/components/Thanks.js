import useAuth from "../hooks/useAuth"
import { Link } from "react-router-dom"
import axios from "../app/api/axios"
import { useEffect, useState } from "react"

const Thanks = () =>{
    const [alert, setAlert] = useState('')
const {auth} = useAuth()


const queryParams = new URLSearchParams(window.location.search)
const sessionId = queryParams.get("session_id")
const cusomer = queryParams.get("customer")
console.log(sessionId)

const getRecipt = async ()=> {
    const response = await axios.post(`/cart/thanks/${sessionId}`)
    console.log({res: response.data})
}
    // getRecipt()
// console.log(window.location.href)
// if (window.location == 'http://localhost:3000/thanks'){
// console.log('yes')
// }
useEffect(()=> {


        getRecipt()

    // console.log(alert)
}, [])
    return (
        <div className="thanks">
            {/* <h3>{alert}</h3> */}
            <h2>Thank you for your order</h2>
            <Link to={'/shop'}><button>Shopping</button></Link>
        </div>
    )
}

export default Thanks