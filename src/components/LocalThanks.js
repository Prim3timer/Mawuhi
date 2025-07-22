import useAuth from "../hooks/useAuth"
import { Link } from "react-router-dom"
import axios from "../app/api/axios"
import { useEffect, useState } from "react"
import useRefreshToken from "../hooks/useRefreshToken";
import { format } from "date-fns";

const LocalThanks = () =>{
    const [alert, setAlert] = useState('')
const {auth, setAuth} = useAuth()
 const refresh = useRefreshToken()



const queryParams = new URLSearchParams(window.location.search)
let sessionId = queryParams.get("session_id")
const cusomer = queryParams.get("customer")
console.log({sessionId})

const getRecipt = async ()=> {
     
    const now = new Date()
    const date = format(now, 'dd/MM/yyyy HH:mm:ss')
    const dateOjb = {date}
    console.log({date})
    try {

        const response = await axios.post(`/transactions/local-thanks/${sessionId}`, dateOjb)
        console.log({res: response.data})
        if (response){
            setAuth(prev => {

            return {...prev, users: response.data.users
            }
        })
            sessionId = ''
        }

    } catch (error){
        console.error(error)
    }
}
useEffect(()=> {

// if (sessionId){
    getRecipt()

// }
}, [])

//    useEffect(()=> {
//            preserveName()
//          }, [])
    return (
        <div className="thanks">
            {/* <h3>{alert}</h3> */}
            <h2>Thank you for your order</h2>
            <article>
            <Link to={'/shop'}><button>Shopping</button></Link>
            <Link to={'/home'}><button>Home</button></Link>
            <Link to={'/one-receipt'}><button>Get Receipt</button></Link>
       </article>
        </div>
    )
}

export default LocalThanks