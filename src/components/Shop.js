import reducer from "../reducer"
import initialState from "../store"
// import SearchItem from "./SearchItem";
import {useEffect, useReducer, useState } from "react";
import credit from '../images/credit.jpg'
import cellPhone from '../images/sgs25+.webp'


import axios  from "../app/api/axios";
import useAuth from '../hooks/useAuth';
import { Link } from "react-router-dom";
const {v4: uuid} = require('uuid')



const Shop = () => {
  const { items} = useAuth()
  const [search2, setSearch2] = useState('')
 

console.log(items)
const {setAuth, auth} = useAuth()
console.log(auth)
  const oneItem  =(id) => {
   auth.picker4 = id
  }

  const [state, dispatch] = useReducer(reducer, initialState)
const enableFilterate = ()=> {
  try {
    const filterItems = items && items.filter((item) => item.name.toLowerCase().includes(state.search.toLowerCase()))
  dispatch({type: 'items', payload: filterItems})
  if (search2){
  const stockFilter = filterItems && filterItems.filter((item)=> item.qty <= search2)
  dispatch({type: 'items', payload: stockFilter && stockFilter})

}
  console.log(filterItems)
  } catch (error) {
    dispatch({type: 'errMsg', payload: error.message})
  }
  
}


  useEffect(()=> {
    enableFilterate()
  }, [state.search, search2])


  return (
    !items ? <h2>Loading...</h2> :<div className="shop">
       <h2>Shop</h2>
      <form>
      <input
      placeholder="search items"
      value={state.search}
      onChange={(e)=> dispatch({type: 'search', payload: e.target.value})}
      />
<h3>
      <label>Search by stock level</label>
</h3>
      <input
      placeholder="pick a number"
      value={search2}
      onChange={(e)=> setSearch2(e.target.value)}
      />
   </form>
 
      <section className="shop-inner-container">
      {state.items && state.items.map((item)=> {
        console.log(item.qty)
        console.log(state.getNames)
        return (
        <Link to={'/single-item'}
        className="linker"
    
        >
          <article
          className="shopping-items"
          onClick={()=> oneItem(item._id)}
          >
            <img  className='shop-img' src={`${item.img}`} alt={item.name}/>
            <div className="shop-item-texts">
            <p>{item.name}</p>
            <p className="invent-info">{item.qty > 0 ? `${item.qty} left` : 'out of stock'}</p>
            <h4> ${item.price}</h4>
            {/* <h4>{items.find((name)=> `${name.name}` === inputRef.current.value)}</h4> */}
          </div>
          
          </article>
          <hr style={{width: '90vw', border:  '.2px solid black'}}></hr>
          </Link>
        )
      })}
      <h2>{state.errMsg}</h2>
</section>
    </div>
  )
}
export default Shop