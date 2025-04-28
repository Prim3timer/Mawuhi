    import { useNavigate, Link } from "react-router-dom";
import { useContext, useEffect, useReducer } from "react";
import useAuth from "../hooks/useAuth";
import AuthContext from "../context/authProvider";
import reducer from "../reducer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from "@fortawesome/free-solid-svg-icons"
// import { init } from "create-react-app/createReactApp";
import initialState from "../store";
import { type } from "@testing-library/user-event/dist/type";

const Home = ({afa, userId})=> {
    const [state, dispatch] = useReducer(reducer, initialState)

    const { setAuth, auth } = useAuth();
    const navigate = useNavigate();
    console.log(state.indSales)
    const logout = async () => {
       
            // if used in more components, this should be in context 
            // axios to /logout endpoint 
            navigate('/login');
        }
        console.log(auth.picker3)
  
         useEffect(()=> {
            // picker is the current user
            auth.picker3 = auth.picker  
         }, [])
    return (
        <div className="home-cont" >
             {/* <br /> */}
            <div
            style={{
                padding: '0 1rem'
            }}
            >
                
             <h3
             style={{
                margin: '1rem 0 0'
             }}
             > Hi, {auth.user} 

             </h3>
            </div>
             <br />
        <section
        className="home"
        style={{
            fontSize: '1.5rem'
        }}
        >
       
        <Link 
    
        to="/transaction">checkout</Link>
       <br/>
        <Link
       
        to="/create-item">add item</Link>
        <br />
        <Link to="/item-list">items</Link>
        <br />
     
        <Link to="/inventory">inventory</Link>
        <br />
        {/* <Link to="/emp-inv">Inventory2</Link> */}
        <br />
        <Link to="/admin">admin</Link>
        <br/>
        <Link 
        // onClick={showDem}
        
        to="/all-sales">sales</Link>
        <br/>
        <Link
        // onClick={}
        to="/shopping">reciepts</Link>
        {/* <br /> */}
        {/* <Link to="/linkpage">link page</Link> */}
        <br />
        {/* <Link to="/shopping">Shopping</Link> */}
        {/* Your <FontAwesomeIcon icon={faCheck} /> is hot and ready! */}
    </section>
        
        <div className="flexGrow"
        style={{textAlign: 'center'}}>
            <button onClick={logout}
            style={{
                fontSize: '1rem',
                margin: '1rem auto'
            }}
            >Sign Out</button>
        </div>
    </div>
    )
}
export default Home