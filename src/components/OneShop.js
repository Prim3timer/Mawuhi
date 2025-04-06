import axios from "../app/api/axios"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { useEffect, useContext, useReducer, useState } from "react"
import initialState from "../store"
import reducer from "../reducer"


const OneShop = ({one, items}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const {auth} = useAuth()
    const  [item, setItem] = useState([])
    const getTrans = async ()=> {
         const response = await axios.get('/transactions')
         console.log(auth.picker)
         if (response){      
             const currentitem = item.find((item) => item._id === one)
             setItem(currentitem)
         }

     }
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
useEffect(()=> {
    getTrans()
}, [])

    return (
        <div
        
        >
         
            {/* <Link to='../shopping'><button
            style={{
                textAlign: 'center'
            }}
            >Reciepts</button></Link> */}

               <article
                                style={{
                                    // display: 'flex',
                                    // flexDirection: 'column',
                                    // justifyContent: 'center',
                               
                                    // alignItems: 'center'
                                    marginTop: '10%'
                                }}
                                >
                              
                                    <h5>cashierID: {item.cashierID}</h5>
                                    <h4>Date: {item.date}</h4>
                                    <p>TransID: {item._id}</p>
                                    <br/>
                                    {item.goods.map((good)=> {
                                        return (
                                            <div
                                            style={{display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'flex-start',
                                            }}
                                            >
                                                
                                                <h5>{good.name}</h5>
                                                <p>Qty: {good.qty} {good.unitMeasure.split(' ')[1].slice(1, -1)}</p>
                                                <p>Price: {good.price}</p>
                                                <h5>Sub Total: ₦{numberWithCommas(parseFloat(good.total).toFixed(2))}</h5>
                                                <br/>
                                            </div>
                                        )
                                    })}
                                 
                                    <h4>Grand Total: ₦{ numberWithCommas(parseFloat(item.grandTotal).toFixed(2))}</h4>
                                    <h5>Cashier: {item.cashier}</h5>
                                    <br/>
                                   
                                    <h2>One Shop</h2>
                                </article>
                               
        </div>
    )
}

export default OneShop