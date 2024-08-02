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




const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

const App = () => {
  return (
  // <Routes>
  //   <Route path="/" element={<Layout/>}>
  //   {/* public routes */}
  //     <Route path="/login" element={<Login/>}/>
  //     <Route path="register" element={<Register/>}/>
  //     <Route path="admin" element={<Admin/>}/>
  //     {/* <Route path="linkpage" element={<LinkPage/>}/> */}
  //     <Route path="unauthorized" element={<Unauthorized/>}/>
  //     {/* </Route> */}

  //     {/* protected routes */}
  //     <Route element={<RequireAuth />}/>
  //     <Route path="/" element={<Home/>}/>
      
     
  //     <Route path="editor" element={<Editor/>}/>
   
      
  //     <Route path="transaction" element={<Transactions/>}/>
    
  //   <Route path="create-item" element={<CreateItem/>}/>
      
  //     <Route path="inventory" element={<Inventory/>}/>

  //     <Route path="create-inventory" element={<CreateInventory/>}/>

  //     <Route/>

  //     {/* cathall */}
  //     <Route path="missing" element={<Missing/>}/>
  //     </Route>

  // </Routes>
  <main className="app">
    <Login/>
    {/* <Admin/> */}
  </main>
  
  )
}
export default App