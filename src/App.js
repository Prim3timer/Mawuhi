  import Register from "./components/register"
import Login from "./components/Login"
  import {Routes, Route, Link} from 'react-router-dom'
import Home from "./components/Home"
import Layout from "./components/Layout"
import Missing from "./components/Missing"
import Unauthorized from "./components/Unauthorized"

import Editor from "./components/Editor"
import Transactions from "./components/Transactions"
import Inventory from "./components/Inventory"
import RequireAuth from "./components/RequireAuth"
import CreateItem from "./components/CreateItem"
import CreateInventory from "./components/CreateInventory"
import Admin from "./components/Admin"
import LinkPage from "./components/LinkPage"
import Edit from "./components/Edit"
import Sales from "./components/Sales"
import ItemList from "./components/ItemList"
import EditItem from "./components/EditItem"
import Reciepts from "./components/Reciepts"
import EmpInv from "./components/EmpInv"
import { useEffect, useState, useReducer, useRef, useContext} from "react"
import useAuth from "./hooks/useAuth"
import UserSelect from "./components/UserSelect"
import OneReceipt from "./components/OneReceipt"
import AllTransactions from "./components/AllTransactions"
import AllSales from "./components/AllSales"
import axios from "./app/api/axios"
import reducer from "./reducer"
import initialState from "./store"
import { FaPaypal } from "react-icons/fa"
import UserSettings from "./components/UserSettings"
import Cart from "./components/Cart"
import Shop from "./components/Shop"
import SingleItem from "./components/SingleItem"
import Thanks from "./components/Thanks"
import Public from "./components/Public"
import PersistLogin from "./components/PersistLogin"
import LocalThanks from "./components/LocalThanks"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faLeftLong, faBars } from "@fortawesome/free-solid-svg-icons"
import NavBar from "./components/NavBar"
import SideBar from "./components/SideBar"
import AuthContext from "./context/authProvider"
// import SearchItem from "./SearchItem";




// const ROLES = {
//   'User': 2001,
//   'Editor': 1984,
//   'Admin': 5150
// }

const App = () => {

  const [afa, setAfa] = useState('');
  const [userId, setUserId] = useState('');
  const year = new Date().getFullYear()
  const { auth} = useAuth()
   const [home, setHome] = useState(false)
   
const {isRotated, setIsRotated} = useContext(AuthContext)

  const [state, dispatch] = useReducer(reducer, initialState)

  //   const trueHome = ()=> {
  // setHome(true)
            
  //   }

  //   useEffect(()=> {
  //     trueHome()
  //     console.log(home)
  //   }, [])

return (

  <main className="App"
  >
   <NavBar isRotated={isRotated} setIsRotated={setIsRotated}/>

   {<SideBar isRotated={isRotated} setIsRotated={setIsRotated}/>}
    <article className="main">
      <Routes>
         {/* public routes */}
        <Route path="/" element={<Layout/>}>
        < Route index element={<Public/>}/>
    <Route path="/login" element={<Login/>}/>
   
    <Route path="/cart/thanks" element={<Thanks/>}/>
    <Route path="/transactions/local-thanks" element={<LocalThanks/>}/>
       {/* <Route path="/thanks" element={<Thanks />}/> */}
    <Route path="single-item" element={<SingleItem/>}/>
        <Route path="shopping" element={<Reciepts />}/>
         {/* <Route path="one-shop" element={<OneShop/>} /> */}
    <Route path="register" element={<Register/>}/>
         <Route path="linkpage" element={<LinkPage/>}/>
      <Route path="unauthorized" element={<Unauthorized/>}/>
      <Route path="transactions" element={<Transactions />}/>
      <Route path="item-list" element={<ItemList/>}/>
 <Route path="inventory" element={<Inventory/>}/>
      <Route path="user-select" element={<UserSelect/>}/>
     
    <Route path="user-settings" element={<UserSettings/>}/>
  
       {/* protected routes */}
       <Route element={<PersistLogin/>}>
       <Route element={<RequireAuth allowedRoles={[2001]}/>}>
          <Route path="/home" element={<Home home={home}/> } />
    <Route path="/shop" element={<Shop/>}/>
      <Route path="one-receipt" element={<OneReceipt/>}/>
      <Route path="cart" element={<Cart/>}/>
         </Route>
        
        
       <Route element={<RequireAuth allowedRoles={[1984]}/>}>
         <Route path="editor" element={<Editor/>}/>
       <Route path="edit" element={<Edit/>}/>
      
       <Route path="all-sales" element={<AllSales
       />}/>
       <Route path="sales" element={<Sales
       />}/>
     <Route path="receipts" element={<Reciepts
     foucuser={auth.picker2}
     />}/>
        
         </Route>
      
       {/* <Route element={<RequireAuth allowedRoles={[1984, 5150]}/>}>
 
 </Route> */}
     
       <Route element={<RequireAuth allowedRoles={[5150]}/>}>
       <Route path="create-item" element={<CreateItem/>}/>
     <Route path="admin" element={<Admin/>}/>
     <Route path="all-transactions" element={<AllTransactions/>}/>
{/*  */}
         </Route>
        
  
       </Route>
  
         <Route path="*" element={<Missing/>}/>
        </Route>
      </Routes>
            </article>
      <p
      className="footer"
            >&copy; {year} Amalu Productions.</p>
     
    </main>
    
  )
  
  
}
export default App