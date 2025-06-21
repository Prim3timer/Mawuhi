import { useContext, useEffect, useReducer, useRef, useState } from "react"
import axios from "../app/api/axios"
import initialState from "../store"
import reducer from "../reducer"
import { ItemContext } from "./Shop"
import useAuth from "../hooks/useAuth"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons"
import {format} from 'date-fns'
import {Link, resolvePath} from 'react-router-dom'

const SingleItem = ()=> {
  const [isLoading, setIsLoading] = useState(true)
  const [state, dispatch] = useReducer(reducer, initialState)

 const upArrow = "+"
  const downArrow = "-"
const qtyRef = useRef('')
console.log(qtyRef.current.value)
console.log(state.transArray)
   const {auth, setAuth,users} = useAuth()


  const getItem = async () => {
    const response = await axios.get('/items')  
    const cartItems = await axios.get('/cart')
    try {
      const userItems = cartItems.data.filter((item) => item.userId === auth.picker)
    console.log('user items are: ', userItems)
  dispatch({type: 'SINGLEITEMARRAY', payload: userItems})
    setIsLoading(false)
      if (cartItems?.length){
  
      }
        const goods = response.data.items.find((item) => item._id === auth.picker4)
        console.log(auth.picker4)
        if (goods){
          
          const newGoods = {...goods, qty: 1, total: goods.price}
              dispatch({type: "elItem", payload: newGoods})
        }
    } catch (error) {
      dispatch({type: 'errMsg',  payload: error.message})
    }
  
  }

  console.log(state.singleItemArray)
  const addToCart = async () => {
    try {
      console.log(auth.picker)
      const {elItem} = state
      const currentUser = users.find((user)=> user._id === auth.picker)
      console.log(elItem)
      const actualItem = {
        name: elItem.name,
        id: elItem._id,
        userId: auth.picker,
        quantity: elItem.qty,
        price: elItem.price,
        total: elItem.total 
      }
console.log(actualItem)
const foundItem = state.singleItemArray.find((item) => item.name === actualItem.name)
if (foundItem){
  dispatch({type: 'ALERTMSG', payload: 'item already in cart'})
} else {
    const response = await axios.post(`/cart/addcart`, actualItem)
      dispatch({type: 'ALERTMSG', payload: 'item added to cart'})
      setTimeout(()=> {
        dispatch({type: 'ALERTMSG', payload: ''})

      }, 3000)

}
    } catch (error) {
      console.log(error.message)
    }

  }

// Rhinohorn1#
       const now = new Date()
          const date = format(now, 'dd/MM/yyyy\tHH:mm:ss')
      const doneSales = async()=> {
          try {
              const {elItem} = state
state.singleItemArray.push(elItem)
            const goodsObject = {
              cashier: auth.user,
             cashierID: auth.picker,
            goods: state.singleItemArray,
              grandTotal: elItem.total,
              date
            }

            console.log(goodsObject)
            console.log(elItem)
console.log(auth)

              const {SingleItemArray, total} = state
              // transArray.push(elItem)
              if (goodsObject){
          

                  try {
           const item = [
              {userId: auth.picker4, id: elItem._id, quantity: qtyRef.current.value, name: elItem.name},    
          ]

          console.log(item)
          const response = await axios.post('/cart/create-checkout-session', item)
          if (response){
             window.location = response.data.url
             console.log(response.data.receipt)
             auth.receipt = response.data.receipt

          }else  console.log("no checkout")
         
      } catch (error) {
          console.error(error)
      }

              
              dispatch({type: 'errMsg', payload: 'Transactons Complete'})
              dispatch({type: 'qtyArray', payload: []})
              setTimeout(()=> {
                  dispatch({type: 'errMsg', payload: ''})
                  
              }, 1000)
          } 
          
          else throw Error('no item purchased')
           
          state.paidAmount = 0
          state.balance = 0
          } catch (error) {
              dispatch({type: 'errMsg', payload: 'no item purchased'})
          }
         
      }


 
 useEffect(()=> {
    getItem()
 }, [state.alertMsg])

 function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        isLoading ? <h2  className="single-item">Loading...</h2> :
         <div>
            <article
            className="single-item"
            >
              <article className="inner-single-item">
          
                {/* <h2>Single Item</h2> */}
                <section className="single-image-container">
                  <img  className='single-item-image' src={state.elItem.img}/>
                <p>{state.elItem.name}</p>
                {/* <img src={"https://images.app.goo.gl/ZcZWCKKhGh9Y8sR26"} alt="food"/> */}
                  
                </section>
                <div className="single-item-texts">
                {/* <h4>Price: ${parseFloat(state.elItem.price).toFixed(2)} </h4> */}
              
                  <section
          className="qty-cont"
          >
              <span
              className="qty-label"
              >Qty: </span>


                <input
                className="qty-input"
 type="text"
 ref={qtyRef}
 value={state.elItem.qty}

 onClick={() => dispatch({type: 'blank', payload: ''})}
 onChange={(e)=> dispatch({type: 'CARTFIELDCHANGE', payload: e.target.value})}
 />


          <p className="no-qty-alert">{state.elItem.qty === '' || state.elItem.qty === 0 ? 'invalid quantity' : ''}</p>   

            </section>
            <h5>${numberWithCommas(parseFloat(state.elItem.total).toFixed(2))}</h5>
            </div>
             <section
            className="cart-action"
            >
            <button onClick={doneSales}>Buy Now</button>
              <button onClick={addToCart}>Add to Cart</button>
              <Link to={'/cart'}><button>Go To Cart</button></Link>
            </section>
            <h3>{state.alertMsg}</h3>
            </article>
              
              </article>




                  {/* <button
          onClick={() => increment(qtyRef.current.value)}
          >{upArrow}</button> */}
            {/* <h4
            className="shop-qty"
            ref={qtyRef}
            // value={state.elItem.qty}
            >{state.elItem.qty}</h4> */}

               

              {/* <button 
              onClick={decrement}
              >{downArrow}</button> */}
        </div>
    )
}

export default SingleItem