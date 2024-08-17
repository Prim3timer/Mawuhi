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
        <div>
        <section
        id="links"
        style={{
            backgroundColor: 'green',
            fontSize: '1.5rem',
            margin: '0 0 1rem 0',
            padding: '2rem 2rem 0 .5rem',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            columnGap: '1rem'
        }}
        >
        <br />
        {/* <p>You are logged in {state.user}</p> */}
        <br />
        <Link to="/transaction">transaction</Link><br/>
        <Link to="/create-inventory">create inventory</Link>
        <br />
        <Link to="/create-item">add item</Link>
        <br />
        <Link to="/inventory">Inventory2</Link>
        <br />
        <br />
        {/* <Link to="/linkpage">link page</Link> */}
        <br />
        <Link to="/item-list">Items</Link>
        <br />
        {/* <Link to="/shopping">Shopping</Link> */}
        <br />
        <Link to="/emp-inv">Inventory1</Link>
        <br />
        <br />
        <br />
        <Link to="/admin">admin</Link><br/>
        <Link to="/sales">Sales</Link>
    </section>
        <Link to="/login">Login</Link>
        <Link to="/register"> register page</Link>
        <div className="flexGrow">
            <button onClick={logout}>Sign Out</button>
        </div>
    </div>
    )
}
export default Home