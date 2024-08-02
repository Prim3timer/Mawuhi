
import reducer from "../reducer"
import initialState from "../store"
import { useState, useEffect, useReducer } from "react";
import axios  from "../app/api/axios";


const SearchItem = ()=> {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <form  className="search-form"   onSubmit={(e)=> e.preventDefault()}>
        <input 
        id="search"
        type="text"
        role="searchbox" 
        placeholder="Search Logs by name"
        value={state.search}
        onChange={(e)=> dispatch({type: 'search', payload: e.target.value})}

            // https://www.npmjs.com/package/@react-google-maps/api
        
        />
        
    </form>
    )
}
export default SearchItem