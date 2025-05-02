import { useEffect, useReducer, useRef, useState } from "react"
import { ROLES } from "../config/roles"
import { Link } from "react-router-dom"
import axios from "../app/api/axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import initialState from "../store"
import reducer from "../reducer"
import useAuth from "../hooks/useAuth"

const USER_REGEX = /^[A-z][A-z0-9-_]{2,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const ACTION = {
    USER: 'user',
    PWD: 'pwd',
    VALIDNAME: 'validName',
    VALIDPWD: 'validPwd',
    VALIDMATCH: 'validMatch',
    ERRMSG: 'errMsg',
    SUCCESS: 'success',
    MATCHPWD: 'matchPwd',
    USERFOCUS: 'userFocus',
    PWDFOCUS: 'pwdFocus',
    MATCHFOCUS: 'matchFocus',
    SELECTUSER: 'selectUser'
}

const UserSettings = () => {
    const [password, setPassword] = useState('')
    const [currentUser2, setCurrentUser2] = useState()
    const [roles, setRoles] =  useState({})
    const [username, setUsername] = useState('')
    const [active, setActive] = useState('')
    const [state, dispatch] = useReducer(reducer, initialState)
    const [shadow, setShadow] = useState(false)
    const {auth} = useAuth()
    const saveRef = useRef(null)

    // picker3 is the not the current user.  It is the user in question.


const getUsers = async ()=> {
    try {
        const response = await axios.get('/users')
        const person = response.data.find((user) => user._id === auth.picker3)
        if (person){
            //    dispatch({type: 'selectUser', payload: person})
            setCurrentUser2(person)
            console.log(state.selectUser)
            console.log(currentUser2)
            // console.log(person)
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
            setShadow(true)
            
            saveRef.current.style.backgroundColor = 'transparent'
         saveRef.current.style.boxShadow = '0.2em 0.3em 0.4em gray'
         saveRef.current.style.borderRadius = '5px'
         saveRef.current.style.transisitionProperty = '(box-shaddow scale)'
         saveRef.current.style.transform = 'scale(1.15, 1.15)'
         saveRef.current.style.transitionDuration = '300ms'
         saveRef.current.style.borderColor = 'transparent'
         
         
        }      
        useEffect(()=> {
            getUsers()
        }, [])
        
     useEffect(() => {
            dispatch({type: ACTION.VALIDNAME, payload: USER_REGEX.test(username)})
        }, [username])
    
        useEffect(() => {
            dispatch({type: ACTION.VALIDPWD, payload: PWD_REGEX.test(password)})
        }, [password, 
            // state.matchPwd
        ])

          useEffect(() => {
                dispatch({type: ACTION.ERRMSG, payload: ''})
            }, [username, password,
                // state.matchPwd
            ])
        





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

const updateUser = async () => {
    saveRef.current.style.transisitionProperty = '(box-shaddow scale)'
    saveRef.current.style.transform = 'scale(.95, .95)'
    saveRef.current.style.transitionDuration = '100ms'
    saveRef.current.style.boxShadow = '0em 0em 0em gray'

    setTimeout(()=> {
        saveRef.current.style.boxShadow = '0.2em 0.3em 0.4em gray'
        saveRef.current.style.borderRadius = '5px'
        saveRef.current.style.transisitionProperty = '(box-shaddow scale)'
        saveRef.current.style.transform = 'scale(1.15, 1.15)'
    }, 100)

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
    console.log(password)
    const updatedPerson = {
        username: username,
        roles: currentRole,
        password: password,
        active: active,

    }

    const response = await axios.patch(`/users/update/${currentUser2._id}`, updatedPerson)
if (response) {
    dispatch({type: ACTION.SELECTUSER, payload: response.data})
    dispatch({type: ACTION.SUCCESS, payload: true})
    setTimeout(()=> {
        dispatch({type: ACTION.SUCCESS, payload: false})
    }, 3000)
}
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
        <div className="edit-user">
            <h2 id="user-edit-header">Edit User Settings</h2>
            
            <form>
            <label htmlFor="username">Username:
            <FontAwesomeIcon icon={faCheck} className={state.validName ? "valid" : "hide"} />
            <FontAwesomeIcon icon={faTimes} className={state.validName || !username ? "hide" : "invalid"} />
            </label>
            <input type="text" id="username" value={username}
            onChange={e => {
                shadowing()
                setUsername(e.target.value)}}
                aria-invalid={state.validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => dispatch({type: ACTION.USERFOCUS, payload: true})}
                            onBlur={() => dispatch({type: ACTION.USERFOCUS, payload: false})}
            />
             <p id="uidnote" className={!state.validName  && state.userFocus? "instructions" : "offscreen"}>
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                        3 to 24 characters.<br />
                                        Must begin with a letter.<br />
                                        Letters, numbers, underscores, hyphens allowed.
                                    </p>
            <label htmlFor="password">Password:
            <FontAwesomeIcon icon={faCheck} className={state.validPwd ? "valid" : "hide"} />
            <FontAwesomeIcon icon={faTimes} className={state.validPwd || !password ? "hide" : "invalid"} />
            </label>
            <input type="password" 
            id="password" value={password}
            onChange={e => {setPassword(e.target.value)
                shadowing()
            }}
                            aria-invalid={state.validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => dispatch({type: ACTION.PWDFOCUS, payload: true})}
                            onBlur={() => dispatch({type: ACTION.PWDFOCUS, payload: false})}
            />
                                <p id="pwdnote" className={state.pwdFocus && !state.validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>

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
                <label
                style={{
                    fontSize: '1rem'
                }}
                >ASSINGED ROLES:</label>
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
           
                  <button onClick={updateUser}
        //   className='icon-button2'
        style={
            {
                width:'48px',
                height: '48px',
                color: 'var(--COLOR)',
                fontSize: '2rem',
                display: 'grid',
                placeContent:'center',
                backgroundColor: 'lightgray',
                borderColor: 'lightgray',
                transitionProperty: 'box-shadow scale',
                // transform: 'scale(0.95. 0.95)',
                boxShadow: '0em 0em 0em gray'
            }
        }
          ref={saveRef}
        //   className={'icon-button'}
          title="Save"
          ><FontAwesomeIcon icon={faSave} /></button>
            </div>
            <div
        style={{
            display: state.success && shadow ? 'block' : 'none',
            position: 'absolute',
            margin: '1rem 0',
            top: '35%',
left: '25%',
width: '40%',
 padding: '1rem',
   backgroundColor: '#3CB371',
   borderRadius: '5px',
   fontSize: '1.5rem',
   opacity: '.85'
        }}
        >
          <h4>{state.selectUser}</h4>
            </div>
        </div>
    )
}

export default UserSettings