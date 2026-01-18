
import useAuth from "../hooks/useAuth"
import { Link } from "react-router-dom"
import axios from "../app/api/axios"
import { useEffect, useState, useContext} from "react"
import AuthContext from "../context/authProvider";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const Thanks = () =>{
const {currentUsers} = useContext(AuthContext)
const [transId, setTransId] = useState()


const getRecipt = async ()=> {
    const queryParams = new URLSearchParams(window.location.search)
    let sessionId = queryParams.get("session_id")
    const cusomer = queryParams.get("customer")
    console.log({currentUsers})
    console.log({sessionId})
     
    const now = new Date()
    const date = format(now, 'yyyy-MM-dd HH:mm:ss')
    const dateOjb = {date}
    console.log({date})
    try {

const res = await axios.get(`/sessions/thanks/old-session/${sessionId}`)
console.log(res)

    const oldSession = res.data ? res.data : ''

    console.log({oldSession})
    console.log(oldSession === sessionId)

console.log({sessionId})

if (oldSession === sessionId ){
return

} else if (!oldSession || oldSession !== sessionId) {
    const response = await axios.post(`/sessions/thanks/${sessionId}`, dateOjb)
    console.log(response.data)
    setTransId(response.data.transaction._id)
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


    return (
        <div className="thanks">
            {/* <h3>{alert}</h3> */}
            <h2>Thank you for your order</h2>
            <article>
            <Link to={'/shop'}><button>Shopping</button></Link>
            {/* <Link to={'/home'}><button>Home</button></Link> */}
            <Link to={'/one-receipt'} onClick={localStorage.setItem('memTransaction', transId && transId)}><button>Get Receipt</button></Link>
      </article>
        </div>
    )
}

export default Thanks
