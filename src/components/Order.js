import React, { useEffect, useReducer, useState } from 'react'
import initialState from '../store'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import reducer from '../reducer'
import axios from '../app/api/axios'

const Order = () => {
const axiosPrivate = useAxiosPrivate()
  const [state, dispatch] = useReducer(reducer, initialState)
  const [trans, setTrans] = useState()
const getItems = async () => {
    try {
         const response = await axios.get('/transactions')
         if (response){
             dispatch({type: 'items', payload: response.data.items})
          setTrans(response.data)
          console.log(response.data)
        }
    } catch (error) {
        console.error(error)
    }   
}

const hanldeShipped = async (id) => {
  const response = await axios.put(`/transactions/status-update/${id}`)
  console.log(response.data)
}
   
useEffect(()=> {
  getItems()
  console.log(state.items)
}, [])
  return (
    <div>
      <h2>Orders</h2>
      {trans && trans.map((tran, i) => {
        // const {line1, line2, city, country, postal_code} = tran.address
        return (
       tran.address ?     <section className='order-details'>
            <p>{i + 1}.</p>
            <article className='inner-order-dets'>
              <div className='name-date'>
             <p>cusotmer: {tran.cashier}</p>
      <p>date: {tran.date}</p>
      </div>
      <article>
        <h4>items quantity</h4>
      <section className='item-dets'>
      {
        tran.goods.map((good) => {
          return (
           <div >
          <p>{good.name}: {good.qty} {good.unitMeasure.split(' ')[0]}{good.qty > 1 ? 's' : ''}</p>
          {/* <p>unit price: {good.price}</p> */}
          {/* <p>{good.qty}{good.unitMeasure.split(' ')[1].slice(1, -1)}</p> */}
         {/* <br/> */}
         </div>
        )
      })
    }
    </section>
    </article>
    <section>
        <h4>shipping address</h4>
      <div>
      {
        
         <div className='shipping-address'>
            <p>{ tran.address.line1}</p>
            <p>{tran.address.line2}</p>
            <p>{tran.address.city}</p>
             {/* i counld't detructure state. looks like it's a keyword */}
            <p>{tran.address.state}</p>
            <p>{tran.address.country}</p>
            <p>{tran.address.postal_code}</p>
            <p>status: {tran.completed ? 'closed' : 'open'}</p>
            </div>
      }
      </div>
      </section>
      <section className='shipped'>
      <button  onClick={() => hanldeShipped(tran._id)}>Shipped</button>
      </section>
      </article>
          </section> : ''
        )
      })}
     
    </div>
  )
}

export default Order
