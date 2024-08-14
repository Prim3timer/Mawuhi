import reducer from "../reducer"
import initialState from "../store"
import axios from "../app/api/axios"
import { useEffect, useReducer, useState, useRef, createContext     } from "react"

import { FaTrashAlt } from "react-icons/fa";
import SearchItem from "./SearchItem"
import { Link } from "react-router-dom"
import EditItem from "./EditItem"
import { type } from "@testing-library/user-event/dist/type"
// import { current } from "@reduxjs/toolkit";
const {v4: uuid} = require('uuid')

// import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";


const ItemList = ()=> {

    const [state, dispatch] = useReducer(reducer, initialState)
    // const [mark, setMark] = useState('')  


    const itemRef = useRef()
    const getTrans = async ()=> {

        try {
            const graw = await axios.get('/items')
            console.log(graw.data.items)
            if (graw.data.items.length > 0) {
                dispatch({type: 'items', payload: graw.data.items})
                console.log(state.items.data)

                const filterate = graw.data.items.filter((inner)=> inner.name.toLowerCase().includes(state.search.toLowerCase()))
                dispatch({type: 'items', 
                    payload: filterate})
            }
    
            
            
        } catch (error) {
            console.log(error)
        }
        }

        
       
       



        const handleEdit = async (id, e )=> {
            e.preventDefault()     
            dispatch({type: 'isEdit', payload: true})    
            itemRef.current.value = id
            console.log(itemRef.current.value)
            
        }

        // const  handleRemove = async (id)=>{
        //        const currentUser = users.find((user)=> user._id ===id)
        //         const currentExcercise = excercises.find((session)=> session.username === currentUser.username)
        //     let newList = graw.data.filter((item)=> item._id !== id )
        //     setExcercises(newList)
        //     console.log(id)
        //   }
        
        const handleRemove = async (id)=> {
            // e.preventDefault()     
            removeInventory(id)
                await axios.delete(`/items/delete/${id}`)
            const newGraw = state.items && state.items.filter((item)=> item._id !== id)
            dispatch({type: 'items', payload: newGraw})
        }

        const removeInventory = async (id)=> {
            const items = await axios.get('/items')
            console.log(items)
            const currentItem = state.items.find((item) => item._id === id)
            console.log(currentItem)
            const invLIst = await axios.get('/inventory')
            console.log(invLIst.data)
            const currentInventory = invLIst.data.find((inv)=> inv.name === currentItem.name)
            console.log(currentInventory)
            if (currentInventory){

                const inventory = await axios.delete(`/inventory/${currentInventory._id}`)
                // dispatch({type: 'inventory', payload: newList})
            }
            // console.log(id)
        }
        console.log(state.items)
        // removeInventory('66bb6d08cee24e6d05660bca')
        console.log(state.isEdit)
        useEffect(()=> {
            getTrans()
            
    }, [state.search])
    console.log(state)
    const watcher = state.isEdit ? 

  
        <EditItem mark={itemRef.current.value}/>: (
      
              <div>  
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
           <h2 id="invent-header">Items</h2>
       </article>
       <table className="inventory"
      
      >
       <tbody>
       <tr>
           <th>name</th>
           <th>price</th>
           <th> UMT</th>
           <th>P/U</th>
           <th colSpan={2}>action</th>
           {/* <th>action</th> */}
           </tr>
    
      {state.items && state.items.map((item, index)=> {
      return (
         <tr className="sales-items-cont"
         key={uuid()}
       style={{backgroundColor: index % 2 === 0 ?
        'white' : 'lavender'}}
        >
           <td className="items">{item.name}</td>
           <td className="items">{item.price}</td>
           <td className="items">{item.unitMeasure.split(' ')[0]}</td>
           <td className="items">{item.piecesUnit}</td>
           <td 
           // style={{backgroundColor: 'blue'}}
           // ref={achoRef}
        //    onClick={(e) => handleEdit(inv._id, e)}
           ref={itemRef}
           className="items">
               <a
               onClick={(e) => handleEdit(item._id, e)}
           style={{color: 'blue'}}
           href={'/edit-item'}>edit</a></td>
           <td className="items"
           onClick={(e)=>handleRemove(item._id, e)}
           >
            {/* remove */}
           <FaTrashAlt role='button' tableIndex='0'
           
           /> 
           </td>
          
       </tr>
      )
      })}
         </tbody>
      </table>
      {/* <Edit mark={invRef}/>  */}
      </div>
      
    //   </div>
          )
    
    return watcher
}

export default ItemList