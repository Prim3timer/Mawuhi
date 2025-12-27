import React, { useContext, useEffect, useReducer, useState } from 'react'
import initialState from '../store'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import reducer from '../reducer'
import axios from '../app/api/axios'
import {FaTrash} from 'react-icons/fa'
import { addDays, subDays } from 'date-fns'
import AuthContext from '../context/authProvider'

const Order = () => {
const {genTrans, setGenTrans} = useContext(AuthContext)
  const today = new Date()
  console.log(today)
const axiosPrivate = useAxiosPrivate()
  const [state, dispatch] = useReducer(reducer, initialState)
  const [incompletedTrans, setIncompletedTrans] = useState()
  const [completedTrans, setCompletedTrans] = useState()
  const [allTransactions, setAllTransactions] = useState()
  const [ allOrders, setAllOrders] = useState(false)


  const setTransArray = () => {
   setAllTransactions(genTrans)
  }
        const remainDelete = ()=> {
        // this condition statement is to enable the removal of the confirm window once any part of the 
        // page is touched.
        if (state.cancel){
            dispatch({type: 'cancel', payload: false})
        }
    
     
    }

const assertain = (id) => {
  dispatch({type: 'id', payload: id})
  const foundTransacton = allTransactions.find((item)=> item._id === id)
    dispatch({type: 'cancel', payload: true})
          dispatch({type: 'inItem', payload: foundTransacton})
      }
      
      const hanldeShipped = async () => {
  const completed = {
    status: state.inItem.completed
  }
  
  try {
    const response = await axios.put(`/transactions/status-update/${state.id}`, completed)
    if (response){
      const foundTransacton = allTransactions.find((item) => item._id === state.id)
      const currentTrans = {...foundTransacton, completed: !foundTransacton.completed }
      const latestTrans = allTransactions.map((item) => {
        if (item._id === currentTrans._id) return currentTrans
        return item
      })
      
      setAllTransactions(latestTrans)
      console.log(response.data)
     } else {
      throw new Error('something went wrong')
   }

    
   } catch (error) {
       console.log(error.message)

  }
}

const handleOrderLister = () => {
    console.log(genTrans)
  if (allOrders === false) setAllOrders(true)
    else setAllOrders(false)
}

useEffect(()=> {
  setTransArray()
}, [])
  return (
    <div
    className='orders'
    onClick={remainDelete}
    >
      <h2>Orders</h2>
      <form className='search-form'>
        <input 
          id="invent-search"
          type="text"
          role="searchbox" 
          placeholder="Search by date"
          value={state.search}        
          />
        <input 
          id="invent-search"
          type="text"
          role="searchbox" 
          placeholder="search by status"
          value={state.search}        
          />
          </form>
      {allTransactions && allTransactions.map((tran, i) => {
        return (
          tran.address  ?     <section className='order-details' key={tran._id}>
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
        tran.goods.map((good, i) => {
          return (
            <div key={i}>
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
      <button  onClick={() => assertain(tran._id)}>Ship</button>
      </section>
      </article>
          </section> : ''
        )
      })}

       <div
 className={state.cancel ? 'delete' : 'no-delete'}
           
         >
             <h3
          id="verify-header"
          style={{
              margin: '.5rem auto',
            //   display: 'flex',
          }}
          >{`${state.inItem && state.inItem.completed === false ? 'are you sure this order has shipped?' : 'do you want to reverse order status to open?'}`}</h3>
                 <article
                 style={{
                     display: 'flex',
                    //  flexDirection: 'row',
                     columnGap: '4vw',
                     justifyContent: 'center',
                 }}
                 >
                    <button
                 onClick={remainDelete}
                 >No</button><button
                  onClick={hanldeShipped}
                 style={{backgroundColor: 'red',
                     borderColor: 'red'
                 }}
                 >Yes</button></article></div> 
     
    </div>
  )
}

export default Order
