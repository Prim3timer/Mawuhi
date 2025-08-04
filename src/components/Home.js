    import { useNavigate, Link, useLocation } from "react-router-dom";
import {useEffect, useReducer, useContext, useState } from "react";
import axios from "../app/api/axios";
import useAuth from "../hooks/useAuth";
import AuthContext from "../context/authProvider";
import reducer from "../reducer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faLeftLong, faBars } from "@fortawesome/free-solid-svg-icons"
// import { init } from "create-react-app/createReactApp";
import initialState from "../store";
import { type } from "@testing-library/user-event/dist/type";
import useRefreshToken from "../hooks/useRefreshToken";
import useLogout from "../hooks/useLogout";
import { axiosPrivate } from "../app/api/axios";

const Home = ()=> {
    const [state, dispatch] = useReducer(reducer, initialState)
   const {auth} = useAuth()
const refresh = useRefreshToken()
const logout = useLogout()
    const {  setAtHome, getUsers } = useContext(AuthContext);
    const [home, setHome] = useState(false)
    const navigate = useNavigate();
    const location = useLocation();
    setAtHome(true)

    const trueHome = ()=> {
        if (!home) setHome(true)
            else setHome(false)
    }
    const preserveName = async () =>{
    
        try {
            
            // const data = await refresh()
            // console.log({data})
            // if (username) setNewName(username)
        } catch (error) {
            console.error(error)
        }

}

    const signOut = async () => {
       
            // if used in more components, this should be in context 
            // axios to /logout endpoint 
            const response = await logout()
            console.log(response)
            navigate('/login');
            if (response){

            }
        }


    //     useEffect(()=> {
    //     let isMounted = true
    //     // to cancel our request if the Component unmounts
    //     const controller = new AbortController()
    
    //     const getUsers = async ()=> {
          
    //         try {
    //             const response = await axiosPrivate.get('/users', {
    //                 signal: controller.signal
    //             })
    //             // setCurrentUsers(response.data)
             
    //                 // isMounted && setCurrentUsers(response.data)
                    
                
    //         } catch (error) {
    //             console.log(error)
    //             navigate('/login', { state: { from: location }, replace: true });
    //         }
    //     }
        
    //     getUsers()
    //     // clean up function
    //     return ()=> {
    //         isMounted = false
    //         // if (controller){
    //             // controller.abort()

    //         // }
            
    //     }
    // }, [])


  
         useEffect(()=> {
           preserveName()
         }, [])
    return (
        <div  className="home-cont">
            
            <div 
            className="outer-home" 
            >
                
            <h3
          >  {auth.user ?  `Hi, ${auth.user}`: ''} 
    
             </h3>
          
            </div>
        <section
      className={"home"}
        >
       

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
        
        <div className="flexGrow"
        style={{textAlign: 'center'}}
        >
        </div>

            <button onClick={signOut}
          className="logout"
            >Sign Out</button>
    </div>
    )
}
export default Home