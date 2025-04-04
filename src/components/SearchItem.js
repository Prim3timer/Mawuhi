import reducer from "../reducer"
import initialState from "../store"
// import SearchItem from "./SearchItem";
import {useEffect, useReducer } from "react";
import axios  from "../app/api/axios";
import useAuth from '../hooks/useAuth';
const {v4: uuid} = require('uuid')


const SearchItem = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    
    return (
        <div>
              <article id="form-cont">
            <form  className="search-form"   onSubmit={(e)=> e.preventDefault()}>
        <input 
        id="invent-search"
        type="text"
        role="searchbox" 
        placeholder="Search sales by name"
        value={state.search}
        onChange={(e)=> dispatch({type: 'search', payload: e.target.value})}
        // onChange={(e)=> search = e.target.value}
        
        // https://www.npmjs.com/package/@react-google-maps/api
        
        />
          </form>
          {/* <SearchItem/> */}
        </article>
        </div>
    )
}

export default SearchItem