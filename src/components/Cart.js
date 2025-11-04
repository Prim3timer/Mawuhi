import { useEffect, useReducer, useState, useRef } from "react"
import initialState from "../store"
import reducer from "../reducer"
import axios from "../app/api/axios"
import useAuth from "../hooks/useAuth"
import {format} from 'date-fns'
import { FaTrash } from "react-icons/fa"
import { Link, useSearchParams, useLocation } from "react-router-dom"
import useAxiosPrivate from "../hooks/useAxiosPrivate"

const Payment = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [cartItems, setCartItems] = useState([])
    const [excessQty, setExcessQty] = useState('')
    const [userId, setUserId] = useState('')
    const cartQtyRef = useRef(null)
const {auth, setAuth} = useAuth()

    const axiosPrivate = useAxiosPrivate()


const getItems = async () => {
    try {
         const response = await axiosPrivate.get('/items')
         if (response){
             dispatch({type: 'items', payload: response.data.items})
         
       
        }
    } catch (error) {
        console.error(error)
    }   
}

const getCartItems = async () => {
    try {
        const response = await axiosPrivate.get('/users')
        console.log(response.data)
        setCartItems(response.data)
        const currentUser = response.data.users.find((user) => user._id === auth.picker)
        console.log(currentUser)
        const newUseritems = currentUser.cart.map((item) => {
            return {...item, amount: item.quantity}
        })
        setUserId(currentUser._id)
     
console.log(newUseritems)
        if (newUseritems){
            dispatch({type: 'CARTARRAY', payload: newUseritems})
        
            // state.cartArray.push(state.cart.total)
            console.log(newUseritems)
        }
        
        
    } catch (error) {
        console.log(error.message)
        dispatch({type: 'errMsg', payload: error.message})
    }
}



const doneSales = async()=> {
    console.log(state.cartArray)
    auth.cartArray = state.cartArray
    const now = new Date()
    const date = format(now, 'dd/mm/yyyy\tHH:mm:ss')

    try {
        const excessCheck = state.cartArray.filter((item) =>  item.quantity < Number(item.transQty))
        const excessItem = excessCheck.map((item) => item.name)
        console.log(excessItem)
        setExcessQty(excessItem)
        if (excessItem.length){
            dispatch({type:'success', payload: true})
            console.log(excessItem.length)
            dispatch({type: 'ALERTMSG', payload: `the ${excessItem.length > 1 ? 'quantities' : 'quantity'} of ${excessItem.map((item) => item).join(', ')} slected ${excessQty.length > 1 ? 'exceed' : 'exceeds'} the quantity in stock`})
            setTimeout(()=> {
                dispatch({type: 'success', payload: false})
                
            },3000)
            
        }
        
        
        else {
            const oneElement = [userId]
            const newerArray = [...oneElement, ...state.cartArray]
            console.log(newerArray)
          const response = await axios.post(`/cart/create-checkout-session`, newerArray)
          
          if (response){
              window.location = response.data?.session?.url
              // console.log(response.data)
              
      } 

          }
         
} catch (error) {
    console.log(error.message)
      dispatch({type: 'errMsg', payload: 'no item purchased'})
}

         
      }

      const removeItem = async (id)=> {
        console.log({id})
        try {
            
            dispatch({type: 'REMOVECARTITEM', payload: id})
            const response = await axiosPrivate.delete(`/users/cart/delete?itemId=${id}&userId=${auth.picker}`)
            console.log(response.data)
            if (response){
                dispatch({type: 'success', payload: true})
                dispatch({type: 'ALERTMSG', payload: response.data})
                setTimeout(()=> {
                    dispatch({type: 'success', payload: false})
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
}, [state.mainCartField])
useEffect(() => {
    getCartItems()
}, [])

useEffect(()=> {
    console.log('changed')
    dispatch({type: 'GETCARTTOTAL'})
}, [state.cartArray])
const plural = state.cartArray.length === 1 ? '' : 's'
const plural2 = state.cartAmount.length === 1 ? '' : 's'

    return (
       !state.cartArray ? <h2>Loading</h2> : <div className="checkout">
            <h2>Your Cart</h2>


            <h3>{state.cartAmount} item{plural2}, {state.cartArray.length} product{plural}</h3>

{state.cartArray && state.cartArray.map((item) =>{
    // this line is for dynamic image sourcing
    const jerom = state.items && state.items.find((things) => things.name == item.name)
    return (
        <div className="cart-main-container">
            <article className="cart-items-container">
            <img className="cart-item-image" src={ `${jerom ?  jerom.img : ''}` } alt={item.name}/>
           <section>
            <p>{item.name}</p>
            {/* <h3>price: ${item.price}</h3> */}
            <label>
                Qty:
            <input
            className="cart-qty"
            ref={cartQtyRef}
                value={item.transQty}
                onChange={(e) => dispatch({type: "MAINCARTFIELD", payload: e.target.value, id: item.id})}
            
            />
            </label>
         
            <h3>₦{numberWithCommas(parseFloat(item.total).toFixed(2))}</h3>

            </section>
            <p onClick={() => removeItem(item.id)}
              className="cart-trash"
                >
                <FaTrash role="button"/>
            </p>
            </article>
        </div>
    )
})}
<h2>Total: ₦{numberWithCommas(parseFloat(state.totalCart).toFixed(2))}</h2>
{/* <hr></hr> */}
{/* <hr></hr> */}
<div className="cart-action">
  <button
             onClick={doneSales}
             >Checkout</button>
           <Link to={'/shop'} className="cart-shop-linker">  <button className="cart-action-button2"> Shop</button></Link>
             <button onClick={clearCart}>Clear Cart</button>
</div>
             <h3 className={state.success ? 'update-alert' : 'hide-update-alert'}>{state.alertMsg}</h3>
          

        </div>
    )
}

export default Payment