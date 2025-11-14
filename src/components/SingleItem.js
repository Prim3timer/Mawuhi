import { useContext, useEffect, useReducer, useRef, useState } from "react"
import axios from "../app/api/axios"
import axiosPrivate from "../app/api/axios"
import initialState from "../store"
import reducer from "../reducer"
import { ItemContext } from "./Shop"
import useAuth from "../hooks/useAuth"
import useRefreshToken from "../hooks/useRefreshToken"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
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
  const axiosPrivate = useAxiosPrivate()
  const [userId, setUserId] = useState('')
  console.log(auth.accessToken)

  const getItem = async () => {

    
    try {
      const response = await axiosPrivate.get('/items')  
      // console.log(response.data)
      const users = await axiosPrivate.get('/users')
  
      const currentUser = users && users.data.users.find((user)=> user._id === auth.picker)
      console.log(currentUser.cart)
       setUserId(currentUser._id)
  
      setAuth(prev => {
        
        return {...prev, singleItemId: auth.picker3}
      })
      
  //     const userItems = cartItems.data.filter((item) => item.userId === auth.picker)
  //     console.log(userItems)
  //   console.log('user items are: ', userItems)
  dispatch({type: 'SINGLEITEMARRAY', payload: currentUser.cart})
    setIsLoading(false)
  //     if (cartItems?.length){
  
  //     }
      
        const goods = response.data.items.find((item) => item._id === auth.picker3)
        if (goods){
          
          const newGoods = {...goods, transQty: 1, total: goods.price}
              dispatch({type: "elItem", payload: newGoods})
        }
    } catch (error) {
      dispatch({type: 'errMsg',  payload: error.message})
    }
    console.log(state.elItem)
  
  }

  console.log(state.singleItemArray)
    console.log(auth)


  const addToCart = async () => {
    console.log(auth)
      dispatch({type: 'success', payload: true})
    try {
      console.log(auth)
      const {elItem} = state
      const currentUser = users.find((user)=> user._id === auth.picker)
      console.log(elItem)
        const actualItem = {
        name: elItem.name,
        id: elItem._id,
        // userId: auth.picker,
        quantity: elItem.qty,
        transQty: elItem.transQty,
        price: elItem.price,
        total: elItem.total,
        unitMeasure: elItem.unitMeasure
      }
console.log(actualItem)

console.log({actualItem: actualItem})
const foundItem = state.singleItemArray.find((item) => item.name === actualItem.name)
if (foundItem){

  dispatch({type: 'ALERTMSG', payload: 'item already in cart'})
  
}else if (actualItem.quantity === 0) dispatch({type: 'ALERTMSG', payload: 'item is out of stock'})
  else if (state.elItem.qty < qtyRef.current.value){
    dispatch({type: 'ALERTMSG', payload: 'not enough in stock choose a lower amount' })
    setTimeout(()=> {
        dispatch({type: 'success', payload: false})
      // dispatch({type: 'ALERTMSG', payload: '' })

    }, 3000)
  
  }
  else {
    const response = await axiosPrivate.post(`/users/sessions/${auth.picker}`, actualItem)
    console.log(response.data)
    dispatch({type: 'ALERTMSG', payload: response.data.message})
    setTimeout(()=> {
        dispatch({type: 'success', payload: false})
        
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
           const item = [userId,
              {id: elItem._id, transQty: Number(qtyRef.current.value), name: elItem.name, total: elItem.total,  unitMeasure: elItem.unitMeasure,},  
          ]

          console.log(item)
          if (state.elItem.qty >= qtyRef.current.value){

            const response = await axios.post('/sessions/create-checkout-session', item)
            if (response){
               window.location = response.data?.session?.url
               console.log(response)
          }
        }else {
            dispatch({type: 'success', payload: true})
            dispatch({type: 'ALERTMSG', payload: 'not enough in stock choose a lower amount' })
    setTimeout(()=> {
        dispatch({type: 'success', payload: false})
      // dispatch({type: 'ALERTMSG', payload: '' })

    }, 3000)

          } 
         
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

      console.log(state.onlineQty)

function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
         
           {state.elItem &&   <article
            className="single-item"
            >
              <article className="inner-single-item">
          
                {/* <h2>Single Item</h2> */}
              <section className="single-image-container">
                  <img  className='single-item-image' src={state.elItem.img}/>
                <p>{state.elItem.name}</p>
                {/* <img src={"https://images.app.goo.gl/ZcZWCKKhGh9Y8sR26"} alt="food"/> */}
                  
                </section>
                <p>{parseFloat(state.elItem.qty).toFixed(2)} Left</p>
                <div className="single-item-texts">
                {/* <h4>Price: ${parseFloat(state.elItem.price).toFixed(2)} </h4> */}
              
                  <section
          className="qty-cont"
          >
              <span
              className="qty-label"
              >Qty:</span>


                <input
                className="qty-input"
 type="text"
 ref={qtyRef}
 value={state.elItem.qty === 0 ? state.elItem.qty : state.elItem.transQty}

 onClick={() => dispatch({type: 'blank', payload: ''})}
 onChange={(e)=> dispatch({type: 'CARTFIELDCHANGE', payload: e.target.value})}
 /> {state.elItem.unitMeasure.split(' ')[1].slice(1, -1)}

          <p className="no-qty-alert">{state.elItem.qty === '' ? 'invalid quantity'  : state.elItem.qty === 0 ? 'out of stock' : ''}</p>    

            </section>
            </div>
            <h3>₦{numberWithCommas(parseFloat(state.elItem.total).toFixed(2))}</h3>
             <section
            className="cart-action"
            >
            <button onClick={doneSales}>Buy Now</button>
              <button onClick={addToCart}>Add to Cart</button>
            <Link to={'/cart'} className="cart-action-link"> <button className="cart-action-button" > View Cart</button></Link>
            </section>
            <h3
               className={state.success ? 'update-alert' : 'hide-update-alert'}
            >{state.alertMsg}</h3>
            </article>
              
              </article> }

        </div>
    )
}

export default SingleItem