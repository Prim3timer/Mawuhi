import { useState, useRef, useEffect, useContext } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faLeftLong, faBars } from "@fortawesome/free-solid-svg-icons"
import { Link, useNavigate, useLocation } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import useLogout from "../hooks/useLogout";
import SideBar from "./SideBar"
import AuthContext from "../context/authProvider"
import mainLinks from "./mainLinks"
import useWindowSize from "../hooks/useWindowSize"
const NavBar = ()=> {
  
  //  const [isRotated, setIsRotated] = useState(false)
  const {isRotated, setIsRotated, barRef} = useContext(AuthContext)
  const [currentWidth, setCurrentWidth] = useState()
     const navigate = useNavigate();
const location = useLocation()
  const { auth} = useAuth()
const navRef = useRef()
const {width} = useWindowSize()

console.log(width)

  const workBar = ()=> {
      const navWidth = navRef.current.getBoundingClientRect().width
      // setCurrentWidth(navWidth)
      console.log(navWidth)
  if (isRotated == false){
    
    
    setIsRotated(true)
  } else {

    setIsRotated(false)

  }
}




const logout = useLogout()

   const signOut = async () => {
       
            // if used in more components, this should be in context 
            // axios to /logout endpoint 
            const response = await logout()
            console.log(response)
            navigate('/login');
            if (response){

            }
        }
     const pix = 1200

    return (
         <div  className="header"
         ref={navRef}
         >
 
             {location.pathname === '/' || location.pathname === '/login' || location.pathname === '/register' ? <h4> Retail Tracker</h4>  : width < 800 ? <p><FontAwesomeIcon ref={barRef} className={
                    !isRotated ? "home-icon rotate-icon" : "home-icon"} onClick={workBar} icon={faBars}/></p> : ''}
               { auth.accessToken &&  <div className="head-home">
                    </div>}

                <div
                className={width > 800 ? 'show-home-links' : 'hide-home-links'}>
            {auth.accessToken && mainLinks.map((mainLink)=> {
                    const {id, name, path} = mainLink
                return (
                        <Link to={path} className="home-links" key={id}>{name}</Link>
                    )
                })}
                {auth.accessToken && <Link to="/login" className="home-links" onClick={logout}>logout</Link>}
                </div>
            



           
             
          
                      
            </div>
    )
}

export default NavBar