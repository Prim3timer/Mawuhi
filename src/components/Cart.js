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
    
const {auth, setAuth} = useAuth()

    

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
        const newUseritems = userItems.map((item) => {
            return {...item, amount: item.quantity}
        })

        if (userItems.length){
            dispatch({type: 'CARTARRAY', payload: newUseritems})
            console.log(state.cart.total)
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

        const response = await axios.post('/cart/create-checkout-session', state.cartArray)
        console.log(response.data)
        if (response){
            window.location = response.data?.session?.url
            // console.log(response.data)
            

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
                dispatch({type: 'success', payload: true})
                dispatch({type: 'ALERTMSG', payload: 'item removed'})
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
console.log('soccer')

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
                value={item.transQty}
                onChange={(e) => dispatch({type: "MAINCARTFIELD", payload: e.target.value, id: item._id})}
            
            />
            </label>
         
            <h3>₦{numberWithCommas(parseFloat(item.total).toFixed(2))}</h3>
            <p onClick={() => removeItem(item._id)}>
                <FaTrash role="button"/>
            </p>
<hr></hr>
            </section>
            </article>
        </div>
    )
})}
{/* <hr></hr> */}
<h2>Total: ₦{numberWithCommas(parseFloat(state.totalCart).toFixed(2))}</h2>
<hr></hr>
<div className="cart-action">
  <button
             onClick={doneSales}
             >Checkout</button>
            <button>  <Link to={'/shop'} className="cart-shop-linker">Shop</Link></button>
             <button onClick={clearCart}>Clear Cart</button>
             <h3 className={state.success ? 'update-alert' : 'hide-update-alert'}>{state.alertMsg}</h3>
</div>
          

        </div>
    )
}

export default Payment