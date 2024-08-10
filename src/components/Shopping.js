import initialState from "../store"
import { useEffect, useReducer } from "react"
import reducer from "../reducer"
const Shopping = ()=> {
const [state, dispatch] = useReducer(reducer, initialState)
console.log(state.transArray)

    return (
        <di>
            <h2>Shopping</h2>
            <form>
                <label>Name:</label>
                <input/>
                <label>qty</label>
                <input/>
                <label></label>
                <input/>
                <label></label>
                <input/>
            </form>
            

        </di>
    )
}

export default Shopping