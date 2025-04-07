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
    const [madu, setMadu] = useState()
    const [brand, setBrand] = useState()
    const [state, dispatch] = useReducer(reducer, initialState)
    const [currenPerson, setCurrentPerson] = useState()
    const [selected, setSelected] = useState(false)
        const {auth} = useAuth()

        const userPage = (id) => {
            console.log(users)
            auth.picker2 = id
            console.log(auth.picker2)
            const currentUser = users.find((madu) => madu._id = auth.picker)
            dispatch({type: 'backendUser', payload: currentUser})
            console.log(state.backendUser)
        }

    const removeUser = async (id) => {

        await axios.delete(`/users/delete/${id}`)
        const person = users && users.filter((madu) => madu._id !== id)
        setUsers(person)
       
        // setCurrentPerson(person)
        console.log(currenPerson)
    }


const assertain = (id) => {
    if (auth.roles.includes(5150)){
        console.log("deleted")
        
        dispatch({type: 'cancel', payload: true})
        setBrand(id)
        // dispatch({type: 'id', payload: id})
        const getItem = users.find((person)=> person._id === id)
        setMadu(getItem)
        console.log(madu)
        console.log(brand)
    }
    else {
        // dispatch({type: 'isMatched', payload: true})
    }
}


const handleRemove = async ()=> {
    
    
    const response = await axios.delete(`/users/delete/${brand}`)
    if (response){
        
        dispatch({type: 'cancel', payload: false})
        const newGraw =  users.filter((item)=> item._id !== brand)
        setUsers(newGraw)
}
}


const remainDelete = ()=> {
    // this condition statement is to enable the removal of the confirm window once any part of the 
    // page is touched.
    if (state.cancel){

        dispatch({type: 'cancel', payload: false})
    }


    // if (state.isEdit){
        
    //     dispatch({type: 'isEdit', payload: false})
    // }
}
const generalRemain = () => {
    if (state.isMatched) dispatch({type: 'isMatched', payload: false})

 } 
const grabId = (id) => {
    console.log(id)
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
          
                {users.map((madu, index)=> {
                    return <tr key={index}
                    // onClick={() => userPage(madu._id)}
                    style={{backgroundColor: index % 2 === 0 ?
                        'white' : 'lightsalmon'}}       
                    >

                        <th 
                        onClick={() => userPage(madu._id)}
                        ><Link to="/user-select">{madu?.username}</Link></th>
                        <td
                         onClick={() => userPage(madu._id)}
                        >{madu?._id}</td>
                         <td
                                                onClick={()=> assertain(madu._id)}
                                            >
                                            <FaTrashAlt role='button'
                                            tableIndex='0'/> 
                                            </td>
                                    
                    </tr>
                }
                
                
               )}
                </tbody>
           </table>
        ) : <p>no madu to display</p>}


<div
            style={{
                display: `${state.cancel ? 'block' : 'none'}`,
                position: 'absolute',
            textAlign: 'center',
            top: '35%',
            left: '5%',
            width: '90%',
             padding: '1rem',
               backgroundColor: '#DBBFDB',
               borderRadius: '5px',
               opacity: '.85'
         }}
         >
             <h3
          id="verify-header"
          style={{
              margin: '.5rem auto',
            //   display: 'flex',
          }}
          >Are you sure you want to delete: {madu && madu.username}</h3>
                 <article
                 style={{
                     display: 'flex',
                    //  flexDirection: 'row',
                     columnGap: '4vw',
                     justifyContent: 'center',
                 }}
                 >
                    <button
                 onClick={remainDelete}
                 >No</button><button
                  onClick={handleRemove}
                 style={{backgroundColor: 'red',
                     borderColor: 'red'
                 }}
                 >Yes</button></article></div> 

<div
        style={{
            display: `${state.isMatched ? 'block' : 'none'}`,
            position: 'absolute',
        textAlign: 'center',
        top: '35%',
        left: '5%',
        width: '90%',
         padding: '1rem',
           backgroundColor: '#DBBFDB',
           borderRadius: '5px',
           opacity: '.85'
     }}
     >
         <h2
      id="verify-header"
      style={{
          margin: '.5rem auto',
        //   display: 'flex',
      }}
      >Unauthorized!</h2>
      <button 
      onClick={generalRemain}
       >
        ok</button>
            </div>
    </article>
)
}

export default Users