import reducer from "../reducer"
import initialState from "../store"
import axios from "../app/api/axios"
import { useContext, useEffect, useReducer, useRef, useState } from "react"
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaTrashAlt, FaPlus } from "react-icons/fa";
import {format} from 'date-fns'
import useAuth from '../hooks/useAuth';
import { Link } from "react-router-dom";
import AuthContext from "../context/authProvider";
import useRefreshToken from "../hooks/useRefreshToken";
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
    const [firstRedChecker, setFirstRedChecker] = useState('')
    const [success, setSuccess] = useState(false)
  
     const refresh = useRefreshToken()
    
    const handleAdd = (e)=> {
        e.preventDefault()

        try {
            
            if (inputRef.current.value){
                dispatch({type: 'errMsg', payload: ''})
                setFirstRedChecker('')
                if (state.success === false) state.success = true
                else state.success = false

                const currentItem = items.find((name)=> `${name.name} ${name.unitMeasure.split(' ')[1]}` === inputRef.current.value)
                if (!currentItem) dispatch({type: 'errMsg', payload: 'filtering...'})
                    // setFirstRedChecker('tamgible')
                currentItem.total = currentItem.price
                dispatch({type: 'name', payload: inputRef.current.value})
                const acutalItem = {...currentItem, qty: 1}
                const match = state.transArray.find((item) => item.name === acutalItem.name)
                if(!match){
                    setFirstRedChecker('')
                    
                    state.transArray.push(acutalItem)
                    dispatch({type: 'errMsg', payload: `${acutalItem.name} added`})
                    setTimeout(()=> {
                        dispatch({type: 'errMsg', payload: ``})
                        
                    }, 3000)
                    state.transArray.reverse()
                    
                }else if (match) {
                    setFirstRedChecker(match)
                    dispatch({type: 'errMsg', payload: 'item already in list'})
                    setTimeout(()=> {
                        dispatch({type: 'errMsg', payload: ``})
                        setFirstRedChecker('')
                        
                    }, 3000)
                    
                }
                
                console.log(state.transArray)
                // console.log(state.getNames)
                inputRef.current.value = ''
            } else {
                // setFirstRedChecker('tamgible')
                // dispatch({type: 'errMsg', payload: 'Please select an item'})
            }
            
        } catch (error) {
            console.log(error.message)
        }
        // inputRef.current.value = ''
        
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
            
           setSuccess(true)
               setTimeout(()=> {
            setSuccess(false)
        }, 5000)
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
console.log('on the card')
    try {
        if (state.transArray.length){
                 const transItems = {
                     cashier: auth.user, 
                     cashierID: auth.picker,
                     goods: state.transArray,
                     grandTotal: state.total,
                    //  date
                     
                 }
      const response = await axios.post('/transactions/create-checkout-session', transItems)
        if (response){
             window.location = response.data.session.url
             console.log(response.data)
          }else  console.log("no checkout")

}
     } catch (error) {
        console.error(error.message)
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


        const [alert, setAlert] = useState('')
const {setAuth} = useAuth()
//  const refresh = useRefreshToken()


// window.addEventListener('beforeunload', function (e) {
//     e.preventDefault()
//     return "data will get lost"
// });
 
 const getRecipt = async ()=> {
    const queryParams = new URLSearchParams(window.location.search)
    let sessionId = queryParams.get("session_id")
    const cusomer = queryParams.get("customer")
    console.log({sessionId})
     
    const now = new Date()
    const date = format(now, 'dd/MM/yyyy HH:mm:ss')
    const dateOjb = {date}
    console.log({date})
    try {
        if (sessionId){

            const res = await axios.get(`/cart/thanks/old-session/${sessionId}`)
             const oldSession = res.data ? res.data.title : ''
    if (oldSession === sessionId ){
    return
     }else if (!oldSession || oldSession !== sessionId){
    
         const response = await axios.post(`/transactions/${sessionId}`, dateOjb)
         console.log({res: response.data})
         if (response){
            setSuccess(true)
            setTimeout(()=> {
                setSuccess(false)
            }, 5000)
             setAuth(prev => {
        
             return {...prev, users: response.data.users
             }
         })
     }
    
    
     }
        }
    } catch (error){
        // console.error(error)
    }
}

const trueSuccess = () => {
    setSuccess(true)
}

const falseSuccess = ()=> {
    setSuccess(false)
}
useEffect(()=> {

// if (sessionId){
    getRecipt()

// }
}, [ ])
useEffect(()=> {

// if (sessionId){
    refresh()

// }
}, [ ])

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
        className="tran-form"
        >
          
            <article className="trans-add">
       <input type="text"
        id="trans-search"
        placeholder="select item"
        ref={inputRef}
        onChange={handleAdd}
        list="edulevel"
        /></article>
                    
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

<fieldset className="field2">
    <legend>Checkout</legend>
     <button onClick={trueCash}>Cash</button>
            <button onClick={cardCheckout}>Card</button>
</fieldset>
        

            </fieldset>
            
            <h3 
            className={!firstRedChecker ? 'err-msg' : 'no-err-msg'}
          
            >
                {state.errMsg}</h3>
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
                    <h4
                
                 >
               
                     {item.name}
                    
                    </h4>
                </section>
                    
                   <article
                   
                   id="flex-article"
               
                >
                 
                    <span
               
                    >Qty:</span>
                

 {/* <section> */}
    <input
 type="text"
 ref={qtyRef}
 className="in-person-qty"
 value={item.qty}
 
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
                <h4>Cash Paid:</h4>
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
           >Balance: ₦{state.paidAmount > state.total  ? parseFloat(state.balance).toFixed(2) : 0}</h4>
           {/* <h3>₦{state.paidAmount > state.total  ? parseFloat(state.balance).toFixed(2) : 0}</h3>  */}
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

       <article className={success ? 'success' : 'non-success'}>
        <h3>Transaction Complete</h3>
        <h4>Receipt?</h4>
        <div className="cash-confirm">
        <button onClick={falseSuccess}>No</button>
        <button><Link to='/receipts' className="cash-confirm-link">Yes</Link></button>
        </div>
        </article> 
       
        </div>

    )
}

export default Transactions
