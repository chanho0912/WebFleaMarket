import React, {useEffect, useState} from 'react';
import {firebaseApp} from "./firebase";
import './Search.css';
import { useStateValue } from './StateProvider';

function Search() {
    const query = window.localStorage.getItem('Query');
    const realtimedb = firebaseApp.database();
    const [search_list, SetSearchList] = useState(null);

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
                trading_place: trading_place,
                phone_number: phone_number,
            },
        });
    };

    useEffect(() =>{
        const postRef = realtimedb.ref("posts");
        

        postRef.on("value", (snapshot) => {
            const each_post = snapshot.val();
            const search_list = [];
            for (let id in each_post){
                if(each_post[id].u_id == query || each_post[id].title == query){
                    search_list.push(each_post[id]);
                }
            }
            SetSearchList(search_list);
        });
    }, []);

    return (
        <div className="search">
            <div className="search__container">                
                <h1>Search Result...</h1>
                <div className="search__Section">
                        <div className="search__List">
                            { search_list && search_list.map(doc => (
                                <div className="img-wrap" key={doc.id}>
                                    <img src={doc.image} className='Product__image' alt="uploaded pic" />
                                    <p>title: {doc.title}</p>
                                    <p>info: {doc.info}</p>
                                    <p>trading place: {doc.trading_place}</p>
                                    <p>hoping price: {doc.price}</p>
                                    <button onClick={() => addToBasket(doc.u_id, doc.postKey, doc.info, doc.title, doc.image, doc.price, doc.trading_place, doc.phone_number)}>
                                        Add to Basket
                                    </button>
                                </div>
                            ))}   
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Search
