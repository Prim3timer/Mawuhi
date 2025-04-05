import reducer from "../reducer"
import initialState from "../store"
import axios from "../app/api/axios"
import Cancel from "./Cancel"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
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

     const measurements = ['Kilogram (kg)', 'Piece (pc)', 'Plate (Plt)', 'Dozen (dzn)', 'Bottle (Btl)', 'Pound (lbs)', 'Litre (L)', 'Sachet (sct)', 'Ounce (Oz)', 'Gram (g)', 'Amortization (Am)', 'Night (Ngt)', 'Trip (Tr)'
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
                    }, 1000)
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


    const remainDelete = ()=> {
        // this condition statement is to enable the removal of the confirm window once any part of the 
        // page is touched.
        if (state.cancel){

            dispatch({type: 'cancel', payload: false})
        }
        // if (state.isEdit){

        //     dispatch({type: 'isEdit', payload: false})
        // }
    }
    
    const remainEdit = () => {
            if (state.isEdit) dispatch({type: 'isEdit', payload: false})

    }
    const bringEdit = () => {
        dispatch({type: 'isEdit', payload: true})
    }
    const generalRemain = () => {
        remainDelete()
        remainEdit()

    } 
    

  return  (
      
              <div className="item-list"
          style={{
          }}
              onClick={remainDelete}
              >  
              <article id="form-cont">
           <form  className="search-form" 
           >


<div
 className="edit-item" 
style={{display: state.isEdit ? 'block' : 'none',
    backgroundColor: '#DBBFDB',  
    padding: '1em 0',
    position: 'absolute',
    borderRadius: '5px',
    opacity: '.85',
    zIndex: 5
}}
>
    <form>
  <form onSubmit={(e)=> e.preventDefault()}
                id="update-form"
                >
                    <h3>

                <label htmlFor="name">name:</label>
                    </h3>
                 <input
                type="text"
                id="name"
                value={state.afa}
                onChange={(e)=> dispatch({type: 'afa', payload: e.target.value})}
                />
                <h3>
                <label htmlFor="qty">price:</label>
                </h3>
                <input
                type="text" 
                id="price"
                value={state.price}
                onChange={(e)=> dispatch({type: 'price', payload: e.target.value})}
                />
           <h2>Unit Measure:</h2><input type="text"
        // id="trans-search"
        // placeholder="pick measurement"
        style={{width: '20rem',
            // backgroundColor: 'red'
        }}
        // ref={itemRef}
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
                <button 
                id="update-button"
                onClick={handleSubmit}
                type="submit">Update</button>
                <h3>{state.isMatched}</h3>
            </form>
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
           <h2 className="invent-header">Items</h2>
       </article>
       <table className="inventory"
      style={{
    //   position: 'absolute',
    // padding: '0 4rem',
    // width: '95vw',
    // fontSize: '1.5rem',
      }}
      >
       
       <tbody
       >
       <tr>
           <th>NAME</th>
           <th>PRICE</th>
           <th> SI UNIT</th>
           {/* <th>P/U</th> */}
           <th colSpan={2}>ACTIONS</th>
           {/* <th>action</th> */}
           </tr>
          {   state.items &&    state.items.map((item, index)=> {
        return (
         <tr className="sales-items-cont"
         key={uuid()}
       style={{backgroundColor: index % 2 === 0 ?
        'white' : 'lavender',
     
        // minWidth: '120vw'
    }}
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
        //    style={{color: 'blue'}}
        //    href={'/edit-item'}
           >
              <FontAwesomeIcon icon={faPenToSquare} />
           </a></td>
           <td className="items"
       
           onClick={(e)=> assertain(item._id, e)}
           >
            {/* remove */}
           <FaTrashAlt 
           
           role='button'
           
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
            left: '5%',
            width: '90%',
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
                 onClick={remainDelete}
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
