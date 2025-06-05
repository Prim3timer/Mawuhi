import { useContext, useEffect, useReducer, useRef, useState } from "react"
import axios from "../app/api/axios"
import initialState from "../store"
import reducer from "../reducer"
import { ItemContext } from "./Shop"
import useAuth from "../hooks/useAuth"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons"

const SingleItem = ()=> {
 const upArrow = "+"
  const downArrow = "-"
const qtyRef = useRef('')
   const {auth, elItem} = useAuth()

    const [state, dispatch] = useReducer(reducer, initialState)
  const getItem = async () => {
    const response = await axios.get('/items')  
    try {
        const goods = response.data.items.find((item) => item._id === auth.picker4)
   const   newGoods = {...goods, qty: 1, total: goods.price}

    dispatch({type: "elItem", payload: newGoods})
    } catch (error) {
      dispatch({type: 'errMsg',  payload: error.message})
    }
  
  }
  console.log(elItem)
    const increment = ()=> {
    dispatch({type: 'INCREMENT', payload: state.elItem.qty + 1})


  }

  const decrement = () => {
    dispatch({type: 'SHOPDECREMENT', payload: state.elItem.qty -1})
  }
 
 useEffect(()=> {
    getItem()
 }, [])

    return (
        <div>
            <article
            className="single-item"
            >
              <article className="inner-single-item">
          
                {/* <h2>Single Item</h2> */}
                <div>
                <h3>{state.elItem.name}</h3>
                {/* <img src={"https://images.app.goo.gl/ZcZWCKKhGh9Y8sR26"} alt="food"/> */}

                </div>
                <h3>Price: {state.elItem.price}</h3>
              
                  <section
          className="qty-cont"
          >
              <span
              className="qty-label"
              >Qty: </span>


                <input
                className="qty-input"
 type="text"
//  ref={qtyRef}
 value={state.elItem.qty}

 onClick={() => dispatch({type: 'blank', payload: ''})}
 onChange={(e)=> dispatch({type: 'CARTFIELDCHANGE', payload: e.target.value})}
 />


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

            </section>
            <h3>Total: ${state.elItem.total}</h3>
             <section
            className="cart-action"
            >
              <button>Buy Now</button>
              <button>Add to Cart</button>
            </section>
            <h3>{state.errMsg}</h3>
            </article>
              
              </article>
        </div>
    )
}

export default SingleItem