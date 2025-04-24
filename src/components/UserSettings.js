import { useEffect, useRef, useState } from "react"
import { ROLES } from "../config/roles"
import { Link } from "react-router-dom"
import axios from "../app/api/axios"

const UserSettings = ({person, showEdit, showSettings, settingFunc}) => {
    const [roleValue, setRoleValue] = useState('')
    const [password, setPassword] = useState('')
    const [roles, setRoles] =  useState(Object.keys(person.roles))
    const [username, setUsername] = useState('')
    const [active, setActive] = useState(person.active)

console.log(person)

const onRolesChanged = e => {
    const values = Array.from(
        e.target.selectedOptions,
        (option) => option.value
    )
    if (!values.includes('Employee')){
        console.log('how dare you?')
        return
       
    } 
    if (values.length > 1 && !values.includes('Editor')){
        console.log('how double dare you?')
        return
    }else  {
        console.log('alright * 3')
        setRoles(values)
    }
}
console.log(roles)


const updateUser = async () => {
    const newRoles = {
        Employee: 2001,
    }
    let newest = {}
    const userChange = roles.map((role)=>{
       if (role === 'Editor' ) newest =  {...newRoles, Editor: 1984}
       else if (role === 'Admin') newest  = {...newRoles, Editor: 1984, Admin: 5150}
       else newest = newRoles
        
        return newest
    })

    const currentRole = userChange.pop()
    console.log(currentRole)
    const updatedPerson = {
        username: username,
        roles: currentRole,
        password: password,
        active: active,

    }

    await axios.patch(`/users/update/${person._id}`, updatedPerson)
}

const onActiveChanged = () => setActive(prev => !prev)

const options = Object.keys(ROLES).map(role => {
    Object.keys(roles)
    return (
        <option
        style={{
            fontSize: '1.5rem',
            display: 'flex',
            // height: '6rem',
            alignItems: 'center',
        }}
            key={role}
            value={role}

        > {role}</option >
    )
})
  
    return (
        <div>
            <h2 id="user-edit-header">Edit User</h2>
            
            <form>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" value={person.username}/>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" value={password}
            onChange={e => setPassword(e.target.value)}
            />
            </form>
            <br/>
            <label className="form__label form__checkbox-container" htmlFor="user-active"
          style={{ justifyContent: "center", 
            marginLeft: '2rem'
          }}
          
            >
                    ACTIVE:
                    <input

style={{
    // backgroundColor: 'blue',
    width: '2rem'
}}
                        className="form__checkbox"
                        id="user-active"
                        name="user-active"
                        type="checkbox"
                        checked={active}
                        onChange={onActiveChanged}
                    />
                </label>
            <br/>
            <form
              id="roles"
            >
                <label>ASSINGED ROLES:</label>
             <select name="roles" size="3"  multiple={true}
              
            //  ref={selectRef}
           
             value={roles}
             onChange={e => onRolesChanged(e)}
             style={{
                width: '12rem',
            border: '4px solid black',
            padding: '.5rem'
                // backgroundColor: 'blue'
            }}
             >
              {options}
             </select>
            </form>
            <div
             style={{
                margin: '1rem 0',
                display: 'flex',
                flexDirection:'row',
                columnGap: '2rem',
                justifyContent: 'center',
              

            }}
            >
           {showSettings ? <button
               
                onClick={settingFunc}
                >

               Back
                </button> : ''}
          <button onClick={updateUser}>Update</button>
            </div>
        </div>
    )
}

export default UserSettings