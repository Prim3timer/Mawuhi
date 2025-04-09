import reducer from "../reducer"
import initialState from "../store"
import axios from "../app/api/axios"
import { useEffect, useReducer, useRef, useState } from "react"
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaTrashAlt } from "react-icons/fa";
import {format} from 'date-fns'
import useAuth from '../hooks/useAuth';
import { type } from "@testing-library/user-event/dist/type";

const Transactions = ()=> {
    const [state, dispatch] = useReducer(reducer, initialState)   
    const now = new Date()
    const date = format(now, 'dd/MM/yyyy\tHH:mm:ss')
    console.log(date)
    const {auth} = useAuth()
    const inputRef = useRef()
    const qtyRef = useRef()
    const getItems = async ()=> {
        dispatch({type: 'clear'})
        try {
            dispatch({type: 'errMsg', payload: 'loading...'})
            const response = await axios.get('/items')
            dispatch({type: 'errMsg', payload: ''})
          
            dispatch({type: 'getNames', payload: response.data.items})   
            console.log(response.data.items ) 
            if (state.getNames){
                
                dispatch({type: 'user', payload: state.getNames && state.getNames[0].name})
                console.log(state.user)
                console.log(response.data)
                console.log(state.getNames)
                
            } 
        } catch (error) {
            console.log(error)
        }
        console.log(state.getNames && state.getNames)
    }


    const handleEdit = async () => {
        await axios.put('/items')
    }
    
    useEffect(()=> {
        getItems()
    }, [])
    
    
    const handleAdd = (e)=> {
        e.preventDefault()

        try {
            
            if (inputRef.current.value){
                dispatch({type: 'errMsg', payload: ''})
                if (state.success === false) state.success = true
                else state.success = false
                console.log(inputRef.current.value)
                const currentItem = state.getNames && state.getNames.find((name)=> `${name.name} ${name.unitMeasure.split(' ')[1]}` === inputRef.current.value)
                if (!currentItem) dispatch({type: 'errMsg', payload: 'item not in list'})
                currentItem.total = currentItem.price
                console.log(currentItem)
                dispatch({type: 'name', payload: inputRef.current.value})
                const acutalItem = {...currentItem, qty: 1}
                const match = state.transArray.find((item) => item.name === acutalItem.name)
                if(!match){
                    
                    state.transArray.push(acutalItem)
                    state.transArray.reverse()
                    
                }else if (match) {
                    
                    dispatch({type: 'errMsg', payload: 'item already in list'})
                }
                
                console.log(state.transArray)
                // console.log(state.getNames)
                inputRef.current.value = ''
            } else {
                dispatch({type: 'errMsg', payload: 'Please select an item'})
            }
            
        } catch (error) {
            console.log(error.message)
        }
        inputRef.current.value = ''
        
    }
    
    
    
    const removeItem = async (id)=>{
       
        dispatch({type: 'remove', payload: id})
        
    }
    
    
    const clearer = ()=> {
        dispatch({type: 'clear'})
        console.log('CLEARED!')
        dispatch({type: 'cancel', payload: false})
         state.paidAmount = 0
    state.balance = 0
    }
    
    
    
    useEffect(()=> {
        dispatch({type: 'getTotal'})
        
    }, [state.transArray, state.success])
    
    const doneSales = async()=> {
        try {
            
            const {transArray, total} = state
            
            
            // console.log(transArray)
            if (state.transArray.length){
                const transItems = {
                    cashier: auth.user, 
                    cashierID: auth.picker,
                    goods: transArray,
                    grandTotal: total,
                    date
                    
                }
                console.log(transItems)
                const response = await axios.post('/transactions', transItems)
                const response2 = await axios.get('/items')
                console.log(response2)
                if (response){
                    // so i can effect change in color of the errMsg
                    dispatch({type: 'qty', payload: response})
                    dispatch({type: 'clear'})
                    dispatch({type: 'transArray', payload: []})
                    
                }
        
            transItems.goods.map((good)=> {
                const invs = response2.data.items.map(async(inv)=> {
                    console.log(inv.name)
                    console.log(good.name)
                    if (inv.name === good.name){
                        const goodObj = {
                            name: inv.name,
                            qty: inv.qty - good.qty
                        }
                        await axios.put(`items/dynam`, goodObj)
                    }
                })
                
            })
            
            dispatch({type: 'errMsg', payload: 'Transactons Complete'})
            dispatch({type: 'qtyArray', payload: []})
            setTimeout(()=> {
                dispatch({type: 'errMsg', payload: ''})
                
            }, 1000)
        } 
        
        else throw Error('no item purchased')
        console.log(state.transArray)
         
        state.paidAmount = 0
        state.balance = 0
        } catch (error) {
            dispatch({type: 'errMsg', payload: 'no item purchased'})
        }
       
    }
    const assertain = ()=> {
        dispatch({type: 'cancel', payload: true})
     console.log(state.transArray)   
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    const remain = ()=> {
        dispatch({type: 'cancel', payload: false})
    }
    
   
    return (
        <div className="trans-cont"
       
        >
            <h2
            id="tans-title"
            style={{
                textAlign: 'center',
                margin:'1rem 0' ,
                color: 'darkslateblue'  
            }}
            >Checkout</h2>
            <fieldset
            id="field"
            >
                {/* <div
                id="field-grid-container"
                > */}
                <h3
                id="grand-total-one"
                style={{
                    color: 'green'
                }}
                >Grand Total: ₦{numberWithCommas(parseFloat(state.total).toFixed(2))}</h3>
        <form
        
        >
          
            <article id="trans-add">
       <input type="text"
        id="trans-search"
        placeholder="select item"
        ref={inputRef}
        list="edulevel"
        /><button
        onClick={handleAdd}
         style={{
            width: '3rem',
            // fontSize: '2rem'
        }}
        >+</button></article>
        <datalist id="edulevel"
        >
            {state.getNames && state.getNames.map((user)=> {
                
                return (
                    
                    <option key={user._id}
                    value={`${user.name} ${user.unitMeasure.split(' ')[1]}`}
                    style={{
                            position: 'relative',
                            color: 'brown',
                        }}
                        >
                        </option>)
                    })}
            </datalist>



        </form>
        {/* </div> */}
        
<section
>
            <form
    className="payment1"
            >
                <label>Cash Paid:</label>
                <input
                className="cash-amount1"
                value={state.paidAmount}
                onChange={(e)=> dispatch({type: 'difference', payload: e.target.value})}
                />
            </form>

           </section>
           <article
           >

           <h3>Balance: </h3><h3>₦{state.paidAmount > state.total  ? parseFloat(state.balance).toFixed(2) : 0}</h3>
           {/* ₦ */}
           </article>
           <button
          id="donezo"
          onClick={doneSales}
          >Done</button>

            </fieldset>
            
            <h3 
            style={{color: `${state.transArray.length   ? 'green' : 'red'}`,
                // position: 'absolute'
                textAlign: 'center'
                // width: '6rem'
            }}>{state.errMsg}</h3>
         
            <div
            id="trans-item-cont"               
                    >
          
               {!state.transArray.length ? <h4>Cart is empty.</h4> : state.transArray.map((item, index)=> {
                //  console.log(item.unitMeasure)
                return (
                    
                    <section 
                    key={index}
                    id="trans-item"
                    
                    >
                            
                           
                <section>
                    <h3
                
                 >
               
                     {item.name}
                    
                    </h3>
                </section>
                    
                   <article
                   
                   id="flex-article"
               
                >
                 
                    <span
                  style={{fontWeight: 'bold'}}
                    >Qty:</span>
                

 {/* <section> */}
    <input
 type="text"
 ref={qtyRef}
 value={item.qty}
 style={{width: '5rem'}}
 onClick={() => dispatch({type: 'blank', payload: '', id: item._id})}
 onChange={(e)=> dispatch({type: 'FIELDCHANGE', payload: e.target.value, id: item._id})}
 />
 <span
 style={{fontWeight: 'bold',
 
 }}
 > {item.unitMeasure.split(' ')[1].slice(1, -1)}</span>
  
 {/* </section>  */}
 
                   </article>

                   <article>
                    <h4
                    id="grand-total"
                    >sub total: </h4>
                    <h4 
                    style={{display: `${state.getAllTotals ? 'none' : 'block' }`}}
                    // >N{parseFloat(item.total).toFixed(2)}</h3>
                    >₦{numberWithCommas(parseFloat(item.total).toFixed(2))}</h4>

                    </article>

                    <article>
                    <p>price/{item.unitMeasure.split(' ')[1].slice(1, -1)}:</p>
                    <p>₦{item.price}</p>

                    </article>
                   
                    <h2
                        onClick={()=> removeItem(item._id)}
                    >
                    <FaTrashAlt role='button'
                    tableIndex='0'/> 
                    </h2>
        </section>
                )
            })}{}
            </div>
            <article 
            id="grand-two-cont"
            style={{
                color: 'green'
            }}
            >
            <h2
                id="grand-total-two"
           style={{display: `${state.getAllTotals ? 'none' : 'block' }`,
        textAlign: 'center',
        margin: '1rem 0'
        }}

        //    >Grand Total: N{parseFloat(state.total).toFixed(2)}</h2>
           >Grand Total: ₦{numberWithCommas(parseFloat(state.total).toFixed(2))}</h2>
            </article >

            <section
                className="payment"
            // style={{
                //     display: 'flex',
                //     columnGap: '1rem',
                
                // }}
                >
            <form
            
            >
                <label>Cash Paid:</label>
                <input
                className="cash-amount2"
                value={state.paidAmount}
                onChange={(e)=> dispatch({type: 'difference', payload: e.target.value})}
                />
            </form>
            <seciton
            style={{
                display: 'flex',
                flexDirection: 'column'
            }}
            >
           <h2
           >Balance: </h2>
           <h2>₦{state.paidAmount > state.total  ? parseFloat(state.balance).toFixed(2) : 0}</h2> 
           </seciton>
           </section>
            
            <section
            id="trans-verify-section"
           
            >
                {state.cancel ? <div
               style={{
                margin: '1rem auto',
                padding: '1rem auto',
                  backgroundColor: '#DBBFDB',
                  borderRadius: '5px',
                  width: '98vw'
            }}
                ><h3
                id="verify-header"
                style={{
                    margin: '.5rem'
                }}
                >Are you sure you want to cancel
                    the transaction?</h3>
                    <article
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        columnGap: '4vw',
                        justifyContent: 'center',
                    }}
                    ><button
                    onClick={remain}
                    >No</button><button
                    onClick={clearer}
                    style={{backgroundColor: 'red',
                        borderColor: 'red'
                    }}
                    >Yes</button></article></div> : <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        columnGap: '4vw',
                        justifyContent: 'center',
                        margin: '1rem 0'
                    }}
                    >
                         <button onClick={assertain}
                       
                        // onClick={assertain}
                         >Cancel</button>
                         <button onClick={doneSales}>Done</button>
                        </div>}
          
           </section>

        
        </div>
    )
}

export default Transactions
