import useAuth from "./hooks/useAuth"
import { Link } from "react-router-dom"

const Thanks = () =>{
const {auth} = useAuth()
console.log(auth.receipt)
    return (
        <div className="thanks">
            <h2>Thank you for your order</h2>
            <Link to={'/shop'}><button>Shopping</button></Link>
        </div>
    )
}

export default Thanks