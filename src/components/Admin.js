import Users from "./Users";
import { Link } from "react-router-dom";
import UserSelect from "./UserSelect";
import useAuth from "../hooks/useAuth"
import { useState, useEffect, useContext } from "react";
import axios from "../app/api/axios";
import AuthContext from "../context/authProvider";



const Admin = () => {
    const {auth, users, getUsers} = useContext(AuthContext)
   
      const [currentPerson, setCurrentPerson] = useState()
      const [showSettings, setShowSettings] = useState(false)



    useEffect(()=> {
      getUsers()
}, []) 

   
    return (
        <div
        className="admin"
      >
           <h1
           className="admin-header"
         
            >Admin</h1>
      <section>
        
            {!showSettings ? <h2
            className="users-header"
            style={{textAlign: 'center'}}
            >Users ({users && users.length})</h2> : ''}
            
            {<h2>Loading...</h2> && 
             
             <Users/>}
            <br/>
            <div className="flexGrow"
            style={{
                textAlign: 'center'
            }}
            >
               
                <button
                className="admin-home-button"
                >

                <Link to="/home"
                  className="admin-home-link"
                >Home</Link>
                </button>
            </div>
        </section>
        </div>
        
    )
}

export default Admin