import reducer from "../reducer"
import initialState from "../store"
import axios from "../app/api/axios"
import { useEffect, useReducer, useState, useRef, createContext     } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import useAuth from "../hooks/useAuth"
// import SearchItem from "./SearchItem"
import { Link } from "react-router-dom"
import Edit from "./Edit"
import { type } from "@testing-library/user-event/dist/type"
const {v4: uuid} = require('uuid')

// export const idContext = createContext()
// console.log(idContext)


const Inventory = ({mark, setMark})=> {
    const [state, dispatch] = useReducer(reducer, initialState)
    const {auth} = useAuth()
  const [search2, setSearch2] = useState('')
    const invRef = useRef()
    const getTrans = async ()=> {

          try {
            


              const graw = await axios.get('/items')

              console.log(graw.data)
              const filterate = graw.data.items.filter((inner)=> inner.name.toLowerCase().includes(state.search.toLowerCase()))
              dispatch({type: 'items', 
                  payload: filterate})

                   if (search2){
  const stockFilter = filterate && filterate.filter((item)=> item.qty <= search2)
  dispatch({type: 'items', payload: stockFilter && stockFilter})

}
          } catch (error) {
            dispatch({type: 'errMsg', payload: error.Message})
          }
        }
        useEffect(()=> {
            getTrans()
            
    }, [state.search, search2])


     const showEdit = (id, e)=> {
        if (!auth.roles.includes(1984)){
            dispatch({type: 'isMatched', payload: true})
        } else {
            dispatch({type: 'isEdit', payload: true})    
            const currentItem =   state.items.find((item) => item._id === id)
            dispatch({type: 'afa', payload: currentItem.name})
            dispatch({type: 'ole', payload: currentItem.qty})
            dispatch({type: 'id', payload: id})

        }
            }


        const handleEdit = async (e, name, qty )=> {
                e.preventDefault()     
                const inventory = {
                    // id,
                      name: state.afa ? state.afa : name,
                    //   name: state.name,
                      qty: state.ole ? state.ole : qty,
                    //   qty: state.qty,
            
                  }
                  const response = await axios.patch(`/items/inventory/${state.id}`, inventory) 
                  if (response){
                      const graw = await axios.get('/items')
                      dispatch({type: 'items', payload: graw.data.items})
                      dispatch({type: 'success', payload: 'inventory edited'})
                      setTimeout(()=> {
                          dispatch({type: 'success', payload: ''})
          
                          dispatch({type: 'isEdit', payload: false})    
                      }, 1000)
                      console.log(response)
                  }        
    
     
     
}

    const remainEdit = () => {
       if (state.isMatched) dispatch({type: 'isMatched', payload: false})

}
const bringEdit = () => {
    dispatch({type: 'isEdit', payload: true})
}

    const remainDelete = ()=> {
        // this condition statement is to enable the removal of the confirm window once any part of the 
        // page is touched.
        if (state.isEdit){

            dispatch({type: 'isEdit', payload: false})
        }
    }

 
    return (
       
    !state.items ? <h2 className="inventory-spec">...Loading</h2> : <section
        className="inventory-spec"
        onClick={remainEdit}
        style={{ 
            // minWidth: '100vw',
            // minHeight: '100vh',
            // background: 'blue'
        }}
        >


<div
            className={state.isMatched ? 'authorization-alert' : 'authorization'}
     >
         <h2
      id="verify-header"
     
      >Unauthorized!</h2>
      <button onClick={remainEdit} >ok</button>
            </div> 

       

            {/* <h2>Edit Inventory</h2> */}
            <form onSubmit={(e)=> e.preventDefault()}
             className={state.isEdit ? "edit" : "no-edit"}
          id="update-form"
                >
                    <h3>

                <label htmlFor="name">name:</label>
                    </h3>
                 <input
                type="text"
                id="name"
                value={state.afa}
                // onChange={(e)=> dispatch({type: 'afa', payload: e.target.value})}
                />
                <h3>
                <label htmlFor="qty">quantity:</label>
                </h3>
                <input
                type="text" 
                id="ole"
                value={state.ole}
                onChange={(e)=> dispatch({type: 'ole', payload: e.target.value})}
                />
                <div className="edit-action">
              <button 
              className="clear-invent-edit"
              onClick={e => dispatch({type: 'isEdit', payload: false})}>Cancel</button>
                <button 
                id="update-button"
                onClick={handleEdit}
                type="submit">Update</button>
                </div>
                <h3>{state.success}</h3>
            </form>
    
  

        <div 
        className="inventory"
        > 
        <article id="form-cont">

     <form  className="search-form" 
     //   onSubmit={(e)=> e.preventDefault()}
     >
             <h2 className="invent-header"
    
     >Inventory</h2> 
 <input 
//  id="invent-search"
 type="text"
 role="searchbox" 
 placeholder="Search by name"
 value={state.search}
 onChange={(e)=> dispatch({type: 'search', payload: e.target.value})}

     // https://www.npmjs.com/package/@react-google-maps/api
 
 />
 <h3>
      <label>Search by stock level</label>
</h3>
     <input
      placeholder="pick a number"
       role="searchbox" 
      value={search2}
      onChange={(e)=> setSearch2(e.target.value)}
      />
   </form>
   
 </article>
 <table className="inventory"
>
 <tbody>
 <tr>
     <th>NAME (SI UNIT)</th>
     <th>IN-STOCK</th>
     <th> LAST UPDATED</th>
     <th>ACTION</th>
     </tr>
{state.items && state.items.map((inv, index)=> {
    const invReg = inv.qty < 1 ? inv.qty = 0 : inv.qty
return (
   <tr className="sales-items-cont"
   key={uuid()}
 style={{backgroundColor: index % 2 === 0 ?
     'white' : 'palegreen'}}
     >
        
     <td className="sales-items">{`${inv.name} ${inv.unitMeasure.split(' ')[1]}`}</td>
     <th className="sales-items" style={{color: inv.qty < 20 ? 'red' : ''}}>{parseFloat(invReg).toFixed(2)}</th>
     <td className="sales-items" >{inv.date.substring(0, 10)}</td>
     <td 
     // style={{backgroundColor: 'blue'}}
     // ref={achoRef}
    //  onClick={(e) => handleEdit(inv._id, e)}
     ref={invRef}
     className="sales-items">
         <a
         onClick={(e) => showEdit(inv._id, e)}
    //  style={{color: 'blue'}}
    //  href={'/edit'}
     >
      <FontAwesomeIcon icon={faPenToSquare} />
     </a>
     </td>
 </tr>
)
})}
   </tbody>
</table>
<h3>{state.errMsg}</h3>
</div>
</section>
)
 
    

}

export default Inventory