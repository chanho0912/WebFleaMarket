import React, { useState } from 'react';
import './Login.css'
import Logo from './images/logo.jpg';
import {Link, useHistory} from "react-router-dom";
import {firebaseApp} from "./firebase";


function Login() {
    const auth = firebaseApp.auth();
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = e =>{
        e.preventDefault();

        auth.signInWithEmailAndPassword(email, password)
        .then(auth =>{
            history.push('/')
        })
        .catch(error => alert(error.message))
    }
    const register = e =>{
        e.preventDefault();

        auth.createUserWithEmailAndPassword(email, password)
        .then((auth) => {
            if (auth){
                history.push('/')
            }
        })        
        .catch(error => alert(error.message))
    }
    return (
        <div className="login">
            <Link to='/' style={{ textDecoration: 'none' }}>
                <h1 className="Logo">Flea Market</h1>
            </Link>
            <div className='login__container'>
                <h1>Sign in</h1>

                <form>
                    <h5>E-mail</h5>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)}/>
                    
                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)}/>

                    <button type='submit' onClick={signIn}
                    className='login__signInButton'>Sign In</button>
                </form>

                <p>
                    By signing-in you agree to 2016310526's Web Project Flea-Market's Condition of Use & Sale.
                </p>
                <Link to='/signin'>
                    <button
                    className='login__registerButton'>Create New Account</button>
                </Link>
            </div>
        </div>
    )
}

export default Login
