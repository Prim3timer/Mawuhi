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
 

console.log(items)
const {setAuth, auth} = useAuth()
console.log(auth)
  const oneItem  =(id) => {
   auth.picker4 = id
  }

  const [state, dispatch] = useReducer(reducer, initialState)


  return (
    !items ? <h2>Loading...</h2> :<div className="shop">
      <input
      placeholder="search items"
      
      />
      <h2>Shop</h2>
      <section className="shop-inner-container">
      {items && items.map((item)=> {
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
            <h4> price: ${item.price}</h4>
            {/* <h4>{items.find((name)=> `${name.name}` === inputRef.current.value)}</h4> */}
          </div>
          
          </article>
          <hr style={{width: '90vw', border:  '.2px solid black'}}></hr>
          </Link>
        )
      })}
</section>
    </div>
  )
}
export default Shop