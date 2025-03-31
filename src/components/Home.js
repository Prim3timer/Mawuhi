    import { useNavigate, Link } from "react-router-dom";
import { useContext, useReducer } from "react";
import AuthContext from "../context/authProvider";
import reducer from "../reducer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from "@fortawesome/free-solid-svg-icons"
// import { init } from "create-react-app/createReactApp";
import initialState from "../store";

const Home = ({afa, userId})=> {
    const [state, dispatch] = useReducer(reducer, initialState)

    const { setAuth, auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const logout = async () => {

    
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        navigate('/login');
    }
    return (
        <div className="home-cont" >
             <br />
   
             <h3> Hi, {auth.user} 

             </h3>
             <br />
        <section
        className="home"
        style={{
            fontSize: '1.5rem'
        }}
        >
       
        <Link 
    
        to="/transaction">transactions</Link>
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
        <Link to="/sales">sales</Link>
        <br/>
        <Link to="/shopping">reciepts</Link>
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