import { useEffect, useReducer, useState } from "react"
import useAuth from "../hooks/useAuth"
import axios from "../app/api/axios"
import initialState from "../store"
import reducer from "../reducer"
import Sales from "./Sales"
import Shopping from "./Reciepts"

import { Link } from "react-router-dom"
import AllTransactions from "./AllTransactions"

const UserSelect = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
   
    const {auth, getUsers, setCurrentUser2, currentUser2, currentUser} = useAuth()
    console.log('picker3 is : ', auth.picker3)
    console.log('picker is: ', auth.picker)
    // const {indSales} = initialState 
    console.log('current user 2: ', currentUser2)
 
    const [allTransactons, setAllTransactions] = useState(false)
    const [picker, setPicker] = useState('')
    const [reciepts, setReceipts] = useState(false)

const showMe = () => {
    // dispatch({type: 'indSales', payload: true})
    setPicker(auth.picker3)
   
  
}


    console.log(state.indSales)

      useEffect(()=> {
    getUsers()
  }, [])

    return (
   !currentUser2 ? <h2
   className="user-select"
   >Loading...</h2> : <div

        className="user-select"
    >
            <h2
            style={{
                margin: '1rem 2rem',
                alignItems: 'center',
                color: 'darkslateblue'  
            }}
            >{currentUser2 && currentUser2.username}'s activity</h2>
            {console.log(currentUser)}
            <article
            className="userselect-buttons-container"
         
            >
               <Link
               to={'/sales'}
               > <button
               onClick={showMe}
                >Sales</button></Link>
               <Link
               to='/all-sales'
               > <button
            //    onClick={showMe}
                >All Sales</button></Link>
               <Link 
               onClick={showMe}
               to='/receipts'> <button
              
                >Reciepts</button></Link>

                <Link to={'/all-transactions'}><button
            
                >All Receipts</button></Link>
                     {/* <Link to="/admin"><button>Admin</button></Link> */}
            </article>
          {/* {salesReciecpts} */}
     
        </div>
    )
}

export default UserSelect