import { useEffect, useReducer, useRef } from "react"
import initialState from "../store"
import reducer from "../reducer"
import axios from "../app/api/axios"

const CreateInventory = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const ACTION = {
        NAME: 'name',
        QTY: 'qty',
        INVENTORY: 'inventory'
    }
    const inputRef = useRef()

    const getItems = async ()=> {
        const response = await axios.get('/items')
        console.log(response.data.length)
        // if (response.data.length > 12){
        //     response.data.shift()
        // }
        dispatch({type: 'getNames', payload: response.data})
        try {
            if (state.getNames){
                console.log(response.data)
    
             console.log(state.getNames)
                        // setUsername(response.data.users[0].username)
                        dispatch({type: 'user', payload: state.getNames[0].name})
                        console.log(state.user)
            }

        } catch (error) {
            console.log(error)
        }
        console.log(state.getNames)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
    
        const newItem = {
            name: state.name,
            qty: state.qty
            
        }
        console.log(newItem.name)
        console.log(newItem.qty)
        let groove = await axios.get('/inventory')
        dispatch({type: 'inventory', payload: groove})
        if (state.inventory){

            console.log(state.inventory.data)
          const theMatch = state.inventory.data.find((item)=> item.name.toLowerCase() === newItem.name.toLowerCase())
          if (theMatch){
       
            dispatch({type: 'isMatched', payload: 'we have a match' })
            setTimeout(()=> {
                dispatch({type: 'isMatched', payload: '' })
            }, 3000)
            
        }
        else {
    
            const newItem = {
                name: state.name,
                qty: state.qty
                
            }
    
    
        
            const response = await axios.post('/inventory', newItem)  
           
            if (response){  
    
                dispatch({type: 'isMatched', payload: `new inventory, ${newItem.name} created` })
                setTimeout(()=> {
                    dispatch({type: 'isMatched', payload: '' })
                }, 3000)
            }
        }  
    } 
    // dispatch({type: 'name', payload: '' })
    // dispatch({type: 'price', payload: '' })
    // dispatch({type: 'unitMeasure', payload: '' })
    // dispatch({type: 'piecesUnit', payload: '' })
        // setUsername('')
    }
    useEffect(()=>{
        getItems()
    }, [])
    return (
        <div id="create-inventory">
            <h2 id="create-inventory">Create Inventory</h2>

            <form 
            onSubmit={handleSubmit} 
            >
                 <h2 id="transItem"
                 
                 >Item: <br/><input type="text" 
                 placeholder='search item'
                 list="edulevel"
                 style={{
                    width: '60vw',
                    // backgroundColor: 'blue'
                    
                 }}
        value={state.name}
        onChange={(e)=>  dispatch({type: 'name', payload: e.target.value})}
        /></h2>
        <datalist id="edulevel"
        >
            {state.getNames && state.getNames.map((user)=> {
                return (
                        
                        <option key={user._id} 
                        id="transNames"
                        // value={user.name}
                        >
                            {user.name} 
                            {/* {user.unitMeasure.split(' ')[1]} */}
                        </option>)
                    })}
            </datalist>
                 <br/>
                 <label>Quantity:</label><br/>
                <input
                name="qty"
                value={state.qty}
                onChange={(e)=>  dispatch({type: 'qty', payload: e.target.value})}
                /><br/>
               <button type="submit" className='pop' >Add</button>           
            </form>
            <h3 style={{position: 'absolute',
                margin: '0 35%',
                width: '20rem',

            }}>{state.isMatched}</h3>
        </div>
    )
}

export default CreateInventory