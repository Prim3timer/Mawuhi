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

    // const {indSales} = initialState 
 
    const [allTransactons, setAllTransactions] = useState(false)
    const [picker, setPicker] = useState('')
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

const showMe = () => {
    // dispatch({type: 'indSales', payload: true})
    setPicker(auth.picker2)
    console.log(auth.picker2)
  
}


const getUsers = async ()=> {
    // auth.picker2 = 
    try {
            const response = await axios.get('/users')
            const currentUser = response.data.find((user) => user._id === picker)
            const currentUser2 = response.data.find((user) => user._id === auth.picker2)
           setCurrentUser(currentUser2)
           dispatch({type: 'inItem', payload: currentUser})
                
                console.log(currentUser)
                
            } catch (error) {
                console.log(error)
            }
        }
        
    useEffect(()=> {
        getUsers()
    }, [])

    console.log(state.indSales)
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
            <h2
            style={{
                margin: '1rem 2rem',
                alignItems: 'center',
                // justifyContent: 'center',
                // backgroundColor: 'blue'
            }}
            >{currentUser && currentUser.username}'s activity</h2>
            {console.log(currentUser)}
            <article
            style={{
                // justifyContent:'center',
                margin:'1rem 0 1rem .5rem',
                display: 'flex',
                flexDirection: 'row',
                columnGap: '.5rem',
                // rowGap: '1rem',
                flexWrap: 'wrap',
                // marginLeft: '.5rem'
                // padding: '.5rem/'
                // width: '20vw',
                // flexBasis: '15rem',
                // flexWrap: 'nowrap'
                // backgroundColor: 'green'
                height: '150hv'
              
            }}
            >
               <Link to='/sales'> <button
               onClick={showMe}
                >Sales</button></Link>
               <Link> <button
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