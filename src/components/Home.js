import { useNavigate, Link } from "react-router-dom";
import { useContext, useReducer } from "react";
import AuthContext from "../context/authProvider";
import reducer from "../reducer";
// import { init } from "create-react-app/createReactApp";
import initialState from "../store";

const Home = ()=> {
    const [state, dispatch] = useReducer(reducer, initialState)

    // const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const logout = async () => {

    
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        dispatch({type: 'auth', payload: ({})});
        navigate('/login');
    }
    return (
        <div className="home-cont" >
        <section
        className="home"
        >
        <br />
        {/* <p>You are logged in {state.user}</p> */}
        <br />
        <Link to="/transaction">transaction</Link><br/>
        <Link to="/create-item">add item</Link>
        <br />
        <Link to="/item-list">items</Link>
        <br />
        <Link to="/create-inventory">add inventory</Link>
        <br />
        <Link to="/inventory">inventory</Link>
        <br />
        {/* <Link to="/emp-inv">Inventory2</Link> */}
        <br />
        <Link to="/admin">admin</Link>
        <br/>
        <Link to="/sales">Sales</Link>
        <br/>
        <Link to="/shopping">reciepts</Link>
        {/* <br /> */}
        {/* <Link to="/linkpage">link page</Link> */}
        <br />
        {/* <Link to="/shopping">Shopping</Link> */}
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