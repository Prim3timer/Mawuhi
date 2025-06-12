import { useEffect, useReducer } from "react"
import initialState from "../store"
import reducer from "../reducer"
import axios from "../app/api/axios"
import useAuth from "../hooks/useAuth"
import {format} from 'date-fns'
import { FaTrash } from "react-icons/fa"
import { Link } from "react-router-dom"

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

      const removeItem = async (id)=> {
        try {
            
            dispatch({type: 'REMOVECARTITEM', payload: id})
            const response = await axios.delete(`/cart/${id}`)
            if (response){
                dispatch({type: 'ALERTMSG', payload: 'item removed'})
                setTimeout(()=> {
                    dispatch({type: 'ALERTMSG', payload: ''})
                }, 3000)
            }
        } catch (error) {
            dispatch({type: 'errMsg', payload: error.message})
        }

      }

     const clearCart = async()=> {
        try {
            dispatch({type: 'CLEARCART'})
            const id = auth.picker
            const response = await axios.delete(`/cart/clear/${auth.picker}`)
            console.log(response.data)
            
        } catch (error) {
            console.log(error.message)
        }
     }

       function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
            <h3>{state.cartArray.length} items</h3>

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
            <h3>total: ${numberWithCommas(parseFloat(item.total).toFixed(2))}</h3>
            <p onClick={() => removeItem(item._id)}>
                <FaTrash role="button"/>
            </p>
        </div>
    )
})}
<div className="cart-action">
  <button
             onClick={doneSales}
             >Checkout</button>
              <Link to={'/shop'}><button>Shopping</button></Link>
             <button onClick={clearCart}>Clear Cart</button>
             <h3>{state.alertMsg}</h3>
</div>
          

        </div>
    )
}

export default Payment