import reducer from "../reducer"
import initialState from "../store"
import axios from "../app/api/axios"
import { useEffect, useReducer, useState, useRef, createContext     } from "react"
import SearchItem from "./SearchItem"
import { Link } from "react-router-dom"
import Edit from "./Edit"
import { type } from "@testing-library/user-event/dist/type"
const {v4: uuid} = require('uuid')

// export const idContext = createContext()
// console.log(idContext)


const Inventory = ({mark, setMark})=> {
    const [state, dispatch] = useReducer(reducer, initialState)
    // const [mark, setMark] = useState('')  


    const invRef = useRef()
    const getTrans = async ()=> {

          try {
            
              const graw = await axios.get('/items')
              console.log(graw.data.length)
              const filterate = graw.data.items.filter((inner)=> inner.name.toLowerCase().includes(state.search.toLowerCase()))
              dispatch({type: 'inventory', 
                  payload: filterate})
          } catch (error) {
            dispatch({type: 'errMsg', payload: error.Message})
          }
        }
        console.log(state.isEdit)
        useEffect(()=> {
            getTrans()
            
    }, [state.search])

    const handleEdit = async (id, e )=> {
        e.preventDefault()     
        dispatch({type: 'isEdit', payload: true})    
        invRef.current.value = id
        console.log(invRef.current.value)
      
    }
 
    const watcher = state.isEdit ? 
  
  <Edit mark={invRef.current.value}/>: (

        <div className="inventory">  
        <article id="form-cont">
     <form  className="search-form" 
     //   onSubmit={(e)=> e.preventDefault()}
     >
 <input 
 id="invent-search"
 type="text"
 role="searchbox" 
 placeholder="Search items by name"
 value={state.search}
 onChange={(e)=> dispatch({type: 'search', payload: e.target.value})}

     // https://www.npmjs.com/package/@react-google-maps/api
 
 />
   </form>
     <h2 id="invent-header">Inventory</h2>
 </article>
 <table className="inventory"

>
 <tbody>
 <tr>
     <th>name</th>
     <th>in-stock</th>
     <th> last udated</th>
     <th>action</th>
     </tr>
{state.inventory && state.inventory.map((inv, index)=> {
    const invReg = inv.qty < 1 ? inv.qty = 0 : inv.qty
return (
   <tr className="sales-items-cont"
   key={uuid()}
 style={{backgroundColor: index % 2 === 0 ?
     'white' : 'palegreen'}}
     >
        
     <th className="sales-items">{`${inv.name} ${inv.unitMeasure.split(' ')[1]}`}</th>
     <th className="sales-items" style={{color: inv.qty < 20 ? 'red' : ''}}>{parseFloat(invReg).toFixed(2)}</th>
     <td className="sales-items">{inv.date.substring(0, 10)}</td>
     <td 
     // style={{backgroundColor: 'blue'}}
     // ref={achoRef}
     onClick={(e) => handleEdit(inv._id, e)}
     ref={invRef}
     className="sales-items">
         <a
         onClick={(e) => handleEdit(inv._id, e)}
     style={{color: 'blue'}}
    //  href={'/edit'}
     >edit
     </a>
     </td>
 </tr>
)
})}
   </tbody>
</table>
<h3>{state.errMsg}</h3>
</div>

    )
    return watcher
}

export default Inventory