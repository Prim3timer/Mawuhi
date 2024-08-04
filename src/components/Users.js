import { useState, useEffect } from "react";
import axios from "../app/api/axios";

const Users = ()=> {
    const [users, setUsers] = useState()

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
        // alignItems: 'center',
        // margin: '0 auto'
        // justifyContent: 'center'
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    }}
    >
      
        {users?.length
        ? (
            <ol
            style={{width: '10vw',
                // justifySelf: 'center'
            }}
            >
                {users.map((user, i)=> <li key={i}
              
                >{user?.username}</li>)}
            </ol>
        ) : <p>no user to display</p>}
    </article>
)
}

export default Users