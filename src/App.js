import Register from "./components/register"
import Login from "./components/Login"
import {Routes, Route} from 'react-router-dom'
import Home from "./components/Home"
import Layout from "./components/Layout"
import Missing from "./components/Missing"
import Unauthorized from "./components/Unauthorized"
import SearchItem from "./components/SearchItem"
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
import Shopping from "./components/Shopping"
import EmpInv from "./components/EmpInv"



// const ROLES = {
//   'User': 2001,
//   'Editor': 1984,
//   'Admin': 5150
// }

const App = () => {

  const year = new Date().getFullYear()
return (

  <main className="App">
     <h2 className="header">The Retailer</h2>
      <Routes>
        <Route path="shopping" element={<Shopping/>}/>
         {/* public routes */}
        <Route path="/" element={<Layout/>}>
     {/* <Route path="emp-inv" element={<EmpInv/>}/> */}
    <Route path="/login" element={<Login/>}/>
    <Route path="register" element={<Register/>}/>
         <Route path="linkpage" element={<LinkPage/>}/>
      <Route path="unauthorized" element={<Unauthorized/>}/>
      <Route path="transaction" element={<Transactions/>}/>
  
       {/* protected routes */}
       <Route element={<RequireAuth allowedRoles={[2001]}/>}>
         <Route path="/" element={<Home/>}/>
         </Route>
        
        
       <Route element={<RequireAuth allowedRoles={[1984]}/>}>
         <Route path="editor" element={<Editor/>}/>
         <Route path="item-list" element={<ItemList/>}/>
    <Route path="inventory" element={<Inventory/>}/>
       <Route path="edit" element={<Edit/>}/>
       <Route path="sales" element={<Sales/>}/>
       <Route path="create-item" element={<CreateItem/>}/>

         </Route>
      
       {/* <Route element={<RequireAuth allowedRoles={[1984, 5150]}/>}>
 
         </Route> */}
         <Route path="create-inventory" element={<CreateInventory/>}/>
       <Route element={<RequireAuth allowedRoles={[5150]}/>}>
     <Route path="admin" element={<Admin/>}/>
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