import { useEffect, useReducer, useState } from "react"
import useAuth from "../hooks/useAuth"
import axios from "../app/api/axios"
import initialState from "../store"
import reducer from "../reducer"
import Sales from "./Sales"
import Shopping from "./Reciepts"

import { Link } from "react-router-dom"
import AllTransactions from "./AllTransactions"

const UserSelect = ({currentUser, setCurrentUser}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
 
    const [allTransactons, setAllTransactions] = useState(false)
    const [sales, setSales] = useState(true)
    const [reciepts, setReceipts] = useState(false)
const {auth} = useAuth()

// const showSales = () => {
//     setSales(true)
//     setReceipts(false)
// }

// const showReciepts = ()=> {
//     setSales(false)
//     setReceipts(true)
// }


const getUsers = async ()=> {
    // auth.picker2 = 
    try {
            const response = await axios.get('/users')
            const currentUser = response.data.find((user) => user._id === auth.picker2)
           setCurrentUser(currentUser)
        //    dispatch({type: 'inItem', payload: currentUser})
                
                console.log(currentUser)
                
            } catch (error) {
                console.log(error)
            }
        }
        
    useEffect(()=> {
        getUsers()
    }, [])

    {console.log(state.inItem)}
    // const salesReciecpts = sales ? <Sales
    // picker={auth.picker2}
    // /> : reciepts ? <Shopping
    // picker={auth.picker2}
    // setReceipts={setReceipts}
    // /> : allTransactons ? <AllTransactions/> : ''

    return (
    <div
        style={{
           display: 'flex',
           flexDirection: 'column',
           alignItems: 'center'
        }}
    >
            <h3
            style={{
                margin: '1rem 2rem',
                alignItems: 'center',
                // justifyContent: 'center',
                // backgroundColor: 'blue'
            }}
            >{currentUser && currentUser.username}'s activity</h3>
            {console.log(currentUser)}
            <article
            style={{
                justifyContent:'center',
                margin:'1rem 0',
                display: 'flex',
                flexDirection: 'row',
                columnGap: '2rem',
                width: '90vw',
                marginLeft: '1rem',
              
            }}
            >
               <Link to='/sales'> <button
                >Sales</button></Link>
               <Link  to='/receipts'> <button
                style={{ backgroundColor: reciepts ? 'red' : 'dodgerblue',
                    borderColor:  reciepts ? 'red' : 'dodgerblue'
                    }}
              
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