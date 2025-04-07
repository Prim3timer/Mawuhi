import { useState, useEffect } from "react";
import axios from "../app/api/axios";
import { FaTrashAlt } from "react-icons/fa";
import UserSelect from "./UserSelect";
import useAuth from "../hooks/useAuth"
import { Link } from "react-router-dom";
import initialState from "../store";
import reducer from "../reducer";
import { useReducer } from "react";
const Users = ()=> {
    const [users, setUsers] = useState()
    const [state, dispatch] = useReducer(reducer, initialState)
    const [currenPerson, setCurrentPerson] = useState()
    const [selected, setSelected] = useState(false)
        const {auth} = useAuth()

        const userPage = (id) => {
            console.log(users)
            auth.picker2 = id
            console.log(auth.picker2)
            const currentUser = users.find((user) => user._id = auth.picker)
            dispatch({type: 'backendUser', payload: currentUser})
            console.log(state.backendUser)
        }

    const removeUser = async (id) => {

        await axios.delete(`/users/delete/${id}`)
        const person = users && users.filter((user) => user._id !== id)
        setUsers(person)
       
        // setCurrentPerson(person)
        console.log(currenPerson)
    }
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
console.log(users)
    getUsers()
    // clean up function
    return ()=> {
        isMounted = false
        controller.abort()

    }
}, [])
return (
    <article
    className="inventory-spec"
    style={{
        // width: '50vw'
        // margin: '0 auto'
        // display: 'flex',
        // flexDirection: 'row',
        justifyContent: 'center',
    }}
    >
      
        {users?.length
        ? (
            <table
            className="inventory"
            style={{
                // marginLeft: '1rem'
            }}
            >
           <tbody>
            <tr>
                <th>Name</th>
                <th>User ID</th>
                <th>Delete</th>
            </tr>
          
                {users.map((user, index)=> {
                    return <tr key={index}
                    // onClick={() => userPage(user._id)}
                    style={{backgroundColor: index % 2 === 0 ?
                        'white' : 'lightsalmon'}}       
                    >

                        <th 
                        onClick={() => userPage(user._id)}
                        ><Link to="/user-select">{user?.username}</Link></th>
                        <td
                         onClick={() => userPage(user._id)}
                        >{user?._id}</td>
                         <td
                                                onClick={()=> removeUser(user._id)}
                                            >
                                            <FaTrashAlt role='button'
                                            tableIndex='0'/> 
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