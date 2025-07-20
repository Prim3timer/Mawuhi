import reducer from "../reducer"
import initialState from "../store"
import axios from "../app/api/axios"
import { useContext, useEffect, useReducer, useRef, useState } from "react"
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaTrashAlt } from "react-icons/fa";
import {format} from 'date-fns'
import useAuth from '../hooks/useAuth';
import AuthContext from "../context/authProvider";
{/* ₦ */}


const Transactions = ()=> {
    const [state, dispatch] = useReducer(reducer, initialState)   
   const [cash, setCash] = useState(false)
   const [card, setCard] = useState(false)
    const [checkout, setCheckout] = useState(false)
    const now = new Date()
    const date = format(now, 'dd/MM/yyyy\tHH:mm:ss')
    console.log(date)
    const {auth,user, getNames, items} = useContext(AuthContext)
    const inputRef = useRef()
    const qtyRef = useRef()
    const cashPaidRef = useRef(null)
  
    
    
    const handleAdd = (e)=> {
        e.preventDefault()

        try {
            
            if (inputRef.current.value){
                dispatch({type: 'errMsg', payload: ''})
                if (state.success === false) state.success = true
                else state.success = false
                console.log(inputRef.current.value)
                const currentItem = items.find((name)=> `${name.name} ${name.unitMeasure.split(' ')[1]}` === inputRef.current.value)
                if (!currentItem) dispatch({type: 'errMsg', payload: 'item not in list'})
                currentItem.total = currentItem.price
            dispatch({type: 'name', payload: inputRef.current.value})
            const acutalItem = {...currentItem, qty: 1}
            const match = state.transArray.find((item) => item.name === acutalItem.name)
            if(!match){
                    console.log(acutalItem)
                    
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
    
  

    const trueCash  = ()=> {
        setCash(true)
       
        setCheckout(false)
    }

    useEffect(()=>{
        if (cash){
            cashPaidRef.current.focus()
        }
    }, [cash])
    
    useEffect(()=> {
        dispatch({type: 'getTotal'})
        
    }, [state.transArray, state.success])


    const closeCashWindow = ()=> {
        setCash(false)
    }
    
    const doneSales = async()=> {
       
        try {
            
            const {transArray, total} = state
            
            if (state.transArray.length){
                const transItems = {
                    cashier: auth.user, 
                    cashierID: auth.picker,
                    goods: transArray,
                    grandTotal: total,
                    date
                    
                }
                console.log(transItems.goods)
                const response = await axios.post('/transactions', transItems)
                const response2 = await axios.get('/items')
                console.log(response2)
              
                if (response){
                    setCash(false)
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
                            qty: inv.qty - good.qty < 1 ? 0 : inv.qty - good.qty                   
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
        
        else {
          
            console.log(state.transArray)
            throw Error('no item purchased')
            // dispatch({type: 'qtyArray', payload: []})
        }
        // state.paidAmount = 0
        state.balance = 0
        } catch (error) {
            dispatch({type: 'errMsg', payload: error.message})
        }
       
    }

const cardCheckout = async () => {
       if (state.transArray.length){
                const transItems = {
                    cashier: auth.user, 
                    cashierID: auth.picker,
                    goods: state.transArray,
                    grandTotal: state.total,
                    date
                    
                }
     const response = await axios.post('/cart/create-checkout-session', state.transArray)
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
       !getNames ? <h2 className="trans-cont">Loading...</h2> : <div className="trans-cont"
       
        >
            <h2
            id="tans-title"
           
            >Transactions</h2>
            <fieldset
            id="field"
            >
                {/* <div
                id="field-grid-container"
                > */}
              
             
        <form
        
        >
          
            <article className="trans-add">
       <input type="text"
        id="trans-search"
        placeholder="select item"
        ref={inputRef}
        list="edulevel"
        /><button
        onClick={handleAdd}
     
        >+</button></article>
        <datalist id="edulevel"
        >
            {items && items.map((user)=> {
                
                return (
                    
                    <option key={user._id}
                    value={`${user.name} ${user.unitMeasure.split(' ')[1]}`}
                    className="transaction-items-list"
                  
                        >
                        </option>)
                    })}
            </datalist>



        </form>
        <article className="checkout-tot-cont">

        
        
        </article>
<fieldset className="field2">
    <legend>Checkout</legend>
     <button onClick={trueCash}>Cash</button>
            <button>Card</button>
</fieldset>
        

            </fieldset>
            
            <h3 
            style={{color: `${state.transArray.length   ? 'green' : 'red'}`,
                // position: 'absolute'
                textAlign: 'center'
                // width: '6rem'
            }}>{state.errMsg}</h3>
           {state.transArray.length ? <h3>{state.amount} item{state.transArray.length === 1 ? '' : 's'}</h3> : ''} 
            <div
            id="trans-item-cont"               
                    >
          
               {!state.transArray.length ? <p>empty list</p> : state.transArray.map((item, index)=> {
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
                    {/* <h4
                    id="grand-total"
                    >sub total: </h4> */}
                    <h4 
                    style={{display: `${state.getAllTotals ? 'none' : 'block' }`}}
                    // >N{parseFloat(item.total).toFixed(2)}</h3>
                    >₦{numberWithCommas(parseFloat(item.total).toFixed(2))}</h4>

                    </article>

                    <article
                    
                    >
                    {/* <p>price/{item.unitMeasure.split(' ')[1].slice(1, -1)}:</p>
                    <p>₦{item.price}</p> */}

                    </article>
                   
                    <h2
                        onClick={()=> removeItem(item._id)}
                    >
                    <FaTrashAlt role='button'
                    tableIndex='0'/> 
                    </h2>
        </section>
                )
            })}
            </div>
          
           

            <section
            
                className={cash ? 'cash-payment' : 'non-payment'}
            // style={{
                //     display: 'flex',
                //     columnGap: '1rem',
                
                // }}
                >
                      <h2
                id="grand-total-one"
             
                >Total: ₦{numberWithCommas(parseFloat(state.total).toFixed(2))}</h2>
            <form
            
            >
                <h3>Cash Paid:</h3>
                <input
                ref={cashPaidRef}
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
           <h4
           >Balance: </h4>
           <h3>₦{state.paidAmount > state.total  ? parseFloat(state.balance).toFixed(2) : 0}</h3> 
           </seciton>
           <article className="cash-confirm">
           <button onClick={closeCashWindow}>Cancel</button>
           <button onClick={doneSales}>Done</button>
           </article>
           </section>
            
            <section
            id="trans-verify-section"
           
            >
             <div
                className={state.cancel ? 'display-veryfier' : 'hide-veryfier'}
            
                >
                    <h3
                id="verify-header"
                style={{
                    margin: '.5rem'
                }}
                >Are you sure you want to cancel
                    the transaction?</h3>
                    <article
                    className="inside-veryfier"
               
                    ><button
                    onClick={remain}
                    >No</button><button
                    onClick={clearer}
                    style={{backgroundColor: 'red',
                        borderColor: 'red'
                    }}
                    >Yes</button></article></div>  <div
                    className="cancel-complete"
                  
                    >
                         <button onClick={assertain}
                       
                        // onClick={assertain}
                         >Cancel</button>
                       
                        </div>
          
           </section>
          
       
        </div>

    )
}

export default Transactions
