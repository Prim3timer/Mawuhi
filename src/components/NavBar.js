import { useState, useRef, useEffect, useContext } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faLeftLong, faBars } from "@fortawesome/free-solid-svg-icons"
import { Link, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import useLogout from "../hooks/useLogout";
import SideBar from "./SideBar"
import AuthContext from "../context/authProvider"

const NavBar = ()=> {
  
  //  const [isRotated, setIsRotated] = useState(false)
  const {isRotated, setIsRotated} = useContext(AuthContext)
     const navigate = useNavigate();
   const barRef = useRef(null)
  const { auth} = useAuth()
    const workBar = ()=> {
  if (isRotated == false){
    
    barRef.current.style.transitionProperty = 'transform'
    barRef.current.style.transitionDuration = '200ms'
    barRef.current.style.transform = 'rotate(-90deg)'
    setIsRotated(true)
  } else {
    barRef.current.style.transitionProperty = 'transform'
    barRef.current.style.transitionDuration = '200ms'
    barRef.current.style.transform = 'rotate(0deg)'
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
 
             <h4> Retail Tracker</h4> 
             <div className={auth.accessToken ? 'show-home-links' : 'hide-home-links'}>

             
                        <Link 
                        className="home-links"
                        
                        to="/transactions">transaction</Link>
                      
                     
                      
                     
                   
                        <Link to="/item-list"
                       className="home-links"
                       >items</Link>
                        
                   
                        <Link to="/inventory"
                       className="home-links"
                       
                       >inventory</Link>
                
                        {/* <Link to="/emp-inv">Inventory2</Link> */}
                     
                        {/* <Link         
                        to="/editor">bars</Link>
                        <br/> */}
                     
                        <Link
                        to="/shopping"
                        
                        className="home-links"
                        
                        >reciepts</Link>
                           <Link to="/admin"
                       className="home-links"
                       
                       >admin</Link>

                       
                    <Link 
                    // onClick={showDem}
                    className="home-links"
                    
                    to="/sales">sales</Link>
                       
                  <Link to="/login" className="home-links" id="logout" onClick={logout}>
            sign out</Link>
                        </div>
             
            { auth.accessToken &&  <div className="head-home">
                  <p><FontAwesomeIcon ref={barRef} className="home-icon" onClick={workBar} icon={faBars}/></p>
                    </div>}
                      
            </div>
    )
}

export default NavBar