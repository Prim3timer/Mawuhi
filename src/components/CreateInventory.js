import { useEffect, useReducer, useRef, useState } from "react"
import initialState from "../store"
import reducer from "../reducer"
import axios from "../app/api/axios"


const CreateInventory = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [unit, setUnit] = useState()
    const ACTION = {
        NAME: 'name',
        QTY: 'qty',
        INVENTORY: 'inventory',
        UNITMEASURE: 'unitMeasure'
    }
    const inputRef = useRef()

    const getItems = async ()=> {
        const response = await axios.get('/items')
        let groove = await axios.get('/inventory')
        console.log(groove)
        console.log(response.data.length)
        // if (response.data.length > 12){
        //     response.data.shift()
        // }
        dispatch({type: 'getNames', payload: response.data.items})
        try {
            if (state.getNames){
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
        console.log(groove)
        console.log(state.inventory)
        if (groove){

            console.log(state.inventory.data)
          const theMatch = groove.data.find((item)=> item.name.toLowerCase() === newItem.name.toLowerCase())
          if (theMatch){
       
            dispatch({type: 'isMatched', payload: 'item alrady in list' })
            setTimeout(()=> {
                dispatch({type: 'isMatched', payload: '' })
            }, 3000)
            
        }
        else {
    
            const newItem = {
                name: state.name,
                qty: state.qty,
                unitMeasure: state.unitMeasure
                
            }
    
    
        
            const response = await axios.post('/inventory', newItem)  
           
            if (response){  
    
                dispatch({type: 'isMatched', payload: `new inventory, ${newItem.name} created` })
                dispatch({type: 'name', payload: '' })
                dispatch({type: 'qty', payload: '' })
                setTimeout(()=> {
                    dispatch({type: 'isMatched', payload: '' })
                }, 3000)
            }
        }  
    } 
    }
    useEffect(()=>{
        getItems()
    }, [])
    return (
        <div className="create-inventory">
            <h2 id="create-inventory">Create Inventory</h2>

            <form 
            onSubmit={handleSubmit} 
            >
                 <h2 id="transItem"
                 
                 >Item: <br/><input type="text" 
                 placeholder='search item'
                 list="edulevel"
                 style={{
                    width: '90%',
                    // backgroundColor: 'blue'
                    
                 }}
        value={state.name}
        onChange={(e)=>  dispatch({type: 'name', payload: e.target.value})}
        /></h2>
        <datalist id="edulevel"
        
        >
            {state.getNames && state.getNames.map((user)=> {
                // dispatch({type: 'unitMeasure', payload: user.unitMeasure})
                // setUnit(user.unitMeasure)
                return (
                        
                        <option key={user._id} 
                        id="transNames"
                        // value={user.name}
                        >
                            {user.name}  {user.unitMeasure.split(' ')[1]}
                            
                           
                        </option>)
                    })}
            </datalist>
                 <br/>
                 <h2>Quantity:</h2>
                <input
                type="text"
                style={{width: '90%'}}
                name="qty"
                value={state.qty}
                onChange={(e)=>  dispatch({type: 'qty', payload: e.target.value})}
                /><br/>
               <button type="submit" className='pop' >Add</button>           
            </form>
            <h3 
            >{state.isMatched}</h3>
        </div>
    )
}

export default CreateInventory