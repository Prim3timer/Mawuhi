
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
            className={isRotated ? 'side' : 'no-side'}
            >
               <ul
                
                  className={'links-container' }
                  ref={sideRef}
                  >
                        {/* <h3>SideBar</h3> */}
                   
            
                <li>    <Link 
                className="side-links"
                // className={isRotated ? 'side-links' : 'no-side-links'}
                to="/transactions">transaction</Link></li>
                  
                 
                  
                    {/* <Link
                   
                   to="/create-item">add item</Link>
                   */}
               
                   <li> <Link to="/item-list"
                    className="side-links"
                    // className={isRotated ? 'side-links' : 'no-side-links'}
                    >items</Link></li>
                    
               
                 <li>   <Link to="/inventory"
                    className="side-links"
                    >inventory</Link></li>
            
                    {/* <Link to="/emp-inv">Inventory2</Link> */}
                  
                   
                 <li>   <Link to="/admin"
                    className="side-links"
                    // className={isRotated ? 'side-links' : 'no-side-links'}
                    >admin</Link></li>
                   
            
                <li>    <Link 
                    // onClick={showDem}
                    
                    to="/sales"
                    className="side-links"
                    // className={isRotated ? 'side-links' : 'no-side-links'}
                    >sales</Link></li>
                    {/* <Link         
                    to="/editor">bars</Link>
                    <br/> */}
                 
                 <li>   <Link
                    to="/shopping"
                    className="side-links"
                    // className={isRotated ? 'side-links' : 'no-side-links'}
                    >
                        reciepts</Link></li>
                  
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
                <li>        <Link to="/login" id="logout" onClick={moreThanLogout}
                    className={'side-links'}
                >
            sign out</Link></li>
                </ul>
                </section>
        </div>
    )
}

export default SideBar