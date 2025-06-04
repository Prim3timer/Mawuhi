import reducer from "../reducer"
import initialState from "../store"
// import SearchItem from "./SearchItem";
import {useEffect, useReducer } from "react";


import axios  from "../app/api/axios";
import useAuth from '../hooks/useAuth';
import { Link } from "react-router-dom";
const {v4: uuid} = require('uuid')



const Shop = () => {
  const {getItems, items} = useAuth()
 


const {setAuth, auth} = useAuth()
  const oneItem  =(id) => {
    console.log(id)
     setAuth({...auth, picker4: id})
  }

  const [state, dispatch] = useReducer(reducer, initialState)


  return (
    <div className="shop">
      <input
      placeholder="search items"
      
      />
      <h2>Shop</h2>
      {items && items.map((item)=> {
        console.log(state.getNames)
        return (
        <Link to={'/single-item'}>
          <article
          className="shopping-items"
          onClick={()=> oneItem(item._id)}
          >
            <img  className='img'src="https://images.app.goo.gl/K5o2PgzGUTYFtLr19" alt="FOOD"/>
            <h3>{item.name}</h3>
            <h4> {item.price}</h4>
            {/* <h4>{items.find((name)=> `${name.name}` === inputRef.current.value)}</h4> */}
          
          </article>
          </Link>
        )
      })}

    </div>
  )
}
export default Shop