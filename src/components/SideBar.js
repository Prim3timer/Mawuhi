
import { useState, useRef, useContext, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faLeftLong, faBars } from "@fortawesome/free-solid-svg-icons"
import { Link, useLocation } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import useLogout from "../hooks/useLogout";
import AuthContext from "../context/authProvider"
import mainLinks from "./mainLinks"
const SideBar = () => {
    const {auth} = useAuth()
    const {isRotated, setIsRotated, barRef} = useContext(AuthContext)
    const sideRef = useRef()
    const linksRef = useRef()
    const location = useLocation()
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




    useEffect(()=> {
        const linksHeight = linksRef.current.getBoundingClientRect().height
        if (isRotated){
            sideRef.current.style.height = `${linksHeight}px`
        }
        //  else {
        //     setTimeout(()=> {

        //         sideRef.current.style.height = `0px`
        //     }, 5)

        // }
    }, [isRotated])
    return (
        <div>

            <section
            ref={sideRef}
            className={location.pathname !==  '/login' && isRotated ? 'side' : 'no-side'}>
                <ul  className="links-container" ref={linksRef}>
            {mainLinks.map((mainLink)=> {
                    const {id, name, path} = mainLink
                return (
                    
                            <Link  key={id} to={path} className="side-links" onClick={moreThanLogout} ><li key={id} >{name}</li></Link>
                            
                        
                    )
                })}
                <Link to='/login' className="side-links" ><li onClick={logout}>logout</li></Link>
                </ul>
            
            </section>

            
        </div>
    )
}

export default SideBar