import reducer from "../reducer"
import initialState from "../store"
import axios from '../app/api/axios'
import { useEffect, useReducer, useRef } from "react"
import { type } from "@testing-library/user-event/dist/type"
const {v4: uuid} = require('uuid')


let CreateItem = () => {
       const [state, dispatch] = useReducer(reducer, initialState)
       const itemRef = useRef()
       const measurements = ['Kilogram (kg)', 'Pieces (pcs)', 'Dozen (dzn)', 'Sachet (sct)', 
        'Pounds (lbs)', 'Litres (L)'
       ]

       const getItems = ()=> {
        try {
            
        } catch (error) {
            
        }
       }
 
    const handleSubmit = async (e)=> {
        const {name, price, unitMeasure, piecesUnit} = state
        e.preventDefault()
        try {
            const newItem = {
                name: `${name}`,
                price: price,
                unitMeasure: unitMeasure,
                piecesUnit: piecesUnit,
                
            }
            


        console.log(newItem.name)
        const theMatch = state.items && state.items.data.find((item)=> item.name.toLowerCase() === newItem.name.toLowerCase()) 
        console.log(theMatch)
        const theMatch2 = theMatch.unitMeasure === 'Pieces (pcs)' 
        console.log(newItem.unitMeasure)
        console.log(Boolean(theMatch))
        console.log(Boolean(theMatch2))
        if (theMatch2){

            // dispatch({type: 'isMatched', payload: 'we have a match' })
            throw Error(`Conflict: You cannot enter 'pcs' as a unit of measurement of the 
                second instance of an item. Please remove the first instance and 
                enter pcs first`)
        }
          else if (theMatch ){ 
            dispatch({type: 'errMsg', payload: 'There cannot be more than two intances of the same item'})
       
                      
            
        } 
        else {
            const response = await axios.post('/items', newItem)  
            if (response){  
    
                dispatch({type: 'isMatched', payload: `new item, ${newItem.name} created` })
                setTimeout(()=> {
                    dispatch({type: 'isMatched', payload: '' })
                }, 3000)
            }
            dispatch({type: 'name', payload: '' })
            dispatch({type: 'price', payload: '' })
            dispatch({type: 'unitMeasure', payload: '' })
            dispatch({type: 'piecesUnit', payload: '' })
        }  
        } catch (error) {
            dispatch({type: 'errMsg', payload: `${error.message}`})
            setTimeout(()=> {
                dispatch({type: 'errMsg', payload: ``})
                
            }, 3000)
        }

    }

    return (
        <div className="create-item">
            <h2 id="create-item-heading">Create Item</h2>
            <form onSubmit={handleSubmit}
            id="create-item-form" >
                <label>name:</label>
                <input
              
                type="text"
                required
                value={state.name}
                onChange={(e)=> dispatch({type: 'name', payload: e.target.value})}
                />

<h3 id="ulu"><label>unitMeasure:</label><br/><input type="text"
        // id="trans-search"
        // placeholder="pick measurement"
        style={{width: '20rem',
            // backgroundColor: 'red'
        }}
        // ref={itemRef}
        list="measure"
        onChange={(e)=> dispatch({type: 'unitMeasure', payload: e.target.value})}
        value={state.unitMeasure}
        /></h3>
        <datalist id="measure"
        style={{backgroundColor: 'blue',
            // fontSize: '2.5rem'

        }}
        >
            {measurements.map((measurement)=> {
                return (
                    
                    <option 
                    value={measurement}
                    style={{
                            position: 'relative',
                            color: 'brown',
                        }}
                        >
                            {measurement}
                        </option>)
                    })}
            </datalist>


                <label>price:</label>
                <input
                type="text"
                required
                value={state.price}
                onChange={(e)=> dispatch({type: 'price', payload: e.target.value})}
                />
              
                {/* <label>Pieces/Unit:</label>
                <input
                type="text"
                placeholder="optional"
                // required
                value={state.piecesUnit}
                onChange={(e)=> dispatch({type: 'piecesUnit', payload: e.target.value})}
                />
                <br/> */}
               <button type="submit" className="pop">Add Item</button>
        <h3>{state.isMatched}</h3>
        <h3>{state.errMsg}</h3>
               
            </form>
        </div>
    )
}

export default CreateItem