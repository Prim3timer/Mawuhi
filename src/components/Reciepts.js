import initialState from "../store"
import { useEffect, useContext, useReducer, useState } from "react"
import reducer from "../reducer"
import axios from "../app/api/axios"
import AuthContext from "../context/authProvider";
import useAuth from "../hooks/useAuth";
// import { retry } from "@reduxjs/toolkit/query"
import { FaTrashAlt } from "react-icons/fa";

import Unauthorized from "./Unauthorized";
import { Link } from "react-router-dom";

const Shopping = ()=> {
const [state, dispatch] = useReducer(reducer, initialState)
const [showOne, setShowOne] = useState(false)
const [oneId, setOneId] = useState('')
const { auth } = useAuth();
const [currentUser, setCurrentUser] = useState({})
const getItems = async ()=> {
    setOneId(auth.picker)
    console.log(auth.picker)
    // auth.picker3 = state.id
    try {

        console.log('picker3 is : ', auth.picker3)
        console.log('picker is: ', auth.picker)
              const gog =  await axios.get('/users')
    
            const person = gog.data.find((user) => user._id === auth.picker3)
            console.log(person)
            setCurrentUser(person)
    
            const response = await axios.get('/transactions')
            if (response){
        
             
                const cashierTrans = response.data.filter((item) => item.cashierID === auth.picker3)
                console.log(cashierTrans)
                // dispatch({type: 'getNames', payload: response.data})
                cashierTrans.reverse()
                dispatch({type: 'getNames', payload: cashierTrans})
    
                const filterate = cashierTrans.filter((inner)=> inner.date.substring(0, 10).includes(state.search))
                console.log(filterate)
            
                
                console.log(state.getNames)
                dispatch({type: 'getNames', 
                    payload: filterate})
                    
                }
    }catch (error) {
        console.log(error)
    }
   
    
}
console.log(currentUser)

const assertain = (id) => {
    if (auth.roles.includes(5150)){
        console.log("deleted")
        
        dispatch({type: 'cancel', payload: true})
        console.log(state.cancel)
        dispatch({type: 'id', payload: id})
        const getItem = state.getNames && state.getNames.find((item)=> item._id === id)
        dispatch({type: 'inItem', payload: getItem})
        console.log(getItem)
    }
    else {
        dispatch({type: 'isMatched', payload: true})
    }
}


const handleRemove = async ()=> {
    dispatch({type: 'cancel', payload: false})
    const response = await axios.delete(`/transactions/${state.id}`)
    // const newGraw = state.items && state.items.filter((item)=> item._id !== state.id)
    console.log(response)


    // e.preventDefault()     
    // removeInventory(id)
        // await axios.delete(`/transactions/${id}`)
        
        const newGraw = state.getNames.filter((item)=> item._id !== state.id)
        console.log('removed')
    dispatch({type: 'getNames', payload: newGraw})
}

const oneShow = (id) => {
    dispatch({type: 'id', payload: id})
    auth.picker2 = id
    console.log(auth)
    // console.log(oneId)
    setShowOne(true)
    // setReceipts(false)
}

const remainDelete = ()=> {
    // this condition statement is to enable the removal of the confirm window once any part of the 
    // page is touched.
    if (state.cancel){

        dispatch({type: 'cancel', payload: false})
    }


    // if (state.isEdit){
        
    //     dispatch({type: 'isEdit', payload: false})
    // }
}
const generalRemain = () => {
    if (state.isMatched) dispatch({type: 'isMatched', payload: false})

 } 

useEffect(()=> {
    getItems()
}, [state.search])


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
    return (
        !state.getNames ? <h2
        
        className="receipts"
        >Loading...</h2> : <div
        className="receipts"
        
        onClick={generalRemain}
        
        // onClick={remainDelete}
        >
       
{/* <Link to="one-receipt"> */}
<article id="form-cont">
            <form  className="search-form"   onSubmit={(e)=> e.preventDefault()}>
        <input 
        id="invent-search"
        type="text"
        role="searchbox" 
        placeholder="Search by date"
        value={state.search}
        onChange={(e)=> dispatch({type: 'search', payload: e.target.value})}
        
        // https://www.npmjs.com/package/@react-google-maps/api
        
        />
          </form>


          {/* <SearchItem/> */}
        </article>
            <h2
            style={{
                margin: '1rem 0' ,
                // color: 'darkslateblue'    
            }}
           
            >{currentUser && currentUser.username}'s Reciepts ({state.getNames.length})</h2>
            {state.getNames && state.getNames.map((item)=> {
                console.log(item.goods)
                console.log(item)
                return (
                    <section
                
                    >
                        <Link to="/one-receipt"
                        style={{
                            textDecoration: 'none',
                        }}
                        onClick={() => oneShow(item._id)}
                        >
                 <article

                 id="receipts"
                    >
                        {/* <h5>cashierID: {item.cashierID}</h5> */}
                        <h4>Date: {item.date}</h4>
                        <h4>TransID: {item._id}</h4>
                        {item.goods.map((good)=> {
                            return (
                                <div
                                className="goods-container"
                              
                                >
                                    <h4>{good.name}</h4>
                                    <p>Qty: {good.qty} {good.unitMeasure.split(' ')[1].slice(1, -1)}</p>
                                    <p>Price: {good.price}</p>
                                    <p
                                   
                                    >Sub Total: ₦{numberWithCommas(parseFloat(good.total).toFixed(2))}</p>
                               
                                    {/* <br/> */}
                                </div>
                            )
                        })}
                     
                        <h4
                        className="receipts-grand-total"
                        
                        >Grand Total: ₦{ numberWithCommas(parseFloat(item.grandTotal).toFixed(2))}</h4>
                        
                   
           <h5>Cashier: {item.cashier}</h5>
                     
                    </article>
                    </Link>
                    {/* <h3 onClick={(id)=> handleRemove(item._id)} */}
                    <h3 onClick={(e)=> assertain(item._id, e)}
                            style={{
                                textAlign: 'center',
                            }}
                            >
                        <FaTrashAlt role='button'
           
           /> 
                        </h3>
                        <br/>
                    </section>
                )
            //    })
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
          >Delete from Receipts</h3>
                 <article
                 className="delete-buttons"
               
                 >
                    <button
                 onClick={remainDelete}
                 >No</button><button
                  onClick={handleRemove}
                 style={{backgroundColor: 'red',
                     borderColor: 'red'
                 }}
                 >Yes</button></article></div> 

<div
 className={state.isMatched ? 'authorization-alert' : 'authorization'}
     >
         <h2
      id="verify-header"
      style={{
          margin: '.5rem auto',
        //   display: 'flex',
      }}
      >Unauthorized!</h2>
      <button 
      onClick={generalRemain}
       >
        ok</button>
            </div> 

        </div>
    )
}

export default Shopping