import { useEffect, useReducer } from "react"
import initialState from "../store"
import reducer from "../reducer"
import axios from "../app/api/axios"
import useAuth from "../hooks/useAuth"
import {format} from 'date-fns'

const Payment = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    
const {auth} = useAuth()

    

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

const getCartItems = async () => {
    try {
        const response = await axios.get('/cart')
        console.log(response.data)
        const userItems = response.data.filter((item) => item.userId === auth.picker)
        if (userItems.length){
            dispatch({type: 'CARTARRAY', payload: userItems})
            console.log(userItems)
        }
        
        
    } catch (error) {
        console.log(error.message)
        dispatch({type: 'errMsg', payload: error.message})
    }
}



const doneSales = async()=> {
    console.log(state.cartArray)
try {
       const response = await axios.post('/cart/create-checkout-session', state.cartArray)
       console.log(response.data)
          if (response){
             window.location = response.data.url
          

          }   else throw Error('no item purchased')
         
} catch (error) {
    console.log(error.message)
      dispatch({type: 'errMsg', payload: 'no item purchased'})
}

         
      }

useEffect(() => {
    getItems()
}, [])
useEffect(() => {
    getCartItems()
}, [])
    const checkout = async ()=> {
    try {
         const items = [
            {id: '6765034e77246d1f7c9ae781', quantity: 5},    
            {id: '6765a78f77246d1f7c9ae824', quantity: 20}, 
        ]
        const response = await axios.post('/cart/create-checkout-session', items)
        console.log(response)
        if (response){
           window.location = response.data.url
        }else  console.log("no checkout")
       
        
    } catch (error) {
        console.error(error)
    }
       
    }
    return (
        <div className="checkout">
            <h3>Payment</h3>

{state.cartArray && state.cartArray.map((item) =>{
    return (
        <div>
            <h3>{item.name}</h3>
            <h3>price: ${item.price}</h3>
            <label>
                Qty:
            <input
            className="cart-qty"
                value={item.quantity}
                onChange={(e) => dispatch({type: "MAINCARTFIELD", payload: e.target.value, id: item._id})}
            
            />
            </label>
            
        </div>
    )
})}
            <button
             onClick={doneSales}
             >Checkout</button>

        </div>
    )
}

export default Payment