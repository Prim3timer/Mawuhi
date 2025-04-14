import reducer from "../reducer"
import initialState from "../store"
// import SearchItem from "./SearchItem";
import {useEffect, useReducer, useState } from "react";
import axios  from "../app/api/axios";
import useAuth from '../hooks/useAuth';
const {v4: uuid} = require('uuid')


const Sales = ({transactions, currentUser, getTrans, search, setSearch,
    search2, setSearch2
})=> {

    const [state, dispatch] = useReducer(reducer, initialState)  


    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
 console.log(currentUser)
 useEffect(()=> {
    getTrans()
    console.log(state.sales, )
}, [search, search2])
    return (
        <div className="sale">
            <article id="form-cont">
            <form  className="search-form"   onSubmit={(e)=> e.preventDefault()}>
        <input 
        id="invent-search"
        type="text"
        role="searchbox" 
        placeholder="Search by name"
        value={search}
        onChange={(e)=> setSearch(e.target.value)}
        
        // https://www.npmjs.com/package/@react-google-maps/api
        
        />
        <h3>AND OR</h3>
        <input 
        id="invent-search"
        type="text"
        role="searchbox" 
        placeholder="Search by date"
        value={search2}
        onChange={(e)=> setSearch2(e.target.value)}
        
        // https://www.npmjs.com/package/@react-google-maps/api
        
        />
          </form>
          {/* <SearchItem/> */}
        </article>
        <h2
          style={{
            margin: '1rem 0', 
            color: 'darkslateblue'  
        }}
        >{currentUser ? `${currentUser.username}'s Sales` : 'All Sales'}</h2>

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
            <th>QTY</th>
            <th>TOTAL</th>
            <th>DATE</th>
            </tr>
  {transactions && transactions.map((sale, index)=> {
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
 {transactions && transactions.reduce((a, b)=> {
    return  a + parseFloat( b.qty)
}, 0).toFixed(2)}
</h3>
    <h3>

{transactions && numberWithCommas(transactions.reduce((a, b)=> {
    return  a + parseFloat( b.total)
}, 0).toFixed(2))}
    </h3>
    </div>
   
        </div>
    )
}


export default Sales