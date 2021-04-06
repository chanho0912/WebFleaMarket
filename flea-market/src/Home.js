import React, { useState, useEffect } from 'react';
import "./Home.css";
import {firebaseApp} from "./firebase";
import { useStateValue } from './StateProvider';


function Home() {
    const realtimedb = firebaseApp.database();

    const[post_list, setPostList] = useState(); 
    const [bidding_price, setBiddingPrice] = useState();

    useEffect(() =>{
        const postRef = realtimedb.ref("posts");
        postRef.on("value", (snapshot) => {
            const each_post = snapshot.val();
            const post_list = [];
            for (let id in each_post){
                post_list.push(each_post[id]);
            }
            setPostList(post_list);
        });
    }, []);

    const [{basket}, dispatch] = useStateValue();
    const addToBasket = (u_id, postKey, info, title, image, price, trading_place, phone_number) => {
        dispatch({
            type: 'ADD_TO_BASKET',
            item:{
                u_id: u_id,
                p_id: postKey,
                info: info,
                title: title,
                image: image,
                price: price,
                auction_price: bidding_price,
                trading_place: trading_place,
                phone_number: phone_number,
            },
        });
    };

    const auction_update = (postKey, u_id, count) => {
        console.log("postkey="+postKey);
        const postRef = realtimedb.ref("posts");
        console.log(postRef.child(postKey).auction_price)
        console.log(bidding_price)
        postRef.child(postKey).update({auction_price: bidding_price, highest_user: u_id, count: Number(count)+1});
    };

    return (
        <div className="home">
            <section className="showcase">
                <div className="background">
                    <h3>Welcom to Empire Market</h3>
                    <h1>Amazing Products wait for you</h1>
                    <button className="btn">Explore</button>
                </div>
            </section>

            <div class="second_paragraph">
                <div className="second__post">
                    { post_list && post_list.map(doc => (
                        <div className="second__content" key={doc.id}>
                            <img src={doc.image} alt="uploaded pic" />
                            <title>{doc.title}</title>
                            <p>{doc.info}</p>
                            <p>trading place: {doc.trading_place}</p>
                            <p>hoping price: {doc.price}</p>
                            <p>aution price: {doc.auction_price}</p>
                            <p>Wanna Bidding?</p>
                            <input type='text' value={bidding_price} onChange={e => setBiddingPrice(e.target.value)}/>
                            <button className="bidding" onClick={() => auction_update(doc.postKey, doc.u_id, doc.count)}> 
                                bidding 
                            </button> 
                            <button className="add_to_basket" onClick={() => addToBasket(doc.u_id, doc.postKey, doc.info, doc.title, doc.image, doc.price, doc.trading_place, doc.phone_number)}>
                                Add to Basket
                            </button>
                        </div>
                    ))}
                </div>  
            </div>
        </div>
    );
}

export default Home;
