import React, { useState } from 'react'
import './Signin.css'
import Logo from './images/logo.jpg';

import {Link, useHistory} from "react-router-dom";
import {firebaseApp} from "./firebase";

function Signin() {
    var phoneno = /^\(?([0-9]{3})\)?[-]?([0-9]{4})[-]?([0-9]{4})$/;
    const auth = firebaseApp.auth();
    const realtimedb = firebaseApp.database();

    const history = useHistory();
    const [email, setEmail] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [userType, setUserType] = useState('Seller');
    const [phone_number, setPhoneNumber] = useState(null);


    const register = e =>{
        e.preventDefault();
        if(email && password && userType && phone_number && phone_number.match(phoneno)){
            auth.createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                if (auth){
                    var newPostKey = realtimedb.ref().child('users').push().key;
                    var postData = {
                        u_id: newPostKey,
                        email: email,
                        u_name: username,
                        type: userType,
                        phone_number: phone_number
                    }
                    
                    var updates = {};
                    updates['/users/' + newPostKey] = postData;
                    // updates['/user-posts/' + uid + '/' + newPostKey] = postData;
                    realtimedb.ref().update(updates);
                    history.push("/");
                }
            })        
            .catch(error => alert(error.message))
        }
    }

    return (
        <div className="signin">
            <Link to='/' style={{ textDecoration: 'none' }}>
                <h1 className="Logo">Flea Market</h1>
            </Link>
            <div className='signin__container'>
                <h1>Sign in</h1>

                <form>
                    <h5>E-mail</h5>
                    <input type='email' value={email} onChange={e => setEmail(e.target.value)}/>
                    
                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)}/>

                    <h5>UserName</h5>
                    <input type='text' value={username} onChange={e => setUsername(e.target.value)}/>

                    <h5>UserType</h5>
                    <select id="type" value={userType} onChange={e => setUserType(e.target.value)}>
                        <option value="">--Please choose an UserType--</option>
                        <option value="Buyer">Buyer</option>
                        <option value="Seller">Seller</option>
                    </select>

                    <h5>phone_number</h5>
                    <input type='tel' value={phone_number} onChange={e => setPhoneNumber(e.target.value)}/>
                </form>

                <p>
                    By signing-in you agree to 2016310526's Web Project Flea-Market's Condition of Use & Sale.
                </p>
                
                <button onClick={register}
                className='signin__registerButton'>Create New Account</button>         
            </div>
        </div>
    )
}

export default Signin
