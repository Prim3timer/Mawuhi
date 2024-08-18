import { useReducer, useEffect  } from "react"
import reducer from "../reducer"
import initialState from "../store"  
import axios from "../app/api/axios"



const Edit = ({mark, setMark})=> {
    const [state, dispatch] = useReducer(reducer, initialState)
    const id = mark
    const getAnInventory = async ()=> {
        try {
            let response = await axios.get(`/inventory/${mark}`)
            console.log(response.data)
            if (response) {
                
                dispatch({type:'inItem', payload: response.data})
                dispatch({type: 'afa', payload: response.data.name})
                dispatch({type: 'ole', payload: response.data.qty})
                // dispatch({type:'qty', payload: state.item.qty})
            }
            console.log(state.inItem)
            console.log(response.data)
            
        } catch (error) {
            dispatch({type: state.errMsg, payload: error})
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
        const response = await axios.put(`/inventory/${id}`, inventory) 
        if (response){
            dispatch({type: 'success', payload: 'inventory edited'})
            setTimeout(()=> {
                dispatch({type: 'success', payload: ''})

            }, 3000)
            console.log(response)
        }
    }

    return (
        <div className="edit">
            <h2>Edit Inventory</h2>
            <form onSubmit={(e)=> e.preventDefault()}
                id="update-form"
                >
                <label htmlFor="name">name:</label>
                <input
                type="text"
                id="name"
                value={state.afa}
                // onChange={(e)=> dispatch({type: 'afa', payload: e.target.value})}
                />
                <label htmlFor="qty">quantity:</label>
                <input
                type="text" 
                id="ole"
                value={state.ole}
                onChange={(e)=> dispatch({type: 'ole', payload: e.target.value})}
                />
                <button 
                id="update-button"
                onClick={handleEdit}
                type="submit">Update</button>
                <h2>{state.success}</h2>
            </form>
        </div>
    )
}

export default Edit
