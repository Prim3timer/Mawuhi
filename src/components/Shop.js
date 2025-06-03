import reducer from "../reducer"
import initialState from "../store"
// import SearchItem from "./SearchItem";
import {useEffect, useReducer } from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons"

import axios  from "../app/api/axios";
import useAuth from '../hooks/useAuth';
const {v4: uuid} = require('uuid')


const Shop = () => {
  const {getItems, items} = useAuth()
  const upArrow = ">"
  const downArrow = "<"

  const increment = ()=> {
    dispatch({type: 'INCREMENT'})

  }

  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <div className="shop">
      <input
      placeholder="search items"
      
      />
      <h2>Shop</h2>
      {items.map((item)=> {
        console.log(state.getNames)
        return (
        
          <article
          className="shopping-items"
          >
            <h3>Name: {item.name}</h3>
            <h4>Price: {item.price}</h4>
            {/* <h4>{items.find((name)=> `${name.name}` === inputRef.current.value)}</h4> */}
            <section
            className="qty-cont"
            >
              <h3 
              onClick={increment}
              className="arrow">{upArrow}</h3>
            <h4>{item.qty}</h4>
              <h3 className="arrow">{downArrow}</h3>

            </section>
          </article>
        )
      })}

    </div>
  )
}
export default Shop