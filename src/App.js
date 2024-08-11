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



// const ROLES = {
//   'User': 2001,
//   'Editor': 1984,
//   'Admin': 5150
// }

const App = () => {
  return (

  <main className="app">
    <Routes>
       {/* public routes */}
      <Route path="/" element={<Layout/>}>
  {/* <Route path="/login" element={<Login/>}/> */}
  <Route path="register" element={<Register/>}/>
       <Route path="linkpage" element={<LinkPage/>}/>
       <Route path="transaction" element={<Transactions/>}/>
       <Route path="inventory" element={<Inventory/>}/>
    <Route path="unauthorized" element={<Unauthorized/>}/>

     {/* protected routes */}
     <Route element={<RequireAuth allowedRoles={[2001]}/>}>
       </Route>
      
       <Route path="/" element={<Home/>}/>
      
       <Route path="item-list" element={<ItemList/>}/>
     <Route element={<RequireAuth allowedRoles={[1984]}/>}>
       <Route path="editor" element={<Editor/>}/>
       </Route>
     <Route element={<RequireAuth allowedRoles={[5150]}/>}>
   <Route path="admin" element={<Admin/>}/>
       </Route>
       <Route path="create-inventory" element={<CreateInventory/>}/>
     <Route element={<RequireAuth allowedRoles={[1984, 5150]}/>}>
     <Route path="edit" element={<Edit/>}/>
     {/* <Route path="edit-item" element={<EditItem/>}/> */}
       </Route>
     <Route path="sales" element={<Sales/>}/>
     <Route path="shopping" element={<Shopping/>}/>
      

     

     <Route path="create-item" element={<CreateItem/>}/>
       {/* <Route path="*" element={<Missing/>}/> */}


       
      </Route>



    </Routes>
  </main>
  
  )


  

  // return (

  //   <main className="app">
  //     <Routes>
  //        {/* public routes */}
  //       <Route path="/" element={<Layout/>}>
  //   <Route path="/login" element={<Login/>}/>
  //   <Route path="register" element={<Register/>}/>
  //        <Route path="linkpage" element={<LinkPage/>}/>
  //        <Route path="transaction" element={<Transactions/>}/>
  //        <Route path="inventory" element={<Inventory/>}/>
  //     <Route path="unauthorized" element={<Unauthorized/>}/>
  
  //      {/* protected routes */}
  //      <Route element={<RequireAuth allowedRoles={[2001]}/>}>
  //        <Route path="/" element={<Home/>}/>
  //        </Route>
        
        
  //      <Route element={<RequireAuth allowedRoles={[1984]}/>}>
  //        <Route path="editor" element={<Editor/>}/>
  //        </Route>
  //      <Route element={<RequireAuth allowedRoles={[5150]}/>}>
  //    <Route path="admin" element={<Admin/>}/>
  //        <Route path="create-inventory" element={<CreateInventory/>}/>
  //        </Route>
  //      <Route element={<RequireAuth allowedRoles={[1984, 5150]}/>}>
  //      <Route path="edit" element={<Edit/>}/>
  //      <Route path="sales" element={<Sales/>}/>
  //      <Route path="create-item" element={<CreateItem/>}/>
  //        </Route>
        
  
       
  
  //        <Route path="*" element={<Missing/>}/>
  //       </Route>
  //     </Routes>
  //   </main>
    
  //   )

  
}
export default App