import { useEffect, useReducer } from "react"
import initialState from "../store"
import reducer from "../reducer"
import axios from "../app/api/axios"
import useAuth from "../hooks/useAuth"
import {format} from 'date-fns'

const Payment = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    


    

const getItems = async () => {
    try {
         const response = await axios.get('/items')
         if (response){
             dispatch({type: 'items', payload: response.data.items})
         
       
        }
    } catch (error) {
        console.error(error)
    }   
}

useEffect(() => {
    getItems()
}, [])
    const checkout = async ()=> {
    try {
         const items = [
            {id: '6765034e77246d1f7c9ae781', quantity: 5},    
            {id: '6765a78f77246d1f7c9ae824', quantity: 20}, 
        ]
        const response = await axios.post('/create-checkout-session', items)
        if (response){
           window.location = response.data
        }else  console.log("no checkout")
       
        
    } catch (error) {
        console.error(error)
    }
       
    }
    return (
        <div className="checkout">
            <h3>Payment</h3>


            <button onClick={checkout}>Checkout</button>

        </div>
    )
}

export default Payment