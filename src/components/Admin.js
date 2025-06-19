import Users from "./Users";
import { Link } from "react-router-dom";
import UserSelect from "./UserSelect";
import useAuth from "../hooks/useAuth"
import { useState, useEffect } from "react";
import axios from "../app/api/axios";



const Admin = () => {
    const {auth} = useAuth()
      const [users, setUsers] = useState([])
      const [currentPerson, setCurrentPerson] = useState()
      const [showSettings, setShowSettings] = useState(false)

    console.log('picker3 is : ', auth.picker3)
    console.log('picker is: ', auth.picker)

    

    useEffect(()=> {
        let isMounted = true
        const controller = new AbortController()
    
        const getUsers = async ()=> {
          
            try {
                const response = await axios.get('/users', {
                    signal: controller.signal
                })
                console.log(response.data)
                if (response ){
                    isMounted && setUsers(response.data)
                   
                    
                }
                
            } catch (error) {
                console.log(error)
            }
        }
        
        getUsers()
        // clean up function
        return ()=> {
            isMounted = false
            controller.abort()
            
        }
    }, [])
    return (
        <div
        className="admin"
      >
           <h1
           className="admin-header"
         
            >Admin</h1>
        { !users?.length ? <h2>Loading...</h2> : <section>
        
            {!showSettings ? <h2
            className="users-header"
            style={{textAlign: 'center'}}
            >Users ({users && users.length})</h2> : ''}
            
            {<h2>Loading...</h2> && 
             
             <Users
            users={users}
            setUsers={setUsers}
            currentPerson={currentPerson}
            setCurrentPerson={setCurrentPerson}
            person={currentPerson}
            showSettings={showSettings}
            setShowSettings={setShowSettings}
            />}
            <br/>
            <div className="flexGrow"
            style={{
                textAlign: 'center'
            }}
            >
               
                <button
                className="admin-home-button"
                >

                <Link to="/"
                  className="admin-home-link"
                >Home</Link>
                </button>
            </div>
        </section>}
        </div>
        
    )
}

export default Admin