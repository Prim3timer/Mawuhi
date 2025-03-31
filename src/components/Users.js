import { useState, useEffect } from "react";
import axios from "../app/api/axios";
import { FaTrashAlt } from "react-icons/fa";

const Users = ()=> {
    const [users, setUsers] = useState()
    const removeUser = () => {
        console.log('and i dey in the mood')
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
            isMounted && setUsers(response.data)
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
    <article
    style={{
        // width: '50vw'
        // margin: '0 auto'
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    }}
    >
      
        {users?.length
        ? (
            <table
            className="item-list"
            >
           <tbody>
            <tr>
                <th>Name</th>
                <th>User ID</th>
                <th>Delete</th>
            </tr>
          
                {users.map((user, i)=> {
                    return <tr key={i}
                    onClick={removeUser}
                    >

                        <th 
                                    
                        >{user?.username}</th>
                        <td
                         onClick={removeUser}
                        >{user?._id}</td>
                         <td
                                                // onClick={()=> removeItem(item._id)}
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