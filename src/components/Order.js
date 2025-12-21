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
        const {line1, line2, city, country, postal_code} = tran.address
        return (
          <section className='order-details'>
            <p>{i + 1}.</p>
            <article>
             <p>name: {tran.cashier}</p>
      <p>date: {tran.date}</p>
      {
        tran.goods.map((good) => {
         return (
           <div className='item-dets'>
          <p>{good.name}: {good.qty}{good.unitMeasure.split(' ')[1].slice(1, -1)}</p>
          {/* <p>unit price: {good.price}</p> */}
          {/* <p>{good.qty}{good.unitMeasure.split(' ')[1].slice(1, -1)}</p> */}
         {/* <br/> */}
          </div>
         )
        })
      }
        <br/>
      <div>
        <h4>shipping address:</h4>
      {
        
        <div>
            <p>{line1}</p>
            <p>{line2}</p>
            <p>{city}</p>
             {/* i counld't detructure state. looks like it's a keyword */}
            <p>{tran.state}</p>
            <p>{country}</p>
            <p>{postal_code}</p>
            </div>
      }
      </div>
      <p>status: {tran.completed ? 'closed' : 'open'}</p>
      <button className='shipped' onClick={() => hanldeShipped(tran._id)}>Shipped</button>
      <br/>
      </article>
          </section>
        )
      })}
     
    </div>
  )
}

export default Order
