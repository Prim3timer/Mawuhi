import reducer from "../reducer"
import initialState from "../store"
import axios from '../app/api/axios'
import { useEffect, useReducer, useRef, useState, useContext } from "react"
import useRefreshToken from "../hooks/useRefreshToken"
import { type } from "@testing-library/user-event/dist/type"
import AuthContext from "../context/authProvider"
const {v4: uuid} = require('uuid')


let CreateItem = () => {
       const [state, dispatch] = useReducer(reducer, initialState)
       const itemRef = useRef()
       const [showUpdate, setShowUpdate] = useState(false)
       const measurements = ['Kilogram (kg)', 'Piece (pc)', 'Plate (Plt)', 'Dozen (dzn)', 'Bottle (Btl)', 'Pound (lbs)', 'Litre (L)', 'Sachet (sct)', 'Ounce (Oz)', 'Gram (g)', 'Set (St)', 'Bag (Bg)'
       ]
    const {setIsRotated} = useContext(AuthContext)
     const refresh = useRefreshToken()
 
    const handleSubmit = async (e)=> {
        
        const {name, price, unitMeasure, image} = state
        e.preventDefault()
        try {
            const newItem = {
                name: `${name}`,
                price: price,
                unitMeasure: unitMeasure,
                image: image
            }
            


        console.log(newItem.name)
        const theMatch = state.items && state.items.data.find((item)=> item.name.toString().toLowerCase() === newItem.name.toLowerCase()) 
        if (theMatch){

                const myError =  new Error('There cannot be two intances of the same item')
        }
        else {
            const response = await axios.post('/items', newItem)  
            if (response){  
                setShowUpdate(true)
                dispatch({type: 'isMatched', payload: `new item, ${newItem.name} created` })
                setTimeout(()=> {
                    dispatch({type: 'isMatched', payload: '' })
                    setShowUpdate(false)
                }, 3000)
            }
            dispatch({type: 'name', payload: '' })
            dispatch({type: 'price', payload: '' })
            dispatch({type: 'unitMeasure', payload: '' })
            dispatch({type: 'piecesUnit', payload: '' })
            dispatch({type: 'IMAGE', payload: '' })
        }  
        } catch (error) {
            dispatch({type: 'errMsg', payload: `${error.message}`})
            setTimeout(()=> {
                dispatch({type: 'errMsg', payload: ``})
                
            }, 3000)
        }
        itemRef.current.focus()

    }

   const remainDelete = ()=> {
        // this condition statement is to enable the removal of the confirm window once any part of the 
        // page is touched.
        if (state.cancel){

            dispatch({type: 'cancel', payload: false})
        }
        setIsRotated(false)

    }



    return (
        <div className="create-item"
           onClick={remainDelete}
        >
            <h2 id="create-item-heading">Create Item</h2>
            <form onSubmit={handleSubmit}
            id="create-item-form" >
                <h4>Name:</h4>
                <input
              ref={itemRef}
                type="text"
                required
                value={state.name}
                onChange={(e)=> dispatch({type: 'name', payload: e.target.value})}
                />

{/* <h3 id="ulu" */}
<h4>Unit Measure:</h4><input type="text"
        list="measure"
        onChange={(e)=> dispatch({type: 'unitMeasure', payload: e.target.value})}
        value={state.unitMeasure}
        />
        {/* </h3> */}
        {/* <label>unitMeasure:</label> */}
        <datalist id="measure"
        style={{backgroundColor: 'blue',
            // fontSize: '2.5rem'

        }}
        >
            {measurements.map((measurement)=> {
                return (
                    
                    <option 
                    className="create-item-options"
                    value={measurement}
                  
                        >
                            {measurement}
                        </option>)
                    })}
            </datalist>


                <h4>Price:</h4>
                <input
                type="text"
                required
                value={state.price}
                onChange={(e)=> dispatch({type: 'price', payload: e.target.value})}
                />
                <h4>Image Link:</h4>
                <input
                type="text"
                // required
                value={state.image}
                onChange={(e)=> dispatch({type: 'IMAGE', payload: e.target.value})}
                /><br/>
              
               <button type="submit" className="pop">Add Item</button>
        <h3 className={showUpdate ? "create-item-update" : "hide-show-update"}>{state.isMatched}</h3>
        <h3>{state.errMsg}</h3>
               
            </form>
        </div>
    )
}

export default CreateItem