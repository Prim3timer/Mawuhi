import reducer from "../reducer"
import initialState from "../store"
import axios from '../app/api/axios'
import { useEffect, useReducer } from "react"
const {v4: uuid} = require('uuid')


let CreateItem = () => {
       const [state, dispatch] = useReducer(reducer, initialState)
   
    const handleSubmit = async (e)=> {
        e.preventDefault()
        try {
            const newItem = {
                name: state.name,
                price: state.price,
                unitMeasure: state.unitMeasure,
                piecesUnit: state.piecesUnit,
                
            }
            
            let groove = await axios.get('/items')

            
            console.log(groove.data)
            dispatch({type: 'items', payload: groove ? groove : ''})
            const querryArray = state.items.data
            
            
            const count = (arr, element) => {
                return  arr.reduce((ele, arrayEle) =>
                    console.log(arr)
                    (arrayEle.name == element.name ? ele + 1 : ele), 0);
            };

        count(querryArray, newItem.name)
          const theMatch = state.items && state.items.data.find((item)=> item.name.toLowerCase() === newItem.name.toLowerCase())
        const theMatch2 = theMatch  && theMatch.unitMeasure.toLowerCase() === 'pcs'
        console.log(theMatch)
        console.log(theMatch2)
          if ((theMatch2 && theMatch)){
       
            // if (count(querryArray, newItem.name)){
            //     // dispatch({type: 'isMatched', payload: 'we have a match' })
            //     throw Error(`Conflict: You can't have more than two instances of the 
            //         same item in stock. You can have an item with unitMeasure other than
            //         'pcs' and another instance with unitMeasure 'pcs' with 'pcs/unit' filled out`)
            //     // setTimeout(()=> {
            //     //     dispatch({type: 'isMatched', payload: '' })
            //     // }, 3000)

            // }
            throw Error('match detected')
            
        } else {
            const response = await axios.post('/items', newItem)  
            if (response){  
    
                dispatch({type: 'isMatched', payload: `new item, ${newItem.name} created` })
                setTimeout(()=> {
                    dispatch({type: 'isMatched', payload: '' })
                }, 3000)
            }
        }  
        dispatch({type: 'name', payload: '' })
        dispatch({type: 'price', payload: '' })
        dispatch({type: 'unitMeasure', payload: '' })
        dispatch({type: 'piecesUnit', payload: '' })
        } catch (error) {
            dispatch({type: 'errMsg', payload: `${error.message}`})
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
                <label>price:</label>
                <input
                type="text"
                required
                value={state.price}
                onChange={(e)=> dispatch({type: 'price', payload: e.target.value})}
                />
                <label>unitMeasure:</label>
                <input
                type="text"
                required
                value={state.unitMeasure}
                onChange={(e)=> dispatch({type: 'unitMeasure', payload: e.target.value})}
                />
                <label>Pieces/Unit:</label>
                <input
                type="text"
                placeholder="optional"
                // required
                value={state.piecesUnit}
                onChange={(e)=> dispatch({type: 'piecesUnit', payload: e.target.value})}
                />
                <br/>
               <button type="submit" className="pop">Add Item</button>
               {state.errMsg ? <h3>{state.errMsg}</h3>: state.isMatched ? <h3>{state.isMatched}</h3>
               : ''
               }
            </form>
        </div>
    )
}

export default CreateItem