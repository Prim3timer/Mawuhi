
import { useRef, useState, useEffect, useContext, useReducer } from 'react';
import useAuth from '../hooks/useAuth';
import AuthContext from '../context/authProvider';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import axios from '../app/api/axios';
import reducer from '../reducer';
import initialState from '../store';


const LOGIN_URL = '/auth';

const Login = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const { setAuth } = useContext(AuthContext)

    // const navigate = useNavigate();
    // const location = useLocation();
    // const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');

    
    // const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
    //    dispatch({type: 'errMsg', palyoad: ''});
    }, [user, pwd])
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user, pwd)
      
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            // setAuth({ user, pwd, roles, accessToken });
            dispatch({type: 'auth', paylaod: { user, pwd, roles, accessToken }})
            // navigate(from, { replace: true });
            setUser('');
            setPwd('');
            dispatch({type: 'success', payload: true})
        } catch (err) {
            if (!err?.response) {
                dispatch({type: 'errMsg', payload: 'No server Response'});
                // setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                // setErrMsg('Missing Username or Password');
                dispatch({type: 'errMsg', payload: 'Missing Username or Password'});
            } else if (err.response?.status === 401) {
                // setErrMsg('Unauthorized');
                dispatch({type: 'errMsg', payload: 'Unauthorized'});
            } else {
                // setErrMsg('Login Failed');
                dispatch({type: 'errMsg', payload: 'Login Failed'});
            }
            errRef.current.focus();
        }
    }

    return (
        <>
        {state.success ? (
            <section>
            <h1>You are logged in</h1>
            <br/>
            <p>
            <a href='#'>Got to Home</a>
            </p>
            </section>
        ) :
        <section>
            <p ref={errRef} className={state.errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{state.errMsg}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    // required    
                />

                <button>Sign In</button>
            </form>
            <p>
                Need an Account?<br />
                <span className="line">
                    <a href="/register">Sign Up</a>
                </span>
            </p>
        </section>
}
</>
    )
}

export default Login
