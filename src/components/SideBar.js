
import { useState, useRef, useContext } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faLeftLong, faBars } from "@fortawesome/free-solid-svg-icons"
import { Link, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import useLogout from "../hooks/useLogout";
import AuthContext from "../context/authProvider"
import mainLinks from "./mainLinks"
const SideBar = () => {
    const {auth} = useAuth()
    const {isRotated, setIsRotated, barRef} = useContext(AuthContext)
    const sideRef = useRef()
    const logout = useLogout()
    const moreThanLogout = ()=> {
        // logout()

            setIsRotated(false)

    }
    const linkItems = document.getElementsByClassName('side-links')
    for (let i; i < linkItems.length; i++){
        console.log('hello world')
        console.log(linkItems[i])
    }


    // if (isRotated){
    //     sideRef.current.style.backgroundColor = 'red'
    // }
    console.log({mainLinks})
    console.log(isRotated)
    return (
        <div>

            <section
            className={auth.accessToken && isRotated ? 'side' : 'no-side'}>
                <ul  className="links-container">
            {mainLinks.map((mainLink)=> {
                    const {id, name, path} = mainLink
                return (
                    
                            <Link  key={id} to={path} className="side-links" onClick={moreThanLogout}><li key={id} >{name}</li></Link>
                            
                        
                    )
                })}
                <li><Link to='/login' className="side-links" onClick={logout}>logout</Link></li>
                </ul>
            
            </section>

            
        </div>
    )
}

export default SideBar