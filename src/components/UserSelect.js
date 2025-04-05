import { useEffect, useReducer, useState } from "react"
import useAuth from "../hooks/useAuth"
import axios from "../app/api/axios"
import initialState from "../store"
import reducer from "../reducer"
import Sales from "./Sales"
import Shopping from "./Reciepts"
import OneShop from "./OneShop"
import { Link } from "react-router-dom"

const UserSelect = ({picker}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [currentUser, setCurrentUser] = useState({})
    const [sales, setSales] = useState(true)
    const [reciepts, setReceipts] = useState(false)
const {auth} = useAuth()

const showSales = () => {
    setSales(true)
    setReceipts(false)
}

const showReciepts = ()=> {
    setSales(false)
    setReceipts(true)
}

const getUsers = async ()=> {
    try {
            const response = await axios.get('/users')
            const currentUser = response.data.find((user) => user._id === auth.picker2)
           setCurrentUser(currentUser)
                
                console.log(currentUser)
                
            } catch (error) {
                console.log(error)
            }
        }
        
    useEffect(()=> {
        getUsers()
    }, [])

    const salesReciecpts = sales ? <Sales
    picker={auth.picker2}
    /> : reciepts ? <Shopping
    picker={auth.picker2}
    setReceipts={setReceipts}
    /> : ''

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
            >{currentUser.username}'s activity</h3>
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
                <button
                onClick={showSales}
                style={{ backgroundColor: sales ? 'red' : 'dodgerblue',
                    borderColor:  sales ? 'red' : 'dodgerblue'
                    }}
                >Sales</button>
                <button
                style={{ backgroundColor: reciepts ? 'red' : 'dodgerblue',
                    borderColor:  reciepts ? 'red' : 'dodgerblue'
                    }}
                onClick={showReciepts}
                >Reciepts</button>
                {/* <button
                onClick={showReciepts}
                >All </button> */}
                     {/* <Link to="/admin"><button>Admin</button></Link> */}
            </article>
          {salesReciecpts}
     
        </div>
    )
}

export default UserSelect