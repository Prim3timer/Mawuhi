import { useEffect, useReducer, useState } from "react"
import useAuth from "../hooks/useAuth"
import axios from "../app/api/axios"
import initialState from "../store"
import reducer from "../reducer"
import Sales from "./Sales"
import Shopping from "./Reciepts"
import { Link } from "react-router-dom"

const UserSelect = ({picker}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [currentUser, setCurrentUser] = useState({})
    const [sales, setSales] = useState(false)
    const [reciepts, setReciepts] = useState(false)
const {auth} = useAuth()

const showSales = () => {
    setSales(true)
    setReciepts(false)
}

const showReciepts = ()=> {
    setSales(false)
    setReciepts(true)
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
    /> : ''

    return (
    <div>
            <h4>{currentUser.username}'s activity</h4>
            <article
            style={{
                margin:'1rem 0',
                display: 'flex',
                flexDirection: 'row',
                columnGap: '2rem'
            }}
            >
                <button
                onClick={showSales}
                >Sales</button>
                <button
                onClick={showReciepts}
                >Reciepts</button>
                     <Link to="/admin"><button>Admin</button></Link>
            </article>
          {salesReciecpts}
     
        </div>
    )
}

export default UserSelect