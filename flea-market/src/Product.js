import React from 'react';
import item1 from './images/d1.jpg';
import "./Product.css"
import { useStateValue } from './StateProvider';

function Product({ u_id, p_id, title, image, price, rating, trading_place, phone_number}) {
    const [{basket}, dispatch] = useStateValue();
    const addToBasket = () => {
        dispatch({
            type: 'ADD_TO_BASKET',
            item:{
                u_id: u_id,
                p_id: p_id,
                title: title,
                image: image,
                price: price,
                rating: rating,
                trading_place: trading_place,
                phone_number: phone_number,
            },
        });
    };
    return (
        <div className="product">
            <div className="product__info">
                <strong>{title}</strong><br></br>
                <small className="product__uid">uploaded by {u_id}</small>
                <p className="product__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="product__rating">
                    {Array(rating).fill().map((_, i) => <p>★</p>)}
                </div>
            </div>
            <img 
                className="product__image"
                src={image} />
            <button onClick={addToBasket}>Add to Basket</button>
        </div>
    );
}

export default Product;
