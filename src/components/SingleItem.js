import { useContext, useEffect, useReducer } from "react"
import axios from "../app/api/axios"
import initialState from "../store"
import reducer from "../reducer"
import { ItemContext } from "./Shop"

const SingleItem = ({id})=> {

    // const {items} = useContext(ItemContext)

    const [state, dispatch] = useReducer(reducer, initialState)

    // dispatch({type: 'inItem', payload: currentItem})
    console.log(id)

 
 

    return (
        <div>
            <h2>Single Item</h2>
            {/* <article>
                <h3>{currentItem.name}</h3>
                <h3>{currentItem.price}</h3>
                <h3>{currentItem.qty   }</h3>
            </article> */}
        </div>
    )
}

export default SingleItem