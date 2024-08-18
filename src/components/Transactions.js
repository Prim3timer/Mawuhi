import reducer from "../reducer"
import initialState from "../store"
import axios from "../app/api/axios"
import { useEffect, useReducer, useRef, useState } from "react"
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaTrashAlt } from "react-icons/fa";
const Transactions = ()=> {
    const [state, dispatch] = useReducer(reducer, initialState)
    const inputRef = useRef()
     const qtyRef = useRef()
    const getItems = async ()=> {
        const response = await axios.get('/items')
      
        dispatch({type: 'getNames', payload: response.data.items})    
        try {
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


    useEffect(()=> {
        getItems()
    }, [])
    

    const handleAdd = (e)=> {
        e.preventDefault()
        if (inputRef.current.value){
            dispatch({type: 'errMsg', payload: ''})
            if (state.success === false) state.success = true
            else state.success = false
              console.log(inputRef.current.value)
              const currentItem = state.getNames && state.getNames.find((name)=> `${name.name} ${name.unitMeasure.split(' ')[1]}` === inputRef.current.value)
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
                 inputRef.current.value = ''
             }
              
              console.log(state.transArray)
              // console.log(state.getNames)
              inputRef.current.value = ''
        } else {
            dispatch({type: 'errMsg', payload: 'Please select an item'})
        }
        state.qty = ''
    }
    const handleQty = (id)=> {
        const tempCart = state.transArray.map((item)=> {
            if ( item._id === id){
                console.log(state.qty)
                console.log(item.total)
                return {...item, qty: qtyRef.current.value, total: (item.price * state.qty).toFixed(2)}
            }
            
            state.qty = ''
            return item
        })
       return dispatch({type:'transArray', payload: tempCart})
    } 
    

    const removeItem = (id)=>{
        dispatch({type: 'remove', payload: id})
       
    }

    const upper = (id)=> {
        dispatch({type: 'INCREMENT', payload: id})
    }
    
    const downer = (id)=> {
        dispatch({type: 'DECREMENT', payload: id})   
    }
    
    const clearer = ()=> {
        dispatch({type: 'clear'})
        console.log('CLEARED!')
        dispatch({type: 'cancel', payload: false})
    }
    
    
    
    useEffect(()=> {
        dispatch({type: 'getTotal'})
        // console.log('hello mundial')
        
    }, [state.transArray, state.success])
    
    const doneSales = async()=> {
        const {transArray, total} = state
        
        // console.log(transArray)
        const transItems = {
            goods: transArray,
            grandTotal: total
            
        }

        const response = await axios.post('/transactions', transItems)
        const response2 = await axios.get('/inventory')
        console.log(response2)
        if (response){
            dispatch({type: 'clear'})
            dispatch({type: 'transArray', payload: []})
            
        }

    const goods = transItems.goods &&  transItems.goods.map((good)=> {
        const invs = response2.data.map(async(inv)=> {
            if (inv.name.split(' ').slice(0, -1).join(' ') === good.name){
                const goodObj = {
                    name: inv.name,
                    qty: inv.qty - good.qty
                }
                await axios.patch(`/inventory`, goodObj)
                // invArray.push(inv.qty)
                //  goodArray.push(good.qty)
                // goodArray.push(goodObj)
                
                
                
                
                
                // dispatch({type: 'qtyArray', payload: goodObj})
            }
        })
        
        console.log(invs)
        console.log(state.qtyArray)
        
    })
    dispatch({type: 'qtyArray', payload: []})
       
    }
    const assertain = ()=> [
        dispatch({type: 'cancel', payload: true})
        
    ]
    
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
                margin:'1rem 0'
            }}
            >Transactions</h2>
            <fieldset
            id="field"
            >
                <h3
                className="grand-total"
                style={{width: '5rem'}}
                >Grand Total: N{parseFloat(state.total).toFixed(2)}</h3>
        <form
        
        >
        <h3 id="transItem"><input type="text"
        id="trans-search"
        placeholder="search item"
        ref={inputRef}
        list="edulevel"
        
        /><button
        onClick={handleAdd}
         style={{
            width: '3rem',
            fontSize: '2rem'
        }}>+</button></h3>
        <datalist id="edulevel"
        style={{backgroundColor: 'blue',
            // display: 'flex',
            // flexDirection: 'row'
            // fontSize: '2.5rem'

        }}
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
                            {/* {user.unitMeasure.split(' ')[1]} */}
                        </option>)
                    })}
            </datalist>



        </form>
          <button
          id="done-button"
          style={{height: '3rem',
          }}
          onClick={doneSales}
          >Done</button>
            </fieldset>
            <h3 style={{color: 'red',
                // position: 'absolute'
                textAlign: 'center'
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
                    <h2
                 
                    >
                     {item.name}
                    
                    </h2>
                </section>
                    
                   <article
                   
                   id="flex-article"
               
                >
                    <div
                    >
                    <h4
                    style={{position: 'relative',
                        marginTop:'1.5rem'
                    }}
                    >Qty:</h4>
                
 </div>
 {item.unitMeasure === 'Pounds (lbs)' || item.unitMeasure === 

 'Kilogram (kg)' || item.unitMeasure === 'Litres (L)' ? <section><input
 type="text"
 ref={qtyRef}
 placeholder={item.qty}
 value={state.qty}
 style={{width: '5rem'}}
 onChange={(e)=> dispatch({type: 'FIELDCHANGE', payload: e.target.value})}
 />
 <span
 style={{fontWeight: 'bold',
    marginLeft: '.5rem',
    fontSize:'1.5rem'
 }}
 >{item.unitMeasure.split(' ')[1]}</span>
   <button
   onClick={()=> handleQty(item._id)}
   style={{width: '3rem',
    marginLeft: '.5rem',
    borderColor: 'limegreen',
    backgroundColor: 'limegreen'
   }}
   ><FontAwesomeIcon icon={faCheck} /></button>
 </section> :
 <section>
      <svg 
     onClick={()=> upper(item._id)}
      xmlns='http://www.w3.org/2000/svg'
       viewBox='0 0 20 20'
    width='80px'
 height='70px'

      >
<path d='M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.242L15.657 12z' />
</svg>
 <h3 id="qty-header">{item.qty} {item.unitMeasure.split(' ')[1]} </h3>

      <svg 
     onClick={()=> downer(item._id)}
  width='80px'
  height='70px'

      xmlns='http://www.w3.org/2000/svg'
       viewBox='0 0 20 20'
      >
<path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
</svg>
 </section>}
 
                   </article>
                    <article>
                    <h4>price/ {item.unitMeasure.split(' ')[1]}:</h4>
                    <h4>N{item.price}</h4>

                    </article>
                    <article>
                    <h3
                    id="grand-total"
                    >sub total: </h3>
                    <h2 
                    style={{display: `${state.getAllTotals ? 'none' : 'block' }`}}
                    >N{parseFloat(item.total).toFixed(2)}</h2>

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
            className="grand-total"
            >
            <h2
                    className="grand-total"
           style={{display: `${state.getAllTotals ? 'none' : 'block' }`}}
           >Grand Total: N{parseFloat(state.total).toFixed(2)}</h2>
            </article >
            
            <section
            id="trans-verify-section"
            style={{
                // margin: '0 auto',
                display: 'flex',
                flexDirection: 'row',
                columnGap: '2rem',
                alignItems: 'center',
                justifyContent: 'center',
                //   backgroundColor: 'teal',
                //   width: '115vw'
            }}
            >
                {state.cancel ? <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                      backgroundColor: 'lavender',
                      padding: '1rem',
                      borderRadius: '5px',

                }}
                ><h2
                id="verify-header"
                >Are you sure you want to cancel
                    the transaction?</h2>
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