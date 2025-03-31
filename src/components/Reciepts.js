import initialState from "../store"
import { useEffect, useContext, useReducer } from "react"
import reducer from "../reducer"
import axios from "../app/api/axios"
import useAuth from '../hooks/useAuth';
import AuthContext from "../context/authProvider";
// import { retry } from "@reduxjs/toolkit/query"
import { FaTrashAlt } from "react-icons/fa";
const Shopping = ()=> {
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
         
            const cashierTrans = newRes.filter((item) => item.cashierID === auth.picker)
            console.log(cashierTrans)
            // dispatch({type: 'getNames', payload: response.data})
            dispatch({type: 'getNames', payload: cashierTrans})

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
}, [])


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


    return (
        <div
        style={{
            margin: ' 0 0 0 1rem'
            
        }}
        >
            <h2
            style={{
                margin: '1rem'
            }}
            >Reciepts</h2>
            <h3>{state.getNames.length}</h3>
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
                        <h3>cashier: {item.cashier}</h3>
                        {/* <h5>cashierID: {item.cashierID}</h5> */}
                        <h5>TransID: {item._id}</h5>
                        <h5>Date: {item.date}</h5>
                        {item.goods.map((good)=> {
                            return (
                                <div
                                style={{display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                }}
                                >
                                    
                                    <h3>{good.name}</h3>
                                    <h5>Qty: {good.qty} {good.unitMeasure.split(' ')[1].slice(1, -1)}</h5>
                                    <h5>Price: {good.price}</h5>
                                    <h4>Sub Total: ₦{numberWithCommas(parseFloat(good.total).toFixed(2))}</h4>
                                    {/* <br/> */}
                                </div>
                            )
                        })}
                     
                        <h3>Grand Total: ₦{ numberWithCommas(parseFloat(item.grandTotal).toFixed(2))}</h3>
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