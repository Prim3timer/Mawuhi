import reducer from "../reducer"
import initialState from "../store"
import axios from "../app/api/axios"
import { useEffect, useReducer, useRef, useState } from "react"
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Transactions = ()=> {
    const [qty, setQty] = useState(0)
    const [state, dispatch] = useReducer(reducer, initialState)
    const inputRef = useRef()
     const qtyRef = useRef()
    const getItems = async ()=> {
        const response = await axios.get('/items')
      
        dispatch({type: 'getNames', payload: response.data})    
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
        console.log(state.getNames)
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
              const currentItem = state.getNames && state.getNames.find((name)=> name.name === inputRef.current.value)
              currentItem.total = currentItem.price
              console.log(currentItem)
              dispatch({type: 'name', payload: inputRef.current.value})
              const acutalItem = {...currentItem, qty: 1}
              state.transArray.push(acutalItem)
              state.transArray.reverse()
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
                return {...item, qty: state.qty, total: (item.price * state.qty)}
            }
            
            return item
        })
    //    state.qty = ''
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
    }
    
   
    useEffect(()=> {
        dispatch({type: 'getTotal'})
        // console.log('hello mundial')

    }, [state.transArray, state.success])
   
    return (
        <div className="trans-cont">
            <h1>Transactions</h1>
            <fieldset
            id="field"
            >
                <h2
                className="grand-total"
                style={{width: '6rem'}}
                >Grand Total: ${parseFloat(state.total).toFixed(2)}</h2>
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
            fontSize: '2.5rem'

        }}
        >
            {state.getNames && state.getNames.map((user)=> {
                return (
                    
                    <option key={user._id} 
                    value={user.name}
                    style={{
                            position: 'relative',
                            color: 'brown',
                        }}
                        >
                            {user.name}
                        </option>)
                    })}
            </datalist>

        </form>
          <button
          style={{height: '3rem'
          }}
          >Done</button>
            </fieldset>
            <h3 style={{color: 'red',
                // position: 'absolute'
            }}>{state.errMsg}</h3>
         
            <div
            id="trans-item-cont"
                 
                    >
          
               {!state.transArray.length ? <h4>list is empty</h4> : state.transArray.map((item, index)=> {
                return (
                 
            <section 
           key={index}
           id="trans-item"
            
            >
                    
                    <h1
                 
                    >{item.name}</h1>
                   <article
                   
                   id="flex-article"
               
                >
                    <div
                    >
                    <h3
                    style={{position: 'relative',
                        marginTop:'2.4rem'
                    }}
                    >Qty:</h3>
                
 </div>
 {item.unitMeasure === 'lbs' || item.unitMeasure === 'kg' ? <section><input
 type="text"
 placeholder={state.qty}
 ref={qtyRef}
 value={state.qty}
 style={{width: '5rem'}}
 onChange={(e)=> dispatch({type: 'FIELDCHANGE', payload: e.target.value})}
 /><span
 style={{fontWeight: 'bold',
    marginLeft: '.5rem',
    fontSize:'1.5rem'
 }}
 >{item.unitMeasure}</span>
   <button
   onClick={()=> handleQty(item._id)}
   style={{width: '3rem',
    marginLeft: '.5rem'
   }}
   ><FontAwesomeIcon icon={faCheck} /></button>
 </section> :
 <section>
 <button id="qty-increase"
      onClick={()=> upper(item._id)}
 >
      <svg 
      xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
<path d='M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.242L15.657 12z' />
</svg>
     </button>
 <h2 id="qty-header">{item.qty} {item.unitMeasure} </h2>
 <button
 id="qty-decrease"
 onClick={()=> downer(item._id)}
 >
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
<path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
</svg>
 </button>
 </section>}
 
                   </article>
                    <article>
                    <h4>price/ {item.unitMeasure}:</h4>
                    <h4>${item.price}</h4>

                    </article>
                    <article>
                    <h2
                    id="grand-total"
                    >sub total: </h2>
                    <h2 
                    style={{display: `${state.getAllTotals ? 'none' : 'block' }`}}
                    >${item.total}</h2>

                    </article>
                    <h2
                    onClick={()=> removeItem(item._id)}
                    >remove</h2>
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
           >Grand Total: ${parseFloat(state.total).toFixed(2)}</h2>
            </article >
            <section
            style={{
                // margin: '0 auto',
                display: 'flex',
                flexDirection: 'row',
                columnGap: '2rem',
                alignItems: 'center',
                justifyContent: 'center'
            }}
            >
           <button onClick={clearer}>Clear List</button>
           <button onClick={clearer}>Cancel</button>
           </section>
        </div>
    )
}

export default Transactions