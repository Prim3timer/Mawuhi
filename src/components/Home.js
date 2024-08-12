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
        <section
        style={{
            backgroundColor: 'green',
            fontSize: '1.5rem',
            // margin: '0 0 1rem 0',
            padding: '0 0 2rem 0'
        }}
        >
        <br />
        <p>You are logged in!</p>
        <br />
        <Link to="/transaction">transaction</Link><br/>
        <Link to="/create-inventory">create inventory</Link>
        <br />
        <Link to="/create-item">create item</Link>
        <br />
        <Link to="/inventory">Inventory</Link>
        <br />
        <Link to="/register"> register page</Link>
        <br />
        <Link to="/linkpage">link page</Link>
        <br />
        <Link to="/item-list">Items</Link>
        <br />
        <Link to="/shopping">Shopping</Link>
        <br />
        <Link to="/edit-item">Edit Item</Link>
        <br />
        <br />
        <Link to="/login">Login</Link>
        <br />
        <Link to="/admin">admin</Link><br/>
        <Link to="/sales">Sales</Link>
        <div className="flexGrow">
            <button onClick={logout}>Sign Out</button>
        </div>
    </section>
    )
}
export default Home