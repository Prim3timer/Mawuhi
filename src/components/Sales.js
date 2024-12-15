import reducer from "../reducer"
import initialState from "../store"
// import SearchItem from "./SearchItem";
import {useEffect, useReducer } from "react";
import axios  from "../app/api/axios";
const {v4: uuid} = require('uuid')


const Sales = ()=> {
    const [state, dispatch] = useReducer(reducer, initialState)
    const getTrans = async ()=> {
        // const mc = await axios.get('transactions')
        const graw =  await axios.get('/transactions')
        const innerArray = []
        dispatch({type: 'qtyArray', payload: graw.data})
      console.log(state.qtyArray)
        try {
            if (graw.data.length > 0){
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
            }
            else return
    }

             catch (error) {
            console.log(error)
        }
       
        // }
        const filterate = state.qtyArray && innerArray.filter((inner)=> inner.name.toLowerCase().includes(state.search.toLowerCase()))

       
        console.log(innerArray)
       dispatch({type: 'sales', 
        payload: filterate})
    }

    console.log(state.qtyArray.length)
   
    useEffect(()=> {
        getTrans()
      
        console.log(state.sales)
    }, [state.search])
    console.log(state.sales.data)


    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
 
    return (
        <div className="invenotry">
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
        style={{textAlign: 'center',
            // margin: '1rem auto'
        }}
        >Sales   </h2>
          {/* <SearchItem/> */}
        </article>

        <table className="inventory"
        style={{
            // fontSize: '1.5rem'
        }}
        >
        <tbody>
        <tr
        style={{backgroundColor: 'khaki'}}
        >
            <th>NAME</th>
            <th>qty</th>
            <th>total ($)</th>
            <th>date</th>
            </tr>
  {state.sales && state.sales.map((sale, index)=> {
    return (
        <tr className="sales-items-cont"
        key={uuid()}
        style={{backgroundColor: index % 2 === 0 ?
            'white' : 'khaki'}}
        >
            <th className="sales-items">{`${sale.name.split(' ').join(' ')} ${sale.unitMeasure.split(' ')[1]}`}</th>
            <td className="sales-items">{sale.qty}</td>
            <th className="sales-items">{parseFloat(sale.total).toFixed(2)}</th>
            <td className="sales-items">{sale.date.substring(0, 10)}</td>
        </tr>
    )
})}
<tr className="sales-items-cont"
   
>
 </tr>
 <tr
 
 >

 </tr>
          </tbody>
    </table>
    {/* <th> */}
    <div
    id="sales-total"
    >
        <h3>Total:</h3>
    <h3>
 {state.sales && state.sales.reduce((a, b)=> {
    return  a + parseFloat( b.qty)
}, 0).toFixed(2)}
</h3>
    <h3>

{state.sales && numberWithCommas(state.sales.reduce((a, b)=> {
    return  a + parseFloat( b.total)
}, 0).toFixed(2))}
    </h3>
    </div>
   
        </div>
    )
}


export default Sales