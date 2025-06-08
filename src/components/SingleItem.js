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
  state.singleItemArray = []
 const upArrow = "+"
  const downArrow = "-"
const qtyRef = useRef('')
console.log(qtyRef.current.value)
console.log(state.transArray)
   const {auth, elItem, setAuth} = useAuth()
   console.log(auth)

  const getItem = async () => {
    const response = await axios.get('/items')  
    setIsLoading(false)
    try {
        const goods = response.data.items.find((item) => item._id === auth.picker4)
   const   newGoods = {...goods, qty: 1, total: goods.price}

    dispatch({type: "elItem", payload: newGoods})
    } catch (error) {
      dispatch({type: 'errMsg',  payload: error.message})
    }
  
  }


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

       
              //  cashier: auth.user, 
              //       cashierID: auth.picker,
              //       goods: transArray,
              //       grandTotal: total,
              //       date
            console.log(goodsObject)
            console.log(elItem)
console.log(auth)

              const {SingleItemArray, total} = state
              // transArray.push(elItem)
              if (goodsObject){
                  // const transItems = {
                  //     cashier: auth.user, 
                  //     cashierID: auth.picker,
                  //     goods: transArray,
                  //     grandTotal: elItem.total,
                  //     date
                      
                  // }
                 
                  // // const response = await axios.post('/transactions', transItems)
                  // const response2 = await axios.get('/items')
                  // console.log(response2)
                  // if (response){
                  //     // so i can effect change in color of the errMsg
                  //     dispatch({type: 'qty', payload: response})
                  //     dispatch({type: 'clear'})
                  //     dispatch({type: 'transArray', payload: []})
                      
                  // }
          

                  try {
           const item = [
              {id: elItem._id, quantity: qtyRef.current.value},    
          ]
          item.push(goodsObject)

          // const halfHope = item.pop()
          // console.log(item)
          const response = await axios.post('/create-checkout-session', item)
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
  
  console.log(auth.receipt)





  console.log(elItem)
    const increment = ()=> {
    dispatch({type: 'INCREMENT', payload: state.elItem.qty})


  }

  const decrement = () => {
    dispatch({type: 'SHOPDECREMENT', payload: state.elItem.qty})
  }
 
 useEffect(()=> {
    getItem()
 }, [])

 function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        isLoading ? <h2>Loading...</h2> : <div>
            <article
            className="single-item"
            >
              <article className="inner-single-item">
          
                {/* <h2>Single Item</h2> */}
                <div>
                <h3>{state.elItem.name}</h3>
                {/* <img src={"https://images.app.goo.gl/ZcZWCKKhGh9Y8sR26"} alt="food"/> */}

                </div>
                <h3>Price: ${parseFloat(state.elItem.price).toFixed(2)} </h3>
              
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


          

            </section>
            <h3>Total: ${numberWithCommas(parseFloat(state.elItem.total).toFixed(2))}</h3>
             <section
            className="cart-action"
            >
              <Link to='/thanks'><button onClick={doneSales}>Buy Now</button></Link>
              <button>Add to Cart</button>
            </section>
            <h3>{state.errMsg}</h3>
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