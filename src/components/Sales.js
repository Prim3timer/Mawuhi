import reducer from "../reducer"
import initialState from "../store"
import SearchItem from "./SearchItem";
import {useEffect, useReducer } from "react";
import axios  from "../app/api/axios";
const {v4: uuid} = require('uuid')


const Sales = ()=> {
    const [state, dispatch] = useReducer(reducer, initialState)
    const getTrans = async ()=> {
        const innerArray = []
        // if (innerArray.length > 0){
            
            const graw =  await axios.get('/transactions/sales')
            graw.data.map((gr)=> {
                return gr.goods.map((good)=> {
                    const elements =  {
                        name: good.name,
                        qty: good.qty,
                        unitMeasure: good.unitMeasure,
                        total: good.total,
                        date: gr.date
        
                    }
                    innerArray.push(elements)
            return innerArray
                })
        })
        // }
        const filterate = innerArray.filter((inner)=> inner.name.toLowerCase().includes(state.search.toLowerCase()))

       
        console.log(innerArray)
       dispatch({type: 'sales', 
        payload: filterate})
    }

    console.log(state.sales)
   
    useEffect(()=> {
        getTrans()
        console.log(state.sales)
    }, [state.search])
    console.log(state.sales.data)
 
    return (
        <div>
            <article id="form-cont">
            <form  className="search-form"   onSubmit={(e)=> e.preventDefault()}>
        <input 
        id="sales-search"
        type="text"
        role="searchbox" 
        placeholder="Search sales by name"
        value={state.search}
        onChange={(e)=> dispatch({type: 'search', payload: e.target.value})}
        
        // https://www.npmjs.com/package/@react-google-maps/api
        
        />
          </form>
        <h2
        style={{textAlign: 'center'}}
        >Sales   </h2>
          {/* <SearchItem/> */}
        </article>

        <table className="sales">
        <tbody>
        <tr
        style={{backgroundColor: 'khaki'}}
        >
            <th>name</th>
            <th>qty</th>
            <th>total</th>
            <th>date</th>
            </tr>
  {state.sales && state.sales.map((sale, index)=> {
    return (
        <tr className="sales-items-cont"
        key={uuid()}
        style={{backgroundColor: index % 2 === 0 ?
            'white' : 'khaki'}}
        >
            <td className="sales-items">{`${sale.name.split(' ').join(' ')} ${sale.unitMeasure.split(' ')[1]}`}</td>
            <td className="sales-items">{sale.qty}</td>
            <td className="sales-items">{sale.total}</td>
            <td className="sales-items">{sale.date.substring(0, 10)}</td>
        </tr>
    )
})}
<tr className="sales-items-cont"
   
>
 </tr>
 <tr>
    <th>Total</th>
    <th>
 {state.sales && state.sales.reduce((a, b)=> {
    return  a + parseFloat( b.qty)
}, 0).toFixed(2)}

    </th>
    <th>
    ${state.sales && state.sales.reduce((a, b)=> {
    return  a + parseFloat( b.total)
}, 0).toFixed(2)}
    </th>


 </tr>
          </tbody>
    </table>
   
        </div>
    )
}


export default Sales