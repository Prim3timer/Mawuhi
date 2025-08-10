
import { useState, useRef } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faLeftLong, faBars } from "@fortawesome/free-solid-svg-icons"
import { Link, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import useLogout from "../hooks/useLogout";
const SideBar = () => {
    return (
        <div>
               <section
                  className="side"
                  >
                        <h3>SideBar</h3>
                   
            
                    <Link 
                
                    to="/transactions">transaction</Link>
                  
                 
                  
                    <Link
                   
                    to="/create-item">add item</Link>
                  
               
                    <Link to="/item-list">items</Link>
                    
               
                    <Link to="/inventory">inventory</Link>
            
                    {/* <Link to="/emp-inv">Inventory2</Link> */}
                  
                   
                    <Link to="/admin">admin</Link>
                   
            
                    <Link 
                    // onClick={showDem}
                    
                    to="/sales">sales</Link>
                    {/* <Link         
                    to="/editor">bars</Link>
                    <br/> */}
                 
                    <Link
                    to="/shopping">reciepts</Link>
                  
                    <Link
                    to="/shop">shop</Link>
                   
                    <Link to="/cart">
                    cart
                    </Link>
                    {/* <br /> */}
                    {/* <Link to="/linkpage">link page</Link> */}
                  
                    {/* <Link to="/shopping">Shopping</Link> */}
                    {/* Your <FontAwesomeIcon icon={faLeftLong} /> is hot and ready! */}
                </section>
        </div>
    )
}

export default SideBar