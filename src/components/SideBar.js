
import { useState, useRef, useContext } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faLeftLong, faBars } from "@fortawesome/free-solid-svg-icons"
import { Link, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import useLogout from "../hooks/useLogout";
import AuthContext from "../context/authProvider"
const SideBar = () => {
    const {isRotated, setIsRotated} = useContext(AuthContext)
    const sideRef = useRef()
    const logout = useLogout()
    const moreThanLogout = ()=> {
        logout()
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
    console.log({linkItems})
    console.log(isRotated)
    return (
        <div>
               <section
                //   className={isRotated ? 'side' : 'no-side'}
                  className={'side' }
                  ref={sideRef}
                  >
                        {/* <h3>SideBar</h3> */}
                   
            
                    <Link 
                className="side-links"
                    to="/transactions">transaction</Link>
                  
                 
                  
                    {/* <Link
                   
                    to="/create-item">add item</Link>
                   */}
               
                    <Link to="/item-list"
                    className="side-links"
                    >items</Link>
                    
               
                    <Link to="/inventory"
                    className="side-links"
                    >inventory</Link>
            
                    {/* <Link to="/emp-inv">Inventory2</Link> */}
                  
                   
                    <Link to="/admin"
                    className="side-links"
                    >admin</Link>
                   
            
                    <Link 
                    // onClick={showDem}
                    
                    to="/sales"
                    className="side-links"
                    >sales</Link>
                    {/* <Link         
                    to="/editor">bars</Link>
                    <br/> */}
                 
                    <Link
                    to="/shopping"
                    className="side-links"
                    
                    >
                        reciepts</Link>
                  
                    {/* <Link
                    to="/shop"
            
                    >shop</Link>
                   
                    <Link to="/cart">
                    cart
                    </Link> */}
                    {/* <br /> */}
                    {/* <Link to="/linkpage">link page</Link> */}
                  
                    {/* <Link to="/shopping">Shopping</Link> */}
                    {/* Your <FontAwesomeIcon icon={faLeftLong} /> is hot and ready! */}
                        <Link to="/login" className="side-links" id="logout" onClick={moreThanLogout}>
            sign out</Link>
                </section>
        </div>
    )
}

export default SideBar