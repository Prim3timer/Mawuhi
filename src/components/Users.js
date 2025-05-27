import { useState, useEffect } from "react";
import axios from "../app/api/axios";

import UserSelect from "./UserSelect";
import useAuth from "../hooks/useAuth"
import { Link } from "react-router-dom";
import initialState from "../store";
import reducer from "../reducer";
import { useReducer } from "react";
import { use } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import UserSettings from "./UserSettings";

const Users = ({users, setUsers, showSettings,
    setShowSettings
})=> {
 
    const [madu, setMadu] = useState()
    const [brand, setBrand] = useState()
    const [state, dispatch] = useReducer(reducer, initialState)
    const [currentPerson, setCurrentPerson] = useState()
   

        const {auth, setAuth} = useAuth()
        const userPage = (id) => {
            setAuth({...auth, picker3: id})
            console.log(users)
            console.log(id)
            console.log(auth)
      
            console.log(brand)
            const person = users.find((user)=> user._id === id)
            setBrand(person)
            console.log(brand)
          
             
        }

const settingFunc = (id) => {   
        // e.preventDefault()
            console.log(id)
            const person = users.find((user => user._id === id))
            setCurrentPerson(person)
            console.log(currentPerson)
            if (showSettings){
                    setShowSettings(false)
            } else {
    
                setShowSettings(true)
            }
            console.log(showSettings)
        }
           





console.log(users)
return (
 <article
    style={{
        display: 'flex',
        flexDirection: 'column',
        /* font-size: 4rem; */
        maxWidth: '100vw',
        textAlign: 'center',
        justifyContent: 'center'
    }}
    >
        {users?.length
        ? (

            <table
            className="users"
            style={{
                // marginLeft: '1rem'
            }}
            >
           <tbody>
            <tr>
                <th>Activity</th>
                <th className="roles-header">Roles</th>
                <th>Settings</th>
            </tr>
          
                {users.map((madu, index)=> {
                    return <tr key={index}
                    // onClick={() => userPage(madu._id)}
                    style={{backgroundColor: index % 2 === 0 ?
                        'white' : 'beige'}}       
                        >

                        <th 
                        ><Link to="/user-select"
                        onClick={() => userPage(madu._id)}
                        
                        >{madu?.username}</Link></th>

                           <td
                           className="roles"
                                        
                                            >
                                           
                                            {(Object.keys(madu.roles)).join(', ')}.
                                            </td>

                        {/* <td
                        //  onClick={() => userPage(madu._id)}
                        >{madu?._id}</td> */}
                        <td
                        >
                            <Link to={'/user-settings'}
                            onClick={() => userPage(madu._id)}
                            >
                            <FontAwesomeIcon icon={faPenToSquare} />
                            </Link>
                          
                            {/* {madu?._id} */}
                            </td>
                      
                                    
                    </tr>
                }
                
                
               )}
                </tbody>
           </table>
        ) : <p>no user to display</p>}



    </article>
)
}

export default Users