import initialState from "../store"
import { useEffect, useContext, useReducer } from "react"
import reducer from "../reducer"
import axios from "../app/api/axios"
import useAuth from '../hooks/useAuth';
import AuthContext from "../context/authProvider";
// import { retry } from "@reduxjs/toolkit/query"
import { FaTrashAlt } from "react-icons/fa";
import SearchItem from "./SearchItem";

const Shopping = ({picker})=> {
const [state, dispatch] = useReducer(reducer, initialState)
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
useEffect(()=> {
    getItems()
}, [state.search])


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


    return (
        <div
        style={{
            margin: ' 0 0 0 1rem'
            
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
        </article>
            <h2
            style={{
                margin: '1rem'
            }}
            >Reciepts ({state.getNames.length})</h2>
            {state.getNames && state.getNames.map((item)=> {
                console.log(item.goods)
                console.log(item)
                return (
                    <article
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start'
                    }}
                    >
                        <h5>Cashier: {item.cashier}</h5>
                        {/* <h5>cashierID: {item.cashierID}</h5> */}
                        <p>TransID: {item._id}</p>
                        <p>Date: {item.date}</p>
                        {item.goods.map((good)=> {
                            return (
                                <div
                                style={{display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                }}
                                >
                                    
                                    <h5>{good.name}</h5>
                                    <p>Qty: {good.qty} {good.unitMeasure.split(' ')[1].slice(1, -1)}</p>
                                    <p>Price: {good.price}</p>
                                    <h5>Sub Total: ₦{numberWithCommas(parseFloat(good.total).toFixed(2))}</h5>
                                    {/* <br/> */}
                                </div>
                            )
                        })}
                     
                        <h4>Grand Total: ₦{ numberWithCommas(parseFloat(item.grandTotal).toFixed(2))}</h4>
                        <h3 onClick={(id)=> handleRemove(item._id)}
                            style={{
                                textAlign: 'center',
                            }}
                            >
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