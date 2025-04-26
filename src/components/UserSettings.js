import { useEffect, useReducer, useRef, useState } from "react"
import { ROLES } from "../config/roles"
import { Link } from "react-router-dom"
import axios from "../app/api/axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import initialState from "../store"
import reducer from "../reducer"
import useAuth from "../hooks/useAuth"

const UserSettings = () => {
    const [roleValue, setRoleValue] = useState('')
    const [password, setPassword] = useState('')
    const [currentUser2, setCurrentUser2] = useState()
    const [roles, setRoles] =  useState({})
    const [username, setUsername] = useState('')
    const [active, setActive] = useState('')
    const [state, dispatch] = useReducer(reducer, initialState)
    const [shadow, setShadow] = useState(false)
    const {auth} = useAuth()
    const saveRef = useRef(null)

    // picker3 is the not the current user but the user in question
    console.log(auth.picker3)


const getUsers = async ()=> {
    try {
            const response = await axios.get('/users')
            // const currentUser = response.data.find((user) => user._id === picker)
            const person = response.data.find((user) => user._id === auth.picker3)
           setCurrentUser2(person)
        //    dispatch({type: 'inItem', payload: currentUser})
        if (person){
            console.log(person)
            setUsername(person.username) 
            setRoles(Object.keys(person.roles))
            setActive(person.active)
             console.log(roles)
        }
                
            } catch (error) {
                console.log(error)
            }
        }

        const shadowing = () => {
            // saveRef.current.style.backgroundColor = 'blue'
            setShadow(true)


         saveRef.current.style.backgroundColor = 'transparent'
         saveRef.current.style.boxShadow = '0.2em 0.3em 0.4em gray'
         saveRef.current.style.borderRadius = '5px'
         saveRef.current.style.transisitionProperty = 'box-shaddow scale'
         saveRef.current.style.transform = 'scale(1.15, 1.15)'
         saveRef.current.style.transitionDuration = '300ms'

       
        }

        const shadowControll = shadow === false ? `icon-button2` : shadow === true ? `icon-button` : ''
        
    useEffect(()=> {
        getUsers()
    }, [])






const onRolesChanged = e => {
    shadowing()
    setShadow(true)
    const values = Array.from(
        e.target.selectedOptions,
        (option) => option.value
    )
    if (!values.includes('Employee')){
        console.log('how dare you?')
        return
       
    } 
    if (values.length > 1 && !values.includes('Manager')){
        console.log('how double dare you?')
        return
    }else  {
        console.log('alright * 3')
        setRoles(values)
    }
}
console.log(roles)

console.log((saveRef))
const updateUser = async () => {
    const newRoles = {
        Employee: 2001,
    }
    let newest = {}
    const userChange = roles.map((role)=>{
       if (role === 'Manager' ) newest =  {...newRoles, Manager: 1984}
       else if (role === 'Admin') newest  = {...newRoles, Manager: 1984, Admin: 5150}
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

    await axios.patch(`/users/update/${currentUser2._id}`, updatedPerson)
}

const onActiveChanged = () => {
    
    shadowing()
    setActive(prev => !prev)}
const options = Object.keys(ROLES).map(role => {
    Object.keys(roles)
    return (
        <option
        style={{
            fontSize: '1.5rem',
            display: 'flex',
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
            <input type="text" id="username" value={username}
            onChange={e => {
                shadowing()
                setUsername(e.target.value)}}
            />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" value={password}
            onChange={e => {setPassword(e.target.value)
                shadowing()
            }}
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
            <div
             style={{
                margin: '1rem 0',
                display: 'flex',
                flexDirection:'row',
                columnGap: '2rem',
                justifyContent: 'center',
                alignItems: 'center'
              

            }}
            >
            <form
              id="roles"
            //   style={{float: 'left',
             
            //   }}
            >
                <label>ASSINGED ROLES:</label>
             <select name="roles" size="3"  multiple={true}
              
            //  ref={selectRef}
           
             value={roles}
             onChange={e => onRolesChanged(e)}
             style={{
                width: '12rem',
            border: '4px solid black',
            padding: '.5rem',
            }}
             >
              {options}
             </select>
           
            </form>
           
                  <p onClick={updateUser}
          className={`icon-button2`}
          ref={saveRef}
        //   className={'icon-button'}
          title="Save"
          > <Link to={'/admin'}><FontAwesomeIcon icon={faSave} /></Link></p>
            </div>
          
        </div>
    )
}

export default UserSettings