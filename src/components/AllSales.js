import reducer from "../reducer"
import initialState from "../store"
// import SearchItem from "./SearchItem";
import {useEffect, useReducer, useState } from "react";
import axios  from "../app/api/axios";
import useAuth from '../hooks/useAuth';
import Sales from "./Sales";
import { Link } from "react-router-dom";
const {v4: uuid} = require('uuid')


const AllSales = () => {

     const [state, dispatch] = useReducer(reducer, initialState)
        const {auth} = useAuth()
        const [currentUser, setCurrentUser] = useState({})
        const [transactions, setTransactions] = useState([])
        const [last, setLast] = useState([])
        const [search, setSearch] = useState('')
        // const [trueSearh, setTrueSearch] = useState('')
      const [search2, setSearch2] = useState('')
        const [switcher, setSwitcher] = useState(false)
        // console.log(state.indSales)
        const getTrans = async ()=> {
            console.log('picker3 is : ', auth.picker3)
        console.log('picker is: ', auth.picker)
            const graw =  await axios.get('/transactions')
            const gog =  await axios.get('/users')
            if (gog) {
    
                const person = gog.data.find((user) => user._id === auth.picker3)
                console.log(person)
                setCurrentUser(person)
               
            }
         
            // gog.data.find((user)=> user._id === )
            const innerArray = []
            try {
    
                if (graw){
                    const newRes = graw.data.map((item)=> {
                        if (!item.cashierID){
                            item.cashierID = 'unavailable'
                            item.cashier = 'unavailable'
                        }
                        return item
                    })
                    // console.log(newRes)
                    console.log(graw.data)
                    const cashierSales = graw.data.filter((item)=> item.cashierID === auth.picker3)
                    dispatch({type: 'qtyArray', payload: cashierSales})
                  
    
                    // console.log(xvc)
                    if (cashierSales){
                        cashierSales.map((gr)=> {
                            return gr.goods.map((good)=> {
                                const elements =  {
                                    name: good.name,
                                    qty: good.qty,
                                    unitMeasure: good.unitMeasure,
                                    total: good.total,
                                    date: gr.date
                    
                                }
                                innerArray.push(elements)
                                setTransactions(innerArray)
                                return innerArray
                            })
                        })     
                    }
                    const filterate = innerArray && innerArray.filter((inner)=> inner.name.toLowerCase().includes(search.toLowerCase()))
                    const filterate2 = filterate.filter((inner)=> inner.date.substring(0, 10).includes(search2))
                    setLast(filterate)

                    console.log(innerArray)
                    dispatch({type: 'sales', 
                     payload: filterate2})

                }
            
            
                else return
        }
    
                 catch (error) {
                console.log(error)
            }
           
            // }
            
        
         
        }
    
        console.log(currentUser)
    
        console.log(state.qtyArray.length)
       
        console.log(state.search)
        useEffect(()=> {
            getTrans()
            console.log(state.sales)
        }, [search])


        const showGeneral = () => {
            setSwitcher(true)
        }

    
    
    return (
        !transactions.length ? <h2 className="sale">Loading...</h2> :<div
        >   
            <div
            style={{
                textAlign: 'center',

            }}
            >
                <Link
                to='/sales'
                ><button
                style={{
                    marginTop: '5rem',

                    justifySelf: 'center',
                    // backgroundColor: 'green'
                }}
                >All Sales</button></Link>
            </div>
            
         <Sales
            transactions={state.sales}
            search={search}
            setSearch={setSearch}
            search2={search2}
            setSearch2={setSearch2}
            currentUser={currentUser}
            getTrans={getTrans}
            />
            {/* <Sales
            transactions={genTrans}
            /> */}
        </div>
    )
}

export default AllSales