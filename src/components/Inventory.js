import reducer from "../reducer"
import initialState from "../store"
import axios from "../app/api/axios"
import { useEffect, useReducer, useState, useRef, createContext     } from "react"
// import SearchItem from "./SearchItem"
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
              dispatch({type: 'items', payload: graw})
              console.log(graw.data.items)
              const filterate = graw.data.items.filter((inner)=> inner.name.toLowerCase().includes(state.search.toLowerCase()))
              dispatch({type: 'inventory', 
                  payload: filterate})
          } catch (error) {
            dispatch({type: 'errMsg', payload: error.Message})
          }
        }
        useEffect(()=> {
            getTrans()
            
    }, [state.search])


     const showEdit = (id, e)=> {
             dispatch({type: 'isEdit', payload: true})    
             const currentItem =   state.items.data.items.find((item) => item._id === id)
             dispatch({type: 'afa', payload: currentItem.name})
             dispatch({type: 'ole', payload: currentItem.qty})
             dispatch({type: 'id', payload: id})
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
                        dispatch({type: 'items', payload: graw})
                        dispatch({type: 'success', payload: 'inventory edited'})
                        setTimeout(()=> {
                            dispatch({type: 'success', payload: ''})
            
                            dispatch({type: 'isEdit', payload: false})    
                        }, 1000)
                        console.log(response)
                    }        
      
    }

    const remainDelete = ()=> {
        // this condition statement is to enable the removal of the confirm window once any part of the 
        // page is touched.
        if (state.isEdit){

            dispatch({type: 'isEdit', payload: false})
        }
        // if (state.isEdit){

        //     dispatch({type: 'isEdit', payload: false})
        // }
    }

    // console.log(state.isEdit)
    return (
        <section
        // onClick={remainDelete}
        // style={{
        //     textAlign: 'center'
        // }}
        >
            <div
            className="edit"
    style={{display: state.isEdit ? 'block' : 'none',
        backgroundColor: '#3cb371',
        position: 'absolute',
        top: '30%',
        // left: '15%',
        padding: '.5rem',
        opacity: '.85', 
    }}
    >
            {/* <h2>Edit Inventory</h2> */}
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
                <button 
                id="update-button"
                onClick={handleEdit}
                type="submit">Update</button>
                <h3>{state.success}</h3>
            </form>
        </div> 
  

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
style={{
    fontSize: '1.5rem',
        // margin: '0 0 0 5rem'
        marginLeft: 0
}}
>
 <tbody>
 <tr>
     <th>name</th>
     <th>in-stock</th>
     <th> last udated</th>
     <th>action</th>
     </tr>
{state.inventory && state.items.data.items.map((inv, index)=> {
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
    //  onClick={(e) => handleEdit(inv._id, e)}
     ref={invRef}
     className="sales-items">
         <a
         onClick={(e) => showEdit(inv._id, e)}
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
</section>
)
 
    

}

export default Inventory