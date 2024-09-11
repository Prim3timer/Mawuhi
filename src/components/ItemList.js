import reducer from "../reducer"
import initialState from "../store"
import axios from "../app/api/axios"
import Cancel from "./Cancel"
import { useEffect, useReducer, useState, useRef, createContext     } from "react"

import { FaTrashAlt } from "react-icons/fa";
// import SearchItem from "./SearchItem"
import { Link } from "react-router-dom"
import EditItem from "./EditItem"
// import { type } from "@testing-library/user-event/dist/type"
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
        
        const handleRemove = async ()=> {
                await axios.delete(`/items/delete/${state.id}`)
            const newGraw = state.items && state.items.filter((item)=> item._id !== state.id)
            dispatch({type: 'items', payload: newGraw})
            dispatch({type: 'cancel', payload: false})
        }

        const removeInventory = async (id)=> {
            const items = await axios.get('/items')
            console.log(items)
            const currentItem = state.items.find((item) => item._id === id)
            console.log(currentItem)
            const invLIst = await axios.get('/inventory')
            console.log(invLIst.data)
            const currentInventory = invLIst.data.find((inv)=> inv.name === `${currentItem.name} ${currentItem.unitMeasure.split(' ')[1]}`)
            console.log(currentInventory)
            if (currentInventory){

                const inventory = await axios.delete(`/inventory/${currentInventory._id}`)
                // dispatch({type: 'inventory', payload: newList})
            }
            // console.log(id)
        }
        useEffect(()=> {
            getTrans()
            
    }, [state.search])
    
    const assertain = (id) => {
        dispatch({type: 'cancel', payload: true})
        dispatch({type: 'id', payload: id})
        const getItem = state.items && state.items.find((item)=> item._id === id)
        dispatch({type: 'inItem', payload: getItem})
    }


    const remain = ()=> {
        // this condition statement is to enable the removal of the confirm window once any part of the 
        // page is touched.
        if (state.cancel){

            dispatch({type: 'cancel', payload: false})
        }
    }
    

    const watcher = state.isEdit ? 

  
        <EditItem mark={itemRef.current.value}/> : (
      
              <div className="item-list"
              style={{}}
              onClick={remain}
              >  
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
      style={{
    //   position: 'absolute'
    width: '95vw'
      }}
      >
       
       <tbody
       >
       <tr>
           <th>NAME</th>
           <th>PRICE (N)</th>
           <th> UMT</th>
           {/* <th>P/U</th> */}
           <th colSpan={2}>ACTIONS</th>
           {/* <th>action</th> */}
           </tr>
          {   state.items &&    state.items.map((item, index)=> {
        return (
         <tr className="sales-items-cont"
         key={uuid()}
       style={{backgroundColor: index % 2 === 0 ?
        'white' : 'lavender'}}
        >
           <th className="items">{item.name}</th>
           <td className="items">{item.price}</td>
           <td className="items">{item.unitMeasure.split(' ')[0]}</td>
           {/* <td className="items"> {item.piecesUnit ? item.piecesUnit: 'N/A' } </td> */}
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
       
           onClick={(e)=> assertain(item._id, e)}
           >
            {/* remove */}
           <FaTrashAlt role='button'
           
           /> 
           </td>
          
       </tr>
      )
      })}

         </tbody>
      </table>
 <div
            style={{
                display: `${state.cancel ? 'block' : 'none'}`,
                position: 'absolute',
            textAlign: 'center',
            top: '35%',
            left: '15%',
            width: '70%',
             padding: '1rem',
               backgroundColor: '#DBBFDB',
               borderRadius: '5px',
               opacity: '.85'
         }}
         >
             <h3
          id="verify-header"
          style={{
              margin: '.5rem auto',
            //   display: 'flex',
          }}
          >Are you sure you want to delete "{state.inItem.name}" ?</h3>
                 <article
                 style={{
                     display: 'flex',
                    //  flexDirection: 'row',
                     columnGap: '4vw',
                     justifyContent: 'center',
                 }}
                 >
                    <button
                 onClick={remain}
                 >No</button><button
                  onClick={handleRemove}
                 style={{backgroundColor: 'red',
                     borderColor: 'red'
                 }}
                 >Yes</button></article></div> 
      </div>
      
    //   </div>
          )
    
    return watcher
}

export default ItemList