import { useEffect, useReducer, useRef, useState } from "react"
import { ROLES } from "../config/roles"
import { Link, useNavigate } from "react-router-dom"
import axios from "../app/api/axios"
import { FaTrashAlt } from "react-icons/fa";
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
    const [ID, setID] = useState('')
    const {auth} = useAuth()
    const saveRef = useRef(null)
        const pwdRef = useRef()

    // picker3 is the not the current user.  It is the user in question.

const navigate = useNavigate()
// dispatch({type: ACTION.SUCCESS, payload: false})
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
            setID(person._id)
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
         
        }     
        
           const userPage = () => {
        
          console.log(ID)

          
             
        }



        

const assertain = (id) => {
    // setAuth({...auth, picker3: id})
    // console.log(auth.picker3)
    // id &&    setBrand(id)
    if (auth.roles.includes(5150)){
        console.log("deleted")
        
        dispatch({type: 'cancel', payload: true})
        // setBrand(id)
        // dispatch({type: 'id', payload: id})
       

    }
    else {
        // dispatch({type: 'isMatched', payload: true})
    }
}


const handleRemove = async ()=> {
    console.log(auth.picker3)
  
    const response = await axios.delete(`/users/delete/${ID}`)
    dispatch({type: 'cancel', payload: false})
    dispatch({type: 'success', payload: true})
navigate('/admin')
    console.log(state.success)
    setTimeout(()=> {
        dispatch({type: 'success', payload: false})
    }, 3000)
    if (response){
        dispatch({type: 'selectUser', payload: response.data})

        // const newGraw =  users.filter((item)=> item._id !== auth.picker3)

        // setUsers(newGraw)
    }
    else{
        console.log('nothing for you')
    }
}

const remainDelete = ()=> {
    // this condition statement is to enable the removal of the confirm window once any part of the 
    // page is touched.
    if (state.cancel){

        dispatch({type: 'cancel', payload: false})
    }

}
const generalRemain = () => {
    if (state.isMatched) dispatch({type: 'isMatched', payload: false})

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


              useEffect(() => {
        // pwdRef.current.value = ''
 
    }, [])


        





const onRolesChanged = e => {
    // shadowing()
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
        console.log('double how  dare you?')
        return
    }else  {
        console.log('alright * 3')
        setRoles(values)
    }
}

const updateUser = async () => {
console.log('shadow is ', shadow)
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
        !username ? <h2
        className="edit-user"
       
        >Loading...</h2> : <div className="edit-user"
        >
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
                ref={pwdRef}
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

            className="asinged-roles-cont"
            
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
            className="roles-select"
             >
              {options}
             </select>
           
            </form>
           
                  <button onClick={updateUser}
                  className="user-action"
       
          ref={saveRef}
        //   className={'icon-button'}
          title="Save"
          ><FontAwesomeIcon icon={faSave} /></button>
           <button
                  className="user-action"
                onClick={assertain}
           ><FaTrashAlt role='button'
                                            tableindex='0'
                                            /> </button>
            </div>
            <div
            className={state.success && shadow ? 'show-user-alert' : 'hide-user-alert'}
      
        >
          <h4>{state.selectUser}</h4>
            </div>

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
          > Delete  {username && username} from users</h3>
                 <article
                 style={{
                     display: 'flex',
                    //  flexDirection: 'row',
                     columnGap: '4vw',
                     justifyContent: 'center',
                 }}
                 >
                 {console.log(auth.picker3)}
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
        <div
        style={{
            display: state.success ? 'block' : 'none',
            position: 'absolute',
            margin: '1rem 0',
            top: '35%',
left: '25%',
width: '40%',
textAlign: 'center',
 padding: '1rem',
   backgroundColor: 'lightpink',
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