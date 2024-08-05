import reducer from "../reducer"
import initialState from "../store"
import axios from "../app/api/axios"
import { useEffect, useReducer, useRef } from "react"
import { type } from "@testing-library/user-event/dist/type"
const Transactions = ()=> {
    const [state, dispatch] = useReducer(reducer, initialState)
    const inputRef = useRef()
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
                style={{width: '6rem'}}
                >Grand Total: ${state.total}</h2>
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
            width: '2rem',
            margin: '0 0 0 .5rem'
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
            //             onSelect={(e)=> {            
            //     dispatch({type: 'name', payload: e.target.value})
            // console.log(state.name)
            // }}
                        
                        >
                            {user.name}
                        </option>)
                    })}
            </datalist>

        </form>
          <button
          style={{height: '3rem',
          }}
          >Save</button>
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
                    
                    <h2
                    // style={{
                    //     position: 'relative',
                    //     top: '30%',
                    //     left: '10%',
                    //     // color: 'green',
                    //     width: '8rem',
                       
                    // }}
                    >{item.name}</h2>
                   <article
                   
                   id="flex-article"
               
                >
                    <div
                    >
                    <h4
                  
             
                    >Qty:</h4>
                
 </div>
 <section>
                    <button id="qty-increase"
                         onClick={()=> upper(item._id)}
                    >
                         <svg 
                         xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
            <path d='M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.242L15.657 12z' />
          </svg>
                        </button>
                    <h3 id="qty-header">{item.qty} {item.unitMeasure} </h3>
                    <button
                    id="qty-decrease"
                    onClick={()=> downer(item._id)}
                    >
                         <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
            <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
          </svg>
                    </button>
                    </section>
                   </article>
                    <article>
                    <h4>price/ {item.unitMeasure}:</h4>
                    <h4>${item.price}</h4>

                    </article>
                    <article>
                    <h3
                //    onClick={()=> totality(item._id)}
                    >sub total: </h3>
                    <h3 
                    style={{display: `${state.getAllTotals ? 'none' : 'block' }`}}
                    >${item.total}</h3>

                    </article>
                    <h4
                    onClick={()=> removeItem(item._id)}
                    >remove</h4>
        </section>
                )
            })}{}
            </div>
            <article 
            id="grand-total"
            >

           {/* <button
           style={{height: '3rem',
            fontSize: '1.5rem'
           }}
           onClick={()=> dispatch({type: 'getAllTotals', payload: !state.getAllTotals})}
           >Get Totals</button>
            */}
            <h2
           style={{display: `${state.getAllTotals ? 'none' : 'block' }`}}
           >Grand Total: ${parseFloat(state.total).toFixed(2)}</h2>
            </article>
           <button onClick={clearer}>Clear List</button>
        </div>
    )
}

export default Transactions