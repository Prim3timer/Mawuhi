import { useReducer, useEffect  } from "react"
import reducer from "../reducer"
import initialState from "../store"  
import axios from "../app/api/axios"



const Edit = ({mark, setMark})=> {
    const [state, dispatch] = useReducer(reducer, initialState)
    const id = mark

    const measurements = ['Kilogram (kg)', 'Pieces (pcs)', 'Dozen (dzn)', 'Sachet (sct)', 
        'Pounds (lbs)', 'Litre (L)'
       ]
    const getAnInventory = async ()=> {
        try {
            let response = await axios.get(`/items/${id}`)
        
            console.log(response.data)
            if (response) {
                
                dispatch({type:'inItem', payload: response.data})
                dispatch({type: 'afa', payload: response.data.name})
                
                dispatch({type: 'unitMeasure', payload: response.data.unitMeasure})
                dispatch({type: 'price', payload: response.data.price})
            }
            console.log(state.inItem)
            console.log(response.data)
            
        } catch (error) {
            dispatch({type: state.errMsg, payload: error})
        }
    }

    const handleSubmit = async (e)=> {
        const {name, price, unitMeasure, piecesUnit} = state
        e.preventDefault()
        try {
            const newItem = {
                name:  state.afa ? state.afa :  response.data.name,
                price: price && price,
                unitMeasure: unitMeasure && unitMeasure,
                piecesUnit: piecesUnit,
                
            }
     
            const response = await axios.patch(`/items/${mark}`, newItem)  
            if (response){  
    
                dispatch({type: 'isMatched', payload: `item, ${newItem.name} Edited` })
                setTimeout(()=> {
                    dispatch({type: 'isMatched', payload: '' })
                }, 3000)
            }
        }  
       catch (error) {
            dispatch({type: 'errMsg', payload: `${error.message}`})
            setTimeout(()=> {
                dispatch({type: 'errMsg', payload: ``})
                
            }, 3000)
        }

    }
    
    useEffect(()=>{
        getAnInventory()
        console.log(id)
    }, [])
    const handleEdit = async (e)=> {
        console.log(id)
        e.preventDefault()
      const inventory = {
        id,
          name: state.afa ? state.afa : state.item.name,
        //   name: state.name,
          qty: state.ole,
        //   qty: state.qty,

      }
     
    }

    return (
        <div className="edit-item">
            <h2>Edit Item</h2>
            <form onSubmit={(e)=> e.preventDefault()}
                id="update-form"
                >
                <label htmlFor="name">name:</label>
                <input
                type="text"
                placeholder="item name only"
                id="name"
                value={state.afa} 
                onChange={(e)=> dispatch({type: 'afa', payload: e.target.value})}
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
               <button type="submit"
               onClick={handleSubmit}
               className="pop">Update Item</button>
                 <h2>{state.isMatched}</h2>
            </form>
        </div>
    )
}

export default Edit
