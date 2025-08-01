import useAuth from "../hooks/useAuth"
import { Link } from "react-router-dom"
import axios from "../app/api/axios"
import { useEffect, useState, useContext} from "react"
import useRefreshToken from "../hooks/useRefreshToken";
import AuthContext from "../context/authProvider";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const Thanks = () =>{
    const [alert, setAlert] = useState('')
const {auth, setAuth} = useAuth()
 const refresh = useRefreshToken()
const {currentUsers} = useContext(AuthContext)
const [successCounter, setSuccessCounter] = useState(false)
const navigate = useNavigate()


const preserveName = async () =>{
    try {
        
        const {username} = await refresh()
        console.log(username)
    } catch (error) {
        console.error(error)
    }
    
}


const getRecipt = async ()=> {
    const queryParams = new URLSearchParams(window.location.search)
    let sessionId = queryParams.get("session_id")
    const cusomer = queryParams.get("customer")
    console.log({currentUsers})
    console.log({sessionId})
     
    const now = new Date()
    const date = format(now, 'dd/MM/yyyy HH:mm:ss')
    const dateOjb = {date}
    console.log({date})
    try {

const res = await axios.get(`/cart/thanks/old-session/${sessionId}`)
console.log(res)

    const oldSession = res.data ? res.data.title : ''

    console.log({oldSession})
    console.log(oldSession === sessionId)

console.log({sessionId})
 
// window.addEventListener('beforeunload', function (e) {
//     e.preventDefault()
//     return "data will get lost"
// });  
// const oldSessionId = res.data._id ? res.data._id : ''
// console.log({oldSessionId})
if (oldSession === sessionId ){
return

} else if (!oldSession || oldSession !== sessionId) {
    const response = await axios.post(`/cart/thanks/${sessionId}`, dateOjb)
//   const res = await axios.delete(`/cart/thanks/alot/${oldSessionId}`)
//   console.log({res})
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

export default Thanks