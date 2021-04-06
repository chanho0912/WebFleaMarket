import React, { useEffect, useState } from 'react';
import './Admin.css';
import {firebaseApp} from "./firebase";
import { useStateValue } from './StateProvider';


function Admin() {
    const realtimedb = firebaseApp.database();

    const[post_list, setPostList] = useState(); 
    const[user_list, setUserList] = useState(); 

    const[modify_name, setUserName] = useState(); 
    const[modify_pn, setUserPn] = useState(); 
    const[modify_type, setUserType] = useState(); 

    useEffect(() =>{
        const postRef = realtimedb.ref("posts");
        const userRef = realtimedb.ref("users");

        postRef.on("value", (snapshot) => {
            const each_post = snapshot.val();
            const post_list = [];
            for (let id in each_post){
                post_list.push(each_post[id]);
            }
            setPostList(post_list);
        });

        userRef.on("value", (snapshot) => {
            const each_user = snapshot.val();
            const user_list = [];
            for (let id in each_user){
                user_list.push(each_user[id]);
            }
            setUserList(user_list);
        });

    }, []);
    
    const RemoveUser = (postKey)=>{
        const userRef = realtimedb.ref("users");
        userRef.child(postKey).remove();
    }

    const ModifyUN = (postKey)=>{
        const postRef = realtimedb.ref("users");
        postRef.child(postKey).update({u_name: modify_name});
    }
    const ModifyPN = (postKey)=>{
        const postRef = realtimedb.ref("users");
        postRef.child(postKey).update({phone_number: modify_pn});
    }
    const ModifyTY = (postKey)=>{
        const postRef = realtimedb.ref("users");
        postRef.child(postKey).update({type: modify_type});
    }
    return (
        <div className="admin">
            <div className="admin__container">
                <h1>
                    Hello, Administrator
                </h1>

                <div className="admin__userSection">
                    <h3>Current Enrolled User</h3>
                    <div className="admin__userList">
                        { user_list && user_list.map(doc => (
                            <div className="user__item" key={doc.id}>
                                <h3>user_email: {doc.email}</h3>
                                <p>user_name: {doc.u_name}</p>
                                <p>user_type: {doc.type}</p>
                                <p>phone_number: {doc.phone_number}</p>

                                <input type='text' className="modify_info" value={modify_name} onChange={e => setUserName(e.target.value)}/><br></br>
                                <button onClick={() => ModifyUN(doc.u_id)}>Modify UserName</button><br></br>

                                <input type='text' className="modify_info" value={modify_pn} onChange={e => setUserPn(e.target.value)}/><br></br>
                                <button onClick={() => ModifyPN(doc.u_id)}>Modify PhoneNumber</button><br></br>
                                
                                <input type='text' className="modify_info" value={modify_type} onChange={e => setUserType(e.target.value)}/><br></br>
                                <button onClick={() => ModifyTY(doc.u_id)}>Modify UserType</button><br></br>
                                        
                                <button 
                                    className="admin__RemoveButton" onClick={() => RemoveUser(doc.u_id)}>
                                        Remove this User</button>
                                <br></br>
                            </div>
                        ))}   
                    </div>
                </div>

                <div className="admin__productSection">
                    <h3>Current Enrolled Product</h3>
                    <div className="admin__productList">
                        { post_list && post_list.map(doc => (
                            <div className="admin__productItem" key={doc.id}>
                                <img className='Product__image' src={doc.image} />
                                <h3>Product name: {doc.title}</h3>
                                <p>Product info: {doc.info}</p>
                                <p>hoping price: {doc.price}</p>
                                <p>current bidding price: {doc.auction_price}</p>
                            </div>
                        ))}   
                    </div>
                </div>
            </div>            
        </div>
    )
}

export default Admin
