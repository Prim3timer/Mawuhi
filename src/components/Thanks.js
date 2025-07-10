import useAuth from "../hooks/useAuth"
import { Link } from "react-router-dom"
import axios from "../app/api/axios"
import { useEffect, useState } from "react"
import useRefreshToken from "../hooks/useRefreshToken";

const Thanks = () =>{
    const [alert, setAlert] = useState('')
const {auth} = useAuth()
 const refresh = useRefreshToken()

    const preserveName = async () =>{
        try {
            
            const {username} = await refresh()
            console.log(username)
        } catch (error) {
            console.error(error)
        }

}

const queryParams = new URLSearchParams(window.location.search)
const sessionId = queryParams.get("session_id")
const cusomer = queryParams.get("customer")
console.log(sessionId)

const getRecipt = async ()=> {
    try {

        const response = await axios.post(`/cart/thanks/${sessionId}`)
        console.log({res: response.data})
    } catch (error){
        console.error(error)
    }
}
useEffect(()=> {

if (sessionId){
    getRecipt()

}
}, [])

   useEffect(()=> {
           preserveName()
         }, [])
    return (
        <div className="thanks">
            {/* <h3>{alert}</h3> */}
            <h2>Thank you for your order</h2>
            <Link to={'/shop'}><button>Shopping</button></Link>
            <Link to={'/home'}><button>Home</button></Link>
        </div>
    )
}

export default Thanks