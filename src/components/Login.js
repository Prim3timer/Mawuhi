
import { useRef, useState, useEffect, useReducer } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import axios from '../app/api/axios';
import reducer from '../reducer';
import initialState from '../store';


const LOGIN_URL = '/auth';

const Login = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const { setAuth } = useAuth()

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();

    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');


    
    // const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

  
    
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
            console.log(response?.data);
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            const picker = response?.data?.id;
            setAuth({ user, pwd, roles, accessToken, picker});
            setUser('');
            setPwd('');
            navigate(from, { replace: true });
            // dispatch({type: 'success', payload: true})
        } catch (err) {
            if (!err?.response) {
                dispatch({type: 'errMsg', payload: 'No server Response'});
                // setErrMsg('No Server Response');
            } else if (err.response?.status === 500) {
                // setErrMsg('Missing Username or Password');
                dispatch({type: 'errMsg', payload: 'Missing Username or Password'});
            }
             else if (err.response?.status === 401) {
                // setErrMsg('Unauthorized');
                dispatch({type: 'errMsg', payload: 'Unauthorized'});
            }
             else {
                // setErrMsg('Login Failed');
                dispatch({type: 'errMsg', payload: 'Login Failed'});
            }
            errRef.current.focus();
        }
        dispatch({type: 'user', payload: user})
    
        console.log(state.backendUser)
    }

    return (
     
        <section className='login'>
            <p ref={errRef} className={state.errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{state.errMsg}</p>
            <h1
            className='login-header'
         
            >Sign In</h1>
            <form onSubmit={handleSubmit}
            id='login-form'
            >
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
                {/* Rhinohorn1# */}
                <button
                style={{margin: '1rem 0'}}
                >Sign In</button>
            </form>
            <p>
                Need an Account?<br />
                <span className="line">
                    <Link 
                    style={{color: 'blue'}}
                    to="/register">Sign Up</Link>
                </span>
            </p>
        </section>
    )
}

export default Login
