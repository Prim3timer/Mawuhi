import initialState from "../store"
import { useEffect, useContext, useReducer, useState } from "react"
import reducer from "../reducer"
import axios from "../app/api/axios"
import useAuth from '../hooks/useAuth';
import AuthContext from "../context/authProvider";
// import { retry } from "@reduxjs/toolkit/query"
import { FaTrashAlt } from "react-icons/fa";
import SearchItem from "./SearchItem";
import OneShop from "./OneShop";

const Shopping = ({picker, setReceipts})=> {
const [state, dispatch] = useReducer(reducer, initialState)
const [showOne, setShowOne] = useState(false)
const [oneId, setOneId] = useState('')
const { setAuth, auth } = useContext(AuthContext);
const getItems = async ()=> {
    console.log(auth.picker)
    try {
        const response = await axios.get('/transactions')
        if (response){
            const newRes = response.data.map((item)=> {
                if (!item.cashierID){
                    item.cashierID = 'unavailable'
                    item.cashier = 'unavailable'
                }
                return item
            })
            console.log(newRes)
         
            const cashierTrans = newRes.filter((item) => item.cashierID === picker)
            console.log(cashierTrans)
            // dispatch({type: 'getNames', payload: response.data})
            dispatch({type: 'getNames', payload: cashierTrans})

            const filterate = cashierTrans.filter((inner)=> inner.date.substring(0, 10).includes(state.search))
            console.log(filterate)
        
            
            console.log(state.getNames)
            dispatch({type: 'getNames', 
                payload: filterate})
                
            }
    } catch (error) {
        console.log(error)
    }
   
    
}

const handleRemove = async (id)=> {
    // e.preventDefault()     
    // removeInventory(id)
        await axios.delete(`/transactions/${id}`)
    const newGraw = state.getNames && state.getNames.filter((item)=> item._id !== id)
    dispatch({type: 'getNames', payload: newGraw})
}

const oneShow = (id) => {
    // console.log(id)
   setOneId(id)
    console.log(oneId)
    setShowOne(true)
    // setReceipts(false)
}
useEffect(()=> {
    getItems()
}, [state.search])


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


    return (
        showOne ? <OneShop
        items={state.getNames}
        one={oneId}
        /> : <div
        style={{
            margin: ' 0 0 0 1rem',
           textAlign: 'center'
            
        }}
        >

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
                margin: '1rem 0'   
            }}
            >Reciepts ({state.getNames.length})</h2>
            {state.getNames && state.getNames.map((item)=> {
                console.log(item.goods)
                console.log(item)
                return (
                 <article
                 id="receipts"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifySelf: 'flex-start',
                        // justifySelf: 'center',
                        // justifyContent: 'center',
                        // justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        // alignItems: 'center',
                        // textAlign: 'center',
                     
                        // width: '40%',
                        textAlign: 'center',
                        // backgroundColor: 'green'
                    }}
                    onClick={() => oneShow(item._id)}
                    >
                        {/* <h5>cashierID: {item.cashierID}</h5> */}
                        <h4>Date: {item.date}</h4>
                        <h4>TransID: {item._id}</h4>
                        {item.goods.map((good)=> {
                            return (
                                <div
                                style={{
                                    // display: 'flex',
                                    // flexDirection: 'column',
                                    // alignItems: 'center',
                                    // margin: '0 0 0 4rem',
                                     textAlign: 'left'
                                }}
                                >
                                    <h4>{good.name}</h4>
                                    <p>Qty: {good.qty} {good.unitMeasure.split(' ')[1].slice(1, -1)}</p>
                                    <p>Price: {good.price}</p>
                                    <h4
                                   
                                    >Sub Total: ₦{numberWithCommas(parseFloat(good.total).toFixed(2))}</h4>
                               
                                    {/* <br/> */}
                                </div>
                            )
                        })}
                     
                        <h3
                         style={{
                            textAlign: 'left',
                            // margin: '0 0 0 4rem',
                            // color: 'green'
                        }}
                        >Grand Total: ₦{ numberWithCommas(parseFloat(item.grandTotal).toFixed(2))}</h3>
                        <h3 onClick={(id)=> handleRemove(item._id)}
                            style={{
                                textAlign: 'center',
                            }}
                            >
                                       <h5>Cashier: {item.cashier}</h5>
                        <FaTrashAlt role='button'
           
           /> 
                        </h3>
                        <br/>
                    </article>
                )
            //    })
            })}
            
            

        </div>
    )
}

export default Shopping