import React, { useState, useEffect } from 'react';
import { firebaseApp } from './firebase';
import { useStateValue } from './StateProvider';
import './UserProduct.css';

function UserProduct() {
    const realtimedb = firebaseApp.database();
    const auth = firebaseApp.auth();

    const[post_list, setPostList] = useState(); 
    const [{basket, user}, dispatch] = useStateValue();
    const[info, setInfo] = useState();
    
    useEffect(() =>{
        const postRef = realtimedb.ref("posts");
        
        postRef.on("value", (snapshot) => {
            const each_post = snapshot.val();
            const post_list = [];
            for (let id in each_post){
                if(user && each_post[id].u_id == user.email){
                    post_list.push(each_post[id]);
                }
            }
            setPostList(post_list);
        });

    }, []);

    const BiddingSuccess = (postKey)=>{
        const postRef = realtimedb.ref("posts");
        postRef.child(postKey).remove();
    }

    const ModifyInfo = (postKey)=>{
        const postRef = realtimedb.ref("posts");
        postRef.child(postKey).update({info: info});
    }
    return (
        <div className="userproduct">
            <div className="userproduct__container">
                <div className="userproduct__productSection">
                        <h3>Current Enrolled Product</h3>
                        <div className="userproduct__productList">
                            { post_list && post_list.map(doc => (
                                <div className="userproduct__productItem" key={doc.id}>
                                    <img className='Product__image' src={doc.image} />
                                    <h3>Product name: {doc.title}</h3>
                                    <p>Product info: {doc.info}</p>
                                    <input type='text' className="modify_info" value={info} onChange={e => setInfo(e.target.value)}/>
                                    <button onClick={() => ModifyInfo(doc.postKey)}>ModifyInfo</button>
                                    <p>hoping price: {doc.price}</p>
                                    <p>current price: {doc.auction_price} <br></br>by ({doc.highest_user})</p>
                                    <p>number of User's <br></br>participate in Auction: {doc.count}</p>
                                    <button onClick={() => BiddingSuccess(doc.postKey)}>SuccessfulBid</button>
                                    <button onClick={() => BiddingSuccess(doc.postKey)}>Product Delete</button>
                                </div>
                            ))}   
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default UserProduct
