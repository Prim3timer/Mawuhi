import { useState, useRef, useEffect, useContext } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faLeftLong, faBars } from "@fortawesome/free-solid-svg-icons"
import { Link, useNavigate, useLocation } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import useLogout from "../hooks/useLogout";
import SideBar from "./SideBar"
import AuthContext from "../context/authProvider"
import mainLinks from "./mainLinks"
const NavBar = ()=> {
  
  //  const [isRotated, setIsRotated] = useState(false)
  const {isRotated, setIsRotated, barRef} = useContext(AuthContext)
     const navigate = useNavigate();
const location = useLocation()
  const { auth} = useAuth()
    const workBar = ()=> {
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
     

    return (
         <div  className="header">
 
             {location.pathname === '/login' ? <h4> Retail Tracker</h4> : ''}
               { auth.accessToken &&  <div className="head-home">
                  {location.pathname !== '/login' ? <p><FontAwesomeIcon ref={barRef} className={
                    !isRotated ? "home-icon rotate-icon" : "home-icon"} onClick={workBar} icon={faBars}/></p>: ''}
                    </div>}

                <div
                className={auth.accessToken ? 'show-home-links' : 'hide-home-links'}>
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