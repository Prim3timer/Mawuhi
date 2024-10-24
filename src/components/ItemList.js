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

    const measurements = ['Kilograms (kg)', 'Pieces (pcs)', 'Plates (Plts)', 'Dozen (dzn)', 'Bottles (Btl)', 
        'Pounds (lbs)', 'Litres (L)', 'Sachet (sct)'
       ]
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

        
    
    const handleSubmit = async (e)=> {
        e.preventDefault()
        const {id, name, price, unitMeasure, piecesUnit} = state
            try {
                const newItem = {
                    name:  state.afa ? state.afa :  response.data.name,
                    price: price && price,
                    unitMeasure: unitMeasure && unitMeasure,
                    piecesUnit: piecesUnit,
                    
                }
                const response = await axios.patch(`/items/${id}`, newItem)  
                if (response){  
                    const graw = await axios.get('/items')
                    dispatch({type: 'items', payload: graw.data.items})
        
                    dispatch({type: 'isMatched', payload: `${newItem.name} Edited` })
                    setTimeout(()=> {
                        dispatch({type: 'isMatched', payload: '' })
                        dispatch({type: 'isEdit', payload: false})    
                    }, 3000)
                }
            }  
           catch (error) {
                dispatch({type: 'errMsg', payload: `${error.message}`})
                setTimeout(()=> {
                    dispatch({type: 'errMsg', payload: ``})
                    
                }, 3000)
            }
            finally {
            }
    
        }



        const handleEdit = async (id, e )=> {
            e.preventDefault()     
            dispatch({type: 'isEdit', payload: true})    
            dispatch({type: 'id', payload: id})
            itemRef.current.value = id
            const currentItem =  state.items.find((item) => item._id === id)
            dispatch({type: 'afa', payload: currentItem.name})
            dispatch({type: 'price', payload: currentItem.price})
            dispatch({type: 'unitMeasure', payload: currentItem.unitMeasure})
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
        // if (state.isEdit){

        //     dispatch({type: 'isEdit', payload: false})
        // }
    }
    

  return  (
      
              <div className="item-list"
          style={{
          }}
              onClick={remain}
              >  
              <article id="form-cont">
           <form  className="search-form" 
           //   onSubmit={(e)=> e.preventDefault()}
           >


<div
 className="edit-item" 
style={{display: state.isEdit ? 'block' : 'none',
    backgroundColor: '#DBBFDB',  
    padding: '1em 0',
    // position: 'absolute',
    borderRadius: '5px',
    opacity: '.85',
    zIndex: 5
}}
>
            <form
            //  onSubmit={handleSubmit}
                id="update-form"
                >
                    {/* <h2>Edit Item</h2> */}
                <label htmlFor="name">name:</label>
                <input
                type="text"
                placeholder="item name only"
                id="name"
                value={state.afa} 
                onChange={(e)=> dispatch({type: 'afa', payload: e.target.value})}
                />

                
<label
htmlFor="unitMeasure"
>unitMeasure:</label><input type="text"
        // id="trans-search"
        // placeholder="pick measurement"
        // ref={itemRef}
        style={{
            // width: '100%',
        }}
        list="measure"
        onChange={(e)=> dispatch({type: 'unitMeasure', payload: e.target.value})}
        value={state.unitMeasure}
        />
        <datalist id="measure"
        >
            {state.items && measurements.map((measurement)=> {
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


               <button
                // type="submit"
               onClick={handleSubmit}    
               className="pop">Update Item</button>
                 <h3>{state.isMatched}</h3>
            </form>
        </div>


            
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
           href={'/edit-item'}
           >edit</a></td>
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
    
}

export default ItemList