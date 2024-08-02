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
        style={{backgroundColor: 'green'}}
        >
        <h1>Home</h1>
        <br />
        <p>You are logged in!</p>
        <br />
        <Link to="/transaction">Go to the transaction page</Link><br/>
        <Link to="/create-inventory">Go to the create inventory page</Link>
        <br />
        <Link to="/create-item">Go to the create item page</Link>
        <br />
        <Link to="/inventory">Go to the Inventory page</Link>
        <br />
        <Link to="/register"> register page</Link>
        <br />
        <br />
        <Link to="/create-inventory">Go to the create inventory</Link><br/>
        <Link to="/login">Login</Link>
        <br />
        <Link to="/admin">Go to the admin</Link>
        <div className="flexGrow">
            <button onClick={logout}>Sign Out</button>
        </div>
    </section>
    )
}
export default Home