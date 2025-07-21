
import { useRef, useState, useEffect, useReducer} from 'react';
import AuthContext from '../context/authProvider';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useRefreshToken from '../hooks/useRefreshToken';

import axios from '../app/api/axios';
import reducer from '../reducer';
import initialState from '../store';


const LOGIN_URL = '/auth';

const Login = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const { setAuth, auth } = useAuth()

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/home";
    const [isPassword, setisPassword] = useState('password')

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');


    const showPassord = () => {
        if (isPassword === 'password') setisPassword('text')
        else setisPassword('password')
    }
    
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
            // console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            const picker = response?.data?.id;
            
            setAuth({ user,roles, accessToken, picker});
            
            setUser('');
            setPwd('');
            // get the user to where they wanted to go before they were kicked out to 
            // the login page
            navigate(from, { replace: true });
            // dispatch({type: 'success', payload: true})
        } catch (err) {
            if (!err?.response) {
                dispatch({type: 'errMsg', payload: 'No server Response'});
                // setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
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
            // set the focus on error display so the screen reader can read that info
            errRef.current.focus();
        }
        dispatch({type: 'user', payload: user})
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
                <article>
                <input
                    type={isPassword}
                    className="login-password"
                
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required    
                />
                {/* <span onClick={showPassord} className='show-password'>show</span> */}
                </article>
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
