
import Cancel from "./Cancel"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useReducer, useState,   } from "react"
import initialState from "../store"
import reducer from "../reducer"
import { FaTrashAlt } from "react-icons/fa";
// import SearchItem from "./SearchItem"
import { Link } from "react-router-dom"
import EditItem from "./EditItem"
import useAuth from "../hooks/useAuth"
// import { type } from "@testing-library/user-event/dist/type"
// import { current } from "@reduxjs/toolkit";
const {v4: uuid} = require('uuid')


// import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";


const ItemList = ()=> {
const {auth, getTrans, handleSubmit, handleEdit, handleRemove, itemRef, cancel,
    generalRemain, remainDelete, items, isEdit, afa, assertain
} = useAuth()
    const [state, dispatch] = useReducer(reducer, initialState)
    const [taskComplete, setTaskComplete] = useState(false)

     const measurements = ['Kilogram (kg)', 'Piece (pc)', 'Plate (Plt)', 'Dozen (dzn)', 'Bottle (Btl)', 'Pound (lbs)', 'Litre (L)', 'Sachet (sct)', 'Ounce (Oz)', 'Gram (g)', 'Amortization (Am)', 'Night (Ngt)', 'Trip (Tr)'
       ]
   

  return  (
      
             !items ? <h2 className="item-list">...Loading</h2> :<div className="item-list"
              style={{
                margin: '2rem 0' 
              }}
              onClick={remainDelete}
              >  
              <article id="form-cont">
           <form  className="search-form" 
           >


<div
   className={isEdit ? "edit" : "no-edit"}
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
                value={afa}
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
           <h3>
            <label>unit measure:</label></h3><input type="text"
        list="measure"
        onChange={(e)=> dispatch({type: 'unitMeasure', payload: e.target.value})}
        value={state.unitMeasure}
        />
        {/* </h3> */}
        {/* <label>unitMeasure:</label> */}
        <datalist id="measure"
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


        <h2 className="invent-header"
           style={{
            color: 'darkslateblue', 
          
           }}
           >Items</h2>   
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
           <th>PRICE ($)</th>
           <th> SI UNIT</th>
           {/* <th>P/U</th> */}
           <th colSpan={2}>ACTIONS</th>
           {/* <th>action</th> */}
           </tr>
          {  items.map((item, index)=> {
        return (
         <tr className="sales-items-cont"
         key={uuid()}
       style={{backgroundColor: index % 2 === 0 ?
        'white' : 'lavender',
     
        // minWidth: '120vw'
    }}
        >
           <th className="items">{item.name}</th>
           <td className="items">{ parseFloat(item.price).toFixed(2)}</td>
           <td className="items">{item.unitMeasure.split(' ')[0]}</td>
           {/* <td className="items"> {item.piecesUnit ? item.piecesUnit: 'N/A' } </td> */}
           <td 
           ref={itemRef}
           className="items">
               <a
               onClick={(e) => handleEdit(item._id, e)}
        //    style={{color: 'blue'}}
        //    href={'/edit-item'}
           >
              <FontAwesomeIcon icon={faPenToSquare} />
           </a></td>
           <td 
           className="items"
       
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
 className={state.cancel ? 'delete' : 'no-delete'}
           
         >
             <h3
          id="verify-header"
          style={{
              margin: '.5rem auto',
            //   display: 'flex',
          }}
          >Delete {state.inItem.name} from items ?</h3>
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

                 
<div

  className={state.isMatched ? 'authorization-alert' : 'authorization'}
     >
         <h2
      id="verify-header"
      style={{
          margin: '.5rem auto',
        //   display: 'flex',
      }}
      >Unauthorized!</h2>
      <button onClick={generalRemain} >ok</button>
            </div> 
      </div>
      
    //   </div>
          )
    
}

export default ItemList
