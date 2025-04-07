import Register from "./components/register"
import Login from "./components/Login"
  import {Routes, Route} from 'react-router-dom'
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
import { useState } from "react"
import useAuth from "./hooks/useAuth"
import UserSelect from "./components/UserSelect"
import OneReceipt from "./components/OneReceipt"

import AllTransactions from "./components/AllTransactions"



// const ROLES = {
//   'User': 2001,
//   'Editor': 1984,
//   'Admin': 5150
// }

const App = () => {

  const [currentUser, setCurrentUser] = useState({})
  const [afa, setAfa] = useState('');
  const [userId, setUserId] = useState('');
  const year = new Date().getFullYear()
  const { auth} = useAuth()
  console.log(auth.picker)
  console.log(auth.picker2)
return (

  <main className="App">
     <h2 className="header">Retail Tracker</h2>
      <Routes>
         {/* public routes */}
        <Route path="/" element={<Layout/>}>
     {/* <Route path="emp-inv" element={<EmpInv/>}/> */}
    <Route path="/login" element={<Login
    afa={afa}
    setAfa={setAfa}
    userId={userId}
    setUserId={setUserId}
    />}/>
        <Route path="shopping" element={<Reciepts
        //  picker={auth.picker}
         />}/>
         {/* <Route path="one-shop" element={<OneShop/>} /> */}
    <Route path="register" element={<Register/>}/>
         <Route path="linkpage" element={<LinkPage/>}/>
      <Route path="unauthorized" element={<Unauthorized/>}/>
      <Route path="transaction" element={<Transactions/>}/>
      <Route path="item-list" element={<ItemList/>}/>
 <Route path="inventory" element={<Inventory/>}/>
      <Route path="user-select" element={<UserSelect
      picker={auth.picker2}
      currentUser={currentUser}
    setCurrentUser={setCurrentUser}
      />}/>
     
    
  
       {/* protected routes */}
       <Route element={<RequireAuth allowedRoles={[2001]}/>}>
         <Route path="/" element={<Home    afa={afa}
    setAfa={setAfa}/>}
    userId={userId}
    setUserId={setUserId}
    />
      <Route path="one-receipt" element={<OneReceipt/>}/>
         </Route>
        
        
       <Route element={<RequireAuth allowedRoles={[1984]}/>}>
         <Route path="editor" element={<Editor/>}/>
       <Route path="edit" element={<Edit/>}/>
       <Route path="create-item" element={<CreateItem/>}/>
       <Route path="sales" element={<Sales
      //  picker={auth.picker}
       />}/>
     <Route path="receipts" element={<Reciepts
     foucuser={auth.picker2}
     />}/>
        
         </Route>
      
       {/* <Route element={<RequireAuth allowedRoles={[1984, 5150]}/>}>
 
 </Route> */}
     
       <Route element={<RequireAuth allowedRoles={[5150]}/>}>

     <Route path="admin" element={<Admin/>}/>
     <Route path="all-transactions" element={<AllTransactions/>}/>

         </Route>
        
  
       
  
         <Route path="*" element={<Missing/>}/>
        </Route>
      </Routes>
      <p
      className="footer"
            >&copy; {year} Amalu Productions.</p>
     
    </main>
    
  )
  
  
}
export default App