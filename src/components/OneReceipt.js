import { useEffect, useState, useReducer, useContext } from 'react'
import useAuth from '../hooks/useAuth'
import axios from '../app/api/axios'
import initialState from '../store'
import reducer from '../reducer'
import AuthContext from '../context/authProvider'
import { useNavigate, useLocation, router} from 'react-router-dom'



const OneReceipt = () => {
const [receipts, setReceipts] = useState({})
const [currentUser, setCurrentUser] = useState()
const [currentTrans, setCurrentTrans] = useState()
const [state, dispatch] = useReducer(reducer, initialState)
const {auth, setAuth} = useAuth()
const {currentUsers} = useContext(AuthContext)
const navigate = useNavigate()

const location = useLocation()
// window.history.pushState(null, null, '/shop');
window.history.pushState(null, null, '/transactions');



// window.onpopstate = function () {
//     console.log('hit')
//   navigate('/shop', { state: { from: location }, replace: true });

// };

const getItems = async ()=> {

    console.log('picker3 is : ', auth.picker3)
    console.log('picker is: ', auth.picker)

     
    try {
        console.log(currentUsers)

        const response = await axios.get('/transactions')
        if (response){
            const newRes = response.data.map((item)=> {
                if (!item.cashierID){
                    item.cashierID = 'unavailable'
                    item.cashier = 'unavailable'
                }
                // const reverseReceipt = response.data.reverse()
const latestReceipt = response.data.filter((receipt) => receipt.cashierID === auth.picker )
const reverseReceipt = latestReceipt.reverse()

                const oneTrans = response.data.find((item) => item._id === auth.picker2)
                const seaSaw = oneTrans ? oneTrans : reverseReceipt[0]
                // dispatch({type: 'getNames', payload: response.data})
                setCurrentTrans(seaSaw)
                // console.log(currentTrans)
                // dispatch({type: 'getNames', payload: cashierTrans})
                return item
            })
            // const gog =  await axios.get('/users')

            // const person = gog.data.find((user) => user._id === auth.picker3)
            // console.log(person)
            // setCurrentUser(person)

        

            // const filterate = cashierTrans.filter((inner)=> inner.date.substring(0, 10).includes(state.search))
            // console.log(filterate)
        
            
            // console.log(state.getNames)
            // dispatch({type: 'getNames', 
            //     payload: filterate})
                
            }
    } catch (error) {
        console.log(error)
    }
   
}
console.log(auth.picker3)

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


useEffect(()=> {
    getItems()
}, [])





    return (
       !currentTrans ? <h2
       className='one-receipt'
       style={{
        // backgroundColor: 'yellow',
        textWrap: 'wrap'
      
       }}
       >Loading...</h2> : <div
       className='one-receipt'
    >
         {currentTrans && <article

style={{
    display: 'flex',
    flexDirection: 'column',
    fontSize: '1.5rem',
    // backgroundColor: 'yellow',
    textWrap: 'wrap',

         margin: '0 1rem'
    
   }}
  
   >
       {/* <h5>cashierID: {item.cashierID}</h5> */}
                                           <h2 className="receipt-title">{currentTrans.title}</h2>
       <h4>Date: {currentTrans.date}</h4>
       <h4>TransID: {currentTrans._id}</h4>
       {currentTrans.goods.map((good)=> {
           return (
               <div
               style={{
                    textDecoration: 'none'
               }}
               >
                   <h4>{good.name}</h4>
                   <p>Qty: {good.qty} {good.unitMeasure.split(' ')[1].slice(1, -1)}</p>
                   <p>Price: {good.price}</p>
                   <p
                  
                   >Sub Total: ₦{numberWithCommas(parseFloat(good.total).toFixed(2))}</p>
              
                   {/* <br/> */}
               </div>
           )
       })}
    
       <h4
        style={{
           textAlign: 'left',
           // margin: '0 0 0 4rem',
           // color: 'green'
       }}
       >Grand Total: ₦{ numberWithCommas(parseFloat(currentTrans.grandTotal).toFixed(2))}</h4>
       
  
<h5>Operator: {currentTrans.cashier}</h5>
    
   </article>}
           
        </div>
    )

}

export default OneReceipt